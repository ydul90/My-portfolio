import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl max-h-[80vh] bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-border flex items-center justify-between bg-surface/50">
              <h2 className="text-xl font-medium text-white">{title}</h2>
              <button onClick={onClose} className="p-2 text-text-dim hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 overflow-y-auto max-h-[calc(80vh-80px)] text-text-muted text-sm leading-relaxed space-y-6 prose prose-invert prose-sm">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const PrivacyPolicyContent = () => (
  <>
    <section>
      <h3 className="text-white font-medium mb-2">1. Introduction</h3>
      <p>Welcome to Ludy Bong Conag's portfolio. This Privacy Policy explains how I collect, use, and protect your information when you use my contact form or browse my website.</p>
    </section>
    <section>
      <h3 className="text-white font-medium mb-2">2. Information I Collect</h3>
      <p>When you use the contact form, I collect the following information:</p>
      <ul className="list-disc pl-5 mt-2 space-y-1">
        <li>Name</li>
        <li>Email Address</li>
        <li>Project Type</li>
        <li>Message Content</li>
      </ul>
    </section>
    <section>
      <h3 className="text-white font-medium mb-2">3. How I Use Your Information</h3>
      <p>I only use the information provided to respond to your inquiries, discuss potential collaborations, and provide the services you've requested. I do not use your data for marketing or newsletters without your explicit consent.</p>
    </section>
    <section>
      <h3 className="text-white font-medium mb-2">4. Data Protection</h3>
      <p>I implement security measures to maintain the safety of your personal information. Your data is never sold, traded, or transferred to outside parties.</p>
    </section>
    <section>
      <h3 className="text-white font-medium mb-2">5. Contact Information</h3>
      <p>If you have any questions regarding this privacy policy, you may contact me at: conagludybongbsitpittabango@gmail.com</p>
    </section>
  </>
);

export const TermsOfServiceContent = () => (
  <>
    <section>
      <h3 className="text-white font-medium mb-2">1. Acceptance of Terms</h3>
      <p>By accessing this website, you agree to be bound by these Terms of Service and all applicable laws and regulations in the Philippines.</p>
    </section>
    <section>
      <h3 className="text-white font-medium mb-2">2. Intellectual Property Rights</h3>
      <p>Unless otherwise stated, I own the intellectual property rights for all material on this website, including designs, code, and project case studies. All intellectual property rights are reserved.</p>
    </section>
    <section>
      <h3 className="text-white font-medium mb-2">3. User Conduct</h3>
      <p>You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.</p>
    </section>
    <section>
      <h3 className="text-white font-medium mb-2">4. Limitation of Liability</h3>
      <p>In no event shall Ludy Bong Conag be liable for any damages arising out of the use or inability to use the materials on this website.</p>
    </section>
    <section>
      <h3 className="text-white font-medium mb-2">5. Governing Law</h3>
      <p>These terms and conditions are governed by and construed in accordance with the laws of the Philippines and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
    </section>
  </>
);
