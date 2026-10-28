import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Database,
  Lock,
  Server,
  ShieldCheck,
  Users,
  Settings,
  Activity,
  Code,
  Key,
  Terminal,
  Cloud,
  Layers,
  FileJson,
  CheckCircle,
  AlertCircle,
  Layout,
  RefreshCw,
} from "lucide-react";

// --- CUSTOM UI COMPONENTS (CSS-ONLY MOCKUPS) ---

// 1. Admin Dashboard Mockup
const AdminDashboardMockup = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#0f172a] rounded-xl overflow-hidden border border-slate-700 shadow-2xl font-sans text-slate-300">
      {/* Top Bar */}
      <div className="h-14 border-b border-slate-700 flex items-center justify-between px-6 bg-[#1e293b]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#007FFF] rounded-lg flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="font-semibold text-white">Admin Console</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            System Healthy
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600"></div>
        </div>
      </div>

      <div className="flex h-[400px]">
        {/* Sidebar */}
        <div className="w-64 border-r border-slate-700 bg-[#1e293b]/50 p-4 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === "users"
                ? "bg-[#007FFF]/20 text-[#007FFF]"
                : "hover:bg-slate-800"
            }`}
          >
            <Users size={16} /> Users & Roles
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === "content"
                ? "bg-[#007FFF]/20 text-[#007FFF]"
                : "hover:bg-slate-800"
            }`}
          >
            <Database size={16} /> Content Manager
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === "settings"
                ? "bg-[#007FFF]/20 text-[#007FFF]"
                : "hover:bg-slate-800"
            }`}
          >
            <Settings size={16} /> System Config
          </button>
          <div className="mt-auto">
            <div className="px-4 py-2 text-xs text-slate-500 uppercase font-bold tracking-wider">
              Infrastructure
            </div>
            <div className="mt-2 px-4 py-2 bg-slate-900 rounded border border-slate-700 text-xs font-mono text-green-400">
              redis: connected
              <br />
              db: connected
              <br />
              worker: active
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-[#0f172a] p-8 overflow-y-auto">
          {activeTab === "users" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">
                  User Management
                </h2>
                <button className="px-4 py-2 bg-[#007FFF] text-white rounded-lg text-sm font-medium hover:bg-blue-600">
                  Add User
                </button>
              </div>

              <div className="bg-[#1e293b] rounded-lg border border-slate-700 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-800 text-slate-400">
                    <tr>
                      <th className="px-6 py-3 font-medium">User</th>
                      <th className="px-6 py-3 font-medium">Role</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {[
                      {
                        name: "Sarah Connor",
                        email: "sarah@tech.co",
                        role: "Admin",
                        status: "active",
                      },
                      {
                        name: "John Doe",
                        email: "john@tech.co",
                        role: "Editor",
                        status: "active",
                      },
                      {
                        name: "Jane Smith",
                        email: "jane@tech.co",
                        role: "Viewer",
                        status: "pending",
                      },
                    ].map((user, i) => (
                      <tr key={i} className="hover:bg-slate-800/50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-white">
                            {user.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs border ${
                              user.role === "Admin"
                                ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                                : "bg-slate-700 border-slate-600 text-slate-300"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`flex items-center gap-1.5 text-xs ${
                              user.status === "active"
                                ? "text-green-400"
                                : "text-yellow-400"
                            }`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                user.status === "active"
                                  ? "bg-green-400"
                                  : "bg-yellow-400"
                              }`}
                            />
                            {user.status.charAt(0).toUpperCase() +
                              user.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-slate-400 hover:text-white">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "content" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-full text-slate-500"
            >
              <div className="text-center">
                <Database size={48} className="mx-auto mb-4 opacity-20" />
                <p>Content Management Module</p>
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-full text-slate-500"
            >
              <div className="text-center">
                <Settings size={48} className="mx-auto mb-4 opacity-20" />
                <p>System Configuration</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

// 2. Infrastructure Diagram Mockup
const InfraDiagram = () => (
  <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-[#0f172a] rounded-xl border border-slate-700 p-8 flex items-center justify-center select-none overflow-hidden">
    {/* Background Grid */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

    {/* Nodes */}
    <div className="relative z-10 flex gap-12 items-center">
      {/* Client Layer */}
      <div className="flex flex-col gap-4">
        <div className="w-24 h-24 bg-[#1e293b] border border-slate-600 rounded-xl flex flex-col items-center justify-center shadow-lg relative group">
          <Layout className="text-[#007FFF] mb-2" />
          <span className="text-xs font-mono text-slate-400">Client App</span>
          <div className="absolute -right-6 top-1/2 w-6 h-[2px] bg-slate-600" />
        </div>
      </div>

      {/* API Gateway */}
      <div className="w-32 h-40 bg-[#1e293b] border-2 border-[#007FFF] rounded-xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,127,255,0.2)] relative">
        <div className="absolute -top-3 bg-[#007FFF] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
          FASTAPI
        </div>
        <Server className="text-[#007FFF] mb-2" />
        <span className="text-xs font-bold text-white">API Gateway</span>
        <div className="mt-2 text-[10px] text-slate-500 font-mono text-center px-2">
          Auth Middleware
          <br />
          Rate Limiting
        </div>

        {/* Connection Lines */}
        <div className="absolute -right-6 top-1/3 w-6 h-[2px] bg-slate-600" />
        <div className="absolute -right-6 bottom-1/3 w-6 h-[2px] bg-slate-600" />
      </div>

      {/* Data Layer */}
      <div className="flex flex-col gap-8">
        {/* Redis */}
        <div className="w-28 h-24 bg-[#1e293b] border border-red-500/50 rounded-xl flex flex-col items-center justify-center shadow-lg relative">
          <div className="absolute -top-2 bg-red-500 text-white text-[9px] px-2 py-[1px] rounded-full font-bold">
            REDIS
          </div>
          <Activity className="text-red-400 mb-2" />
          <span className="text-xs font-mono text-slate-400">
            Cache/Session
          </span>
        </div>

        {/* Database */}
        <div className="w-28 h-24 bg-[#1e293b] border border-yellow-500/50 rounded-xl flex flex-col items-center justify-center shadow-lg relative">
          <div className="absolute -top-2 bg-yellow-500 text-black text-[9px] px-2 py-[1px] rounded-full font-bold">
            FIRESTORE
          </div>
          <Database className="text-yellow-400 mb-2" />
          <span className="text-xs font-mono text-slate-400">NoSQL Store</span>
        </div>
      </div>
    </div>
  </div>
);

// 3. Code Snippet: Protected Route
const CodeSnippet = () => (
  <div className="w-full bg-[#0d1117] rounded-lg border border-slate-700 p-4 font-mono text-xs md:text-sm overflow-x-auto shadow-xl">
    <div className="flex gap-1.5 mb-4">
      <div className="w-3 h-3 rounded-full bg-red-500/50" />
      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
      <div className="w-3 h-3 rounded-full bg-green-500/50" />
    </div>
    <div className="text-slate-300 space-y-1">
      <p>
        <span className="text-purple-400">@app.get</span>(
        <span className="text-green-400">"/admin/users"</span>)
      </p>
      <p>
        <span className="text-purple-400">async def</span>{" "}
        <span className="text-blue-400">get_users</span>(
      </p>
      <p className="pl-4">
        current_user: User = <span className="text-yellow-400">Depends</span>
        (get_current_active_user)
      </p>
      <p>):</p>
      <p className="pl-4">
        <span className="text-slate-500">
          # Check permissions via Redis cache
        </span>
      </p>
      <p className="pl-4">
        <span className="text-purple-400">if not</span> current_user.is_admin:
      </p>
      <p className="pl-8">
        <span className="text-purple-400">raise</span> HTTPException(
      </p>
      <p className="pl-12">status_code=403,</p>
      <p className="pl-12">
        detail=
        <span className="text-green-400">"Insufficient permissions"</span>
      </p>
      <p className="pl-8">)</p>
      <p className="pl-4">
        <span className="text-purple-400">return</span> db.get_all_users()
      </p>
    </div>
  </div>
);

const FullstackApps = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Parallax
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
      className="min-h-screen bg-[#1D201F] text-[#E0D0C1] font-nunito selection:bg-[#007FFF]/30"
    >
      <Header />

      <main className="overflow-hidden">
        {/* --- SECTION 1: HERO --- */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#007FFF]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container-padding relative z-10 w-full">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Content */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#007FFF]/10 border border-[#007FFF]/20 rounded-full text-sm font-medium text-[#007FFF]"
                >
                  <Server size={14} /> Enterprise Solutions
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-bold text-[#E0D0C1] leading-[1.1]"
                >
                  Scalable Systems. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007FFF] to-cyan-400">
                    Secure Data.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl text-[#B9BBBE] leading-relaxed max-w-xl"
                >
                  We build production-ready full-stack applications with robust
                  authentication, admin panels, and scalable infrastructure.
                </motion.p>

                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-3 pt-4"
                >
                  {[
                    "React",
                    "FastAPI",
                    "Redis",
                    "Firebase",
                    "OAuth 2.0",
                    "Python",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm text-[#B9BBBE] font-mono"
                    >
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
                <div className="relative z-10 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <AdminDashboardMockup />
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-10 top-10 z-20 w-48 bg-[#1e293b] border border-white/10 p-4 rounded-xl shadow-2xl hidden md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">
                        Security Audit
                      </div>
                      <div className="text-sm font-bold text-white">Passed</div>
                    </div>
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
                  className="absolute -left-8 bottom-20 z-20 w-40 bg-[#1e293b] border border-white/10 p-4 rounded-xl shadow-2xl hidden md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#007FFF]/20 flex items-center justify-center text-[#007FFF]">
                      <Activity size={20} />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Uptime</div>
                      <div className="text-sm font-bold text-white">99.99%</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: THE PROBLEM (Scalability) --- */}
        <section className="section-padding bg-[#161918] border-y border-white/5 relative">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-[#E0D0C1] mb-6">
                The Scaling Bottleneck
              </h2>
              <p className="text-xl text-[#B9BBBE] leading-relaxed">
                Manual user management and insecure data practices were holding
                our clients back. They needed enterprise-grade systems to handle
                growth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#1D201F] p-8 rounded-2xl border border-white/5 hover:border-red-500/30 transition-colors group">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                  <AlertCircle size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Security Risks
                </h3>
                <p className="text-[#B9BBBE] text-sm">
                  Lack of proper role-based access control (RBAC) meant
                  sensitive data was at risk of exposure.
                </p>
              </div>

              <div className="bg-[#1D201F] p-8 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-colors group">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center text-yellow-500 mb-6 group-hover:scale-110 transition-transform">
                  <Settings size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Manual Admin
                </h3>
                <p className="text-[#B9BBBE] text-sm">
                  Founders were spending 15+ hours/week manually updating
                  database records for users.
                </p>
              </div>

              <div className="bg-[#1D201F] p-8 rounded-2xl border border-white/5 hover:border-[#007FFF]/30 transition-colors group">
                <div className="w-12 h-12 bg-[#007FFF]/10 rounded-lg flex items-center justify-center text-[#007FFF] mb-6 group-hover:scale-110 transition-transform">
                  <Database size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Data Chaos
                </h3>
                <p className="text-[#B9BBBE] text-sm">
                  Unstructured data in spreadsheets made it impossible to build
                  new features or analyze growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: THE SOLUTION (Architecture) --- */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            {/* Feature 1: Backend Architecture */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
              <div className="order-2 lg:order-1 relative">
                <div className="bg-[#161918] p-8 rounded-3xl border border-white/5 relative z-10 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <Terminal size={20} className="text-[#007FFF]" />
                    <span className="text-sm font-bold text-white uppercase tracking-wider">
                      System Architecture
                    </span>
                  </div>
                  <InfraDiagram />
                </div>
                {/* Decorative BG */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#007FFF]/5 rounded-full blur-[100px] pointer-events-none" />
              </div>

              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#007FFF]/10 text-[#007FFF] rounded-full text-xs font-bold mb-6">
                  <Cloud size={12} /> CLOUD INFRASTRUCTURE
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#E0D0C1] mb-6">
                  Production-Ready{" "}
                  <span className="text-[#007FFF]">Microservices</span>
                </h2>
                <p className="text-lg text-[#B9BBBE] leading-relaxed mb-8">
                  We architected a scalable backend using Python FastAPI for
                  high-performance logic and Redis for lightning-fast caching.
                  The system handles authentication via Google OAuth 2.0 and
                  manages data consistency across distributed services.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-[#007FFF]" />
                    <span className="text-white">
                      Redis Caching Layer (sub-ms latency)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-[#007FFF]" />
                    <span className="text-white">Secure HttpOnly Cookies</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-[#007FFF]" />
                    <span className="text-white">
                      Automated Background Workers
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Admin Panels */}
            <div className="bg-[#161918] rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden mb-32">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#007FFF]/5 rounded-full blur-[100px]" />

              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-bold">
                    <Layout size={12} /> ADMIN TOOLS
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#E0D0C1]">
                    Control Center
                  </h2>
                  <p className="text-lg text-[#B9BBBE] leading-relaxed">
                    We built custom administrative dashboards that empower
                    non-technical founders to manage users, permissions, and
                    content without touching a single line of code.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="text-2xl font-bold text-white mb-1">
                        RBAC
                      </div>
                      <div className="text-xs text-[#B9BBBE]">
                        Role-Based Access
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="text-2xl font-bold text-white mb-1">
                        Logs
                      </div>
                      <div className="text-xs text-[#B9BBBE]">Audit Trail</div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#007FFF] to-purple-600 rounded-2xl opacity-20 blur-lg" />
                  <AdminDashboardMockup />
                </div>
              </div>
            </div>

            {/* Feature 3: Security & Code */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-bold mb-6">
                  <Lock size={12} /> SECURITY FIRST
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#E0D0C1] mb-6">
                  Enterprise-Grade Security
                </h2>
                <p className="text-lg text-[#B9BBBE] leading-relaxed mb-8">
                  Security isn't an afterthought. We implement signed session
                  cookies, strict CORS policies, and dependency injection for
                  permission validation on every API route.
                </p>
                <CodeSnippet />
              </div>

              <div className="relative flex justify-center items-center">
                <div className="relative w-64 h-64">
                  {/* Abstract Lock Visual */}
                  <div className="absolute inset-0 bg-[#007FFF]/10 rounded-full animate-pulse" />
                  <div className="absolute inset-4 border border-[#007FFF]/30 rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center text-[#007FFF]">
                    <ShieldCheck size={80} strokeWidth={1} />
                  </div>

                  {/* Orbiting Elements */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0"
                  >
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1e293b] p-2 rounded-lg border border-slate-600 shadow-xl">
                      <Key size={16} className="text-yellow-400" />
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-8"
                  >
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#1e293b] p-2 rounded-lg border border-slate-600 shadow-xl">
                      <FileJson size={16} className="text-green-400" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 4: RESULTS --- */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#007FFF] rounded-2xl p-8 text-white relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 opacity-10 transform rotate-12 group-hover:scale-110 transition-transform">
                    <RefreshCw size={120} />
                  </div>
                  <div className="text-6xl font-bold mb-2">95%</div>
                  <div className="text-lg font-bold opacity-90">Automation</div>
                  <p className="mt-4 text-sm font-medium opacity-80">
                    Reduction in manual administrative tasks via custom panels.
                  </p>
                </div>

                <div className="bg-[#161918] rounded-2xl p-8 border border-white/5 relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 text-white opacity-5 transform rotate-12 group-hover:scale-110 transition-transform">
                    <Activity size={120} />
                  </div>
                  <div className="text-6xl font-bold text-white mb-2">99%</div>
                  <div className="text-lg font-bold text-[#B9BBBE]">Uptime</div>
                  <p className="mt-4 text-sm text-[#B9BBBE]">
                    Production stability with automated health checks.
                  </p>
                </div>

                <div className="bg-[#161918] rounded-2xl p-8 border border-white/5 relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 text-white opacity-5 transform rotate-12 group-hover:scale-110 transition-transform">
                    <Users size={120} />
                  </div>
                  <div className="text-6xl font-bold text-white mb-2">10x</div>
                  <div className="text-lg font-bold text-[#B9BBBE]">
                    Scalability
                  </div>
                  <p className="mt-4 text-sm text-[#B9BBBE]">
                    Architecture ready for 10x user growth without changes.
                  </p>
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
                {/* Animated borders - Deep Azure Primary */}
                <motion.div
                  className="absolute inset-0 border-2 border-[#007FFF]/30 rounded-2xl"
                  animate={borderAnimation}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-[#007FFF]/20 rounded-2xl"
                  animate={borderAnimation2}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-[#007FFF]/15 rounded-2xl"
                  animate={borderAnimation3}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />

                <div
                  className="relative rounded-2xl bg-[#161918]/90 backdrop-blur-xl p-10 md:p-16 text-center overflow-hidden"
                  style={{ transform: "rotate(0.3deg)" }}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#007FFF]/10 rounded-full blur-[80px]" />

                  <h3 className="text-3xl md:text-5xl font-bold mb-6 text-[#E0D0C1]">
                    Need a Custom Backend?
                  </h3>

                  <p className="text-xl text-[#B9BBBE] mb-10 max-w-2xl mx-auto leading-relaxed">
                    Stop building on spreadsheets. We build secure, scalable
                    software infrastructure that grows with your business.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                    <button
                      onClick={() => navigate("/contact")}
                      className="btn-hero inline-flex items-center justify-center min-w-[240px] text-lg bg-[#007FFF] text-white hover:bg-blue-600 border-none"
                    >
                      Build My Platform <ArrowRight className="ml-2 w-5 h-5" />
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

export default FullstackApps;
