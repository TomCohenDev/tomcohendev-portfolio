import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Smartphone,
  Check,
  X,
  Users,
  Clock,
  WifiOff,
  Database,
  Zap,
  ChevronLeft,
  Phone,
  MessageCircle,
} from "lucide-react";

// --- CUSTOM UI COMPONENTS (CSS-ONLY MOCKUPS) ---

// 1. App Screen Container (The Phone Shell)
const PhoneMockup = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`relative bg-[#09090b] rounded-[3rem] p-3 shadow-2xl border-4 border-[#27272a] h-[600px] w-[300px] overflow-hidden ${className}`}
  >
    {/* Dynamic Island / Notch */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-24 bg-black rounded-b-2xl z-20"></div>
    {/* Status Bar */}
    <div className="absolute top-4 left-6 right-6 flex justify-between text-[10px] text-white z-20 font-medium">
      <span>9:41</span>
      <div className="flex gap-1">
        <div className="w-4 h-2.5 bg-white rounded-sm" />
      </div>
    </div>
    {/* Screen Content */}
    <div className="bg-[#f4f4f5] w-full h-full rounded-[2.2rem] overflow-hidden text-slate-800 font-sans relative">
      {children}
    </div>
  </div>
);

// 2. Screen: Class List (Home)
const ScreenClassList = () => (
  <div className="flex flex-col h-full bg-slate-50">
    <div className="pt-12 pb-4 px-6 bg-white shadow-sm z-10">
      <h2 className="text-2xl font-bold text-slate-900">My Classes</h2>
      <p className="text-slate-500 text-xs">Today, Oct 24</p>
    </div>
    <div className="p-4 space-y-3 overflow-y-auto">
      {[
        {
          name: "Geometry 101",
          time: "14:00 - 15:30",
          students: 12,
          color: "bg-blue-100 text-blue-700",
        },
        {
          name: "Algebra Adv.",
          time: "16:00 - 17:30",
          students: 8,
          color: "bg-purple-100 text-purple-700",
        },
        {
          name: "Physics Prep",
          time: "18:00 - 19:00",
          students: 15,
          color: "bg-orange-100 text-orange-700",
        },
      ].map((cls, i) => (
        <div
          key={i}
          className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between"
        >
          <div>
            <div className="font-bold text-slate-800">{cls.name}</div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <Clock size={12} /> {cls.time}
            </div>
          </div>
          <div
            className={`px-2 py-1 rounded-lg text-xs font-bold ${cls.color}`}
          >
            {cls.students}
          </div>
        </div>
      ))}
    </div>
    {/* Floating Action Button */}
    <div className="absolute bottom-6 right-6 w-14 h-14 bg-[#bef264] rounded-full shadow-lg shadow-lime-900/10 flex items-center justify-center text-black">
      <span className="text-2xl font-light">+</span>
    </div>
  </div>
);

// 3. Screen: Attendance (Interactive)
const ScreenAttendance = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Sarah M.", status: "present" },
    { id: 2, name: "Tom C.", status: "absent" },
    { id: 3, name: "Mike R.", status: "present" },
    { id: 4, name: "Jenny L.", status: "present" },
    { id: 5, name: "David K.", status: "pending" },
    { id: 6, name: "Lisa P.", status: "pending" },
  ]);

  // Auto-toggle for animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setStudents((prev) =>
        prev.map((s) =>
          s.status === "pending"
            ? { ...s, status: Math.random() > 0.2 ? "present" : "absent" }
            : s
        )
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="pt-12 pb-4 px-4 bg-white shadow-sm flex items-center gap-2">
        <ChevronLeft size={20} className="text-slate-400" />
        <div>
          <h2 className="text-lg font-bold text-slate-900">Attendance</h2>
          <p className="text-slate-500 text-xs">Geometry 101 • Oct 24</p>
        </div>
      </div>
      <div className="p-4 space-y-3">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                {student.name.charAt(0)}
              </div>
              <span className="font-medium text-sm text-slate-800">
                {student.name}
              </span>
            </div>
            <div className="flex gap-2">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  student.status === "present"
                    ? "bg-[#bef264] text-black shadow-md"
                    : "bg-slate-100 text-slate-300"
                }`}
                animate={{ scale: student.status === "present" ? 1.1 : 1 }}
              >
                <Check size={16} />
              </motion.div>
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  student.status === "absent"
                    ? "bg-red-100 text-red-500 shadow-md"
                    : "bg-slate-100 text-slate-300"
                }`}
                animate={{ scale: student.status === "absent" ? 1.1 : 1 }}
              >
                <X size={16} />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto p-4 bg-white border-t border-slate-100">
        <button className="w-full py-3 bg-black text-white rounded-xl font-medium text-sm">
          Save Record
        </button>
      </div>
    </div>
  );
};

// 4. Screen: Student Profile
const ScreenProfile = () => (
  <div className="flex flex-col h-full bg-white">
    <div className="h-32 bg-slate-900 relative">
      <div className="absolute -bottom-8 left-6 w-20 h-20 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center text-2xl font-bold text-slate-400">
        SM
      </div>
    </div>
    <div className="mt-10 px-6">
      <h2 className="text-2xl font-bold text-slate-900">Sarah Miller</h2>
      <p className="text-slate-500 text-sm">Grade 11 • Joined Sept 2024</p>

      <div className="flex gap-4 mt-6">
        <div className="flex-1 bg-[#bef264]/20 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-lime-800">92%</div>
          <div className="text-[10px] uppercase text-lime-700 font-bold">
            Attendance
          </div>
        </div>
        <div className="flex-1 bg-slate-100 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-slate-800">Pd</div>
          <div className="text-[10px] uppercase text-slate-500 font-bold">
            Payment
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Contacts
        </h3>
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
          <div>
            <div className="text-xs text-slate-500">Mother</div>
            <div className="font-medium text-sm">Dana Miller</div>
          </div>
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <Phone size={14} />
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <MessageCircle size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Spidclass = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Parallax effects
  const yPhones = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Border animations (Standard across case studies)
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
      className="min-h-screen bg-[#1D201F] text-[#E0D0C1] font-nunito selection:bg-[#bef264]/30"
    >
      <Header />

      <main className="overflow-hidden">
        {/* --- SECTION 1: HERO (Cascade Layout) --- */}
        <section className="relative min-h-screen flex items-center pt-32 pb-20">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#bef264]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-800/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="container-padding w-full relative z-10">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Text Content */}
              <motion.div style={{ y: yText }} className="space-y-8">
                <div className="inline-block px-4 py-1.5 bg-[#bef264]/10 border border-[#bef264]/20 rounded-full text-sm font-bold text-[#bef264] tracking-wide">
                  MOBILE APP • EDUCATION
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-[#E0D0C1] leading-[1.1]">
                  Classroom Management at <br />
                  <span className="text-[#bef264]">The Speed of Tap.</span>
                </h1>

                <p className="text-xl md:text-2xl text-[#B9BBBE] leading-relaxed max-w-xl">
                  We built a cross-platform mobile app that reduced
                  administrative work by 90% for a private tutoring business.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                    <Zap className="text-[#bef264]" size={18} />
                    <span className="text-sm font-bold">Flutter</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                    <Database className="text-[#bef264]" size={18} />
                    <span className="text-sm font-bold">Firebase</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                    <WifiOff className="text-[#bef264]" size={18} />
                    <span className="text-sm font-bold">Offline First</span>
                  </div>
                </div>
              </motion.div>

              {/* Right: Phone Cascade */}
              <motion.div
                style={{ y: yPhones }}
                className="relative h-[600px] flex items-center justify-center perspective-1000"
              >
                {/* Phone 1: Profile (Back) */}
                <motion.div
                  initial={{ opacity: 0, x: 50, rotate: 10 }}
                  animate={{ opacity: 0.6, x: 120, rotate: 12 }}
                  className="absolute z-10 scale-90"
                >
                  <PhoneMockup className="bg-slate-800 border-slate-700">
                    <ScreenProfile />
                  </PhoneMockup>
                </motion.div>

                {/* Phone 2: Class List (Middle) */}
                <motion.div
                  initial={{ opacity: 0, x: 0, rotate: 0 }}
                  animate={{ opacity: 0.8, x: 0, rotate: -5 }}
                  className="absolute z-20 scale-95"
                >
                  <PhoneMockup className="bg-slate-800 border-slate-700">
                    <ScreenClassList />
                  </PhoneMockup>
                </motion.div>

                {/* Phone 3: Attendance (Front) */}
                <motion.div
                  initial={{ opacity: 0, y: 50, rotate: 0 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute z-30 shadow-[0_50px_100px_rgba(190,242,100,0.15)]"
                >
                  <PhoneMockup className="border-[#bef264]/30">
                    <ScreenAttendance />
                  </PhoneMockup>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: THE PROBLEM (Data Viz) --- */}
        <section className="section-padding bg-[#161918] border-y border-white/5">
          <div className="container-padding">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1 relative">
                  {/* Abstract "Chaos" Visualization */}
                  <div className="relative h-[400px] bg-[#1D201F] rounded-2xl border border-white/5 overflow-hidden p-8 flex flex-col items-center justify-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>

                    {/* Floating "Paper" elements representing chaos */}
                    <motion.div
                      animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute top-10 left-10 bg-white p-4 rounded shadow-lg w-40 rotate-[-6deg] z-10"
                    >
                      <div className="h-2 w-20 bg-slate-200 mb-2 rounded"></div>
                      <div className="h-2 w-28 bg-slate-200 mb-2 rounded"></div>
                      <div className="h-2 w-16 bg-slate-200 rounded"></div>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
                      transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                      className="absolute bottom-12 right-12 bg-white p-4 rounded shadow-lg w-48 rotate-[3deg] z-20"
                    >
                      <div className="flex gap-2 mb-2">
                        <div className="h-6 w-6 rounded-full bg-red-100"></div>
                        <div className="h-4 w-24 bg-slate-200 mt-1 rounded"></div>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded"></div>
                    </motion.div>

                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="relative z-30 bg-[#161918] border border-red-500/50 text-red-400 px-6 py-3 rounded-xl font-mono text-sm shadow-2xl"
                    >
                      ⚠ Error: Contact Missing
                    </motion.div>
                  </div>
                </div>

                <div className="order-1 md:order-2 space-y-6">
                  <h2 className="text-3xl md:text-5xl font-bold text-[#E0D0C1]">
                    The Spreadsheet <br /> Nightmare
                  </h2>
                  <p className="text-lg text-[#B9BBBE] leading-relaxed">
                    Lior runs a thriving tutoring business, but success brought
                    chaos. Tracking attendance for multiple classes involved
                    scattered spreadsheets, paper notebooks, and endless
                    scrolling to find parent phone numbers.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="p-2 bg-red-500/10 rounded-lg text-red-400">
                        <Clock size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-[#E0D0C1]">
                          5 Hours / Week
                        </div>
                        <div className="text-sm text-[#B9BBBE]">
                          Wasted on manual admin
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="p-2 bg-red-500/10 rounded-lg text-red-400">
                        <Database size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-[#E0D0C1]">
                          Data Fragmentation
                        </div>
                        <div className="text-sm text-[#B9BBBE]">
                          Contacts trapped in phone logs vs notebooks
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: THE SOLUTION (Interactive Grid) --- */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-[#E0D0C1] mb-6">
                  Built for Velocity
                </h2>
                <p className="text-xl text-[#B9BBBE] max-w-2xl mx-auto">
                  We engineered a solution where every interaction takes less
                  than 2 seconds.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="bg-[#161918] rounded-2xl p-8 border border-white/5 hover:border-[#bef264]/30 transition-colors group">
                  <div className="w-12 h-12 bg-[#bef264]/10 rounded-xl flex items-center justify-center text-[#bef264] mb-6 group-hover:scale-110 transition-transform">
                    <Check size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    One-Tap Attendance
                  </h3>
                  <p className="text-[#B9BBBE] text-sm leading-relaxed mb-6">
                    No dropdowns. No saving. Just tap to mark present/absent.
                    The app timestamps the record automatically.
                  </p>
                  <div className="h-24 bg-[#09090b] rounded-lg border border-white/10 p-2 flex items-center justify-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#bef264] flex items-center justify-center text-black shadow-[0_0_15px_#bef264]">
                      <Check size={20} />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-600">
                      <X size={20} />
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-[#161918] rounded-2xl p-8 border border-white/5 hover:border-[#bef264]/30 transition-colors group">
                  <div className="w-12 h-12 bg-[#bef264]/10 rounded-xl flex items-center justify-center text-[#bef264] mb-6 group-hover:scale-110 transition-transform">
                    <Users size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Centralized Profiles
                  </h3>
                  <p className="text-[#B9BBBE] text-sm leading-relaxed mb-6">
                    Student info, payment status, and parent contacts
                    (Mother/Father) all in one view.
                  </p>
                  <div className="h-24 bg-[#09090b] rounded-lg border border-white/10 p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700" />
                      <div className="space-y-1">
                        <div className="w-20 h-2 bg-slate-700 rounded" />
                        <div className="w-12 h-2 bg-slate-800 rounded" />
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <div className="w-6 h-6 rounded bg-green-900/50 flex items-center justify-center text-green-500">
                        <Phone size={10} />
                      </div>
                      <div className="w-6 h-6 rounded bg-blue-900/50 flex items-center justify-center text-blue-500">
                        <MessageCircle size={10} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="bg-[#161918] rounded-2xl p-8 border border-white/5 hover:border-[#bef264]/30 transition-colors group">
                  <div className="w-12 h-12 bg-[#bef264]/10 rounded-xl flex items-center justify-center text-[#bef264] mb-6 group-hover:scale-110 transition-transform">
                    <Database size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Real-time Sync
                  </h3>
                  <p className="text-[#B9BBBE] text-sm leading-relaxed mb-6">
                    Updates on the phone appear instantly on the desktop web
                    app. Powered by Firebase Firestore.
                  </p>
                  <div className="h-24 bg-[#09090b] rounded-lg border border-white/10 p-2 flex items-center justify-center">
                    <div className="flex items-center gap-4 text-slate-600">
                      <Smartphone size={20} />
                      <motion.div
                        animate={{ x: [0, 20, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="h-1 w-1 bg-[#bef264] rounded-full"
                      />
                      <Database size={20} className="text-[#bef264]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: TECHNICAL ARCHITECTURE --- */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="max-w-5xl mx-auto bg-[#161918] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#bef264]/5 rounded-full blur-[80px]" />

              <div className="grid md:grid-cols-2 gap-12 relative z-10">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">
                    The Stack
                  </h3>
                  <p className="text-[#B9BBBE] mb-8">
                    We chose Flutter for a single codebase that deploys to iOS,
                    Android, and Web. Firebase handles the heavy lifting for the
                    backend.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-white/10 rounded-lg">
                      <span className="font-mono text-[#bef264]">Frontend</span>
                      <span className="text-white">Flutter (Dart)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-white/10 rounded-lg">
                      <span className="font-mono text-[#bef264]">Database</span>
                      <span className="text-white">Cloud Firestore</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-white/10 rounded-lg">
                      <span className="font-mono text-[#bef264]">Auth</span>
                      <span className="text-white">Firebase Auth</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-white/10 rounded-lg">
                      <span className="font-mono text-[#bef264]">
                        Analytics
                      </span>
                      <span className="text-white">Firebase Analytics</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="relative w-full max-w-sm aspect-square bg-[#1D201F] rounded-xl border border-white/5 p-6 flex flex-col items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent"></div>

                    {/* Diagram Nodes */}
                    <div className="flex justify-between w-full mb-8">
                      <div className="flex flex-col items-center">
                        <Smartphone className="text-slate-400 mb-2" />
                        <span className="text-xs text-slate-500">Mobile</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-1 bg-gradient-to-r from-slate-700 to-[#bef264] rounded-full my-auto animate-pulse" />
                      </div>
                      <div className="flex flex-col items-center">
                        <Database className="text-[#bef264] mb-2" />
                        <span className="text-xs text-[#bef264]">
                          Firestore
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-slate-400">
                        Offline Persistence Enabled
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 5: RESULTS --- */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#bef264] rounded-2xl p-8 text-black relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 opacity-10 transform rotate-12 group-hover:scale-110 transition-transform">
                    <Clock size={120} />
                  </div>
                  <div className="text-6xl font-bold mb-2">90%</div>
                  <div className="text-lg font-bold opacity-80">
                    Less Admin Time
                  </div>
                  <p className="mt-4 text-sm font-medium opacity-70">
                    Reduced daily tracking from 20 mins to 2 mins.
                  </p>
                </div>

                <div className="bg-[#161918] rounded-2xl p-8 border border-white/5 relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 text-white opacity-5 transform rotate-12 group-hover:scale-110 transition-transform">
                    <Users size={120} />
                  </div>
                  <div className="text-6xl font-bold text-white mb-2">100%</div>
                  <div className="text-lg font-bold text-[#B9BBBE]">
                    Data Accuracy
                  </div>
                  <p className="mt-4 text-sm text-[#B9BBBE]">
                    Eliminated errors from manual spreadsheet entry.
                  </p>
                </div>

                <div className="bg-[#161918] rounded-2xl p-8 border border-white/5 relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 text-white opacity-5 transform rotate-12 group-hover:scale-110 transition-transform">
                    <Zap size={120} />
                  </div>
                  <div className="text-6xl font-bold text-white mb-2">1w</div>
                  <div className="text-lg font-bold text-[#B9BBBE]">
                    Time to Market
                  </div>
                  <p className="mt-4 text-sm text-[#B9BBBE]">
                    From concept to App Store deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 6: CTA --- */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Animated borders */}
                <motion.div
                  className="absolute inset-0 border-2 border-[#bef264]/30 rounded-2xl"
                  animate={borderAnimation}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-[#bef264]/20 rounded-2xl"
                  animate={borderAnimation2}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-[#bef264]/15 rounded-2xl"
                  animate={borderAnimation3}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />

                <div className="relative bg-[#161918]/80 backdrop-blur-xl p-10 md:p-16 rounded-2xl text-center border border-white/5 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#bef264]/10 rounded-full blur-[80px]" />

                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
                    Need an MVP Fast?
                  </h3>
                  <p className="text-lg text-[#B9BBBE] mb-10 max-w-2xl mx-auto relative z-10">
                    We specialize in high-velocity mobile app development for
                    founders and small businesses.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                    <button
                      onClick={() => navigate("/contact")}
                      className="btn-hero inline-flex items-center justify-center min-w-[200px] bg-[#bef264] hover:bg-[#a3e635] text-black border-none"
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

export default Spidclass;
