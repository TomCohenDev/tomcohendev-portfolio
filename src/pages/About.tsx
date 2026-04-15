import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CreativeHeroVisual from "../components/CreativeHeroVisual";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  Code2,
  Rocket,
  Users,
  Zap,
  Smartphone,
  Bot,
  Sparkles,
  Globe,
  Terminal,
  Layers,
  Send,
  CheckCircle,
  MessageSquare,
  Database,
  Cpu,
  Workflow,
} from "lucide-react";

// --- 3D TILT CARD COMPONENT ---
const TiltCard = ({
  children,
  className = "",
  glowColor = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  return (
    <motion.div
      className={`relative overflow-hidden bg-[#161918] border border-white/5 rounded-3xl p-8 transition-colors hover:border-white/10 group ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX: useTransform(mouseY, [-300, 300], [5, -5]),
        rotateY: useTransform(mouseX, [-300, 300], [-5, 5]),
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative z-10 h-full flex flex-col">{children}</div>

      {/* Dynamic Gradient Spotlight on Hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(191, 149, 249, 0.06), transparent 40%)`,
        }}
      />
    </motion.div>
  );
};

// --- SCROLL-TRIGGERED SECTION WRAPPER ---
const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

// --- CSS-ONLY MINI PHONE MOCKUP ---
const MiniPhoneMockup = ({ accentColor = "#bf95f9" }: { accentColor?: string }) => (
  <div className="relative w-20 h-36 bg-black rounded-xl border-2 border-white/10 overflow-hidden shadow-lg">
    {/* Notch */}
    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-black rounded-full z-10" />
    {/* Screen Content */}
    <div className="w-full h-full bg-[#0a0a0a] p-2 pt-4">
      <div className="space-y-1.5">
        <div className="h-1.5 w-10 rounded-full" style={{ backgroundColor: accentColor }} />
        <div className="h-1 w-14 bg-white/20 rounded-full" />
        <div className="h-1 w-8 bg-white/10 rounded-full" />
        <div className="mt-3 h-8 w-full bg-white/5 rounded border border-white/10" />
        <div className="h-6 w-full bg-white/5 rounded border border-white/10" />
      </div>
    </div>
  </div>
);

// --- CSS-ONLY MINI BROWSER MOCKUP ---
const MiniBrowserMockup = ({ accentColor = "#bf95f9" }: { accentColor?: string }) => (
  <div className="w-36 bg-[#0a0a0a] rounded-lg border border-white/10 overflow-hidden shadow-lg">
    {/* Browser Bar */}
    <div className="bg-[#1a1a1a] px-2 py-1.5 flex items-center gap-1 border-b border-white/5">
      <div className="flex gap-0.5">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
      </div>
      <div className="flex-1 h-2 bg-black/30 rounded mx-1" />
    </div>
    {/* Content */}
    <div className="p-2 space-y-1.5">
      <div className="h-1.5 w-12 rounded-full" style={{ backgroundColor: accentColor }} />
      <div className="h-1 w-20 bg-white/20 rounded-full" />
      <div className="h-6 w-full bg-white/5 rounded border border-white/10 mt-2" />
      <div className="grid grid-cols-2 gap-1">
        <div className="h-4 bg-white/5 rounded" />
        <div className="h-4 bg-white/5 rounded" />
      </div>
    </div>
  </div>
);

// --- CSS-ONLY CODE SNIPPET MOCKUP ---
const MiniCodeMockup = ({ accentColor = "#bf95f9" }: { accentColor?: string }) => (
  <div className="w-40 bg-[#0a0a0a] rounded-lg border border-white/10 overflow-hidden shadow-lg font-mono text-[8px]">
    {/* Header */}
    <div className="bg-[#1a1a1a] px-2 py-1 flex items-center gap-1 border-b border-white/5">
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
      <span className="text-white/40">app.tsx</span>
    </div>
    {/* Code Lines */}
    <div className="p-2 space-y-1">
      <div className="flex gap-1">
        <span className="text-purple-400">const</span>
        <span className="text-blue-300">app</span>
        <span className="text-white/50">=</span>
      </div>
      <div className="pl-2 flex gap-1">
        <span className="text-yellow-400">{"{"}</span>
        <span className="text-green-400">data</span>
        <span className="text-yellow-400">{"}"}</span>
      </div>
      <div className="h-1 w-16 bg-white/10 rounded-full" />
      <div className="h-1 w-12 bg-white/10 rounded-full" />
    </div>
  </div>
);

// --- CSS-ONLY AUTOMATION FLOW MOCKUP ---
const MiniAutomationMockup = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
      <MessageSquare size={12} className="text-blue-400" />
    </div>
    <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500/50 to-green-500/50 rounded-full" />
    <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
      <Cpu size={12} className="text-purple-400" />
    </div>
    <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-500/50 to-green-500/50 rounded-full" />
    <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
      <Database size={12} className="text-green-400" />
    </div>
  </div>
);

const About = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax values for hero elements
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#1D201F] text-[#E0D0C1] font-sans selection:bg-primary/20"
    >
      <Header />

      <main className="overflow-hidden">
        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 min-h-[90vh] flex items-center">
          <div className="container-padding relative z-10 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Text Content */}
            <motion.div
                style={{ y: heroY }}
              >
   

                <h1 className="excalifont-title text-5xl md:text-6xl lg:text-7xl mb-8 leading-[1.1] tracking-tight text-white">
                  Built right. Shipped fast.
                  <br />
                <span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#bf95f9] to-primary animate-gradient"
                  style={{ backgroundSize: "300% 300%" }}
                >
                    From idea to reality.
                </span>
              </h1>

                <p className="text-xl md:text-2xl text-[#B9BBBE] leading-relaxed max-w-xl mb-10">
                  End2End is where startup velocity meets enterprise quality.
                  We're the technical co-founder you wish you had.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => navigate("/contact")}
                    className="btn-hero inline-flex items-center"
                  >
                    Start Building <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                  <button
                    onClick={() => navigate("/case-studies")}
                    className="px-8 py-4 text-lg font-medium text-[#B9BBBE] hover:text-white border border-white/10 hover:border-white/30 rounded-xl transition-all"
                  >
                    See Our Work
                  </button>
                </div>
              </motion.div>

              {/* Right: Visual Composition */}
              <div className="relative">
                <CreativeHeroVisual />
              </div>
            </div>
          </div>
        </section>

        {/* --- THE BENTO GRID (What Defines Us) --- */}
        <section className="section-padding relative">
          {/* Section Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />

          <div className="container-padding max-w-7xl mx-auto relative z-10">
            <AnimatedSection className="text-center mb-16">
              <h2 className="excalifont-title text-3xl md:text-5xl mb-4">Our DNA</h2>
              <p className="text-[#B9BBBE] max-w-2xl mx-auto text-lg">
                We're not an agency. We're a product studio with the speed of a
                startup and the precision of a seasoned engineering team.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[minmax(280px,auto)]">
              {/* Card 1: Founder Mindset - Large */}
              <AnimatedSection className="md:col-span-4" delay={0.1}>
                <TiltCard className="h-full bg-gradient-to-br from-[#161918] to-[#1D201F]">
                  <div className="flex flex-col lg:flex-row gap-8 h-full">
                    <div className="flex-1">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                      <Users size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Founder-to-Founder Mindset
                    </h3>
                      <p className="text-[#B9BBBE] text-lg leading-relaxed mb-6">
                        We've been in your shoes. Code is useless if it doesn't
                        solve a business problem. We prioritize features that move
                        the needle and push back on scope creep.
                      </p>
                      <div className="flex gap-3">
                        {["Strategy", "Design", "Engineering"].map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 bg-white/5 rounded-lg text-sm border border-white/5 text-[#B9BBBE]"
                          >
                            {tag}
                          </span>
                        ))}
                  </div>
                    </div>
                    {/* Visual Element */}
                    <div className="hidden lg:flex items-center justify-center">
                      <div className="relative">
                        <MiniAutomationMockup />
                    </div>
                  </div>
                </div>
              </TiltCard>
              </AnimatedSection>

              {/* Card 2: Speed */}
              <AnimatedSection className="md:col-span-2" delay={0.2}>
                <TiltCard className="h-full bg-[#161918] relative overflow-hidden">
                  <div className="absolute top-4 right-4 opacity-10">
                    <Zap size={80} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2">Velocity</h3>
                    <p className="text-[#B9BBBE] mb-6">
                      Weeks, not months. Battle-tested stack. Ship fast.
                    </p>
                  </div>
                  <div className="mt-auto">
                    <div className="flex justify-between text-xs text-[#B9BBBE] mb-2">
                      <span>Idea</span>
                      <span>Launch</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-primary to-purple-400 h-full rounded-full"
                      />
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs text-green-400">Avg. 6-8 weeks to MVP</span>
                  </div>
                </div>
              </TiltCard>
              </AnimatedSection>

              {/* Card 3: Full-Stack Apps */}
              <AnimatedSection className="md:col-span-3" delay={0.3}>
                <TiltCard className="h-full bg-gradient-to-br from-[#161918] to-blue-900/10 border-blue-500/10">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                      <Layers size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                      Full-Stack Mastery
                  </h3>
                  <p className="text-[#B9BBBE] mb-6">
                      React, Flutter, Python, Node. From pixel-perfect UIs to
                      scalable backends. One team, zero handoffs.
                    </p>
                    {/* Visual: Stacked Tech Logos */}
                    <div className="mt-auto flex items-end justify-between">
                      <div className="flex -space-x-2">
                        {["⚛️", "🎯", "🐍", "⚡"].map((emoji, i) => (
                          <div
                            key={i}
                            className="w-10 h-10 rounded-full bg-[#1D201F] border border-white/10 flex items-center justify-center text-lg"
                          >
                            {emoji}
                          </div>
                        ))}
                </div>
                      <MiniCodeMockup accentColor="#38bdf8" />
                  </div>
                </div>
              </TiltCard>
              </AnimatedSection>

              {/* Card 4: AI & Automation */}
              <AnimatedSection className="md:col-span-3" delay={0.4}>
                <TiltCard className="h-full bg-gradient-to-br from-[#161918] to-purple-900/10 border-purple-500/10">
                  <div className="flex flex-col h-full">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-6">
                    <Bot size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    AI & Automation
                  </h3>
                  <p className="text-[#B9BBBE] mb-6">
                      We don't just wrap ChatGPT. We build autonomous agents that
                      handle complex workflows, replacing manual labor at scale.
                    </p>
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {["LLMs", "n8n", "RAG", "Vision"].map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded"
                          >
                            {tag}
                    </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </AnimatedSection>

              {/* Card 5: Personal Sites - Full Width */}
              <AnimatedSection className="md:col-span-6" delay={0.5}>
                <TiltCard className="h-full bg-gradient-to-r from-[#161918] via-[#1D201F] to-[#161918] border-primary/10">
                  <div className="flex flex-col lg:flex-row gap-8 items-center">
                    <div className="flex-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                        <Globe size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        High-Impact Personal Sites
                      </h3>
                      <p className="text-[#B9BBBE] text-lg mb-6 max-w-xl">
                        Your digital identity matters. We build stunning portfolios
                        for founders, creatives, and consultants. 3D elements, smooth
                        animations, perfect SEO.
                      </p>
                      <button
                        onClick={() => navigate("/contact")}
                        className="inline-flex items-center text-primary font-bold hover:underline"
                      >
                        Build My Portfolio <ArrowRight size={16} className="ml-2" />
                      </button>
                    </div>
                    {/* Visual: Phone + Browser side by side */}
                    <div className="hidden lg:flex items-center gap-4">
                      <MiniPhoneMockup accentColor="#bf95f9" />
                      <MiniBrowserMockup accentColor="#bf95f9" />
                  </div>
                </div>
              </TiltCard>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* --- PROCESS SECTION (Visual Journey) --- */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1D201F] via-[#161918] to-[#1D201F]" />

          <div className="container-padding max-w-6xl mx-auto relative z-10">
            <AnimatedSection className="text-center mb-20">
              <h2 className="excalifont-title text-3xl md:text-5xl mb-4">
                From Idea to Empire
              </h2>
              <p className="text-[#B9BBBE] text-lg">
                A transparent, iterative process designed for speed.
              </p>
            </AnimatedSection>

            {/* Horizontal Process Flow */}
            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-purple-500 to-blue-500 -translate-y-1/2 opacity-30" />

              <div className="grid lg:grid-cols-3 gap-8">
              {/* Step 1 */}
                <AnimatedSection delay={0.1}>
                  <div className="relative bg-[#161918] border border-white/5 rounded-2xl p-8 hover:border-primary/30 transition-colors group">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-8 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-black">
                      1
                    </div>
                    <div className="pt-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                        <Sparkles size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">
                    Discovery & Strategy
                  </h3>
                      <p className="text-[#B9BBBE] leading-relaxed">
                        We dig deep into your vision. Define MVP scope, choose the
                        right stack, create a roadmap that prioritizes
                        revenue-generating features.
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-xs text-primary">
                        <Terminal size={14} />
                        <span>1-2 weeks</span>
                  </div>
                </div>
              </div>
                </AnimatedSection>

              {/* Step 2 */}
                <AnimatedSection delay={0.3}>
                  <div className="relative bg-[#161918] border border-white/5 rounded-2xl p-8 hover:border-purple-500/30 transition-colors group">
                    <div className="absolute -top-4 left-8 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold text-black">
                      2
                    </div>
                    <div className="pt-4">
                      <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                        <Code2 size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">
                    Design & Build
                  </h3>
                      <p className="text-[#B9BBBE] leading-relaxed">
                        High-fidelity prototypes and code in parallel. Weekly
                        sprints, constant communication, focus on shipping working
                        software early.
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-xs text-purple-400">
                        <Workflow size={14} />
                        <span>4-6 weeks</span>
                  </div>
                </div>
              </div>
                </AnimatedSection>

              {/* Step 3 */}
                <AnimatedSection delay={0.5}>
                  <div className="relative bg-[#161918] border border-white/5 rounded-2xl p-8 hover:border-blue-500/30 transition-colors group">
                    <div className="absolute -top-4 left-8 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold text-black">
                      3
                    </div>
                    <div className="pt-4">
                      <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                        <Rocket size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">
                    Launch & Scale
                  </h3>
                      <p className="text-[#B9BBBE] leading-relaxed">
                        Deployment, app store submission, analytics setup. But we
                        don't disappear—we help you iterate based on real user
                        feedback.
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-xs text-blue-400">
                        <Send size={14} />
                        <span>Ongoing</span>
                      </div>
                </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>

        {/* --- MEET THE BUILDER (Founder Section) --- */}
        <section className="section-padding relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

          <div className="container-padding max-w-5xl mx-auto relative z-10">
            <AnimatedSection>
              <div className="bg-gradient-to-br from-[#161918] to-[#1D201F] border border-white/5 rounded-3xl p-8 md:p-12 overflow-hidden relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                      backgroundSize: "32px 32px",
                    }}
                  />
                </div>

                <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-center">
                  {/* Avatar / Visual */}
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-purple-500 p-1">
                      <img
                        src="/tom_face.webp"
                        alt="Tom Cohen"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
         
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Tom Cohen
                    </h3>
                    <p className="text-primary font-medium mb-4">
                      Founder & Lead Builder
                    </p>
                    <p className="text-[#B9BBBE] text-lg leading-relaxed mb-6">
                    From scrappy
                      MVPs to enterprise-scale platforms. End2End exists because I
                      know what it's like to need a technical partner who actually
                      gets it. No agency fluff, no inflated timelines. Just
                      shipping products that move the needle.
                    </p>
                  </div>
                </div>
            </div>
            </AnimatedSection>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-32 px-4 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

          <AnimatedSection>
          <div className="max-w-4xl mx-auto bg-gradient-to-b from-[#1D201F] to-[#161918] border border-white/10 rounded-[2.5rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="excalifont-title text-4xl md:text-5xl text-white mb-6">
                Have an idea? Let's build it.
              </h2>
              <p className="text-xl text-[#B9BBBE] mb-10 max-w-2xl mx-auto">
                Whether it's a SaaS platform, a mobile app, or a personal brand
                site, we have the team to make it real.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => navigate("/contact")}
                  className="btn-hero inline-flex items-center justify-center min-w-[200px] text-lg py-4"
                >
                  Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate("/services")}
                  className="px-8 py-4 text-lg font-medium text-[#B9BBBE] hover:text-white border border-white/10 hover:border-white/30 rounded-xl transition-all"
                >
                  View Services
                </button>
              </div>
            </div>
          </div>
          </AnimatedSection>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;