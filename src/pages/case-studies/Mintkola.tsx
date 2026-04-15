import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Brain,
  Map,
  Zap,
  Activity,
  MessageCircle,
  Layers,
  CheckCircle,
} from "lucide-react";

// --- ASSET CONFIG ---
const BASE_PATH = "/case_studies/mintkola/assets";

// --- CUSTOM COMPONENT: DUAL MASCOT BADGE ---
const MascotBadge = ({ type }: { type: "mint" | "kola" }) => {
  const isMint = type === "mint";
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md ${
        isMint
          ? "bg-teal-500/10 border-teal-500/20 text-teal-400"
          : "bg-orange-500/10 border-orange-500/20 text-orange-400"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          isMint ? "bg-teal-400" : "bg-orange-400"
        }`}
      />
      <span className="text-xs font-bold uppercase tracking-wide">
        {isMint ? "Mint (Strategy)" : "Kola (Motivation)"}
      </span>
    </div>
  );
};

// --- CUSTOM COMPONENT: ROADMAP NODE ---
const RoadmapNode = ({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) => (
  <div className="relative pl-12 pb-12 last:pb-0">
    {/* Line */}
    <div className="absolute left-[19px] top-10 bottom-0 w-[2px] bg-gradient-to-b from-teal-500/30 to-transparent last:hidden" />
    {/* Circle */}
    <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#1D201F] border-2 border-teal-500/50 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(20,184,166,0.3)]">
      <span className="text-teal-400 font-bold font-mono">{number}</span>
    </div>
    {/* Content */}
    <div>
      <h3 className="text-xl font-bold text-[#E0D0C1] mb-2">{title}</h3>
      <p className="text-[#B9BBBE] leading-relaxed">{text}</p>
    </div>
  </div>
);

const MintkolaCaseStudy = () => {
  const navigate = useNavigate();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  // CTA Border Animations (Consistent with Brand)
  const [borderAnimation, setBorderAnimation] = useState({
    scale: 1,
    x: 2,
    y: -2,
    rotate: -0.5,
  });
  const [borderAnimation2, setBorderAnimation2] = useState({
    scale: 1,
    x: -2,
    y: 2,
    rotate: 0.5,
  });
  const [borderAnimation3, setBorderAnimation3] = useState({
    scale: 1,
    x: 1,
    y: 1,
    rotate: -0.3,
  });

  useEffect(() => {
    const updateAnimation = () => {
      setBorderAnimation({
        scale: 0.98 + Math.random() * 0.04,
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 6,
        rotate: (Math.random() - 0.5) * 2,
      });
      setBorderAnimation2({
        scale: 0.98 + Math.random() * 0.04,
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 6,
        rotate: (Math.random() - 0.5) * 2,
      });
      setBorderAnimation3({
        scale: 0.98 + Math.random() * 0.04,
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 6,
        rotate: (Math.random() - 0.5) * 2,
      });
    };

    updateAnimation();
    const interval = setInterval(updateAnimation, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#1D201F] text-[#E0D0C1] font-sans selection:bg-teal-500/20">
      <Header />

      <main>
        {/* --- 1. HERO SECTION: The Dual Brain --- */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="container-padding relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-sm border border-teal-500/20 rounded-full text-sm font-medium text-teal-400 mb-8"
              >
                <Bot size={14} className="inline mr-2" /> Internal Project
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold text-[#E0D0C1] leading-tight mb-6 max-w-4xl"
              >
                The Psychology of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-orange-400">
                  Productive Action
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-[#B9BBBE] max-w-2xl mb-12 leading-relaxed"
              >
                We built a dual-personality AI system that combines behavioral
                psychology with actionable roadmaps.
              </motion.p>

              {/* Hero Image: Chat Interface */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative w-full max-w-4xl mx-auto"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-teal-500/20 to-transparent blur-3xl -z-10" />
                <img
                  src={`${BASE_PATH}/mintkola-chat-goal-clarification.webp`}
                  alt="Mintkola Chat Interface"
                  className="w-full rounded-2xl border border-white/10 shadow-2xl shadow-teal-900/20"
                />

                {/* Floating Annotations */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="hidden md:block absolute -left-12 top-1/3 bg-[#1D201F]/80 backdrop-blur-xl border border-orange-500/30 p-4 rounded-xl shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-[#1D201F] font-bold">
                      K
                    </div>
                    <div className="text-left">
                      <div className="text-orange-400 text-xs font-bold uppercase">
                        Kola
                      </div>
                      <div className="text-[#E0D0C1] text-sm">
                        "You got this!"
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="hidden md:block absolute -right-12 bottom-1/3 bg-[#1D201F]/80 backdrop-blur-xl border border-teal-500/30 p-4 rounded-xl shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-teal-400 text-xs font-bold uppercase">
                        Mint
                      </div>
                      <div className="text-[#E0D0C1] text-sm">
                        "Let's break it down."
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-[#1D201F] font-bold">
                      M
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- 2. THE PROBLEM & SOLUTION (Bento Grid) --- */}
        <section className="section-padding bg-[#161918]">
          <div className="container-padding">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#E0D0C1] mb-6">
                    Why simple to-do lists fail.
                  </h2>
                  <p className="text-lg text-[#B9BBBE] leading-relaxed mb-6">
                    Most productivity tools assume you know how to break down a
                    goal. Psychology shows that ambiguity is the enemy of
                    action.
                  </p>
                  <p className="text-lg text-[#B9BBBE] leading-relaxed">
                    We needed a system that didn't just track tasks, but acted
                    as an intelligent co-pilot to construct the plan for you.
                  </p>
                </div>
                <div className="relative">
                  <img
                    src={`${BASE_PATH}/mintkola-landing-page-3-week-roadmap.webp`}
                    alt="Landing Page Problem Statement"
                    className="rounded-xl border border-white/5 opacity-80 hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </div>

              {/* Feature Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Card 1: Dual AI */}
                <div className="md:col-span-2 bg-[#1D201F] rounded-2xl border border-white/5 p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-teal-500/10 rounded-xl">
                      <MessageCircle className="w-6 h-6 text-teal-400" />
                    </div>
                    <div className="flex gap-2">
                      <MascotBadge type="kola" />
                      <MascotBadge type="mint" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#E0D0C1] mb-2">
                    Dual-Personality Engine
                  </h3>
                  <p className="text-[#B9BBBE] max-w-md">
                    We fine-tuned two separate AI personas. Kola handles
                    motivation and emotional support (EQ), while Mint handles
                    logic, strategy, and planning (IQ).
                  </p>
                </div>

                {/* Card 2: Roadmap */}
                <div className="bg-[#1D201F] rounded-2xl border border-white/5 p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-3 bg-orange-500/10 rounded-xl w-fit mb-6">
                    <Map className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold text-[#E0D0C1] mb-2">
                    Dynamic Roadmaps
                  </h3>
                  <p className="text-[#B9BBBE]">
                    Chat outputs aren't just text. They generate interactive
                    node-based maps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 3. THE VISUAL JOURNEY (Interactive Roadmap) --- */}
        <section className="section-padding bg-[#1D201F] relative">
          <div className="container-padding">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-[#E0D0C1] mb-4">
                  From Abstract to Actionable
                </h2>
                <p className="text-xl text-[#B9BBBE]">
                  How the system deconstructs a vague goal into steps.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left: Interactive Visualization */}
                <motion.div
                  ref={targetRef}
                  style={{ opacity, scale }}
                  className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                >
                  <img
                    src={`${BASE_PATH}/mintkola-roadmap-full-interface.webp`}
                    alt="Full Roadmap Interface"
                    className="w-full h-auto"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D201F] via-transparent to-transparent opacity-20" />
                </motion.div>

                {/* Right: The Steps */}
                <div className="space-y-2">
                  <RoadmapNode
                    number="01"
                    title="Readiness Assessment"
                    text="The AI classifies the user's psychological state (Pre-contemplation vs. Action) to determine the coaching style."
                  />
                  <RoadmapNode
                    number="02"
                    title="Context Injection"
                    text="We inject behavioral frameworks (like Atomic Habits principles) into the prompt context dynamically."
                  />
                  <RoadmapNode
                    number="03"
                    title="Node Generation"
                    text="The conversation is parsed into JSON nodes that render as a clickable, trackable roadmap on the frontend."
                  />
                  <RoadmapNode
                    number="04"
                    title="Micro-Steps"
                    text="Each major milestone allows the user to 'Ask Mint' to break it down further into 5-minute tasks."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. UNDER THE HOOD (Technical) --- */}
        <section className="section-padding bg-[#161918] border-y border-white/5">
          <div className="container-padding">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-[#E0D0C1] mb-2">
                    The Automation Layer
                  </h2>
                  <p className="text-[#B9BBBE]">
                    Powered by n8n, Claude 3.5, and React Flow.
                  </p>
                </div>
                <div className="flex gap-4 mt-6 md:mt-0">
                  <div className="flex items-center gap-2 text-sm text-[#B9BBBE]">
                    <div className="w-2 h-2 rounded-full bg-teal-400" /> n8n
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#B9BBBE]">
                    <div className="w-2 h-2 rounded-full bg-orange-400" />{" "}
                    Firebase
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#B9BBBE]">
                    <div className="w-2 h-2 rounded-full bg-blue-400" /> React
                  </div>
                </div>
              </div>

              {/* Workflow Diagram */}
              <div className="bg-[#1D201F] rounded-2xl p-4 md:p-8 border border-white/5 shadow-inner mb-12">
                <img
                  src={`${BASE_PATH}/mintkola-roadmap-visualization.webp`}
                  alt="n8n Workflow Diagram"
                  className="w-full rounded-lg opacity-90"
                />
              </div>

              {/* Tech Cards */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="p-6 rounded-xl bg-[#1D201F] border border-white/5 hover:border-teal-500/30 transition-colors">
                  <Brain className="w-8 h-8 text-teal-400 mb-4" />
                  <h4 className="font-bold text-[#E0D0C1] mb-2">Logic</h4>
                  <p className="text-sm text-[#B9BBBE]">
                    Claude Sonnet for reasoning, GPT-4 for JSON formatting.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-[#1D201F] border border-white/5 hover:border-teal-500/30 transition-colors">
                  <Activity className="w-8 h-8 text-teal-400 mb-4" />
                  <h4 className="font-bold text-[#E0D0C1] mb-2">Workflow</h4>
                  <p className="text-sm text-[#B9BBBE]">
                    n8n handles state management and context windowing.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-[#1D201F] border border-white/5 hover:border-teal-500/30 transition-colors">
                  <Layers className="w-8 h-8 text-teal-400 mb-4" />
                  <h4 className="font-bold text-[#E0D0C1] mb-2">UI</h4>
                  <p className="text-sm text-[#B9BBBE]">
                    React Flow for the interactive node graph visualization.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-[#1D201F] border border-white/5 hover:border-teal-500/30 transition-colors">
                  <Zap className="w-8 h-8 text-teal-400 mb-4" />
                  <h4 className="font-bold text-[#E0D0C1] mb-2">Realtime</h4>
                  <p className="text-sm text-[#B9BBBE]">
                    Firebase Firestore for instant updates across devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 5. RESULTS & BLOG --- */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
              {/* Blog Preview */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <img
                  src={`${BASE_PATH}/mintkola-blog-page.webp`}
                  alt="Mintkola Blog"
                  className="relative rounded-xl border border-white/10 w-full rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </div>

              {/* Impact Text */}
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-[#E0D0C1] mb-6">
                  Content Marketing Engine
                </h2>
                <p className="text-[#B9BBBE] mb-8 leading-relaxed">
                  We didn't just build the product; we built the growth engine.
                  Using the same n8n backend, we automated the generation of
                  SEO-optimized blog posts that drive traffic to the app.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-400" />
                    <span className="text-[#E0D0C1]">
                      Automated CMS publishing
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-400" />
                    <span className="text-[#E0D0C1]">
                      Consistent brand voice via Style-Match
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-400" />
                    <span className="text-[#E0D0C1]">
                      Integrated newsletter capture
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- 6. CTA SECTION --- */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Animated borders - Teal Primary */}
                <motion.div
                  className="absolute inset-0 border-2 border-teal-500/30 rounded-2xl"
                  animate={borderAnimation}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-teal-500/20 rounded-2xl"
                  animate={borderAnimation2}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-teal-500/15 rounded-2xl"
                  animate={borderAnimation3}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />

                <div
                  className="relative rounded-2xl bg-muted/50 p-10 md:p-16 text-center"
                  style={{ transform: "rotate(0.3deg)" }}
                >
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#E0D0C1]">
                    Building an AI Product?
                  </h3>

                  <p className="text-xl md:text-2xl text-[#B9BBBE] mb-10 max-w-3xl mx-auto leading-relaxed">
                    We specialize in complex AI workflows, n8n automation, and
                    psychology-driven UX.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => navigate("/contact")}
                      className="btn-hero inline-flex items-center justify-center min-w-[240px] text-lg bg-teal-600 hover:bg-teal-500 border-none text-white"
                    >
                      Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                    <button
                      onClick={() => navigate("/case-studies")}
                      className="px-8 py-4 text-lg text-[#B9BBBE] hover:text-[#E0D0C1] transition-colors"
                    >
                      View Other Case Studies
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MintkolaCaseStudy;
