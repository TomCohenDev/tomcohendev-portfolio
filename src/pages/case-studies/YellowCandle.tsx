import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Flame,
  Bell,
  Smartphone,
  Heart,
  Globe,
  Clock,
  ShieldAlert,
  Download,
  Calendar,
} from "lucide-react";

// --- ASSET CONFIG ---
// In a real project, ensure these files exist in your public folder
const BASE_PATH = "/case_studies/virtual_shoa_candle/assets";
const ASSETS = {
  about: `${BASE_PATH}/mobile-app-about-fjmc.webp`,
  lighting: `${BASE_PATH}/mobile-app-candle-lighting.webp`,
  reminders: `${BASE_PATH}/mobile-app-reminder-schedule.webp`,
  tutorial: `${BASE_PATH}/mobile-app-tutorial.webp`,
};

// --- CUSTOM COMPONENT: PHONE MOCKUP ---
const PhoneMockup = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <div
    className={`relative mx-auto w-[280px] md:w-[320px] rounded-[3rem] p-3 bg-[#1a1a1a] shadow-[0_0_0_12px_#1a1a1a,0_0_0_14px_#333] ${className}`}
  >
    <div className="relative rounded-[2.5rem] overflow-hidden bg-[#1D201F] aspect-[9/19.5]">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-[#1a1a1a] rounded-b-2xl z-20"></div>

      {/* Image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Glare/Reflection Overlay */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 to-transparent pointer-events-none z-10 rounded-[2.5rem]"></div>
    </div>
  </div>
);

// --- CUSTOM COMPONENT: FLICKERING FLAME ICON ---
const FlickeringFlame = ({
  size = 24,
  color = "#facc15",
}: {
  size?: number;
  color?: string;
}) => (
  <motion.div
    animate={{
      scale: [1, 1.1, 0.95, 1.05, 1],
      opacity: [0.8, 1, 0.9, 1, 0.8],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="relative flex items-center justify-center"
  >
    <div className="absolute inset-0 blur-lg bg-[#facc15]/40 rounded-full" />
    <Flame size={size} color={color} fill={color} className="relative z-10" />
  </motion.div>
);

const YellowCandle = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax for Hero
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -50]);

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
      className="min-h-screen bg-[#1D201F] text-[#E0D0C1] font-nunito selection:bg-[#facc15]/30"
    >
      <Header />

      <main className="overflow-hidden">
        {/* --- SECTION 1: HERO (The Vigil) --- */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20">
          {/* Ambient Background Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#facc15]/5 rounded-full blur-[150px] pointer-events-none" />

          <div className="container-padding relative z-10 w-full">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Narrative */}
              <div className="space-y-8 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#facc15]/10 border border-[#facc15]/20 rounded-full text-sm font-medium text-[#facc15]"
                >
                  <Flame size={14} className="animate-pulse" />
                  Non-Profit / Community
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-bold text-[#E0D0C1] leading-[1.1]"
                >
                  Preserving Memory in the <br />
                  <span className="text-[#facc15]">Digital Age</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl text-[#B9BBBE] leading-relaxed max-w-xl mx-auto lg:mx-0"
                >
                  How we helped 14,000+ members worldwide honor Holocaust
                  Remembrance Day through a cross-platform mobile experience.
                </motion.p>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4 border-t border-white/5"
                >
                  <div>
                    <div className="text-3xl font-bold text-white">14k+</div>
                    <div className="text-sm text-[#B9BBBE]">Active Members</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">100%</div>
                    <div className="text-sm text-[#B9BBBE]">
                      Store Compliance
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">24h</div>
                    <div className="text-sm text-[#B9BBBE]">Virtual Vigil</div>
                  </div>
                </motion.div>
              </div>

              {/* Right: The Candle Visual */}
              <motion.div
                style={{ y: yHero }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative flex justify-center"
              >
                {/* Glow behind phone */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#facc15]/20 to-transparent blur-3xl rounded-full" />

                <PhoneMockup
                  src={ASSETS.lighting}
                  alt="Yellow Candle Lighting Screen"
                  className="rotate-[-5deg] z-10"
                />

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-10 -right-4 lg:right-10 bg-[#1D201F] border border-[#facc15]/30 p-4 rounded-xl shadow-2xl z-20"
                >
                  <div className="flex items-center gap-3">
                    <FlickeringFlame />
                    <div>
                      <div className="text-xs text-[#B9BBBE]">Status</div>
                      <div className="text-sm font-bold text-white">
                        Candle Lit
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: THE CHALLENGE (Compliance & Continuity) --- */}
        <section className="section-padding bg-[#161918] border-y border-white/5">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-[#E0D0C1] mb-6">
                A Tradition at Risk
              </h2>
              <p className="text-xl text-[#B9BBBE]">
                The FJMC needed to modernize a sacred tradition while battling
                technical debt.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Problem 1 */}
              <div className="bg-[#1D201F] p-8 rounded-2xl border border-white/5 hover:border-red-500/30 transition-colors group">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                  <ShieldAlert size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Compliance Critical
                </h3>
                <p className="text-[#B9BBBE] text-sm leading-relaxed">
                  The previous app was crashing on newer Android devices and
                  flagged for removal by App Stores due to outdated APIs. 14,000
                  members risked losing access.
                </p>
              </div>

              {/* Problem 2 */}
              <div className="bg-[#1D201F] p-8 rounded-2xl border border-white/5 hover:border-[#facc15]/30 transition-colors group">
                <div className="w-12 h-12 bg-[#facc15]/10 rounded-lg flex items-center justify-center text-[#facc15] mb-6 group-hover:scale-110 transition-transform">
                  <Clock size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Manual Fatigue
                </h3>
                <p className="text-[#B9BBBE] text-sm leading-relaxed">
                  Users couldn't manage their own reminders. They needed a way
                  to set recurring alerts for Yom HaShoah (which changes dates
                  annually) and personal Yahrzeits.
                </p>
              </div>

              {/* Problem 3 */}
              <div className="bg-[#1D201F] p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors group">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Digital Divide
                </h3>
                <p className="text-[#B9BBBE] text-sm leading-relaxed">
                  The organization needed to bridge the gap between older
                  members accustomed to physical candles and a digitally-native
                  younger generation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: THE SOLUTION (Features Showcase) --- */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            {/* Feature 1: The Reminders */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#facc15]/5 rounded-full blur-[100px]" />
                <PhoneMockup
                  src={ASSETS.reminders}
                  alt="Reminder Scheduling Interface"
                />

                {/* Tech Badge */}
                <div className="absolute top-10 -left-10 hidden md:flex items-center gap-3 bg-[#161918] border border-white/10 p-4 rounded-xl shadow-xl">
                  <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <div className="text-xs text-[#B9BBBE] uppercase">
                      Tech Stack
                    </div>
                    <div className="text-sm font-bold text-white">
                      Flutter Local Notifications
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-[#E0D0C1] mb-6">
                  Local-First{" "}
                  <span className="text-[#facc15]">Smart Reminders</span>
                </h2>
                <p className="text-lg text-[#B9BBBE] leading-relaxed mb-8">
                  We architected a privacy-focused, offline-first reminder
                  system. Instead of expensive cloud servers, we utilized local
                  device storage to manage schedules.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-[#facc15]/10 flex items-center justify-center text-[#facc15] shrink-0">
                      <Calendar size={14} />
                    </div>
                    <div>
                      <strong className="text-white block">
                        Hebrew Calendar Sync
                      </strong>
                      <span className="text-[#B9BBBE] text-sm">
                        Automatically calculates Yom HaShoah dates annually.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-[#facc15]/10 flex items-center justify-center text-[#facc15] shrink-0">
                      <Bell size={14} />
                    </div>
                    <div>
                      <strong className="text-white block">
                        Personal Yahrzeits
                      </strong>
                      <span className="text-[#B9BBBE] text-sm">
                        Users can schedule recurring custom reminders for family
                        anniversaries up to 5 years out.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2: Education & Onboarding */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#E0D0C1] mb-6">
                  Respectful <span className="text-[#facc15]">Onboarding</span>
                </h2>
                <p className="text-lg text-[#B9BBBE] leading-relaxed mb-8">
                  Design for this demographic required extreme clarity. We
                  implemented a gesture-based tutorial system and clear,
                  high-contrast typography to ensure accessibility for older
                  members.
                </p>
                <div className="p-6 bg-[#161918] rounded-xl border border-white/5">
                  <p className="text-[#B9BBBE] italic">
                    "The app includes audio recitation features, allowing users
                    to hear and recite traditional remembrance prayers—bridging
                    the physical and digital ritual."
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />

                {/* Stacked Phones Effect */}
                <div className="relative">
                  <div className="absolute top-0 left-10 opacity-50 scale-90 transform -rotate-6 z-0">
                    <PhoneMockup
                      src={ASSETS.tutorial}
                      alt="Tutorial Screen"
                      className="bg-[#111]"
                    />
                  </div>
                  <div className="relative z-10 transform rotate-3">
                    <PhoneMockup src={ASSETS.about} alt="About FJMC Screen" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: TECH & IMPACT --- */}
        <section className="section-padding bg-[#161918]">
          <div className="container-padding">
            <div className="max-w-6xl mx-auto">
              {/* Tech Stack Bar */}
              <div className="mb-20">
                <p className="text-center text-[#B9BBBE] uppercase tracking-widest text-sm mb-8">
                  Powered By
                </p>
                <div className="flex flex-wrap justify-center gap-4 md:gap-12 opacity-70">
                  {[
                    "Flutter",
                    "Dart",
                    "Shared Preferences",
                    "Local Notifications",
                    "Timezone API",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="text-lg md:text-xl font-bold text-[#E0D0C1] border border-white/10 px-6 py-2 rounded-lg bg-[#1D201F]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-[#1D201F] p-10 rounded-3xl border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Heart size={120} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-bold text-[#facc15] mb-2">
                      Revenue Generated
                    </h3>
                    <p className="text-[#B9BBBE] text-lg">
                      By revitalizing the app, we helped drive donation revenue
                      for FJMC through increased member engagement and direct
                      in-app links.
                    </p>
                  </div>
                </div>

                <div className="bg-[#1D201F] p-10 rounded-3xl border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Download size={120} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-bold text-[#facc15] mb-2">
                      14,000+
                    </h3>
                    <p className="text-[#B9BBBE] text-lg">
                      Members regained stable access. The update achieved 100%
                      compliance with strict new Google Play and Apple App Store
                      guidelines.
                    </p>
                  </div>
                </div>
              </div>

              {/* Client Quote */}
              {/* <div className="text-center max-w-3xl mx-auto">
   
                 <h3 className="text-2xl text-white font-medium italic leading-relaxed mb-6">
                   "I want to start by saying what a pleasure it was working with Tom. He stayed in constant communication, made suggestions based on our needs. I decided to work with Tom because he was the only one to lay out a clear timeline for my project based on my correspondence."
                 </h3>
                 <p className="text-[#B9BBBE]">
                   <strong className="text-white block">Allan R. Kahan</strong>
                   Past International President, FJMC
                 </p>
                 <p className="text-xs text-[#B9BBBE] mt-4 opacity-60">
                   (Regarding our recommendation for a cost-effective local storage architecture over an expensive cloud database)
                 </p>
              </div> */}
              <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-2xl text-white font-medium italic leading-relaxed mb-6">
                  "I want to start by saying what a pleasure it was working with
                  Tom. He stayed in constant communication, made suggestions
                  based on our needs. I decided to work with Tom because he was
                  the only one to lay out a clear timeline for my project based
                  on my correspondence."
                </h3>
                <p className="text-[#B9BBBE]">
                  <strong className="text-white block">Jonathan Brody</strong>
                  Shoah Yellow Candle App Chairperson, FJMC
                </p>
                <p className="text-xs text-[#B9BBBE] mt-4 opacity-60">
                  (Regarding our recommendation for a cost-effective local
                  storage architecture over an expensive cloud database)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 5: CTA --- */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Animated borders - Yellow Primary */}
                <motion.div
                  className="absolute inset-0 border-2 border-[#facc15]/30 rounded-2xl"
                  animate={borderAnimation}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-[#facc15]/20 rounded-2xl"
                  animate={borderAnimation2}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-[#facc15]/15 rounded-2xl"
                  animate={borderAnimation3}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />

                <div
                  className="relative rounded-2xl bg-[#161918]/90 backdrop-blur-xl p-10 md:p-16 text-center"
                  style={{ transform: "rotate(0.3deg)" }}
                >
                  <h3 className="text-3xl md:text-5xl font-bold mb-6 text-[#E0D0C1]">
                    Have an App that Needs Saving?
                  </h3>

                  <p className="text-xl text-[#B9BBBE] mb-10 max-w-2xl mx-auto leading-relaxed">
                    We specialize in modernizing legacy apps, fixing compliance
                    issues, and building cost-effective cross-platform
                    solutions.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => navigate("/contact")}
                      className="btn-hero inline-flex items-center justify-center min-w-[240px] text-lg bg-[#facc15] text-black hover:bg-[#eab308] border-none"
                    >
                      Update My App <ArrowRight className="ml-2 w-5 h-5" />
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

export default YellowCandle;
