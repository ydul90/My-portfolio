const express = require('express');
const axios = require('axios');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dns').setDefaultResultOrder('ipv4first');
require('dotenv').config();

const app = express();

// Security Headers (Help reduce browser tracking warnings and improve security)
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Support both local and production URLs
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://my-portfolio-7e3bd.web.app',
    'https://my-portfolio-7e3bd.firebaseapp.com',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
app.use(express.json({ limit: '10kb' }));

// 1. Simple Rate Limiting (Prevent Spam)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 10; // Max 10 requests per window

const checkRateLimit = (ip) => {
    const now = Date.now();
    if (!rateLimit.has(ip)) {
        rateLimit.set(ip, { count: 1, firstRequest: now });
        return true;
    }

    const userData = rateLimit.get(ip);
    if (now - userData.firstRequest > RATE_LIMIT_WINDOW) {
        rateLimit.set(ip, { count: 1, firstRequest: now });
        return true;
    }

    if (userData.count >= MAX_REQUESTS) return false;

    userData.count += 1;
    return true;
};

// 2. Simple Input Sanitization
function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .trim();
}

// 3. Email Verification Function
async function verifyEmail(email) {
    try {
        const apiKey = process.env.ABSTRACT_API_KEY;
        const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`;

        const response = await axios.get(url);
        const data = response.data;

        // Log the FULL result so we can debug
        console.log("--- API RESPONSE START ---");
        console.log(JSON.stringify(data, null, 2));
        console.log("--- API RESPONSE END ---");

        const status = (data.email_deliverability?.status || "").toLowerCase();
        const isDisposable = data.email_quality?.is_disposable || false;
        const score = data.email_quality?.score || 0;

        // VERIFICATION LOGIC - HIGHLY COMPATIBLE
        // Allow 'deliverable' and 'unknown'
        if (status !== "deliverable" && status !== "unknown") {
            console.log(`[BLOCKED] Status was: ${status}`);
            return {
                valid: false,
                reason: `Email verification failed: Address is marked as ${status}.`
            };
        }

        if (isDisposable === true) {
            console.log(`[BLOCKED] Email was disposable`);
            return { valid: false, reason: "Disposable/temporary emails are not allowed." };
        }

        // Lowered to 0.1 to be extremely permissive for testing
        if (score < 0.1) {
            console.log(`[BLOCKED] Score was too low: ${score}`);
            return { valid: false, reason: "This email address was flagged as very low quality. Please use a different one." };
        }

        console.log(`[SUCCESS] Email ${email} verified (Status: ${status}, Score: ${score}). Proceeding to send...`);
        return { valid: true };
    } catch (error) {
        console.error("Verification API Error:", error.response ? error.response.data : error.message);
        // "Fail open" - if the verification service is down or key is invalid,
        // we still want to receive the message.
        console.log("[WARNING] Verification service failed. Proceeding anyway...");
        return { valid: true };
    }
}

// 2. Contact Route
app.post('/api/contact', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // A. Rate Limiting Check
    if (!checkRateLimit(ip)) {
        return res.status(429).json({
            success: false,
            message: "Too many requests. Please try again in 15 minutes."
        });
    }

    let { name, email, project_type, message, website } = req.body;

    // B. Honeypot check (Security)
    if (website) {
        console.warn(`Spam attempt blocked from IP: ${ip}`);
        return res.status(400).json({ success: false, message: "Spam detected." });
    }

    // C. Input Validation & Sanitization
    name = sanitize(name);
    email = sanitize(email);
    project_type = sanitize(project_type);
    message = sanitize(message);

    if (!name || !email || !message || name.length > 100 || message.length > 2000) {
        return res.status(400).json({ success: false, message: "Invalid input provided." });
    }

    // C. Perform Verification (Bypassed due to invalid API key)
    // const verification = await verifyEmail(email);
    // if (!verification.valid) {
    //     return res.status(400).json({ success: false, message: verification.reason });
    // }
    console.log(`[BYPASS] Verification skipped for ${email}. Proceeding to send email...`);

    // D. If valid, Send Email using Nodemailer
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // TLS
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        },
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 10000,
        family: 4 // Force IPv4 to avoid ENETUNREACH errors on IPv6-only resolutions
    });

    // Verify connection configuration
    transporter.verify(function(error, success) {
        if (error) {
            console.log("Transporter verify error:", error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, // Must be your authenticated email
        replyTo: email,              // This allows you to click "Reply" to the user
        to: process.env.EMAIL_USER,
        subject: `New Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nProject: ${project_type}\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("Mail Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send email.",
            debug: error.message // This will help us see the exact Gmail error
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Backend running on port ${PORT}`));
