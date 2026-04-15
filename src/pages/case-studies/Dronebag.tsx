import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Target,
  Battery,
  ShieldAlert,
  Activity,
  WifiOff,
  Database,
  Users,
  MapPin,
  ClipboardList,
} from "lucide-react";

// --- ASSET CONFIG ---
const BASE_PATH = "/case_studies/dronebag/assets";
const ASSETS = {
  battery: `${BASE_PATH}/dronebag-battery-management.webp`,
  details: `${BASE_PATH}/dronebag-drone-details.webp`,
  flight: `${BASE_PATH}/dronebag-flight-logging.webp`,
  dashboard: `${BASE_PATH}/dronebag-group-dashboard.webp`,
  home: `${BASE_PATH}/dronebag-home-screen.webp`,
  issues: `${BASE_PATH}/dronebag-issue-tracking.webp`,
};

// --- CUSTOM COMPONENT: RUGGED PHONE MOCKUP ---
const RuggedPhoneMockup = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative mx-auto w-[280px] md:w-[320px] rounded-[2.5rem] bg-[#1a1a1a] shadow-[0_0_0_8px_#262626,0_20px_50px_rgba(0,0,0,0.8)] border border-white/5">
    {/* Screen Container */}
    <div className="relative rounded-[2rem] overflow-hidden bg-[#1D201F] aspect-[9/19.5] border-4 border-black">
      {/* Dynamic Island / Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-b-xl z-20"></div>

      {/* Image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Tactical Glare */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-10"></div>
    </div>
  </div>
);

// --- CUSTOM COMPONENT: MISSION STATUS NODE ---
const MissionNode = ({
  icon: Icon,
  title,
  desc,
  active = false,
}: {
  icon: any;
  title: string;
  desc: string;
  active?: boolean;
}) => (
  <div
    className={`flex gap-4 p-4 rounded-xl border transition-all duration-300 ${
      active
        ? "bg-[#f97316]/10 border-[#f97316]/30"
        : "bg-[#1D201F] border-white/5 opacity-60"
    }`}
  >
    <div
      className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
        active ? "bg-[#f97316] text-black" : "bg-white/10 text-white"
      }`}
    >
      <Icon size={24} />
    </div>
    <div>
      <h4 className={`font-bold ${active ? "text-white" : "text-[#B9BBBE]"}`}>
        {title}
      </h4>
      <p className="text-xs text-[#B9BBBE] mt-1">{desc}</p>
    </div>
  </div>
);

const Dronebag = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Animations
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -100]);

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
      className="min-h-screen bg-[#1D201F] text-[#E0D0C1] font-nunito selection:bg-[#f97316]/30"
    >
      <Header />

      <main className="overflow-hidden">
        {/* --- SECTION 1: HERO --- */}
        <section className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
          {/* Tactical Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#1D201F] via-transparent to-[#1D201F] pointer-events-none" />

          <div className="container-padding relative z-10 w-full">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Content */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f97316]/10 border border-[#f97316]/20 rounded-full text-sm font-medium text-[#f97316]"
                >
                  <Target size={14} /> Military & Defense
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-bold text-[#E0D0C1] leading-[1.1]"
                >
                  Mission Critical <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-orange-400">
                    Fleet Command.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl text-[#B9BBBE] leading-relaxed max-w-xl"
                >
                  We digitized the IDF's drone operations, replacing paper logs
                  with a real-time, offline-capable mobile command center.
                </motion.p>

                {/* KPI Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-8 pt-4 border-t border-white/5"
                >
                  <div>
                    <div className="text-3xl font-bold text-white">100%</div>
                    <div className="text-sm text-[#B9BBBE] uppercase tracking-wider">
                      Data Integrity
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">50+</div>
                    <div className="text-sm text-[#B9BBBE] uppercase tracking-wider">
                      Active Units
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">Zero</div>
                    <div className="text-sm text-[#B9BBBE] uppercase tracking-wider">
                      Downtime
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right: Hero Visuals (Stacked) */}
              <motion.div
                style={{ y: yHero }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Back Phone */}
                <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 rotate-12 opacity-60 scale-90 z-0">
                  <RuggedPhoneMockup
                    src={ASSETS.home}
                    alt="Dronebag Home Screen"
                  />
                </div>

                {/* Front Phone */}
                <div className="relative z-10 transform -rotate-6">
                  <RuggedPhoneMockup
                    src={ASSETS.dashboard}
                    alt="Dronebag Group Dashboard"
                  />

                  {/* Floating Notification */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-24 -left-12 bg-[#1a1a1a] border-l-4 border-[#f97316] p-4 rounded-r-lg shadow-2xl max-w-[200px]"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <ShieldAlert size={16} className="text-[#f97316]" />
                      <span className="text-xs font-bold text-white">
                        CRITICAL ALERT
                      </span>
                    </div>
                    <p className="text-xs text-[#B9BBBE]">
                      Battery Pack #B-294 requires immediate maintenance.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: THE PROBLEM (Tactical Chaos) --- */}
        <section className="section-padding bg-[#161918] border-y border-white/5">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-[#E0D0C1] mb-6">
                Fog of War
              </h2>
              <p className="text-xl text-[#B9BBBE] leading-relaxed">
                Managing specialized equipment in the field is chaotic.
                Spreadsheets don't work in a desert, and lost maintenance logs
                lead to operational failure.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#1D201F] p-8 rounded-2xl border border-white/5 hover:border-red-500/30 transition-colors group">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                  <ClipboardList size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Paper Logs
                </h3>
                <p className="text-[#B9BBBE] text-sm">
                  Flight data was recorded manually, leading to human error and
                  lost history when notebooks were damaged.
                </p>
              </div>

              <div className="bg-[#1D201F] p-8 rounded-2xl border border-white/5 hover:border-[#f97316]/30 transition-colors group">
                <div className="w-12 h-12 bg-[#f97316]/10 rounded-lg flex items-center justify-center text-[#f97316] mb-6 group-hover:scale-110 transition-transform">
                  <Battery size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Battery Blindness
                </h3>
                <p className="text-[#B9BBBE] text-sm">
                  No centralized tracking for charge cycles. Batteries were
                  dying mid-operation due to poor lifecycle management.
                </p>
              </div>

              <div className="bg-[#1D201F] p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors group">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Siloed Units
                </h3>
                <p className="text-[#B9BBBE] text-sm">
                  Different teams couldn't see available equipment. Drones sat
                  unused in one unit while another was grounded.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: THE OPERATIONAL FLOW --- */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-[#E0D0C1] mb-4">
                The Operational Lifecycle
              </h2>
              <p className="text-[#B9BBBE]">
                Full-spectrum management from hangar to landing.
              </p>
            </div>

            {/* Step 1: Readiness */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
              <div className="order-2 lg:order-1">
                <MissionNode
                  icon={Battery}
                  title="Readiness Check"
                  desc="Track voltage, cycles, and health status."
                  active={true}
                />
                <div className="h-8 w-[2px] bg-[#f97316]/30 ml-10 my-2"></div>
                <MissionNode
                  icon={ShieldAlert}
                  title="Issue Resolution"
                  desc="Clear flagged maintenance items before takeoff."
                />
                <div className="h-8 w-[2px] bg-white/10 ml-10 my-2"></div>
                <MissionNode
                  icon={Users}
                  title="Team Assignment"
                  desc="Assign pilot and observer roles."
                />
              </div>

              <div className="order-1 lg:order-2 relative flex justify-center">
                <div className="absolute inset-0 bg-[#f97316]/5 blur-3xl rounded-full" />
                <RuggedPhoneMockup
                  src={ASSETS.battery}
                  alt="Battery Management Screen"
                />
              </div>
            </div>

            {/* Step 2: Execution */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
              <div className="relative flex justify-center">
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
                <RuggedPhoneMockup
                  src={ASSETS.flight}
                  alt="Flight Logging Screen"
                />
              </div>

              <div>
                <MissionNode
                  icon={MapPin}
                  title="Flight Logging"
                  desc="GPS-tagged start and end points."
                />
                <div className="h-8 w-[2px] bg-white/10 ml-10 my-2"></div>
                <MissionNode
                  icon={Activity}
                  title="Live Telemetry"
                  desc="Real-time flight duration and equipment status."
                  active={true}
                />
                <div className="h-8 w-[2px] bg-[#f97316]/30 ml-10 my-2"></div>
                <MissionNode
                  icon={Database}
                  title="Auto-Sync"
                  desc="Data uploads instantly when connection is restored."
                />
              </div>
            </div>

            {/* Step 3: Debrief */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <MissionNode
                  icon={Target}
                  title="Mission Summary"
                  desc="Automated flight reports generated."
                />
                <div className="h-8 w-[2px] bg-white/10 ml-10 my-2"></div>
                <MissionNode
                  icon={ShieldAlert}
                  title="Issue Reporting"
                  desc="Tag damaged props or motors instantly."
                  active={true}
                />
                <div className="h-8 w-[2px] bg-[#f97316]/30 ml-10 my-2"></div>
                <MissionNode
                  icon={Battery}
                  title="Cycle Count"
                  desc="Automatic battery cycle increment."
                />
              </div>

              <div className="order-1 lg:order-2 relative flex justify-center">
                <div className="absolute inset-0 bg-[#f97316]/5 blur-3xl rounded-full" />
                <RuggedPhoneMockup
                  src={ASSETS.issues}
                  alt="Issue Tracking Screen"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: TECHNICAL DEEP DIVE --- */}
        <section className="section-padding bg-[#161918] relative overflow-hidden">
          {/* Circuit Pattern BG */}
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>

          <div className="container-padding relative z-10">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Built for the <span className="text-[#f97316]">Offline</span>{" "}
                  World
                </h2>
                <p className="text-[#B9BBBE] text-lg leading-relaxed mb-8">
                  Military operations don't always happen within 5G coverage. We
                  engineered an "Offline-First" architecture using Flutter and
                  Firebase.
                </p>

                <div className="space-y-6">
                  <div className="bg-[#1D201F] p-6 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <WifiOff className="text-[#f97316]" size={20} />
                      <h4 className="font-bold text-white">
                        Local Persistence
                      </h4>
                    </div>
                    <p className="text-sm text-[#B9BBBE]">
                      All CRUD operations occur on the local device database
                      first. The app feels instant, regardless of network
                      status.
                    </p>
                  </div>

                  <div className="bg-[#1D201F] p-6 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <Database className="text-[#f97316]" size={20} />
                      <h4 className="font-bold text-white">
                        Conflict Resolution
                      </h4>
                    </div>
                    <p className="text-sm text-[#B9BBBE]">
                      When connectivity returns, Firebase handles the
                      synchronization, intelligently merging changes from
                      multiple team members.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stack Visual */}
              <div className="bg-[#1D201F] rounded-2xl p-8 border border-white/5 flex flex-col justify-center gap-4">
                <div className="text-xs font-bold text-[#B9BBBE] uppercase tracking-widest mb-4">
                  Tech Stack
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span className="font-bold text-white">Flutter</span>
                  <span className="text-xs bg-[#f97316]/20 text-[#f97316] px-2 py-1 rounded">
                    UI Framework
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span className="font-bold text-white">
                    Firebase Firestore
                  </span>
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                    NoSQL DB
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span className="font-bold text-white">GetX</span>
                  <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                    State Mgmt
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span className="font-bold text-white">Cloud Functions</span>
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                    Backend Logic
                  </span>
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
                {/* Animated borders - Tactical Orange Primary */}
                <motion.div
                  className="absolute inset-0 border-2 border-[#f97316]/30 rounded-2xl"
                  animate={borderAnimation}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-[#f97316]/20 rounded-2xl"
                  animate={borderAnimation2}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-[#f97316]/15 rounded-2xl"
                  animate={borderAnimation3}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />

                <div
                  className="relative rounded-2xl bg-[#161918]/90 backdrop-blur-xl p-10 md:p-16 text-center overflow-hidden"
                  style={{ transform: "rotate(0.3deg)" }}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316]/10 rounded-full blur-[80px]" />

                  <h3 className="text-3xl md:text-5xl font-bold mb-6 text-[#E0D0C1]">
                    Need to Mobilize Your Ops?
                  </h3>

                  <p className="text-xl text-[#B9BBBE] mb-10 max-w-2xl mx-auto leading-relaxed">
                    We build mission-critical mobile applications that work in
                    the real world, not just on a fast Wi-Fi connection.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                    <button
                      onClick={() => navigate("/contact")}
                      className="btn-hero inline-flex items-center justify-center min-w-[240px] text-lg bg-[#f97316] text-black hover:bg-[#ea580c] border-none"
                    >
                      Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
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

export default Dronebag;
