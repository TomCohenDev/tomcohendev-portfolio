import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Zap,
  FileText,
  Send,
  Cpu,
  RefreshCw,
  CheckCircle,
  MessageSquare,
  Code,
  Globe,
  Database,
} from "lucide-react";

// --- Custom Component: Telegram Simulator ---
const TelegramChat = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-[#0E1621] rounded-2xl overflow-hidden shadow-2xl border border-white/5 font-sans">
      {/* Telegram Header */}
      <div className="bg-[#17212B] p-4 flex items-center gap-3 border-b border-black/20">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a855f7] to-[#8b5cf6] flex items-center justify-center text-white font-bold">
          AI
        </div>
        <div>
          <div className="text-white font-semibold text-sm">Editorial Bot</div>
          <div className="text-[#6c7883] text-xs">bot</div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="h-[320px] p-4 flex flex-col gap-4 bg-[#0E1621] relative overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        {/* User Message */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="self-end bg-[#2B5278] text-white p-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-sm"
        >
          Write a blog post about "The Future of No-Code Tools". Focus on AI
          integration.
        </motion.div>

        {/* Processing Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, display: "none" }}
          transition={{ delay: 1, duration: 2.5 }}
          className="self-start text-[#6c7883] text-xs ml-2"
        >
          typing...
        </motion.div>

        {/* AI Response */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3.5 }}
          className="self-start bg-[#182533] text-white p-3 rounded-2xl rounded-tl-sm max-w-[90%] text-sm shadow-sm border border-black/20"
        >
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
            <CheckCircle size={12} className="text-green-400" />
            <span className="text-xs text-green-400 font-medium">
              Draft Generated & Synced
            </span>
          </div>
          <p className="font-bold text-[#E0D0C1] mb-1">
            Title: The AI Revolution in No-Code
          </p>
          <p className="text-[#B9BBBE] text-xs leading-relaxed mb-2">
            "No-code tools are evolving. With the integration of LLMs, we aren't
            just dragging and dropping anymore..."
          </p>
          <div className="flex gap-2 mt-2">
            <span className="bg-white/5 text-[10px] px-2 py-1 rounded text-[#a855f7]">
              #NoCode
            </span>
            <span className="bg-white/5 text-[10px] px-2 py-1 rounded text-[#a855f7]">
              #AI
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Custom Component: Tech Node ---
const TechNode = ({
  icon: Icon,
  title,
  desc,
  delay,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  title: string;
  desc: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="flex flex-col items-center text-center p-6 bg-[#1D201F] border border-white/5 rounded-xl relative group hover:border-[#a855f7]/30 transition-colors"
  >
    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#a855f7] mb-4 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="text-[#E0D0C1] font-bold mb-2">{title}</h3>
    <p className="text-[#B9BBBE] text-sm">{desc}</p>

    {/* Connector Line (Desktop Only) */}
    <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-[1px] bg-gradient-to-r from-white/10 to-transparent z-0 last:hidden"></div>
  </motion.div>
);

const BlogAutomation = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Border animations for CTA
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
        scale: 1 + Math.sin(Date.now() / 2000) * 0.02,
        x: 2 + Math.cos(Date.now() / 2000) * 1,
        y: -2 + Math.sin(Date.now() / 2000) * 1,
        rotate: -0.5 + Math.sin(Date.now() / 3000) * 0.3,
      });
      setBorderAnimation2({
        scale: 1 + Math.cos(Date.now() / 2500) * 0.02,
        x: -2 + Math.sin(Date.now() / 2000) * 1,
        y: 2 + Math.cos(Date.now() / 2000) * 1,
        rotate: 0.5 + Math.cos(Date.now() / 3000) * 0.3,
      });
      setBorderAnimation3({
        scale: 1 + Math.sin(Date.now() / 3000) * 0.02,
        x: 1 + Math.cos(Date.now() / 2500) * 0.5,
        y: 1 + Math.sin(Date.now() / 2500) * 0.5,
        rotate: -0.3 + Math.sin(Date.now() / 3500) * 0.2,
      });
    };

    const interval = setInterval(updateAnimation, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#1D201F] text-[#E0D0C1]"
      ref={containerRef}
    >
      <Header />

      <main>
        {/* 1. HERO: Split Screen "Chat vs Code" */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          {/* Abstract Background */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#a855f7]/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#a855f7]/3 rounded-full blur-[100px]"></div>
          </div>

          <div className="container-padding relative z-10">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Copy */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-[#a855f7]/10 border border-[#a855f7]/20 rounded-full text-[#a855f7] text-xs font-medium tracking-wide mb-6"
                >
                  <Bot size={14} /> Internal Tool
                </motion.div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#E0D0C1] leading-[1.1] mb-6">
                  The Zero-UI <br />
                  <span className="text-[#a855f7]">Content Engine</span>
                </h1>

                <p className="text-xl text-[#B9BBBE] leading-relaxed mb-8 max-w-lg">
                  We built a system that turns raw Telegram messages into fully
                  formatted, SEO-optimized blog posts with generated art—in
                  under 60 seconds.
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-white bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                    <Zap size={16} className="text-[#a855f7]" /> 90% Time Saved
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                    <RefreshCw size={16} className="text-[#a855f7]" />{" "}
                    Self-Healing JSON
                  </div>
                </div>
              </div>

              {/* Right: The Product (Telegram Sim) */}
              <div className="relative">
                <motion.div style={{ y }} className="relative z-10">
                  <TelegramChat />

                  {/* Floating Elements */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="absolute -right-4 top-10 bg-[#1D201F] p-4 rounded-xl border border-[#a855f7]/30 shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                        <Code size={16} />
                      </div>
                      <div className="text-xs">
                        <div className="text-white font-bold">
                          Frontmatter Generated
                        </div>
                        <div className="text-[#B9BBBE]">valid_json: true</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. THE PIPELINE: Horizontal Flow (New Structure) */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#E0D0C1] mb-4">
                  How It Works
                </h2>
                <p className="text-[#B9BBBE]">
                  A completely headless workflow powered by n8n.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                <TechNode
                  icon={Send}
                  title="1. Trigger"
                  desc="Founder sends a raw topic idea via Telegram chat on the go."
                  delay={0.1}
                />
                <TechNode
                  icon={Cpu}
                  title="2. Agentic Reasoning"
                  desc="LangChain agent researches the topic and determines the best angle."
                  delay={0.2}
                />
                <TechNode
                  icon={RefreshCw}
                  title="3. Self-Healing"
                  desc="Auto-fixing parser ensures the JSON output is perfect every time."
                  delay={0.3}
                />
                <TechNode
                  icon={Globe}
                  title="4. Publish"
                  desc="Formats to Markdown, generates assets, and pushes to CMS."
                  delay={0.4}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. THE "WHY" - Comparison Stats */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="max-w-6xl mx-auto bg-[#1D201F] rounded-2xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>

              <div className="grid md:grid-cols-2 gap-12 relative z-10">
                <div className="space-y-8">
                  <h3 className="text-3xl font-bold text-white">
                    Why we built this
                  </h3>
                  <p className="text-[#B9BBBE] leading-relaxed">
                    We were spending 5+ hours a week just formatting blog posts,
                    finding stock images, and fighting with CMS editors. We
                    needed a way to dump our brain contents and get a polished
                    result instantly.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <span className="text-[#B9BBBE]">Old Process</span>
                      <span className="text-red-400 font-mono">
                        ~4 Hours / Post
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#a855f7]/10 rounded-lg border border-[#a855f7]/20">
                      <span className="text-white font-bold">New Process</span>
                      <span className="text-[#a855f7] font-mono">
                        ~2 Minutes / Post
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1D201F] rounded-xl p-6 border border-white/5 font-mono text-sm overflow-hidden">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="space-y-2 text-[#B9BBBE]">
                    <p>
                      <span className="text-[#a855f7]">const</span> agent ={" "}
                      <span className="text-blue-400">new</span> Agent();
                    </p>
                    <p>
                      <span className="text-[#a855f7]">await</span> agent.think(
                      <span className="text-green-400">"Topic: AI Agents"</span>
                      );
                    </p>
                    <p className="text-[#6c7883]">
                      // Auto-correcting JSON structure...
                    </p>
                    <p>
                      <span className="text-[#a855f7]">const</span> post ={" "}
                      <span className="text-blue-400">await</span>{" "}
                      parser.fix(output);
                    </p>
                    <p>
                      <span className="text-[#a855f7]">return</span>{" "}
                      post.publish();
                    </p>
                    <p className="text-green-400 mt-4">
                      {">>"} Success: Post deployed to production.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. DETAILS - Grid */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-[#a855f7]/10 rounded-lg flex items-center justify-center text-[#a855f7]">
                    <Database size={20} />
                  </div>
                  <h4 className="text-xl font-bold text-[#E0D0C1]">
                    Structured Data
                  </h4>
                  <p className="text-[#B9BBBE] text-sm leading-relaxed">
                    We use LangChain's Structured Output Parsers to force the
                    LLM to return strictly valid JSON. No more broken markdown
                    or missing fields.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-[#a855f7]/10 rounded-lg flex items-center justify-center text-[#a855f7]">
                    <Bot size={20} />
                  </div>
                  <h4 className="text-xl font-bold text-[#E0D0C1]">
                    Brand Voice Guardrails
                  </h4>
                  <p className="text-[#B9BBBE] text-sm leading-relaxed">
                    The system prompt includes strict "Few-Shot" examples. It
                    knows exactly how to sound like us, avoiding generic AI
                    fluff words.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-[#a855f7]/10 rounded-lg flex items-center justify-center text-[#a855f7]">
                    <MessageSquare size={20} />
                  </div>
                  <h4 className="text-xl font-bold text-[#E0D0C1]">
                    Asset Generation
                  </h4>
                  <p className="text-[#B9BBBE] text-sm leading-relaxed">
                    The agent doesn't just write text. It writes a detailed
                    prompt for an image generator to create on-brand header art
                    for every post.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FOOTER CTA */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <motion.div
                  className="absolute inset-0 border-2 border-[#a855f7]/30 rounded-2xl"
                  animate={borderAnimation}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-[#a855f7]/20 rounded-2xl"
                  animate={borderAnimation2}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-[#a855f7]/15 rounded-2xl"
                  animate={borderAnimation3}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />

                <div
                  className="relative rounded-2xl bg-muted/50 p-10 md:p-16 text-center"
                  style={{ transform: "rotate(0.3deg)" }}
                >
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#E0D0C1]">
                    Stop writing. Start editing.
                  </h3>

                  <p className="text-xl md:text-2xl text-[#B9BBBE] mb-10 max-w-3xl mx-auto leading-relaxed">
                    We can deploy this exact autonomous agent for your company
                    in less than a week.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => navigate("/contact")}
                      className="btn-hero inline-flex items-center justify-center min-w-[240px] text-lg"
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

export default BlogAutomation;
