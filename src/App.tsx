import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
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
  AtSign,
  Check,
  Copy,
  Component,
  Languages,
} from "lucide-react";
import { LegalModal, PrivacyPolicyContent, TermsOfServiceContent } from "./Legal";
import heroImage from "./utils/image/image.png";
import aboutImage from "./utils/image/images.png";
import logo from "./utils/image/logo.png";
import lguAppImage from "./utils/image/My work/1.jpg";
import aboutVideo from "./utils/mp4/meteor_shower.mp4";

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
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

    setTimeout(() => {
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
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
            onClick={(e) => scrollToSection(e, "#home")}
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

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/40 hover:bg-surface/60 transition-all cursor-pointer">
              <Languages className="w-4 h-4 text-text-dim pointer-events-none" />
              <div className="gtranslate_wrapper pointer-events-auto"></div>
            </div>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 right-0 bg-bg/95 backdrop-blur-xl border-b border-border overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-4">
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
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white text-sm font-medium px-6 py-3 rounded-full mt-2"
                >
                  Let&apos;s Talk
                  <ArrowRight className="w-4 h-4" />
                </a>

                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-surface/40 mt-2 cursor-pointer">
                  <Languages className="w-5 h-5 text-text-dim pointer-events-none" />
                  <div className="gtranslate_wrapper pointer-events-auto"></div>
                </div>

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
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="max-w-3xl">
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
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                  const messageArea = document.querySelector(
                    'textarea[name="message"]'
                  ) as HTMLTextAreaElement;
                  const projectType = document.querySelector(
                    'input[name="project_type"]'
                  ) as HTMLInputElement;
                  if (messageArea)
                    messageArea.value =
                      "Hello! I am interested in your work and would like to request a copy of your CV. Thank you!";
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
      if (video.currentTime > video.duration - 0.5 && !isLowOpacity) {
        setIsLowOpacity(true);
        setTimeout(() => {
          video.currentTime = 0;
          setIsLowOpacity(false);
        }, 400);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [isLowOpacity]);

  return (
    <section id="about" className="relative py-28 lg:py-36 overflow-hidden scroll-mt-20">
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
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
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

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
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
    isOngoing: true,
    status: "Updating",
  },
  {
    title: "LGU Ormoc Event System",
    category: "Web System",
    description:
      "A centralized web-based platform for LGU Ormoc administrators to plan, monitor, and generate comprehensive reports for city-wide government events.",
    tags: ["Admin Portal", "Development", "Analytics"],
    color: "#c75a3a",
    link: "https://paleturquoise-cheetah-627304.hostingersite.com/public/login.php",
    isOngoing: true,
    status: "Fixing",
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

function Work() {
  return (
    <section id="work" className="relative py-28 lg:py-36 bg-gradient-to-b from-[#e85d2b]/15 to-black min-h-[600px] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-500 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="text-accent text-xs font-medium tracking-[0.2em] uppercase mb-4 block">
                Selected Work
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-medium text-white leading-tight">
                Projects that
                <br />
                <span className="font-serif italic text-accent">speak</span> for
                themselves
              </h2>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-text-muted hover:text-white text-sm font-medium transition-colors group shrink-0"
            >
              View All Projects
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => {
            const Card = (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative bg-surface border border-border rounded-2xl overflow-hidden hover:border-text-dim/50 transition-all duration-500 h-full"
              >
                <div
                  className="aspect-[16/10] relative overflow-hidden"
                  style={{ backgroundColor: `${project.color}08` }}
                >
                  {project.isOngoing ? (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-accent/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                        {(project as any).status || "Ongoing"}
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
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                {Card}
              </a>
            ) : (
              <div key={project.title} className="h-full">
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
    role: "Software Engineer",
  },
  {
    quote:
      "Working with Ludy was a game-changer. They didn't just design the product; they built it with technical precision and a deep focus on UX.",
    author: "Anonymous",
    role: "Software Engineer",
  },
  {
    quote:
      "The design system and technical architecture Ludy implemented has become the backbone of our product, saving us months of development time.",
    author: "Anonymous",
    role: "Software Engineer",
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
function Contact() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error" | "invalid-email"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const emailAddress = "conagludybongbsitpittabango@gmail.com";
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;

  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sanitize = (str: string) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = sanitize((formData.get("name")?.toString() || ""));
    const email = sanitize((formData.get("email")?.toString() || ""));
    const message = sanitize((formData.get("message")?.toString() || ""));
    const honeypot = formData.get("website")?.toString();

    if (honeypot) return;

    if (name.length > 100 || message.length > 2000) {
      setStatus("error");
      setErrorMessage("Message is too long.");
      return;
    }

    if (!name || !email || !message) {
      setStatus("error");
      form.reportValidity();
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("https://api.staticforms.dev/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessKey: "sf_a0b4037c151184ddc7e0b0be",
          name,
          email,
          subject: "ydul submission",
          message: `Project Type: ${formData.get("project_type")}\n\n${message}`,
          replyTo: "@",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setStatus("error");
      setErrorMessage("Could not connect to the email service. Please check your internet.");
    }
  };

  return (
    <section id="contact" className="relative py-28 lg:py-36 min-h-[600px] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
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
                  href={gmailLink}
                  target="_blank"
                  rel="noopener noreferrer"
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
                      {emailAddress}
                    </p>
                  </div>
                </a>
                <button
                  onClick={copyToClipboard}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-text-dim hover:text-white transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
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

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface border border-border rounded-2xl p-8 lg:p-10 relative overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    maxLength={100}
                    placeholder="John Doe"
                    className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-text-dim text-xs uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    maxLength={150}
                    placeholder="email@example.com"
                    className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-text-dim focus:outline-none focus:border-accent transition-colors"
                  />
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
function Footer({
  onOpenPrivacy,
  onOpenTerms,
}: {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}) {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-border pt-20 pb-12 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
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

          <div className="md:col-span-4">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-8">
              Let&apos;s Connect
            </h4>
            <p className="text-text-dim text-sm mb-8">
              Have an idea? Let&apos;s turn it into something great.
            </p>

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

        <div className="relative pt-12 pb-16 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6 mb-12">
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
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
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
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text">
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Services />
      <Testimonials />
      <Contact />
      <Footer
        onOpenPrivacy={() => setActiveModal("privacy")}
        onOpenTerms={() => setActiveModal("terms")}
      />

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
