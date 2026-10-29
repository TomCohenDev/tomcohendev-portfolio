import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Monitor,
  Cpu,
  Workflow,
  Brain,
  Layers,
  Code,
  Eye,
  MousePointer2,
  Maximize,
  Minus,
  X as CloseIcon,
  Database,
  Zap,
  Grid3X3,
  MessageSquare,
} from "lucide-react";

// --- CUSTOM UI COMPONENTS (CSS-ONLY MOCKUPS) ---

// 1. Windows WPF Overlay Mockup
const WindowsOverlayMockup = () => {
  const [activeMarker, setActiveMarker] = useState<number | null>(1);

  // Auto-cycle markers for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMarker((prev) => (prev === 3 ? 1 : (prev || 0) + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-video bg-slate-900 rounded-lg overflow-hidden border border-white/10 shadow-2xl group cursor-default">
      {/* Background: The "User's Screen" (Abstracted Math Problem) */}
      <div className="absolute inset-0 bg-[#0f172a] p-8 flex flex-col items-center justify-center font-serif text-slate-400 select-none">
        <div className="text-2xl md:text-4xl italic opacity-50 mb-8">
          Calculate the integral of f(x) = x² + 2x
        </div>
        <div className="w-full h-1 bg-white/5 rounded my-4"></div>
        <div className="grid grid-cols-2 gap-8 w-2/3 opacity-30">
          <div className="h-4 bg-white/10 rounded"></div>
          <div className="h-4 bg-white/10 rounded"></div>
          <div className="h-4 bg-white/10 rounded"></div>
          <div className="h-4 bg-white/10 rounded"></div>
        </div>
      </div>

      {/* The WPF Overlay Application */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Windows Title Bar */}
        <div className="h-8 bg-[#1e1e1e] flex items-center justify-between px-3 pointer-events-auto">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#06b6d4] rounded-sm flex items-center justify-center">
              <Brain size={10} className="text-black" />
            </div>
            <span className="text-xs text-white font-sans">ITA Overlay - Session #8291</span>
          </div>
          <div className="flex gap-4 text-gray-400">
            <Minus size={12} />
            <Maximize size={12} />
            <CloseIcon size={12} className="hover:text-red-500" />
          </div>
        </div>

        {/* AI Annotations Layer */}
        <div className="relative w-full h-full p-8 pointer-events-auto">
          {/* Annotation 1 */}
          <motion.div
            className={`absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
              activeMarker === 1 ? "z-20 scale-105" : "z-10 opacity-60 grayscale"
            }`}
          >
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-[#06b6d4] text-black font-bold flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.6)] animate-pulse">
                1
              </div>
              <AnimatePresence mode="wait">
                {activeMarker === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="bg-[#1e1e1e]/90 backdrop-blur-md border border-[#06b6d4]/30 p-4 rounded-lg text-sm text-white w-64 shadow-2xl"
                  >
                    <h4 className="font-bold text-[#06b6d4] mb-1">Identify the Function</h4>
                    <p className="text-xs text-gray-300">This is a polynomial function. We apply the power rule: ∫x^n dx = (x^(n+1))/(n+1).</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Annotation 2 */}
          <motion.div
            className={`absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
              activeMarker === 2 ? "z-20 scale-105" : "z-10 opacity-60 grayscale"
            }`}
          >
            <div className="flex flex-row-reverse items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-[#06b6d4] text-black font-bold flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.6)] animate-pulse">
                2
              </div>
              <AnimatePresence mode="wait">
                {activeMarker === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="bg-[#1e1e1e]/90 backdrop-blur-md border border-[#06b6d4]/30 p-4 rounded-lg text-sm text-white w-64 shadow-2xl text-right"
                  >
                    <h4 className="font-bold text-[#06b6d4] mb-1">Step-by-Step</h4>
                    <p className="text-xs text-gray-300">Integrate term by term: <br/>∫x² dx = x³/3 <br/>∫2x dx = x²</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
           {/* Annotation 3 */}
           <motion.div
            className={`absolute bottom-1/4 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
              activeMarker === 3 ? "z-20 scale-105" : "z-10 opacity-60 grayscale"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#06b6d4] text-black font-bold flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.6)] animate-pulse">
                3
              </div>
              <AnimatePresence mode="wait">
                {activeMarker === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="bg-[#1e1e1e]/90 backdrop-blur-md border border-[#06b6d4]/30 p-4 rounded-lg text-sm text-white w-64 shadow-2xl text-center"
                  >
                    <h4 className="font-bold text-[#06b6d4] mb-1">Don't Forget +C</h4>
                    <p className="text-xs text-gray-300">Since this is an indefinite integral, we must add the constant of integration.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// 2. Spatial Grid Visualizer
const SpatialGrid = () => {
  const cells = Array.from({ length: 25 }, (_, i) => i);
  const activeCells = [6, 7, 8, 11, 12, 13]; // Center-ish area

  return (
    <div className="relative w-full max-w-sm aspect-square bg-[#0f172a] rounded-lg border border-white/10 overflow-hidden grid grid-cols-5 gap-1 p-1">
      {cells.map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.3 }}
          animate={{ 
            opacity: activeCells.includes(i) ? [0.4, 0.8, 0.4] : 0.1,
            backgroundColor: activeCells.includes(i) ? "#06b6d4" : "transparent"
          }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.05 }}
          className="border border-[#06b6d4]/20 rounded-sm flex items-center justify-center text-[8px] font-mono text-[#06b6d4]"
        >
          {i + 1}
        </motion.div>
      ))}
      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-black/80 p-2 rounded border border-[#06b6d4]/50 backdrop-blur-sm">
          <span className="text-[#06b6d4] text-xs font-bold font-mono">SPATIAL_MAPPING: ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

const ITA = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Parallax effects
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // CTA Border Animations
  const [borderAnimation, setBorderAnimation] = useState({ scale: 1, x: 2, y: -2, rotate: -0.5 });
  const [borderAnimation2, setBorderAnimation2] = useState({ scale: 1, x: -2, y: 2, rotate: 0.5 });
  const [borderAnimation3, setBorderAnimation3] = useState({ scale: 1, x: 1, y: 1, rotate: -0.3 });

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
    <div ref={containerRef} className="min-h-screen bg-[#1D201F] text-[#E0D0C1] font-nunito selection:bg-[#06b6d4]/30">
      <Header />
      
      <main className="overflow-hidden">
        
        {/* --- SECTION 1: HERO --- */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
          {/* Background Grid & Glow */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#06b6d4]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container-padding relative z-10 w-full">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left: Content */}
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#06b6d4]/10 border border-[#06b6d4]/20 rounded-full text-sm font-medium text-[#06b6d4]"
                >
                  <Brain size={14} /> Internal R&D Project
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-bold text-[#E0D0C1] leading-[1.1]"
                >
                  The AI That <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-blue-400">
                    Sees Your Screen
                  </span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl text-[#B9BBBE] leading-relaxed max-w-xl"
                >
                  A multi-platform teaching assistant that overlays GPT-5 powered insights directly onto any desktop application.
                </motion.p>

                {/* Tech Badges */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-3 pt-4"
                >
                  {['.NET 9.0', 'WPF', 'React', 'n8n', 'GPT-5 API', 'Supabase'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm text-[#B9BBBE] font-mono">
                      {tech}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Right: Hero Visual */}
              <motion.div 
                style={{ y: yHero, opacity: opacityHero }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <WindowsOverlayMockup />
                
                {/* Decoration Lines */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[#06b6d4]/10 rounded-full animate-pulse" />
              </motion.div>

            </div>
          </div>
        </section>

        {/* --- SECTION 2: THE CHALLENGE (Hard Tech) --- */}
        <section className="section-padding bg-[#161918] border-y border-white/5 relative">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-[#E0D0C1] mb-6">
                The "Hard Tech" Problem
              </h2>
              <p className="text-xl text-[#B9BBBE] leading-relaxed">
                We needed a way to demonstrate complex AI capabilities beyond simple chatbots. We wanted to build a tool that could "see" and "reason" about educational content in real-time.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#1D201F] p-8 rounded-2xl border border-white/5 hover:border-[#06b6d4]/30 transition-colors group">
                <div className="w-12 h-12 bg-[#06b6d4]/10 rounded-lg flex items-center justify-center text-[#06b6d4] mb-6 group-hover:scale-110 transition-transform">
                  <Layers size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Multi-Platform Integration</h3>
                <p className="text-[#B9BBBE] text-sm">
                  Connecting a native Windows desktop app (WPF) with a modern React web dashboard and a serverless backend.
                </p>
              </div>

              <div className="bg-[#1D201F] p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors group">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                  <Workflow size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Complex Orchestration</h3>
                <p className="text-[#B9BBBE] text-sm">
                  Managing asynchronous flows: Screenshot capture &rarr; Cloud Upload &rarr; AI Reasoning &rarr; JSON Parsing &rarr; UI Rendering.
                </p>
              </div>

              <div className="bg-[#1D201F] p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors group">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                  <Brain size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Spatial Intelligence</h3>
                <p className="text-[#B9BBBE] text-sm">
                  Prompting an LLM to understand X/Y coordinates and screen layout to place annotations without obscuring content.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: THE SOLUTION (Architecture) --- */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            
            {/* Feature 1: The Brain (Prompt Engineering) */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
              <div className="order-2 lg:order-1 relative">
                 {/* Visual Representation of Prompt Engineering */}
                 <div className="bg-[#161918] p-6 rounded-xl border border-white/10 font-mono text-xs text-gray-400 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-30 text-[#06b6d4]"><Code size={24} /></div>
                    
                    {/* Fake Code Lines */}
                    <div className="space-y-2">
                       <p className="text-purple-400"># SYSTEM PROMPT (v5.0)</p>
                       <p className="text-gray-500">// Spatial Context Definition</p>
                       <p>YOU ARE A VISUAL TEACHING ASSISTANT.</p>
                       <p>INPUT: Image + 25-Point Grid Overlay</p>
                       <p>OUTPUT: JSON Array of Annotations</p>
                       <br/>
                       <p className="text-blue-400">RULES:</p>
                       <p>1. Analyze background luminance at coords.</p>
                       <p>2. Select text_color from ["#fff", "#000"].</p>
                       <p>3. <span className="text-[#06b6d4]">AVOID_OVERLAP = TRUE</span></p>
                       <p>4. Break complex math into {"<"}3 steps.</p>
                    </div>

                    {/* Overlay Grid Visual */}
                    <div className="absolute bottom-4 right-4 w-24 h-24 opacity-80">
                       <SpatialGrid />
                    </div>
                 </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-bold mb-6">
                  <Brain size={12} /> PROMPT ENGINEERING
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#E0D0C1] mb-6">
                  5,000 Tokens of <span className="text-[#06b6d4]">Reasoning</span>
                </h2>
                <p className="text-lg text-[#B9BBBE] leading-relaxed mb-8">
                  The magic isn't just the AI; it's how we talk to it. We developed a sophisticated 25-point spatial reference system that allows GPT-5 to "see" the screen layout. 
                </p>
                <p className="text-lg text-[#B9BBBE] leading-relaxed">
                  The system analyzes background contrast to determine font colors, calculates optimal tooltip placement, and breaks down complex visual data into pedagogical steps.
                </p>
              </div>
            </div>

            {/* Feature 2: The Flow (n8n) */}
            <div className="bg-[#161918] rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-96 h-96 bg-[#06b6d4]/5 rounded-full blur-[100px]" />
               
               <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                  <div className="space-y-6">
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-bold">
                        <Workflow size={12} /> AUTOMATION BACKEND
                     </div>
                     <h2 className="text-3xl md:text-4xl font-bold text-[#E0D0C1]">
                        Orchestrating Intelligence
                     </h2>
                     <p className="text-lg text-[#B9BBBE] leading-relaxed">
                        Three complex n8n workflows handle the heavy lifting. They manage session state in Supabase, process screenshot uploads, and bridge the gap between the Windows desktop C# code and the OpenAI API.
                     </p>
                     
                     <div className="flex gap-4 pt-4">
                        <div className="flex items-center gap-2 text-white bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                          <Zap size={16} className="text-[#06b6d4]" />
                          <span className="text-sm">Real-time Polling</span>
                        </div>
                        <div className="flex items-center gap-2 text-white bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                          <Database size={16} className="text-[#06b6d4]" />
                          <span className="text-sm">Supabase Sync</span>
                        </div>
                     </div>
                  </div>

                  {/* Flow Diagram Abstract */}
                  <div className="flex flex-col gap-4">
                     {/* Node 1 */}
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg z-10">
                           <Monitor size={20} />
                        </div>
                        <div className="flex-1 h-1 bg-white/10 rounded relative overflow-hidden">
                           <motion.div 
                              animate={{ x: [-100, 200] }} 
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#06b6d4] to-transparent" 
                           />
                        </div>
                        <div className="px-3 py-1 bg-white/5 rounded text-xs text-gray-400">Screenshot.png</div>
                     </div>

                     {/* Node 2 */}
                     <div className="flex items-center gap-4 ml-8">
                        <div className="w-12 h-12 bg-[#ff6d5a] rounded-xl flex items-center justify-center text-white shadow-lg z-10">
                           <Workflow size={20} />
                        </div>
                        <div className="flex-1 h-1 bg-white/10 rounded relative overflow-hidden">
                           <motion.div 
                              animate={{ x: [-100, 200] }} 
                              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                              className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#06b6d4] to-transparent" 
                           />
                        </div>
                        <div className="px-3 py-1 bg-white/5 rounded text-xs text-gray-400">Analysis Request</div>
                     </div>

                     {/* Node 3 */}
                     <div className="flex items-center gap-4 ml-16">
                        <div className="w-12 h-12 bg-[#10a37f] rounded-xl flex items-center justify-center text-white shadow-lg z-10">
                           <Brain size={20} />
                        </div>
                        <div className="flex-1 h-1 bg-white/10 rounded relative overflow-hidden">
                           <motion.div 
                              animate={{ x: [-100, 200] }} 
                              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                              className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-[#06b6d4] to-transparent" 
                           />
                        </div>
                        <div className="px-3 py-1 bg-white/5 rounded text-xs text-gray-400">JSON Annotations</div>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </section>

        {/* --- SECTION 4: IMPACT --- */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto">
               <div className="bg-[#1D201F] border border-[#06b6d4]/30 rounded-2xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                     <Eye size={120} className="text-[#06b6d4]" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-6 relative z-10">
                     From Concept to <span className="text-[#06b6d4]">Capabilities</span>
                  </h3>
                  <p className="text-xl text-[#B9BBBE] leading-relaxed mb-8 relative z-10">
                     This internal project served as the ultimate proving ground. We now have a battle-tested architecture for:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 relative z-10">
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#06b6d4]" />
                        <span className="text-white">Desktop-to-Cloud Integration</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#06b6d4]" />
                        <span className="text-white">Complex Visual AI Reasoning</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#06b6d4]" />
                        <span className="text-white">Real-time Overlay UI Systems</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#06b6d4]" />
                        <span className="text-white">Advanced Error Handling Patterns</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 5: CTA --- */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Animated borders - Cyber Cyan Primary */}
                <motion.div 
                  className="absolute inset-0 border-2 border-[#06b6d4]/30 rounded-2xl"
                  animate={borderAnimation}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.div 
                  className="absolute inset-0 border-2 border-[#06b6d4]/20 rounded-2xl"
                  animate={borderAnimation2}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                 <motion.div 
                  className="absolute inset-0 border-2 border-[#06b6d4]/15 rounded-2xl"
                  animate={borderAnimation3}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />

                <div 
                  className="relative rounded-2xl bg-[#161918]/90 backdrop-blur-xl p-10 md:p-16 text-center overflow-hidden"
                  style={{ transform: "rotate(0.3deg)" }}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#06b6d4]/10 rounded-full blur-[80px]" />

                  <h3 className="text-3xl md:text-5xl font-bold mb-6 text-[#E0D0C1]">
                     Need Complex AI Automation?
                  </h3>
                  
                  <p className="text-xl text-[#B9BBBE] mb-10 max-w-2xl mx-auto leading-relaxed">
                    We don't just build chatbots. We build systems that see, reason, and act across your entire software stack.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                    <button 
                      onClick={() => navigate("/contact")}
                      className="btn-hero inline-flex items-center justify-center min-w-[240px] text-lg bg-[#06b6d4] text-black hover:bg-[#0891b2] border-none"
                    >
                      Build My System <ArrowRight className="ml-2 w-5 h-5" />
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

export default ITA;
