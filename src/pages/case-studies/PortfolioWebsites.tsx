import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Globe,
  Smartphone,
  Monitor,
  Code,
  Layers,
  Gauge,
  Play,
  Layout,
  Cpu,
  CheckCircle,
  TrendingUp,
  Image as ImageIcon,
} from "lucide-react";

// --- ASSET CONFIG ---
const BASE_PATH = "/case_studies/PORTFOLIO_WEBSITES/assets";
const ASSETS = {
  desktop: `${BASE_PATH}/portfolio-website-desktop.webp`,
  bilingual: `${BASE_PATH}/portfolio-bilingual-rtl.webp`,
  performance: `${BASE_PATH}/portfolio-performance-optimized.webp`,
};

// --- CUSTOM COMPONENT: SPEEDOMETER GAUGE ---
const Speedometer = ({
  value,
  label,
  delay = 0,
}: {
  value: number;
  label: string;
  delay?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      let current = 0;
      const increment = value / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  // Calculate rotation for semi-circle (0 to 180 degrees)
  // value 0-100 maps to -90deg to 90deg
  const rotation = (count / 100) * 180 - 90;

  return (
    <div
      ref={ref}
      className="flex flex-col items-center bg-[#161918] p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-[#38bdf8]/30 transition-colors"
    >
      <div className="relative w-40 h-24 mb-4 overflow-hidden">
        {/* Gauge Background */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full border-[12px] border-white/10 border-b-0" />

        {/* Gauge Progress */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full border-[12px] border-transparent border-t-[#38bdf8] border-l-[#38bdf8] border-b-0 origin-center"
          style={{ rotate: rotation }}
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ duration: 2, ease: "easeOut", delay: delay * 0.5 }}
        />

        {/* Value Text */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-3xl font-bold text-white mb-2">
          {count}
        </div>
      </div>

      <p className="text-[#B9BBBE] text-sm uppercase tracking-wider font-bold">
        {label}
      </p>

      <div className="absolute top-0 right-0 w-24 h-24 bg-[#38bdf8]/5 rounded-bl-full -mr-4 -mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

// --- CUSTOM COMPONENT: BROWSER FRAME ---
const BrowserFrame = ({
  src,
  alt,
  className = "",
  address = "example.com",
}: {
  src: string;
  alt: string;
  className?: string;
  address?: string;
}) => (
  <div
    className={`bg-[#0c0c0c] rounded-lg shadow-2xl overflow-hidden border border-white/10 ${className}`}
  >
    {/* Browser Bar */}
    <div className="bg-[#1a1a1a] px-4 py-2 flex items-center gap-2 border-b border-white/5">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
      <div className="flex-1 bg-black/50 rounded px-3 py-1 mx-4 text-xs text-gray-500 font-mono truncate border border-white/5 flex justify-between items-center">
        <span>https://{address}</span>
        <Zap size={10} className="text-[#38bdf8]" />
      </div>
    </div>
    {/* Content */}
    <div className="relative aspect-video bg-[#1D201F]">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      {/* Overlay Reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
    </div>
  </div>
);

// --- CUSTOM COMPONENT: CODE SNIPPET VISUAL ---
const OptimizationSnippet = () => (
  <div className="font-mono text-xs bg-[#0c0c0c] p-4 rounded-lg border border-white/10 text-gray-400 overflow-hidden relative">
    <div className="absolute top-0 right-0 p-2 opacity-50">
      <Code size={16} />
    </div>
    <div className="space-y-1">
      <p>
        <span className="text-purple-400">const</span> VideoPlayer = ({"{"} src{" "}
        {"}"}) ={">"} {"{"}
      </p>
      <p className="pl-4">
        <span className="text-purple-400">const</span> observer ={" "}
        <span className="text-yellow-400">useIntersectionObserver</span>();
      </p>
      <p className="pl-4">
        <span className="text-purple-400">return</span> (
      </p>
      <p className="pl-8 text-green-400">
        {"<"}
        {"Suspense"} fallback={"{"}
        <span className="text-blue-400">Skeleton</span> /{"}"}
        {">"}
      </p>
      <p className="pl-12">
        {"<"}
        <span className="text-[#38bdf8]">LazyVideo</span>
      </p>
      <p className="pl-16">
        src={"{"}src{"}"}
      </p>
      <p className="pl-16">
        loading=<span className="text-orange-400">"lazy"</span>
      </p>
      <p className="pl-16">
        decoding=<span className="text-orange-400">"async"</span>
      </p>
      <p className="pl-12">/{">"}</p>
      <p className="pl-8 text-green-400">
        {"<"}/{"Suspense"}
        {">"}
      </p>
      <p className="pl-4">);</p>
      <p>{"};"}</p>
    </div>
  </div>
);

const PortfolioWebsites = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Animations
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // CTA Border Animations
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
    <div
      ref={containerRef}
      className="min-h-screen bg-[#1D201F] text-[#E0D0C1] font-nunito selection:bg-[#38bdf8]/30"
    >
      <Header />

      <main className="overflow-hidden">
        {/* --- SECTION 1: HERO --- */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
          {/* Background Grid & Glow */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#38bdf8]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container-padding relative z-10 w-full">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Content */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#38bdf8]/10 border border-[#38bdf8]/20 rounded-full text-sm font-medium text-[#38bdf8]"
                >
                  <Monitor size={14} /> Web & Mobile Suite
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-bold text-[#E0D0C1] leading-[1.1]"
                >
                  Pixel Perfect. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-cyan-200">
                    Performance First.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl text-[#B9BBBE] leading-relaxed max-w-xl"
                >
                  A suite of modern portfolios built for speed. We optimized
                  video-heavy sites to load instantly on mobile networks.
                </motion.p>

                {/* Tech Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-3 pt-4"
                >
                  {["React", "TypeScript", "Flutter", "Vite", "i18n"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm text-[#B9BBBE]"
                      >
                        {tech}
                      </span>
                    )
                  )}
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
                {/* Main Desktop Mockup */}
                <div className="relative z-20 transform hover:scale-[1.02] transition-transform duration-500">
                  <BrowserFrame
                    src={ASSETS.desktop}
                    alt="Desktop Portfolio Interface"
                    address="portfolio.com"
                    className="shadow-[0_0_50px_rgba(56,189,248,0.15)]"
                  />
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-10 -bottom-10 z-30 w-48 bg-[#161918] border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-xl hidden md:block"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                      <Zap size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-[#B9BBBE]">
                        Lighthouse Score
                      </div>
                      <div className="text-lg font-bold text-white">99/100</div>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full w-[99%]" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -left-12 top-20 z-10 w-40 bg-[#161918] border border-white/10 p-4 rounded-xl shadow-2xl backdrop-blur-xl hidden md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#38bdf8]/20 flex items-center justify-center text-[#38bdf8]">
                      <Globe size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-[#B9BBBE]">Locales</div>
                      <div className="text-sm font-bold text-white">
                        EN / HE
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: THE BOTTLENECK (Problem) --- */}
        <section className="section-padding bg-[#161918] border-y border-white/5 relative">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-[#E0D0C1] mb-6">
                The Heavy Media Bottleneck
              </h2>
              <p className="text-xl text-[#B9BBBE] leading-relaxed">
                Creatives need to show high-quality video work. But standard
                video players kill mobile performance, leading to 80% bounce
                rates on 4G networks.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#1D201F] p-8 rounded-2xl border border-white/5 hover:border-red-500/30 transition-colors group">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                  <Gauge size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Slow Load Times
                </h3>
                <p className="text-[#B9BBBE] text-sm">
                  Video-heavy portfolios were taking 15+ seconds to interactive
                  time on mobile devices.
                </p>
              </div>

              <div className="bg-[#1D201F] p-8 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-colors group">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                  <Layout size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Broken Layouts
                </h3>
                <p className="text-[#B9BBBE] text-sm">
                  Without proper RTL support, Hebrew content broke layouts and
                  confused navigation flows.
                </p>
              </div>

              <div className="bg-[#1D201F] p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors group">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                  <Smartphone size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  No Mobile Presence
                </h3>
                <p className="text-[#B9BBBE] text-sm">
                  Artists missed opportunities by not having a dedicated mobile
                  app for offline showcases.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: THE SOLUTION (Features) --- */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            {/* Feature 1: Video Optimization */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#38bdf8]/5 rounded-full blur-[100px]" />
                <div className="relative z-10 grid gap-6">
                  {/* Visual: Code + Result */}
                  <OptimizationSnippet />
                  <BrowserFrame
                    src={ASSETS.performance}
                    alt="Optimized Video Grid"
                    address="portfolio.com/work"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#38bdf8]/10 text-[#38bdf8] rounded-full text-xs font-bold mb-6">
                  <Cpu size={12} /> ENGINEERING
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#E0D0C1] mb-6">
                  Smart Video Loading Architecture
                </h2>
                <p className="text-lg text-[#B9BBBE] leading-relaxed mb-8">
                  We didn't just embed videos; we engineered a loading strategy.
                  We implemented Intersection Observers to only load media
                  currently in the viewport, and used hardware-accelerated CSS
                  for buttery smooth playback.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="text-2xl font-bold text-white mb-1">
                      Lazy
                    </div>
                    <div className="text-xs text-[#B9BBBE]">
                      Loading Strategy
                    </div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="text-2xl font-bold text-white mb-1">
                      Async
                    </div>
                    <div className="text-xs text-[#B9BBBE]">Decoding</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="text-2xl font-bold text-white mb-1">
                      CDN
                    </div>
                    <div className="text-xs text-[#B9BBBE]">Edge Delivery</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="text-2xl font-bold text-white mb-1">
                      WebP
                    </div>
                    <div className="text-xs text-[#B9BBBE]">
                      Thumbnail Fallbacks
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Internationalization */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-bold mb-6">
                  <Globe size={12} /> GLOBALIZATION
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#E0D0C1] mb-6">
                  Native RTL Support
                </h2>
                <p className="text-lg text-[#B9BBBE] leading-relaxed mb-8">
                  We built the layout system to be direction-agnostic. Using
                  logical CSS properties (margin-inline-start vs margin-left),
                  the site flips instantly between English (LTR) and Hebrew
                  (RTL) without a single layout bug.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle size={16} className="text-purple-400" />
                    <span>i18next Integration</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle size={16} className="text-purple-400" />
                    <span>Logical CSS</span>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-purple-500/10 rounded-xl blur-2xl group-hover:bg-purple-500/20 transition-colors" />
                <BrowserFrame
                  src={ASSETS.bilingual}
                  alt="Bilingual RTL Interface"
                  address="portfolio.com/he"
                  className="relative z-10 transform rotate-1 group-hover:rotate-0 transition-transform duration-500"
                />

                {/* Floating Language Badge */}
                <div className="absolute top-6 left-6 z-20 bg-black/80 backdrop-blur border border-white/10 px-4 py-2 rounded-lg flex items-center gap-3">
                  <span className="text-white font-bold">עברית</span>
                  <ArrowRight size={14} className="text-gray-500" />
                  <span className="text-white font-bold">English</span>
                </div>
              </div>
            </div>

            {/* Feature 3: Cross-Platform Mobile */}
            <div className="bg-[#161918] rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#38bdf8]/5 rounded-full blur-[100px]" />

              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold">
                    <Smartphone size={12} /> FLUTTER MOBILE APP
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#E0D0C1]">
                    Showcase Anywhere.
                  </h2>
                  <p className="text-lg text-[#B9BBBE] leading-relaxed">
                    For artists on the go, we built a companion Flutter app. It
                    allows them to pull up their portfolio offline during client
                    meetings, ensuring they never miss an opportunity due to
                    poor signal.
                  </p>
                  <button className="flex items-center gap-2 text-[#38bdf8] font-bold hover:underline">
                    View App Specs <ArrowRight size={16} />
                  </button>
                </div>

                {/* Device Mockup Abstract */}
                <div className="flex justify-center gap-6">
                  <div className="w-40 h-80 bg-black rounded-[2rem] border-4 border-[#333] shadow-2xl relative overflow-hidden transform -rotate-6 mt-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#333] rounded-b-xl" />
                    <div className="w-full h-full bg-[#1D201F] flex items-center justify-center text-gray-700">
                      <ImageIcon size={32} />
                    </div>
                  </div>
                  <div className="w-40 h-80 bg-black rounded-[2rem] border-4 border-[#333] shadow-2xl relative overflow-hidden transform rotate-6 mb-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#333] rounded-b-xl" />
                    <div className="w-full h-full bg-[#1D201F] flex items-center justify-center text-gray-700">
                      <Play size={32} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: METRICS & RESULTS --- */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#E0D0C1] mb-6">
                  Performance Metrics
                </h2>
                <p className="text-[#B9BBBE]">
                  Measured on real 4G networks using Lighthouse.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 justify-items-center">
                <Speedometer value={98} label="Performance" delay={0} />
                <Speedometer value={100} label="Best Practices" delay={1} />
                <Speedometer value={100} label="SEO" delay={2} />
              </div>

              <div className="mt-20 grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 p-8 rounded-2xl border border-white/5 flex gap-6 items-start">
                  <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      80% Faster Load
                    </h4>
                    <p className="text-[#B9BBBE] text-sm">
                      By switching from heavy MP4 embeds to optimized chunks, we
                      reduced initial load payload by 4MB per page.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 p-8 rounded-2xl border border-white/5 flex gap-6 items-start">
                  <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                    <Layers size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      Zero Maintenance
                    </h4>
                    <p className="text-[#B9BBBE] text-sm">
                      Automated deployment pipelines and a CMS connection mean
                      clients update their work without touching code.
                    </p>
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
                {/* Animated borders - Sky Blue Primary */}
                <motion.div
                  className="absolute inset-0 border-2 border-[#38bdf8]/30 rounded-2xl"
                  animate={borderAnimation}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-[#38bdf8]/20 rounded-2xl"
                  animate={borderAnimation2}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-[#38bdf8]/15 rounded-2xl"
                  animate={borderAnimation3}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />

                <div
                  className="relative rounded-2xl bg-[#161918]/90 backdrop-blur-xl p-10 md:p-16 text-center overflow-hidden"
                  style={{ transform: "rotate(0.3deg)" }}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#38bdf8]/10 rounded-full blur-[80px]" />

                  <h3 className="text-3xl md:text-5xl font-bold mb-6 text-[#E0D0C1]">
                    Is your website losing clients?
                  </h3>

                  <p className="text-xl text-[#B9BBBE] mb-10 max-w-2xl mx-auto leading-relaxed">
                    Slow portfolios cost leads. We build digital experiences
                    that load instantly and convert visitors.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                    <button
                      onClick={() => navigate("/contact")}
                      className="btn-hero inline-flex items-center justify-center min-w-[240px] text-lg bg-[#38bdf8] text-black hover:bg-[#0ea5e9] border-none"
                    >
                      Audit My Site <ArrowRight className="ml-2 w-5 h-5" />
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

export default PortfolioWebsites;
