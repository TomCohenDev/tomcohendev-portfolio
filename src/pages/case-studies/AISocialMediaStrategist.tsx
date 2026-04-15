import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Zap,
  Clock,
  MessageSquare,
  Database,
  Filter,
  Send,
  TrendingUp,
  Sparkles,
  Bot,
  Layers,
} from "lucide-react";

// --- CUSTOM COMPONENTS FOR THIS CASE STUDY ---

// 1. Workflow Node (Visualizing n8n)
const WorkflowNode = ({
  icon: Icon,
  label,
  sublabel,
  color,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  sublabel: string;
  color: string;
  delay?: number;
}) => (
  <div className="relative group w-full">
    {/* Connector Line (Hidden on mobile/last item) */}
    <div className="absolute top-1/2 -right-4 w-8 h-[2px] bg-white/10 hidden md:block group-last:hidden" />

    <div
      className="bg-[#1D201F] border border-white/10 rounded-xl p-6 relative z-10 hover:border-white/30 transition-all duration-300 hover:shadow-2xl h-full"
      style={
        {
          borderColor: "rgba(255, 255, 255, 0.1)",
          "--hover-color": color,
        } as React.CSSProperties
      }
    >
      <div
        className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
        style={{ color: color }}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-[#E0D0C1] font-bold mb-2">{label}</h4>
      <p className="text-sm text-[#B9BBBE]">{sublabel}</p>
    </div>
  </div>
);

// 2. CSS-Only Telegram Interface Mockup
const TelegramPreview = () => (
  <div className="bg-[#0E1621] rounded-2xl border border-white/5 shadow-2xl max-w-sm mx-auto overflow-hidden">
    {/* Telegram Header */}
    <div className="bg-[#17212B] px-4 py-3 flex items-center gap-3 border-b border-black/20">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white font-bold text-sm">
        <Bot size={20} />
      </div>
      <div>
        <div className="text-white font-semibold text-sm">AI Content Bot</div>
        <div className="text-[11px] text-[#6c7883]">bot</div>
      </div>
    </div>

    {/* Messages Area */}
    <div className="p-4 space-y-4 bg-[#0E1621] min-h-[300px] relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://web.telegram.org/img/bg_0.png')] bg-repeat"></div>

      {/* Date */}
      <div className="flex justify-center relative z-10">
        <span className="bg-[#182533]/80 text-[#8E9297] text-xs px-3 py-1 rounded-full backdrop-blur-sm">
          Today
        </span>
      </div>

      {/* Bot Message */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 relative z-10"
      >
        <div className="bg-[#182533] rounded-2xl rounded-tl-none p-3 max-w-[85%] border border-black/20 shadow-sm">
          <p className="text-[#6366f1] font-semibold text-xs mb-1">AI Agent</p>
          <p className="text-[13px] text-white font-medium mb-2">
            🚀 Draft Ready: Twitter
          </p>
          <p className="text-[13px] text-[#E0D0C1] leading-relaxed mb-2 opacity-90">
            Just discovered an AI tool that turns your voice memos into polished
            blog posts. The future of content creation is voice-first. Here's
            why this matters...
          </p>
          <div className="flex justify-between items-end mt-1">
            <span className="text-[10px] text-[#8E9297] bg-black/20 px-1.5 py-0.5 rounded">
              #ProductHunt
            </span>
            <span className="text-[10px] text-[#5e666e]">10:42 AM</span>
          </div>
        </div>
      </motion.div>

      {/* User Reply */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="flex justify-end relative z-10"
      >
        <div className="bg-[#2B5278] rounded-2xl rounded-tr-none px-4 py-2 shadow-sm max-w-[70%]">
          <p className="text-[14px] text-white">Post to X and LinkedIn</p>
          <div className="text-[10px] text-[#6ea4d8] text-right mt-0.5">
            10:45 AM
          </div>
        </div>
      </motion.div>

      {/* Bot Confirmation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
        className="flex gap-2 relative z-10"
      >
        <div className="bg-[#182533] rounded-2xl rounded-tl-none p-3 border border-black/20">
          <p className="text-[13px] text-white">✅ Posted to X and LinkedIn!</p>
        </div>
      </motion.div>
    </div>
  </div>
);

const AISocialMediaStrategist = () => {
  const navigate = useNavigate();

  // Decorative border animations (Kept from Gomlin for brand consistency, but repositioned)
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
    const interval = setInterval(updateAnimation, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#1D201F] text-[#E0D0C1]">
      <Header />
      <main>
        {/* --- SECTION 1: HERO (Ethereal & Abstract) --- */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
          {/* Background FX */}
          <div className="absolute inset-0"></div>

          <div className="container-padding relative z-10 w-full">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Copy */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-sm border border-[#6366f1]/20 rounded-full text-sm font-medium text-[#6366f1]"
                >
                  <Bot size={14} className="inline mr-2" /> Internal Tool
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#E0D0C1] leading-[1.1]"
                >
                  From 10 Hours to <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#c4b5fd]">
                    30 Minutes
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl text-[#B9BBBE] leading-relaxed max-w-xl"
                >
                  We built an autonomous AI agent that reads the internet and
                  writes authentically in your voice.
                </motion.p>

                {/* KPI Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-3 gap-4 pt-4"
                >
                  {[
                    { label: "Time Saved", value: "95%" },
                    { label: "Weekly Posts", value: "15+" },
                    { label: "Cost", value: "$5/mo" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/5 rounded-lg p-4 backdrop-blur-sm"
                    >
                      <div className="text-2xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-[#B9BBBE] uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right: The Product (Telegram UI) */}
              <div className="relative lg:h-[600px] flex items-center justify-center">
                {/* Glow behind phone */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6366f1]/10 to-transparent blur-2xl" />

                <div className="transform scale-110 md:scale-125">
                  <TelegramPreview />
                </div>

                {/* Floating Elements - Social Media Destinations */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-7 -left-10 bg-[#1D201F] border border-white/10 p-4 rounded-xl shadow-2xl hidden md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold">
                      X
                    </div>
                    <div>
                      <div className="text-xs text-[#B9BBBE]">Destination</div>
                      <div className="text-sm font-bold text-white">
                        Twitter / X
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -bottom-10 -right-10 bg-[#1D201F] border border-white/10 p-4 rounded-xl shadow-2xl hidden md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center text-white font-bold">
                      in
                    </div>
                    <div>
                      <div className="text-xs text-[#B9BBBE]">Destination</div>
                      <div className="text-sm font-bold text-white">
                        LinkedIn
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute top-1/2 -right-16 bg-[#1D201F] border border-white/10 p-4 rounded-xl shadow-2xl hidden md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">
                      IG
                    </div>
                    <div>
                      <div className="text-xs text-[#B9BBBE]">Destination</div>
                      <div className="text-sm font-bold text-white">
                        Instagram
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5,
                  }}
                  className="absolute bottom-1/4 -left-16 bg-[#1D201F] border border-white/10 p-4 rounded-xl shadow-2xl hidden md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold">
                      D
                    </div>
                    <div>
                      <div className="text-xs text-[#B9BBBE]">Destination</div>
                      <div className="text-sm font-bold text-white">
                        Discord
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: THE PIPELINE (Visualizing the Invisible) --- */}
        <section className="section-padding bg-[#161918] relative border-y border-white/5">
          <div className="container-padding">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-[#E0D0C1] mb-6">
                  The Autonomous Workflow
                </h2>
                <p className="text-xl text-[#B9BBBE] max-w-2xl mx-auto">
                  No dashboard. No login. Just a background process that turns
                  noise into signal.
                </p>
              </div>

              {/* The Pipeline Animation */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                <WorkflowNode
                  icon={Database}
                  label="Ingest"
                  sublabel="Scrape HN, GitHub, Product Hunt via GraphQL & RSS"
                  color="#6366f1"
                  delay={0}
                />
                <WorkflowNode
                  icon={Filter}
                  label="Filter"
                  sublabel="JS Node scores relevance (SaaS +2, Politics -5)"
                  color="#8b5cf6"
                  delay={0.2}
                />
                <WorkflowNode
                  icon={Brain}
                  label="Generate"
                  sublabel="Claude 3.5 creates drafts using 'Voice Matching'"
                  color="#a78bfa"
                  delay={0.4}
                />
                <WorkflowNode
                  icon={Send}
                  label="Publish"
                  sublabel="Human approves via Telegram chat command"
                  color="#c4b5fd"
                  delay={0.6}
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: TECHNICAL DEEP DIVE (Sticky Layout) --- */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
                {/* LEFT: The Narrative (Scrolls) */}
                <div className="lg:col-span-7 space-y-20">
                  {/* Part 1: Problem */}
                  <div>
                    <div className="text-[#8b5cf6] font-mono text-sm mb-4">
                      01_THE_PROBLEM
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-6">
                      Content Burnout is Real.
                    </h3>
                    <p className="text-lg text-[#B9BBBE] leading-relaxed mb-6">
                      Building a personal brand requires consistency. But manual
                      curation is exhausting. You are spending{" "}
                      <strong className="text-white">10 hours a week</strong>{" "}
                      sourcing news, filtering noise, and struggling to write
                      posts that didn't sound like "corporate AI."
                    </p>
                    <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-xl">
                      <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                        <Clock size={18} /> The Cost
                      </h4>
                      <p className="text-[#B9BBBE] text-sm">
                        Inconsistent posting led to algorithm penalties. The
                        mental load of "what do I tweet today?" was killing
                        productivity.
                      </p>
                    </div>
                  </div>

                  {/* Part 2: Solution */}
                  <div>
                    <div className="text-[#8b5cf6] font-mono text-sm mb-4">
                      02_THE_ENGINE
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-6">
                      Prompt Engineering {">"} Prompting.
                    </h3>
                    <p className="text-lg text-[#B9BBBE] leading-relaxed mb-6">
                      Most people use ChatGPT to "write a tweet." We built a
                      system that <strong>learns</strong>.
                    </p>
                    <p className="text-lg text-[#B9BBBE] leading-relaxed mb-8">
                      We connected a Google Sheet containing my last 50
                      successful posts. Before generating new content, the AI
                      analyzes this dataset to mimic sentence length,
                      vocabulary, and formatting (e.g., "no hashtags").
                    </p>

                    {/* Code Snippet Visual */}
                    <div className="bg-[#121212] rounded-xl border border-white/10 p-6 font-mono text-sm overflow-x-auto">
                      <div className="flex gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                      </div>
                      <div className="text-gray-500">
                        // The "Voice Match" System Prompt
                      </div>
                      <div className="text-[#c4b5fd]">const</div>{" "}
                      <div className="text-[#E0D0C1] inline">generatePost</div>{" "}
                      = <div className="text-[#c4b5fd] inline">async</div>{" "}
                      (newsItem, previousPosts) ={">"} {"{"}
                      <div className="pl-4 text-[#B9BBBE]">
                        <div className="text-[#6366f1]">await</div>{" "}
                        claude.messages.create({"{"}
                        <div className="pl-4">
                          system:{" "}
                          <span className="text-green-400">
                            `Analyze these 50 posts: ${"{"}previousPosts{"}"}.
                            Copy the tone. Be cynical yet optimistic. No
                            hashtags.`
                          </span>
                          ,
                        </div>
                        <div className="pl-4">
                          messages: [{" "}
                          <span className="text-green-400">
                            `Here is the news: ${"{"}newsItem.summary{"}"}`
                          </span>{" "}
                          ]
                        </div>
                        {"}"})
                      </div>
                      {"}"}
                    </div>
                  </div>

                  {/* Part 3: Result */}
                  <div>
                    <div className="text-[#8b5cf6] font-mono text-sm mb-4">
                      03_THE_IMPACT
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-6">
                      Zero Friction Publishing.
                    </h3>
                    <p className="text-lg text-[#B9BBBE] leading-relaxed mb-6">
                      The workflow ends in a Telegram bot. If the post is good,
                      I reply "x". If I want it on LinkedIn, I reply "linkedin".
                      The system handles the API calls, image formatting, and
                      scheduling instantly.
                    </p>
                  </div>
                </div>

                {/* RIGHT: Tech Stack (Sticky) */}
                <div className="lg:col-span-5 relative hidden lg:block">
                  <div className="sticky top-24">
                    <div className="bg-[#1D201F] border border-white/10 rounded-2xl p-8 shadow-2xl">
                      <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                        <Layers className="text-[#6366f1]" /> Stack
                      </h3>

                      <div className="space-y-8">
                        <div>
                          <div className="text-xs font-bold text-[#6366f1] uppercase tracking-widest mb-3">
                            Orchestration
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[#E0D0C1] text-sm">
                              n8n Cloud
                            </span>
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[#E0D0C1] text-sm">
                              Google Sheets
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-bold text-[#8b5cf6] uppercase tracking-widest mb-3">
                            Intelligence
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[#E0D0C1] text-sm">
                              Claude 3.5 Sonnet
                            </span>
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[#E0D0C1] text-sm">
                              GPT-4o (Validation)
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-bold text-[#a78bfa] uppercase tracking-widest mb-3">
                            Interfaces
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[#E0D0C1] text-sm">
                              Telegram Bot API
                            </span>
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[#E0D0C1] text-sm">
                              Twitter API v2
                            </span>
                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[#E0D0C1] text-sm">
                              LinkedIn API
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-8 border-t border-white/10">
                        <p className="text-[#B9BBBE] text-sm italic">
                          "Structured Output Parsers (JSON) are essential for
                          reliable AI agents. Forcing JSON output solved all
                          stability issues."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: TESTIMONIAL & CTA --- */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto">
              {/* Quote */}
              <div className="mb-24 text-center">
                <p className="text-2xl md:text-4xl font-serif italic text-[#E0D0C1] leading-relaxed mb-8">
                  "It feels like having a full-time social media manager in my
                  pocket. I just reply 'X', and it's live."
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src="/tom_face.webp"
                      alt="Tom Cohen"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold">Tom Cohen</div>
                    <div className="text-[#B9BBBE] text-sm">
                      Founder, Tom Cohen
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action Card */}
              <div className="relative">
                {/* Animated borders */}
                <motion.div
                  className="absolute inset-0 border-2 border-[#6366f1]/30 rounded-2xl"
                  animate={borderAnimation}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-[#8b5cf6]/20 rounded-2xl"
                  animate={borderAnimation2}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />

                <div className="relative bg-[#161918]/80 backdrop-blur-xl p-10 md:p-16 rounded-2xl text-center border border-white/5 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#6366f1]/10 rounded-full blur-[80px]" />

                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
                    Want an AI Strategist?
                  </h3>
                  <p className="text-lg text-[#B9BBBE] mb-10 max-w-2xl mx-auto relative z-10">
                    This solution is productized. We can swap the voice analysis
                    module to match your brand.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                    <button
                      onClick={() => navigate("/contact")}
                      className="btn-hero inline-flex items-center justify-center min-w-[200px]"
                    >
                      Build My Agent <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                    <button
                      onClick={() => navigate({ pathname: "/", hash: "case-studies" })}
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

export default AISocialMediaStrategist;
