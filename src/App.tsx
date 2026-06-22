import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Play,
  Menu,
  X,
  Star,
  ArrowUpRight,
  Mail,
  ChevronDown,
  Palette,
  Layers,
  Monitor,
  Smartphone,
  PenTool,
  Eye,
  Globe,
  Camera,
  CircleDot,
  Component,
  AtSign,
  FileDown,
  Lock,
  LogOut,
  Copy,
  Check,
  User as UserIcon,
} from "lucide-react";
import { LegalModal, PrivacyPolicyContent, TermsOfServiceContent } from "./Legal";
import { auth, signInWithGoogle, logout } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import heroImage from "./utils/image/image.png";
import aboutImage from "./utils/image/images.png";
import logo from "./utils/image/logo.png";
import lguAppImage from "./utils/image/My work/1.jpg";
import aboutVideo from "./utils/mp4/meteor shower.mp4";

/* ─────────────────────────── Custom Brand Icons ─────────────────────────── */
const Facebook = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Linkedin = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/* ─────────────────────────── Navigation ─────────────────────────── */
function Navbar({ user, onSignIn, onLogout }: { user: User | null, onSignIn: () => void, onLogout: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    // Small delay to allow menu closing animation to start
    setTimeout(() => {
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80; // Navbar height
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border border-white/10">
              <img src={logo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-semibold text-sm tracking-widest uppercase leading-tight">
                Ludy Bong Conag
              </p>
              <p className="text-text-dim text-[10px] tracking-[0.2em] uppercase">
                UX/UI Designer & Software Engineer
              </p>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-text-muted text-sm font-medium hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Auth & CTA */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-white group"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ""} className="w-8 h-8 rounded-full border border-border" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-accent" />
                    </div>
                  )}
                  <ChevronDown className={`w-4 h-4 text-text-dim group-hover:text-white transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-xl shadow-xl py-2 overflow-hidden"
                    >
                      <div className="px-4 py-2 border-b border-border mb-1">
                        <p className="text-white text-xs font-medium truncate">{user.displayName}</p>
                        <p className="text-text-dim text-[10px] truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          onLogout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={onSignIn}
                className="text-white text-sm font-medium hover:text-accent transition-colors"
              >
                Sign In
              </button>
            )}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
            >
              Let&apos;s Talk
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 right-0 bg-bg/95 backdrop-blur-xl border-b border-border overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-4">
                {user && (
                  <div className="flex items-center gap-3 pb-4 border-b border-border mb-2">
                    <img src={user.photoURL || ""} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="text-white text-sm font-medium">{user.displayName}</p>
                      <button onClick={onLogout} className="text-red-400 text-xs">Sign Out</button>
                    </div>
                  </div>
                )}
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-text-muted text-lg font-medium hover:text-white transition-colors py-2 w-full block"
                  >
                    {link.label}
                  </a>
                ))}
                {!user && (
                  <button
                    onClick={() => {
                      onSignIn();
                      setMobileOpen(false);
                    }}
                    className="text-white text-lg font-medium text-left hover:text-accent transition-colors py-2 w-full block"
                  >
                    Sign In
                  </button>
                )}
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white text-sm font-medium px-6 py-3 rounded-full mt-2"
                >
                  Let&apos;s Talk
                  <ArrowRight className="w-4 h-4" />
                </a>

                {/* Mobile Socials */}
                <div className="flex items-center gap-4 pt-6 border-t border-border mt-4">
                  {[
                    { Icon: Facebook, href: "https://facebook.com/itsludian" },
                    { Icon: Instagram, href: "https://www.instagram.com/ludianhiuzong/?__pwa=1" },
                    { Icon: Linkedin, href: "https://www.linkedin.com/in/ludy-bong-conag-9856a6352" },
                    { Icon: AtSign, href: "https://www.threads.com/@ludianofficial" },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-dim hover:text-white"
                    >
                      <social.Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─────────────────────────── Hero ─────────────────────────── */
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden scroll-mt-20"
    >
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 border border-border bg-surface/60 backdrop-blur-sm rounded-full px-5 py-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-text-dim text-xs font-medium tracking-[0.15em] uppercase">
              Available for freelance work
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-sans font-medium text-white leading-[1.2] tracking-tight mb-6"
          >
            I&apos;m Ludy Bong
            <br />
            Conag and I&apos;m a
            <br />
            <span className="font-serif italic text-accent">UX/UI</span>{" "}
            <span className="font-serif italic text-accent">Designer</span> &{" "}
            <span className="font-serif italic text-accent">Software Engineer</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-text-muted text-sm sm:text-base max-w-xl leading-relaxed mb-10"
          >
            I craft intuitive digital experiences that blend aesthetics with
            functionality. Turning complex problems into elegant, user-centered
            solutions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-3 bg-accent hover:bg-accent-hover text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-accent/25"
            >
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  // Find the textarea and pre-fill it
                  const messageArea = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
                  const projectType = document.querySelector('input[name="project_type"]') as HTMLInputElement;
                  if (messageArea) messageArea.value = "Hello! I am interested in your work and would like to request a copy of your CV. Thank you!";
                  if (projectType) projectType.value = "CV Request";
                }
              }}
              className="group inline-flex items-center gap-3 border border-border hover:border-text-dim text-white font-medium px-8 py-4 rounded-full transition-all duration-300 bg-surface/40 backdrop-blur-sm hover:bg-surface/60"
            >
              <Mail className="w-4 h-4" />
              Request CV
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-text-dim text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-text-dim" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────── About ─────────────────────────── */
function About() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLowOpacity, setIsLowOpacity] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 0.5;

    const handleTimeUpdate = () => {
      // 0.5 seconds before the video ends, start a quick fade out
      if (video.currentTime > video.duration - 0.5 && !isLowOpacity) {
        setIsLowOpacity(true);
        setTimeout(() => {
          video.currentTime = 0;
          setIsLowOpacity(false);
        }, 400); // Wait for fade, reset, then fade back in
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [isLowOpacity]);

  return (
    <section id="about" className="relative py-28 lg:py-36 overflow-hidden scroll-mt-20">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <motion.video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          animate={{ opacity: isLowOpacity ? 0 : 0.4 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover"
        >
          <source src={aboutVideo} type="video/mp4" />
        </motion.video>
        {/* Darker overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
              About Me
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-medium text-white leading-tight mb-8">
              Designing with
              <br />
              <span className="font-serif italic text-accent">purpose</span> &{" "}
              <span className="font-serif italic text-accent">passion</span>
            </h2>
            <div className="space-y-5 text-text-muted text-base leading-relaxed">
              <p>
                I&apos;m Ludy Bong Conag, a UX/UI designer and software engineer based in
                the Philippines with over 4 years of experience creating digital
                products that people love to use.
              </p>
              <p>
                My approach combines deep user research with bold visual design
                to deliver experiences that are not only beautiful but also
                highly functional. I believe great design should feel invisible
                — guiding users effortlessly toward their goals.
              </p>
              <p>
                When I&apos;m not pushing pixels, you&apos;ll find me exploring new design
                trends, mentoring aspiring designers, or hunting for the perfect
                cup of coffee.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "Figma",
                "UI/UX Design",
                "Prototyping",
                "System Architecture",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full border border-border text-text-dim text-sm bg-surface/40"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats + Image area */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative frame */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface border border-border">
              <img
                src={aboutImage}
                alt="Ludy Bong Conag"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <p className="text-white font-medium text-lg">Ludy Bong Conag</p>
                <p className="text-text-dim text-sm">UX/UI Designer & Software Engineer</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── UI Components ─────────────────────────── */
function ProtectedOverlay({ onSignIn }: { onSignIn: () => void }) {
  return (
    <div className="absolute inset-0 z-40 backdrop-blur-md bg-bg/40 flex items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="max-w-sm bg-surface border border-border p-8 rounded-3xl shadow-2xl"
      >
        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-2xl font-medium text-white mb-3">Content Locked</h3>
        <p className="text-text-muted text-sm mb-8 leading-relaxed">
          Please sign in with your Google account to view my full work history and send me messages.
        </p>
        <button
          onClick={onSignIn}
          className="w-full inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-hover text-white font-medium px-8 py-4 rounded-full transition-all duration-300"
        >
          Sign In with Google
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────── Work ─────────────────────────── */
const projects = [
  {
    title: "LGU Ormoc Event App",
    category: "Mobile App Design",
    description:
      "A specialized mobile application for LGU Ormoc employees to streamline internal coordination, track task assignments, and manage event logistics in real-time.",
    tags: ["Employee Tool", "UI Design", "Logistics"],
    color: "#e85d2b",
    image: lguAppImage,
    link: "https://www.figma.com/design/Do23if3MVkVNSg4AdZEczJ/Event-Management-App?node-id=222-311&t=xSPEF9LAbs7ZBzsb-1",
  },
  {
    title: "LGU Ormoc Event System",
    category: "Web Design",
    description:
      "A centralized web-based platform for LGU Ormoc administrators to plan, monitor, and generate comprehensive reports for city-wide government events.",
    tags: ["Admin Portal", "Web Design", "Analytics"],
    color: "#c75a3a",
    link: "https://paleturquoise-cheetah-627304.hostingersite.com/public/login.php",
  },
  {
    title: "MediCare Health Portal",
    category: "Dashboard Design",
    description:
      "A patient-centric healthcare dashboard that simplifies appointment scheduling, medical records, and telemedicine consultations.",
    tags: ["Dashboard", "Healthcare", "Accessibility"],
    color: "#d4693e",
    isOngoing: true,
  },
  {
    title: "Wanderlust Travel App",
    category: "Mobile App Design",
    description:
      "A travel planning application with AI-powered itinerary generation, real-time collaboration, and immersive destination previews.",
    tags: ["Mobile", "AI Integration", "Motion"],
    color: "#b85a35",
    isOngoing: true,
  },
];

function Work({ isLoggedIn, onSignIn }: { isLoggedIn: boolean, onSignIn: () => void }) {
  return (
    <section id="work" className="relative py-28 lg:py-36 bg-gradient-to-b from-[#e85d2b]/15 to-black min-h-[600px] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-500 relative">
        {!isLoggedIn && <ProtectedOverlay onSignIn={onSignIn} />}
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
            Selected Work
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-medium text-white leading-tight">
              Projects that
              <br />
              <span className="font-serif italic text-accent">speak</span> for
              themselves
            </h2>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-text-muted hover:text-white text-sm font-medium transition-colors group shrink-0"
            >
              View All Projects
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => {
            const handleCardClick = (e: React.MouseEvent) => {
              if (!isLoggedIn) {
                e.preventDefault();
                onSignIn();
              }
            };

            const Card = (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative bg-surface border border-border rounded-2xl overflow-hidden hover:border-text-dim/50 transition-all duration-500 h-full"
              >
                {/* Project visual */}
                <div
                  className="aspect-[16/10] relative overflow-hidden"
                  style={{ backgroundColor: `${project.color}08` }}
                >
                  {project.isOngoing ? (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-accent/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                        Ongoing
                      </span>
                    </div>
                  ) : (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-emerald-500/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                        Completed
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 shadow-2xl"
                      />
                    ) : (
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${project.color}20` }}
                      >
                        <span
                          className="text-3xl font-serif italic"
                          style={{ color: project.color }}
                        >
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-bg/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <p className="text-accent text-xs font-medium tracking-wider uppercase mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-xl lg:text-2xl font-medium text-white mb-3 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-bg border border-border text-text-dim text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );

            return project.link ? (
              <a
                key={project.title}
                href={project.link}
                onClick={handleCardClick}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                {Card}
              </a>
            ) : (
              <div key={project.title} onClick={handleCardClick} className="h-full cursor-pointer">
                {Card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Services ─────────────────────────── */
const services = [
  {
    icon: Monitor,
    title: "Frontend Engineering",
    description:
      "Building responsive, high-performance web applications using modern frameworks like React and TypeScript.",
  },
  {
    icon: Palette,
    title: "UX/UI Design",
    description:
      "Creating intuitive, user-centered interfaces that balance aesthetic beauty with functional simplicity.",
  },
  {
    icon: Layers,
    title: "Full-Stack Solutions",
    description:
      "Developing end-to-end digital products, from database architecture to polished user interfaces.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Crafting native-feeling mobile experiences that leverage the latest platform capabilities for iOS and Android.",
  },
  {
    icon: Component,
    title: "Design Systems",
    description:
      "Building scalable, reusable component libraries that ensure consistency across complex software ecosystems.",
  },
  {
    icon: PenTool,
    title: "Prototyping & Testing",
    description:
      "Validating ideas through high-fidelity interactive prototypes and rigorous usability testing.",
  },
];

function Services() {
  return (
    <section id="services" className="relative py-28 lg:py-36 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
            What I Do
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-medium text-white leading-tight">
            Services tailored to
            <br />
            your <span className="font-serif italic text-accent">vision</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group p-8 rounded-2xl border border-border bg-surface/40 hover:bg-surface-light hover:border-text-dim/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                <service.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-medium text-white mb-3">
                {service.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Testimonials ─────────────────────────── */
const testimonials = [
  {
    quote:
      "Ludy has a rare ability to bridge the gap between design and engineering. The code is as clean as the UI is beautiful.",
    author: "Anonymous",
    role: "Sotware Engineer",
  },
  {
    quote:
      "Working with Ludy was a game-changer. They didn't just design the product; they built it with technical precision and a deep focus on UX.",
    author: "Anonymous",
    role: "Sotware Engineer",
  },
  {
    quote:
      "The design system and technical architecture Ludy implemented has become the backbone of our product, saving us months of development time.",
    author: "Anonymous",
    role: "Sotware Engineer",
  },
];

function Testimonials() {
  return (
    <section className="relative py-28 lg:py-36 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-medium text-white leading-tight">
            What clients <span className="font-serif italic text-accent">say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-2xl border border-border bg-surface/40"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-sm font-medium">
                    {t.author.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.author}</p>
                  <p className="text-text-dim text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Contact ─────────────────────────── */
function Contact({ user, onSignIn }: { user: User | null, onSignIn: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "invalid-email">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const emailAddress = "conagludybongbsitpittabango@gmail.com";
  // Gmail-specific compose link
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;

  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous status
    setStatus("idle");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name")?.toString() || "").trim();
    const email = user?.email || (formData.get("email")?.toString() || "").trim();
    const message = (formData.get("message")?.toString() || "").trim();
    const honeypot = formData.get("website")?.toString();

    // 1. Honeypot check (security)
    if (honeypot) {
      console.warn("Honeypot triggered");
      return;
    }

    // 2. Length validation
    if (name.length > 100 || message.length > 2000) {
      setStatus("error");
      setErrorMessage("Message is too long.");
      return;
    }

    // 3. Simple validation
    if (!name || !email || !message) {
      setStatus("error");
      form.reportValidity();
      return;
    }

    setStatus("sending");

    try {
      // Use local URL for testing, fallback to production
      const API_URL = window.location.hostname === 'localhost'
        ? "http://localhost:1000"
        : "https://my-portfolio-lnv3.onrender.com";

      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          project_type: formData.get("project_type"),
          message,
          website: honeypot,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(data.debug || data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setStatus("error");
      setErrorMessage("The server is not responding. Please ensure your backend is running.");
    }
  };

  return (
    <section id="contact" className="relative py-28 lg:py-36 min-h-[600px] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
              Get In Touch
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-medium text-white leading-tight mb-6">
              Let&apos;s create
              <br />
              something{" "}
              <span className="font-serif italic text-accent">amazing</span>
            </h2>
            <p className="text-text-muted text-base leading-relaxed mb-10 max-w-md">
              Have a project in mind or just want to chat about design? I&apos;d love
              to hear from you. Let&apos;s build something extraordinary together.
            </p>

            <div className="space-y-5">
              <div className="relative group/item">
                <a
                  href={user ? gmailLink : "#"}
                  target={user ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault();
                      onSignIn();
                    }
                  }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-text-dim text-xs uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-white text-sm font-medium group-hover:text-accent transition-colors truncate">
                      {user ? emailAddress : "Sign in to view email"}
                    </p>
                  </div>
                </a>

                {user && (
                  <button
                    onClick={copyToClipboard}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-text-dim hover:text-white transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-text-dim text-xs uppercase tracking-wider">
                    Availability
                  </p>
                  <p className="text-white text-sm font-medium">
                    Open for freelance projects
                  </p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-10">
              {[
                { Icon: Facebook, label: "Facebook", href: "https://facebook.com/itsludian" },
                { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/ludianhiuzong/?__pwa=1" },
                { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ludy-bong-conag-9856a6352" },
                { Icon: AtSign, label: "Threads", href: "https://www.threads.com/@ludianofficial" },
              ].map((social) => {
                const Icon = social.Icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-text-dim hover:text-white hover:border-text-dim hover:bg-surface-light transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface border border-border rounded-2xl p-8 lg:p-10 relative overflow-hidden"
          >
            {!user && (
              <div
                className="absolute inset-0 z-10 cursor-pointer bg-transparent"
                onClick={onSignIn}
              />
            )}
            <form onSubmit={handleSubmit} className={`space-y-6 ${!user ? 'opacity-50' : ''}`}>
              {/* Honeypot field - hidden from users, only visible to bots */}
              <div className="hidden" aria-hidden="true">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-text-dim text-xs uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={user?.displayName || ""}
                    maxLength={100}
                    placeholder="John Doe"
                    className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-text-dim text-xs uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  {user ? (
                    <div className="w-full bg-bg/50 border border-border/50 rounded-xl px-4 py-3 text-text-dim text-sm flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      {user.email}
                    </div>
                  ) : (
                    <input
                      type="email"
                      name="email"
                      required
                      maxLength={150}
                      placeholder="email@example.com"
                      className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors"
                    />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-text-dim text-xs uppercase tracking-wider mb-2">
                  Project Type
                </label>
                <input
                  type="text"
                  name="project_type"
                  maxLength={100}
                  placeholder="e.g. Mobile App, Branding, Web Dev"
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-text-dim text-xs uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  maxLength={2000}
                  placeholder="Tell me about your project..."
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-hover text-white font-medium px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-accent/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
                <ArrowRight className="w-5 h-5" />
              </button>

              {status === "success" && (
                <p className="text-emerald-500 text-sm text-center font-medium">
                  Message sent successfully!
                </p>
              )}
              {status === "invalid-email" && (
                <p className="text-red-500 text-sm text-center font-medium">
                  Please enter a valid email address.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-500 text-sm text-center font-medium">
                  {errorMessage || "Something went wrong. Please try again."}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Footer ─────────────────────────── */
function Footer({ onOpenPrivacy, onOpenTerms, isLoggedIn, onSignIn }: { onOpenPrivacy: () => void, onOpenTerms: () => void, isLoggedIn: boolean, onSignIn: () => void }) {
  const emailAddress = "conagludybongbsitpittabango@gmail.com";
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;

  const handleEmailClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      onSignIn();
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-border pt-20 pb-12 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center border border-white/10">
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg tracking-wider">
                  LUDY BONG CONAG
                </h3>
                <p className="text-accent text-[10px] font-bold tracking-[0.3em] uppercase">
                  UX - UI Designer
                </p>
              </div>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-sm">
              Designing meaningful digital products that are as enjoyable to use
              as they are beautiful to look at.
            </p>
          </div>

          {/* Navigation Section */}
          <div className="md:col-span-3">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-8">
              Navigation
            </h4>
            <ul className="space-y-4">
              {["Home", "About", "Services", "Work", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => scrollToSection(e, `#${item.toLowerCase()}`)}
                    className="text-text-dim hover:text-white transition-colors text-sm"
                  >
                    {item === "Work" ? "Projects" : item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="md:col-span-4">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-8">
              Let&apos;s Connect
            </h4>
            <p className="text-text-dim text-sm mb-8">
              Have an idea? Let&apos;s turn it into something great.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, label: "Facebook", href: "https://facebook.com/itsludian" },
                { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/ludianhiuzong/?__pwa=1" },
                { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ludy-bong-conag-9856a6352" },
                { Icon: AtSign, label: "Threads", href: "https://www.threads.com/@ludianofficial" },
              ].map((social) => {
                const Icon = social.Icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-dim hover:text-white hover:border-text-dim transition-all group"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative pt-12 pb-16 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6 mb-12">
          {/* Watermark Signature centered behind the text - Made significantly larger with stronger gradient and higher visibility */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
            <h2 className="text-[20vw] sm:text-[15vw] font-serif italic bg-gradient-to-b from-white to-black bg-clip-text text-transparent select-none tracking-tighter whitespace-nowrap opacity-5">
              Ludy Bong
            </h2>
          </div>

          <p className="relative z-10 text-text-dim text-xs uppercase tracking-[0.2em] text-center sm:text-left">
            &copy; {new Date().getFullYear()} Ludy Bong Conag. All rights reserved.
          </p>
          <div className="relative z-10 flex items-center gap-8">
            <button
              onClick={onOpenPrivacy}
              className="text-text-dim hover:text-white text-xs uppercase tracking-widest transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenTerms}
              className="text-text-dim hover:text-white text-xs uppercase tracking-widest transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────── App ─────────────────────────── */
export default function App() {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | "auth" | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // 1. Disable Right-Click
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    // 2. Disable common DevTools shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      unsubscribe();
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      setActiveModal(null);
    } catch (error) {
      console.error("Sign in failed", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar user={user} onSignIn={() => setActiveModal("auth")} onLogout={handleLogout} />
      <Hero />
      <About />
      <Work isLoggedIn={!!user} onSignIn={() => setActiveModal("auth")} />
      <Services />
      <Testimonials />
      <Contact user={user} onSignIn={() => setActiveModal("auth")} />
      <Footer
        isLoggedIn={!!user}
        onSignIn={() => setActiveModal("auth")}
        onOpenPrivacy={() => setActiveModal("privacy")}
        onOpenTerms={() => setActiveModal("terms")}
      />

      {/* Auth Modal */}
      <AnimatePresence>
        {activeModal === "auth" && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-surface border border-border rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 lg:p-10 text-center">
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-6 right-6 text-text-dim hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <UserIcon className="w-8 h-8 text-accent" />
                </div>

                <h2 className="text-3xl font-medium text-white mb-2">Welcome Back</h2>
                <p className="text-text-muted text-sm mb-10">
                  Sign in to access my full portfolio, projects, and get in touch.
                </p>

                <div className="space-y-4">
                  <button
                    onClick={handleSignIn}
                    className="w-full flex items-center justify-center gap-4 bg-white text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/90"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </button>

                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-surface px-4 text-text-dim tracking-widest">Secure Sign In</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-text-dim leading-relaxed">
                    By continuing, you agree to my Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <LegalModal
        isOpen={activeModal === "privacy"}
        onClose={() => setActiveModal(null)}
        title="Privacy Policy"
      >
        <PrivacyPolicyContent />
      </LegalModal>

      <LegalModal
        isOpen={activeModal === "terms"}
        onClose={() => setActiveModal(null)}
        title="Terms of Service"
      >
        <TermsOfServiceContent />
      </LegalModal>
    </div>
  );
}
