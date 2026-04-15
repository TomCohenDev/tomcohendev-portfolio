import {
  ArrowRight,
  Smartphone,
  Globe,
  Brain,
  MessageSquare,
  Bot,
  FileText,
  Zap,
  CheckCircle,
  Activity,
  Clock,
  Calendar,
  ChevronDown,
  Flame,
  Gauge,
  Server,
  Target,
  Battery,
  Layout,
  Database,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- REUSABLE HELPER: CSS PHONE MOCKUP ---
const PhoneFrame = ({
  children,
  borderColor = "border-gray-800",
}: {
  children: React.ReactNode;
  borderColor?: string;
}) => (
  <div
    className={`relative mx-auto w-[240px] h-[480px] bg-black rounded-[2.5rem] border-[8px] ${borderColor} shadow-2xl overflow-hidden`}
  >
    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-24 bg-black rounded-b-xl z-20"></div>
    <div className="w-full h-full bg-[#1a1a1a] overflow-hidden relative">
      {children}
    </div>
  </div>
);

// --- REUSABLE HELPER: CSS BROWSER MOCKUP ---
const BrowserFrame = ({
  children,
  borderColor = "border-white/10",
}: {
  children: React.ReactNode;
  borderColor?: string;
}) => (
  <div
    className={`w-full bg-[#0c0c0c] rounded-xl overflow-hidden border ${borderColor} shadow-2xl`}
  >
    <div className="bg-[#1a1a1a] px-4 py-2 flex items-center gap-2 border-b border-white/5">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
      </div>
      <div className="flex-1 bg-black/20 rounded px-3 py-1 mx-2 border border-white/5 h-6" />
    </div>
    <div className="relative aspect-video bg-[#121212]">{children}</div>
  </div>
);

const CaseStudySection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-muted section-padding" id="case-studies">
      <div className="container-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:gap-12 items-center">
            {/* Left Content - Combined title, description, and button for desktop */}
            <div className="lg:w-1/2 w-full space-y-8 order-1 lg:order-1">
              <div className="mb-0 lg:mb-0">
                <div className="inline-block px-4 py-1.5 bg-background border border-[#bf95f9]/20 rounded-full text-sm font-medium text-[#bf95f9] mb-4">
                  <Bot size={14} className="inline mr-2" /> Internal Project
                </div>

                <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  From day-long hiring to{" "}
                  <span className="text-primary">5-minute matches</span>
                </h2>
              </div>

              {/* Description and Button - Hidden on mobile, shown here on desktop */}
              <div className="hidden lg:block space-y-8">
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Traditional hiring processes are slow and inefficient.
                    Employers spend hours wading through endless résumés, while
                    freelancers waste time on cold outreach and sales pitches.
                  </p>
                  <p>
                    We built <strong>Gomlin Jobs</strong>—a dual-platform job
                    matching ecosystem with AI-powered SmartMatch™ technology,
                    featuring a web platform for employers and a Tinder-style
                    mobile app for job seekers.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {[
                    "Flutter",
                    "React",
                    "AI Integration",
                    "n8n Automation",
                    "Dual Platform",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6">
                  <button
                    className="inline-flex items-center text-lg text-[#bf95f9] font-bold"
                    onClick={() => navigate("/case-studies/gomlin-jobs")}
                  >
                    See how we cut hiring time by 95%{" "}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Image/Visual - Second on mobile, right side on desktop */}
            <div className="lg:w-1/2 w-full order-2 lg:order-2 mb-20 lg:mb-0">
              <div className="relative w-full max-w-2xl mx-auto min-h-[500px] flex items-center justify-center">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[#bf95f9]/10 blur-[100px] rounded-full pointer-events-none" />
                {/* Back Layer: Mac Browser Model with Web Dashboard */}
                <div className="relative w-[95%] z-10">
                  <div className="bg-gray-900 rounded-t-lg shadow-2xl overflow-hidden">
                    {/* Browser Top Bar */}
                    <div className="bg-gray-800/50 px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
                      {/* Traffic Lights */}
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                      </div>
                      {/* Address Bar */}
                      <div className="flex-1 bg-gray-900/50 rounded-md px-3 py-1.5 mx-2 border border-white/5">
                        <div className="text-xs text-gray-400 truncate">
                          gomlin.com
                        </div>
                      </div>
                    </div>
                    {/* Screen Content */}
                    <div className="bg-[#1D201F]">
                      <img
                        src="/case_studies/gomlinjobs/assets/screenshots/web/web-platform-landing-page.webp"
                        alt="Web platform dashboard"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>

                {/* Front Layer: Phone Model with Image (Stacked on top) */}
                <div className="absolute right-[5%] bottom-[-8%] w-[32%] max-w-[280px] z-20 transform rotate-[-3deg]">
                  <div className="relative bg-gray-950 rounded-[2.5rem] p-2 shadow-[-30px_30px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(191,149,249,0.1)]">
                    {/* Notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10"></div>
                    {/* Screen */}
                    <div className="bg-black rounded-[2rem] overflow-hidden">
                      <img
                        src="/case_studies/gomlinjobs/assets/icons/app-feature-preview.webp"
                        alt="Mobile app feature preview"
                        loading="lazy"
                        decoding="async"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description and Button - Third on mobile, hidden on desktop (shown in left column above) */}
            <div className="lg:hidden w-full order-3 space-y-8">
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Traditional hiring processes are slow and inefficient.
                  Employers spend hours wading through endless résumés, while
                  freelancers waste time on cold outreach and sales pitches.
                </p>
                <p>
                  We built <strong>Gomlin Jobs</strong>—a dual-platform job
                  matching ecosystem with AI-powered SmartMatch™ technology,
                  featuring a web platform for employers and a Tinder-style
                  mobile app for job seekers.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {[
                  "Flutter",
                  "React",
                  "AI Integration",
                  "n8n Automation",
                  "Dual Platform",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-6">
                <button
                  className="group inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-sm border border-[#bf95f9]/20 text-[#bf95f9] font-semibold rounded-lg hover:bg-[#bf95f9]/10 hover:border-[#bf95f9]/40 transition-colors"
                  onClick={() => navigate("/case-studies/gomlin-jobs")}
                >
                  View Full Case Study
                  <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Nightwing Case Study - Reversed Layout (Image Left, Text Right) */}
          <div className="flex flex-col lg:flex-row lg:gap-12 items-center mt-32 pt-32 border-t border-border/50">
            {/* Left Image/Visual - The Automation Hub */}
            <div className="lg:w-1/2 w-full order-2 lg:order-1 mb-20 lg:mb-0">
              <div className="relative w-full max-w-xl mx-auto min-h-[450px] flex items-center justify-center">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[#d946ef]/10 blur-[100px] rounded-full pointer-events-none" />
                {/* 1. SVG ARROW - Arrow to Sheets (Center to Top Left) */}
                <div
                  className="absolute left-[0%] top-[40%] z-0 pointer-events-none"
                  style={{ width: "50%", height: "50%" }}
                >
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 89.34965018189575 102.77217789757572"
                    className="w-full h-full opacity-80"
                    style={{ transform: "scale(1.0) translate(-20%, -15%)" }}
                  >
                    <g
                      transform="translate(79.34965018189575 90.5350987063365) rotate(0 -34.67482509094788 -39.14900975754864)"
                      stroke="none"
                    >
                      <path
                        fill="#d946ef"
                        d="M 0.75,2.27 Q 0.75,2.27 -0.39,2.69 -1.54,3.11 -2.88,3.35 -4.22,3.60 -5.45,3.81 -6.69,4.02 -8.25,4.11 -9.81,4.20 -11.26,4.34 -12.70,4.48 -14.19,4.55 -15.68,4.63 -17.22,4.65 -18.76,4.67 -20.18,4.68 -21.60,4.70 -22.98,4.71 -24.36,4.72 -25.58,4.75 -26.81,4.77 -27.98,4.80 -29.15,4.83 -30.32,4.72 -31.50,4.61 -33.67,4.08 -35.84,3.54 -36.90,3.14 -37.97,2.74 -39.08,2.06 -40.18,1.38 -41.06,0.68 -41.93,-0.01 -43.51,-1.93 -45.08,-3.85 -45.57,-5.15 -46.07,-6.44 -46.38,-7.64 -46.70,-8.84 -46.96,-10.16 -47.21,-11.47 -47.33,-12.79 -47.46,-14.12 -47.51,-15.33 -47.56,-16.54 -47.45,-17.87 -47.33,-19.19 -47.15,-20.40 -46.96,-21.60 -46.58,-22.92 -46.21,-24.23 -45.57,-25.48 -44.94,-26.74 -44.22,-27.75 -43.49,-28.75 -42.79,-29.58 -42.08,-30.40 -40.46,-31.81 -38.84,-33.23 -37.24,-33.97 -35.65,-34.71 -34.00,-35.00 -32.34,-35.29 -30.65,-34.91 -28.96,-34.53 -28.09,-33.84 -27.21,-33.16 -26.64,-32.23 -26.08,-31.29 -25.81,-30.09 -25.54,-28.88 -25.60,-26.72 -25.65,-24.57 -26.04,-23.36 -26.43,-22.15 -27.08,-20.98 -27.74,-19.82 -28.38,-18.79 -29.03,-17.76 -30.17,-16.56 -31.31,-15.37 -32.40,-14.34 -33.49,-13.31 -34.94,-12.34 -36.39,-11.37 -37.80,-10.61 -39.21,-9.85 -40.40,-9.17 -41.60,-8.49 -43.30,-7.97 -45.01,-7.44 -46.48,-7.12 -47.94,-6.81 -49.34,-6.55 -50.74,-6.29 -52.09,-6.15 -53.43,-6.01 -54.66,-5.94 -55.89,-5.87 -57.78,-5.79 -59.67,-5.70 -60.86,-6.01 -62.06,-6.31 -63.00,-6.86 -63.94,-7.40 -64.77,-8.52 -65.59,-9.64 -66.41,-11.30 -67.23,-12.96 -67.81,-15.00 -68.40,-17.05 -68.76,-19.24 -69.12,-21.43 -69.16,-22.61 -69.21,-23.78 -69.23,-25.86 -69.26,-27.94 -69.26,-29.04 -69.25,-30.14 -69.25,-31.25 -69.24,-32.36 -69.23,-33.47 -69.23,-34.59 -69.08,-35.88 -68.94,-37.17 -68.74,-38.35 -68.54,-39.54 -68.32,-40.69 -68.10,-41.83 -67.86,-43.85 -67.62,-45.86 -67.21,-47.95 -66.79,-50.04 -66.56,-51.13 -66.34,-52.21 -65.90,-54.18 -65.46,-56.15 -65.01,-57.90 -64.57,-59.66 -64.17,-60.67 -63.77,-61.68 -63.30,-63.06 -62.83,-64.43 -62.37,-65.75 -61.90,-67.08 -61.48,-68.63 -61.06,-70.18 -60.60,-71.26 -60.15,-72.34 -59.74,-73.40 -59.33,-74.46 -58.70,-76.01 -58.06,-77.56 -57.46,-78.72 -56.85,-79.88 -56.78,-80.14 -56.70,-80.40 -56.42,-80.72 -56.14,-81.04 -55.79,-81.28 -55.44,-81.52 -55.04,-81.67 -54.64,-81.83 -54.22,-81.88 -53.80,-81.93 -53.38,-81.88 -52.95,-81.83 -52.55,-81.68 -52.16,-81.53 -51.81,-81.29 -51.45,-81.05 -51.17,-80.73 -50.89,-80.41 -50.69,-80.04 -50.49,-79.66 -50.39,-79.25 -50.28,-78.83 -50.28,-78.41 -50.28,-77.98 -50.38,-77.57 -50.48,-77.16 -50.68,-76.78 -50.88,-76.40 -52.31,-75.62 -53.75,-74.85 -55.22,-74.03 -56.69,-73.21 -57.99,-72.38 -59.29,-71.55 -60.44,-70.89 -61.59,-70.23 -62.71,-69.56 -63.83,-68.90 -64.69,-68.27 -65.55,-67.64 -65.71,-67.44 -65.88,-67.23 -66.11,-66.87 -66.34,-66.51 -66.66,-66.22 -66.97,-65.92 -67.34,-65.71 -67.71,-65.50 -68.13,-65.38 -68.54,-65.26 -68.97,-65.25 -69.40,-65.24 -69.82,-65.32 -70.24,-65.41 -70.62,-65.60 -71.01,-65.79 -71.34,-66.06 -71.67,-66.33 -71.92,-66.68 -72.18,-67.02 -72.35,-67.42 -72.51,-67.81 -72.58,-68.24 -72.64,-68.66 -72.61,-69.09 -72.57,-69.52 -72.43,-69.92 -72.29,-70.33 -70.01,-71.07 -67.74,-71.82 -66.62,-73.11 -65.50,-74.39 -64.43,-75.21 -63.36,-76.02 -62.00,-76.93 -60.64,-77.84 -59.74,-78.47 -58.84,-79.09 -57.68,-79.81 -56.53,-80.53 -55.53,-81.29 -54.54,-82.06 -52.27,-82.75 -50.00,-83.44 -48.90,-83.05 -47.79,-82.65 -47.25,-81.74 -46.71,-80.82 -46.62,-79.53 -46.52,-78.23 -46.52,-76.95 -46.52,-75.68 -46.53,-74.35 -46.53,-73.02 -46.37,-71.31 -46.21,-69.60 -45.77,-68.07 -45.34,-66.55 -45.19,-66.24 -45.04,-65.92 -44.56,-65.60 -44.07,-65.28 -43.71,-64.81 -43.36,-64.35 -43.16,-63.80 -42.97,-63.25 -42.97,-62.67 -42.96,-62.08 -43.14,-61.53 -43.32,-60.97 -43.67,-60.51 -44.02,-60.04 -44.50,-59.71 -44.98,-59.37 -45.54,-59.21 -46.10,-59.05 -46.69,-59.08 -47.27,-59.10 -47.81,-59.31 -48.36,-59.53 -48.81,-59.90 -49.25,-60.27 -49.56,-60.77 -49.86,-61.27 -50.00,-61.84 -50.13,-62.40 -50.07,-62.99 -50.01,-63.57 -49.77,-64.10 -49.53,-64.63 -49.13,-65.06 -48.74,-65.48 -48.22,-65.76 -47.71,-66.04 -47.13,-66.14 -46.56,-66.24 -45.98,-66.15 -45.41,-66.06 -44.89,-65.79 -44.37,-65.53 -43.96,-65.11 -43.56,-64.69 -43.31,-64.16 -43.06,-63.63 -42.99,-63.05 -42.92,-62.47 -43.04,-61.90 -43.16,-61.33 -43.46,-60.83 -43.76,-60.32 -44.20,-59.94 -44.64,-59.56 -45.18,-59.34 -45.72,-59.12 -46.30,-59.08 -46.88,-59.04 -47.45,-59.19 -48.01,-59.35 -48.01,-59.35 -48.01,-59.35 -49.87,-61.49 -51.73,-63.63 -52.28,-65.40 -52.83,-67.18 -53.07,-68.33 -53.32,-69.48 -53.50,-71.25 -53.68,-73.01 -53.69,-74.34 -53.70,-75.66 -53.22,-76.71 -52.74,-77.77 -51.25,-77.23 -49.76,-76.69 -50.73,-76.08 -51.69,-75.47 -53.07,-74.56 -54.45,-73.65 -55.59,-72.85 -56.73,-72.06 -57.98,-71.18 -59.23,-70.31 -60.44,-69.38 -61.65,-68.45 -63.01,-67.58 -64.36,-66.71 -65.74,-66.02 -67.12,-65.33 -68.41,-65.34 -69.70,-65.36 -67.79,-66.30 -65.88,-67.23 -66.11,-66.87 -66.34,-66.51 -66.66,-66.22 -66.97,-65.92 -67.34,-65.71 -67.71,-65.50 -68.13,-65.38 -68.54,-65.27 -68.97,-65.25 -69.40,-65.24 -69.82,-65.32 -70.24,-65.41 -70.62,-65.60 -71.01,-65.79 -71.34,-66.06 -71.67,-66.33 -71.92,-66.68 -72.18,-67.02 -72.35,-67.42 -72.51,-67.81 -72.58,-68.24 -72.64,-68.66 -72.61,-69.09 -72.57,-69.52 -72.43,-69.92 -72.29,-70.33 -72.11,-70.56 -71.92,-70.79 -71.05,-71.85 -70.18,-72.91 -69.07,-73.71 -67.96,-74.50 -66.81,-75.19 -65.65,-75.88 -64.38,-76.63 -63.11,-77.38 -61.76,-78.29 -60.40,-79.20 -58.80,-80.11 -57.21,-81.02 -55.97,-81.43 -54.74,-81.83 -55.72,-81.11 -56.70,-80.40 -56.42,-80.72 -56.14,-81.04 -55.79,-81.28 -55.44,-81.52 -55.04,-81.67 -54.64,-81.83 -54.22,-81.88 -53.80,-81.93 -53.38,-81.88 -52.95,-81.83 -52.55,-81.68 -52.16,-81.53 -51.81,-81.29 -51.45,-81.05 -51.17,-80.73 -50.89,-80.41 -50.69,-80.04 -50.49,-79.66 -50.39,-79.25 -50.28,-78.84 -50.28,-78.41 -50.28,-77.98 -50.38,-77.57 -50.48,-77.16 -50.68,-76.78 -50.88,-76.40 -51.33,-75.55 -51.78,-74.70 -52.50,-73.13 -53.22,-71.56 -53.87,-70.12 -54.52,-68.68 -54.99,-67.34 -55.46,-65.99 -55.93,-64.86 -56.40,-63.73 -56.92,-62.31 -57.44,-60.89 -58.06,-59.42 -58.67,-57.95 -59.12,-56.34 -59.58,-54.74 -60.02,-52.89 -60.47,-51.03 -60.68,-49.94 -60.90,-48.85 -61.11,-47.79 -61.33,-46.73 -61.67,-44.87 -62.02,-43.01 -62.13,-41.88 -62.25,-40.75 -62.44,-39.66 -62.64,-38.57 -62.92,-36.58 -63.20,-34.59 -63.19,-33.48 -63.18,-32.37 -63.17,-31.26 -63.16,-30.16 -63.15,-29.07 -63.14,-27.98 -63.12,-26.00 -63.10,-24.01 -62.99,-22.19 -62.88,-20.37 -62.45,-18.53 -62.01,-16.70 -61.57,-15.38 -61.14,-14.07 -60.38,-12.69 -59.61,-11.31 -57.86,-11.29 -56.10,-11.26 -55.01,-11.29 -53.91,-11.31 -52.82,-11.39 -51.73,-11.48 -50.43,-11.74 -49.12,-12.00 -47.84,-12.30 -46.57,-12.60 -45.46,-12.93 -44.36,-13.25 -43.18,-13.98 -41.99,-14.70 -40.83,-15.41 -39.66,-16.13 -38.70,-16.82 -37.74,-17.51 -36.12,-19.28 -34.50,-21.04 -33.56,-22.67 -32.62,-24.30 -32.31,-25.42 -31.99,-26.54 -32.72,-27.74 -33.44,-28.94 -34.52,-28.54 -35.61,-28.14 -36.64,-27.32 -37.67,-26.49 -38.75,-25.25 -39.83,-24.01 -40.53,-22.36 -41.24,-20.70 -41.51,-18.74 -41.78,-16.77 -41.65,-14.69 -41.53,-12.62 -41.28,-11.47 -41.04,-10.32 -40.55,-8.58 -40.07,-6.84 -39.14,-5.63 -38.21,-4.41 -37.07,-3.43 -35.92,-2.46 -34.22,-1.75 -32.53,-1.05 -30.84,-0.70 -29.15,-0.35 -27.98,-0.33 -26.82,-0.31 -25.60,-0.28 -24.38,-0.26 -23.01,-0.26 -21.65,-0.26 -20.25,-0.27 -18.85,-0.28 -17.39,-0.32 -15.93,-0.36 -14.59,-0.43 -13.25,-0.49 -11.68,-0.68 -10.11,-0.87 -8.80,-0.95 -7.49,-1.03 -5.29,-1.30 -3.08,-1.56 -1.92,-1.92 -0.75,-2.27 -0.47,-2.33 -0.19,-2.39 0.09,-2.38 0.38,-2.37 0.66,-2.28 0.94,-2.20 1.19,-2.06 1.44,-1.91 1.65,-1.71 1.86,-1.51 2.01,-1.27 2.17,-1.02 2.26,-0.75 2.35,-0.47 2.37,-0.19 2.39,0.09 2.35,0.38 2.30,0.66 2.19,0.93 2.07,1.20 1.90,1.43 1.73,1.66 1.50,1.84 1.28,2.03 1.02,2.15 0.75,2.27 0.75,2.27 L 0.75,2.27 Z"
                      ></path>
                    </g>
                  </svg>
                </div>

                {/* 2. SVG ARROW - Arrow to Telegram (Center to Bottom Right) */}
                <div
                  className="absolute right-[5%] bottom-[35%] z-0 pointer-events-none"
                  style={{ width: "50%", height: "50%" }}
                >
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 67.42622904925611 91.58675190238262"
                    className="w-full h-full opacity-80"
                    style={{ transform: "scale(1.0) translate(20%, 15%)" }}
                  >
                    <g
                      transform="translate(10 12.237086700988357) rotate(0 23.713114524628054 33.55628925020295)"
                      stroke="none"
                    >
                      <path
                        fill="#d946ef"
                        d="M -0.58,-2.33 Q -0.58,-2.33 0.96,-2.69 2.51,-3.06 3.83,-3.38 5.15,-3.71 6.51,-3.98 7.87,-4.26 9.19,-4.41 10.52,-4.57 11.87,-4.63 13.22,-4.70 14.70,-4.71 16.18,-4.72 17.80,-4.45 19.42,-4.18 20.88,-3.94 22.34,-3.69 23.76,-3.32 25.18,-2.94 26.53,-2.53 27.88,-2.11 29.33,-1.51 30.77,-0.90 32.05,-0.42 33.34,0.05 34.75,0.68 36.16,1.31 37.45,1.98 38.74,2.65 39.94,3.32 41.14,3.99 42.38,4.84 43.62,5.70 44.66,6.67 45.71,7.64 46.50,8.67 47.29,9.70 47.91,10.68 48.53,11.66 48.92,12.89 49.32,14.12 49.57,15.18 49.82,16.24 49.95,17.49 50.09,18.74 50.00,20.19 49.91,21.65 49.74,22.81 49.58,23.97 49.21,25.24 48.84,26.51 48.41,27.61 47.99,28.72 47.56,29.77 47.14,30.83 46.48,31.99 45.82,33.14 45.19,34.20 44.55,35.25 43.85,36.29 43.15,37.32 42.47,38.28 41.79,39.23 41.05,40.12 40.32,41.00 39.46,42.35 38.61,43.70 37.96,45.16 37.31,46.62 36.81,47.91 36.31,49.19 35.89,50.34 35.46,51.48 35.06,53.24 34.66,55.01 34.48,56.55 34.30,58.10 34.12,59.65 33.93,61.20 33.73,62.55 33.53,63.90 33.30,65.13 33.07,66.36 33.09,66.87 33.12,67.38 33.05,67.80 32.97,68.23 32.80,68.63 32.63,69.03 32.37,69.37 32.11,69.72 31.77,69.99 31.43,70.26 31.04,70.44 30.65,70.63 30.23,70.71 29.80,70.80 29.37,70.78 28.94,70.76 28.52,70.63 28.11,70.51 27.73,70.29 27.36,70.07 27.05,69.77 26.74,69.47 26.51,69.11 26.28,68.74 26.15,68.33 26.01,67.92 25.98,67.49 25.95,67.05 26.21,68.09 26.47,69.13 25.74,67.61 25.00,66.10 24.60,65.08 24.20,64.06 23.38,62.46 22.56,60.86 21.63,59.39 20.69,57.93 19.98,56.50 19.27,55.07 19.04,53.96 18.82,52.85 18.56,52.50 18.29,52.15 18.28,51.73 18.27,51.32 18.36,50.92 18.45,50.51 18.64,50.14 18.82,49.77 19.09,49.45 19.36,49.14 19.69,48.90 20.03,48.65 20.41,48.50 20.80,48.34 21.21,48.28 21.62,48.23 22.03,48.27 22.44,48.31 22.83,48.45 23.22,48.58 23.57,48.81 23.91,49.04 24.19,49.34 24.48,49.65 24.68,50.01 24.88,50.37 24.98,50.77 25.09,51.17 25.34,52.35 25.60,53.52 25.94,54.69 26.29,55.85 26.66,57.13 27.03,58.41 27.42,59.55 27.80,60.69 28.59,62.33 29.37,63.96 30.00,65.09 30.63,66.23 29.33,66.15 28.03,66.06 29.52,64.73 31.01,63.40 31.92,62.30 32.82,61.19 33.72,59.91 34.61,58.63 35.65,57.40 36.69,56.18 38.23,54.58 39.77,52.99 40.23,52.69 40.68,52.39 41.21,52.25 41.74,52.11 42.28,52.15 42.83,52.19 43.33,52.40 43.84,52.61 44.25,52.97 44.66,53.33 44.93,53.80 45.21,54.27 45.32,54.81 45.42,55.34 45.36,55.89 45.29,56.43 45.05,56.92 44.82,57.41 44.43,57.80 44.05,58.19 43.57,58.44 43.08,58.69 42.54,58.77 42.00,58.85 41.46,58.75 40.93,58.66 40.45,58.39 39.97,58.13 39.60,57.73 39.23,57.32 39.01,56.83 38.79,56.33 38.74,55.78 38.69,55.24 38.81,54.71 38.94,54.18 39.23,53.71 39.51,53.25 39.94,52.90 40.36,52.56 40.87,52.36 41.38,52.17 41.92,52.15 42.47,52.13 42.99,52.28 43.52,52.43 43.96,52.75 44.41,53.06 44.73,53.50 45.06,53.94 45.22,54.46 45.39,54.98 45.38,55.53 45.37,56.07 45.19,56.59 45.01,57.10 44.67,57.53 44.33,57.96 44.33,57.96 44.34,57.96 43.44,58.68 42.55,59.41 41.68,60.47 40.80,61.54 39.96,62.65 39.11,63.77 37.98,65.29 36.84,66.82 35.50,68.12 34.16,69.42 32.98,70.47 31.80,71.53 30.56,71.92 29.33,72.31 28.19,72.11 27.04,71.91 26.00,70.53 24.95,69.15 24.42,68.05 23.88,66.95 23.38,66.01 22.88,65.06 22.39,63.97 21.90,62.88 21.42,61.67 20.93,60.45 20.46,59.22 19.99,57.98 19.56,56.86 19.14,55.74 18.72,53.94 18.29,52.15 18.28,51.73 18.27,51.32 18.36,50.92 18.45,50.51 18.64,50.14 18.82,49.77 19.09,49.45 19.36,49.14 19.69,48.90 20.03,48.65 20.41,48.50 20.80,48.34 21.21,48.28 21.62,48.23 22.03,48.27 22.44,48.31 22.83,48.45 23.22,48.58 23.57,48.81 23.91,49.04 24.19,49.34 24.48,49.65 24.68,50.01 24.88,50.37 24.98,50.77 25.09,51.17 25.23,51.66 25.36,52.14 25.84,53.19 26.32,54.24 27.32,55.74 28.32,57.24 29.02,58.31 29.71,59.39 30.19,60.35 30.66,61.32 31.37,62.99 32.07,64.67 32.60,66.02 33.12,67.38 33.05,67.80 32.97,68.23 32.80,68.63 32.63,69.03 32.37,69.37 32.11,69.71 31.77,69.99 31.44,70.26 31.04,70.44 30.65,70.63 30.23,70.71 29.80,70.80 29.37,70.78 28.94,70.76 28.52,70.63 28.11,70.51 27.73,70.29 27.36,70.08 27.05,69.77 26.74,69.47 26.51,69.11 26.28,68.74 26.15,68.33 26.01,67.92 25.98,67.49 25.95,67.05 25.96,66.83 25.97,66.60 26.23,65.34 26.49,64.09 26.73,62.93 26.97,61.76 27.20,60.48 27.44,59.21 27.52,58.15 27.59,57.09 27.86,55.70 28.13,54.32 28.55,52.66 28.97,51.00 29.30,49.98 29.64,48.97 30.14,47.81 30.65,46.65 31.26,45.32 31.86,43.99 32.69,42.33 33.51,40.67 34.10,39.72 34.69,38.78 35.90,37.33 37.12,35.88 37.76,34.99 38.40,34.10 39.01,33.21 39.62,32.32 40.71,30.49 41.80,28.67 42.23,27.61 42.66,26.55 43.31,24.81 43.97,23.06 44.22,21.14 44.47,19.22 44.22,17.34 43.97,15.45 43.49,14.10 43.01,12.76 41.86,11.30 40.71,9.84 39.68,9.11 38.65,8.38 37.53,7.73 36.41,7.08 35.27,6.47 34.14,5.86 32.87,5.30 31.60,4.74 30.21,4.23 28.82,3.72 27.60,3.21 26.38,2.69 25.11,2.29 23.83,1.89 22.70,1.55 21.56,1.21 20.05,0.99 18.53,0.76 17.38,0.53 16.23,0.31 14.81,0.33 13.40,0.36 12.18,0.39 10.96,0.41 9.87,0.47 8.79,0.53 7.50,0.76 6.21,0.99 4.93,1.26 3.66,1.52 2.12,1.92 0.58,2.33 0.29,2.36 0.00,2.40 -0.27,2.36 -0.56,2.33 -0.83,2.23 -1.10,2.13 -1.34,1.96 -1.58,1.80 -1.78,1.58 -1.97,1.37 -2.10,1.11 -2.24,0.85 -2.31,0.57 -2.38,0.29 -2.38,0.00 -2.38,-0.28 -2.31,-0.56 -2.24,-0.84 -2.11,-1.10 -1.98,-1.35 -1.79,-1.57 -1.59,-1.79 -1.36,-1.95 -1.12,-2.12 -0.85,-2.22 -0.58,-2.33 -0.58,-2.33 L -0.58,-2.33 Z"
                      ></path>
                    </g>
                  </svg>
                </div>

                {/* 2. LEFT: Google Sheets Mockup */}
                <div className="absolute left-0 top-0 md:-left-8 md:top-4 z-20 w-40 md:w-48">
                  <div className="bg-[#1C2533] rounded-xl border border-green-500/30 shadow-2xl overflow-hidden backdrop-blur-md">
                    {/* Sheet Header */}
                    <div className="bg-[#0F9D58] px-3 py-2 flex items-center gap-2">
                      <div className="w-4 h-4 bg-white/20 rounded-sm flex items-center justify-center">
                        <div className="w-2 h-0.5 bg-white"></div>
                      </div>
                      <span className="text-xs font-bold text-white">
                        Orders.xlsx
                      </span>
                    </div>
                    {/* Sheet Grid */}
                    <div className="p-2 space-y-2">
                      {/* Header Row */}
                      <div className="flex gap-1 opacity-50">
                        <div className="h-2 w-1/3 bg-white/20 rounded-sm"></div>
                        <div className="h-2 w-1/3 bg-white/20 rounded-sm"></div>
                        <div className="h-2 w-1/3 bg-white/20 rounded-sm"></div>
                      </div>
                      {/* Row 1 */}
                      <div className="flex gap-1 opacity-30">
                        <div className="h-2 w-full bg-white/10 rounded-sm"></div>
                      </div>
                      {/* Row 2 (HIGHLIGHTED NEW ORDER) */}
                      <div className="relative bg-green-500/20 border border-green-500/50 rounded p-1.5 transform scale-105">
                        <div className="absolute -right-1 -top-1 w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-green-300 font-mono font-bold">
                            NEW ORDER
                          </span>
                          <span className="text-[8px] text-green-300/70">
                            #NW-892
                          </span>
                        </div>
                      </div>
                      {/* Row 3 */}
                      <div className="flex gap-1 opacity-30">
                        <div className="h-2 w-full bg-white/10 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. CENTER: The Web Asset (Laptop) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] z-10">
                  <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-[0_0_50px_rgba(191,149,249,0.15)] overflow-hidden">
                    {/* Browser Top Bar */}
                    <div className="bg-gray-800/50 border-b border-white/5 h-6 md:h-8 flex items-center px-4 gap-2">
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500/60" />
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500/60" />
                      <div className="ml-2 px-2 py-0.5 bg-gray-900/50 rounded text-[10px] md:text-xs text-gray-400 font-mono">
                        nightwing-ph.com
                      </div>
                    </div>
                    {/* Screen Content */}
                    <div className="bg-[#1D201F]">
                      <img
                        src="/case_studies/nightwing-ph/assets/web-app-menu-display.webp"
                        alt="Nightwing menu"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. RIGHT: Telegram Notification */}
                <div className="absolute right-0 bottom-0 md:-right-8 md:-bottom-4 z-20 w-48 md:w-56">
                  <div className="bg-[#1C2533] p-3 md:p-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#d946ef] flex items-center justify-center shrink-0">
                        <MessageSquare className="w-4 h-4 text-white fill-white" />
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                          Telegram • Now
                        </div>
                        <div className="font-bold text-sm text-white">
                          Order Alert 🔔
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 bg-[#000]/20 p-2 rounded text-xs font-mono text-gray-300">
                      <div className="flex justify-between">
                        <span>Order:</span>
                        <span className="text-[#d946ef]">#NW-892</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Items:</span>
                        <span className="text-white">Combo x2</span>
                      </div>
                      <div className="h-1 w-full bg-[#d946ef]/30 rounded mt-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Text and title on the right */}
            <div className="lg:w-1/2 w-full space-y-8 order-1 lg:order-2">
              <div className="mb-0 lg:mb-0">
                <div className="inline-block px-4 py-1.5 bg-background border border-[#d946ef]/20 rounded-full text-sm font-medium text-[#d946ef] mb-4">
                  Featured Case Study
                </div>

                <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Eliminating Manual Entry
                  <br />
                  <span className="text-[#d946ef]">Through Automation</span>
                </h2>
              </div>

              {/* Description and Button - Hidden on mobile, shown here on desktop */}
              <div className="hidden lg:block space-y-8">
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Nightwing restaurant was drowning in manual order entry and
                    phone calls. They needed a cost-effective solution that
                    eliminated human error and saved them from hiring a
                    dedicated call taker.
                  </p>
                  <p>
                    We built a bilingual (Hebrew/English) online ordering system
                    with n8n automation that processes orders, logs to Google
                    Sheets, and sends instant Telegram notifications—all without
                    a single line of backend code.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {[
                    "React",
                    "TypeScript",
                    "n8n Automation",
                    "Google Sheets",
                    "Telegram Bot",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6">
                  <button
                    className="inline-flex items-center text-lg text-[#d946ef] font-bold"
                    onClick={() => navigate("/case-studies/nightwing")}
                  >
                    See how we eliminated manual entry{" "}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Description and Button - Third on mobile, hidden on desktop (shown in right column above) */}
            <div className="lg:hidden w-full order-3 space-y-8">
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Nightwing restaurant was drowning in manual order entry and
                  phone calls. They needed a cost-effective solution that
                  eliminated human error and saved them from hiring a dedicated
                  call taker.
                </p>
                <p>
                  We built a bilingual (Hebrew/English) online ordering system
                  with n8n automation that processes orders, logs to Google
                  Sheets, and sends instant Telegram notifications—all without a
                  single line of backend code.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {[
                  "React",
                  "TypeScript",
                  "n8n Automation",
                  "Google Sheets",
                  "Telegram Bot",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-6">
                <button
                  className="group inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-sm border border-[#a855f7]/20 text-[#a855f7] font-semibold rounded-lg hover:bg-[#a855f7]/10 hover:border-[#a855f7]/40 transition-colors"
                  onClick={() => navigate("/case-studies/nightwing")}
                >
                  View Full Case Study
                  <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* AI Social Media Strategist Case Study - Standard Layout (Text Left, Image Right) */}
          <div className="flex flex-col lg:flex-row lg:gap-12 items-center mt-32 pt-32 border-t border-border/50">
            {/* Left Content - Text and title on the left */}
            <div className="lg:w-1/2 w-full space-y-8 order-1 lg:order-1">
              <div className="mb-0 lg:mb-0">
                <div className="inline-block px-4 py-1.5 bg-background border border-[#6366f1]/20 rounded-full text-sm font-medium text-[#6366f1] mb-4">
                  <Bot size={14} className="inline mr-2" /> Internal Tool
                </div>

                <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  From 10 Hours to{" "}
                  <span className="text-[#6366f1]">30 Minutes</span>
                </h2>
              </div>

              {/* Description and Button - Hidden on mobile, shown here on desktop */}
              <div className="hidden lg:block space-y-8">
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Content creation was killing productivity. Building a
                    personal brand requires consistency, but the manual process
                    was brutal: constantly monitoring sources for relevant
                    content, filtering through noise, and crafting posts that
                    actually sound like you.
                  </p>
                  <p>
                    We built an autonomous AI agent that aggregates content from
                    your chosen sources, filters for relevance, and generates
                    social posts in your exact voice—reducing content creation
                    time by 95%.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {[
                    "n8n",
                    "Claude API",
                    "Telegram Bot",
                    "Google Sheets",
                    "AI Content",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6">
                  <button
                    className="inline-flex items-center text-lg text-[#6366f1] font-bold"
                    onClick={() =>
                      navigate("/case-studies/ai-social-media-strategist")
                    }
                  >
                    See how we reduced content time by 95%{" "}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Image/Visual - Telegram Bot Preview */}
            <div className="lg:w-1/2 w-full order-2 lg:order-2 mb-20 lg:mb-0">
              <div className="relative w-full max-w-md mx-auto">
                <div className="bg-[#0E1621] rounded-2xl p-6 border border-white/10 shadow-2xl">
                  {/* Telegram Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-white/5 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        Content Bot
                      </div>
                      <div className="text-xs text-gray-400">Online</div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="space-y-4">
                    {/* Bot message */}
                    <div className="flex gap-2">
                      <div className="bg-[#182533] rounded-2xl rounded-tl-sm p-4 max-w-[85%]">
                        <p className="text-sm text-[#E0D0C1] mb-2 font-semibold">
                          🚀 New Draft Ready
                        </p>
                        <p className="text-xs text-gray-300 leading-relaxed mb-2">
                          "Just discovered an AI tool that turns your voice
                          memos into polished blog posts. The future of content
                          creation is voice-first..."
                        </p>
                        <div className="flex gap-2 text-[10px] text-gray-400">
                          <span>📊 Product Hunt Trending</span>
                        </div>
                      </div>
                    </div>

                    {/* User reply */}
                    <div className="flex justify-end">
                      <div className="bg-[#2B5278] rounded-2xl rounded-tr-sm px-4 py-2">
                        <span className="text-sm text-white">
                          Post to X and LinkedIn
                        </span>
                      </div>
                    </div>

                    {/* Bot confirmation */}
                    <div className="flex gap-2">
                      <div className="bg-[#182533] rounded-2xl rounded-tl-sm p-3">
                        <p className="text-sm text-green-400">
                          ✅ Posted to X and LinkedIn!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 rounded-3xl blur-2xl -z-10" />
              </div>
            </div>

            {/* Description and Button - Third on mobile, hidden on desktop */}
            <div className="lg:hidden w-full order-3 space-y-8">
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Content creation was killing productivity. Building a personal
                  brand requires consistency, but the manual process was brutal:
                  constantly monitoring sources for relevant content, filtering
                  through noise, and crafting posts that actually sound like
                  you.
                </p>
                <p>
                  We built an autonomous AI agent that aggregates content from
                  your chosen sources, filters for relevance, and generates
                  social posts in your exact voice—reducing content creation
                  time by 95%.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {[
                  "n8n",
                  "Claude API",
                  "Telegram Bot",
                  "Google Sheets",
                  "AI Content",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-6">
                <button
                  className="group inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-sm border border-[#6366f1]/20 text-[#6366f1] font-semibold rounded-lg hover:bg-[#6366f1]/10 hover:border-[#6366f1]/40 transition-colors"
                  onClick={() =>
                    navigate("/case-studies/ai-social-media-strategist")
                  }
                >
                  View Full Case Study
                  <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Blog Automation Case Study - Reversed Layout (Image Left, Text Right) */}
          <div className="flex flex-col lg:flex-row lg:gap-12 items-center mt-32 pt-32 border-t border-border/50">
            {/* Left Image/Visual - Telegram Chat Simulator */}
            <div className="lg:w-1/2 w-full order-2 lg:order-1 mb-20 lg:mb-0">
              <div className="relative w-full max-w-md mx-auto">
                <div className="bg-[#0E1621] rounded-2xl overflow-hidden shadow-2xl border border-white/5 font-sans">
                  {/* Telegram Header */}
                  <div className="bg-[#17212B] p-4 flex items-center gap-3 border-b border-black/20">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a855f7] to-[#8b5cf6] flex items-center justify-center text-white font-bold">
                      AI
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">
                        Editorial Bot
                      </div>
                      <div className="text-[#6c7883] text-xs">bot</div>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="h-[280px] p-4 flex flex-col gap-4 bg-[#0E1621] relative overflow-hidden">
                    {/* Background Pattern */}
                    <div
                      className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage:
                          "radial-gradient(#ffffff 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    ></div>

                    {/* User Message */}
                    <div className="self-end bg-[#2B5278] text-white p-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-sm">
                      Write a blog post about "The Future of No-Code Tools"
                    </div>

                    {/* AI Response */}
                    <div className="self-start bg-[#182533] text-white p-3 rounded-2xl rounded-tl-sm max-w-[90%] text-sm shadow-sm border border-black/20">
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                        <span className="text-xs text-green-400 font-medium">
                          ✓ Draft Generated
                        </span>
                      </div>
                      <p className="font-bold text-[#E0D0C1] mb-1">
                        Title: The AI Revolution in No-Code
                      </p>
                      <p className="text-[#B9BBBE] text-xs leading-relaxed">
                        "No-code tools are evolving. With the integration of
                        LLMs..."
                      </p>
                    </div>
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7]/8 to-[#8b5cf6]/8 rounded-3xl blur-2xl -z-10" />
              </div>
            </div>

            {/* Right Content - Text and title on the right */}
            <div className="lg:w-1/2 w-full space-y-8 order-1 lg:order-2">
              <div className="mb-0 lg:mb-0">
                <div className="inline-block px-4 py-1.5 bg-background border border-[#a855f7]/20 rounded-full text-sm font-medium text-[#a855f7] mb-4">
                  <Bot size={14} className="inline mr-2" /> Internal Tool
                </div>

                <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  The Zero-UI <br />
                  <span className="text-[#a855f7]">Content Engine</span>
                </h2>
              </div>

              {/* Description and Button - Hidden on mobile, shown here on desktop */}
              <div className="hidden lg:block space-y-8">
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    We were spending 5+ hours a week formatting blog posts,
                    finding stock images, and fighting with CMS editors. We
                    needed a way to dump our brain contents and get a polished
                    result instantly.
                  </p>
                  <p>
                    We built a system that turns raw Telegram messages into
                    fully formatted, SEO-optimized blog posts with generated
                    art—in under 60 seconds. From 4 hours per post to 2 minutes.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {[
                    "n8n",
                    "LangChain",
                    "Telegram Bot",
                    "Self-Healing JSON",
                    "AI Content",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6">
                  <button
                    className="inline-flex items-center text-lg text-[#a855f7] font-bold"
                    onClick={() => navigate("/case-studies/blog-automation")}
                  >
                    See how we cut blog time from 4 hours to 2 minutes{" "}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Description and Button - Third on mobile, hidden on desktop */}
            <div className="lg:hidden w-full order-3 space-y-8">
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  We were spending 5+ hours a week formatting blog posts,
                  finding stock images, and fighting with CMS editors. We needed
                  a way to dump our brain contents and get a polished result
                  instantly.
                </p>
                <p>
                  We built a system that turns raw Telegram messages into fully
                  formatted, SEO-optimized blog posts with generated art—in
                  under 60 seconds. From 4 hours per post to 2 minutes.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {[
                  "n8n",
                  "LangChain",
                  "Telegram Bot",
                  "Self-Healing JSON",
                  "AI Content",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-6">
                <button
                  className="group inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-sm border border-[#a855f7]/20 text-[#a855f7] font-semibold rounded-lg hover:bg-[#a855f7]/10 hover:border-[#a855f7]/40 transition-colors"
                  onClick={() => navigate("/case-studies/blog-automation")}
                >
                  View Full Case Study
                  <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Mintkola Case Study - Standard Layout (Text Left, Image Right) */}
          <div className="flex flex-col lg:flex-row lg:gap-12 items-center mt-32 pt-32 border-t border-border/50">
            {/* Left Content - Text and title on the left */}
            <div className="lg:w-1/2 w-full space-y-8 order-1 lg:order-1">
              <div className="mb-0 lg:mb-0">
                <div className="inline-block px-4 py-1.5 bg-background border border-teal-500/20 rounded-full text-sm font-medium text-teal-400 mb-4">
                  <Bot size={14} className="inline mr-2" /> Internal Project
                </div>

                <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  The Psychology of{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-orange-400">
                    Productive Action
                  </span>
                </h2>
              </div>

              {/* Description and Button - Hidden on mobile, shown here on desktop */}
              <div className="hidden lg:block space-y-8">
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Most productivity tools assume you know how to break down a
                    goal. Psychology shows that ambiguity is the enemy of
                    action.
                  </p>
                  <p>
                    We built a dual-personality AI system that combines
                    behavioral psychology with actionable roadmaps. Mint handles
                    strategy and planning, while Kola provides motivation and
                    emotional support.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {[
                    "n8n",
                    "Claude 3.5",
                    "React Flow",
                    "Firebase",
                    "AI Psychology",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6">
                  <button
                    className="inline-flex items-center text-lg text-teal-400 font-bold"
                    onClick={() => navigate("/case-studies/mintkola")}
                  >
                    See how psychology drives action{" "}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Image/Visual - Task Flow Visualization */}
            <div className="lg:w-1/2 w-full order-2 lg:order-2 mb-20 lg:mb-0 relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>
              <div className="relative w-full max-w-lg mx-auto min-h-[600px] flex items-center justify-center py-8">
                {/* Background with mascots */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  {/* Mint character - top left */}
                  <div className="absolute -top-8 -left-8 opacity-20">
                    <img
                      src="/case_studies/mintkola/assets/mint.svg"
                      alt="Mint"
                      className="w-32 h-32"
                    />
                  </div>
                  {/* Kola character - bottom right */}
                  <div className="absolute -bottom-8 -right-8 opacity-20">
                    <img
                      src="/case_studies/mintkola/assets/kola.svg"
                      alt="Kola"
                      className="w-36 h-40"
                    />
                  </div>
                </div>

                {/* Task Flow Cards */}
                <div className="relative z-10 w-full space-y-4 px-4">
                  {/* Card 1: Start Small */}
                  <div className="bg-[#f0f9f4] border-2 border-teal-400 rounded-2xl p-4 shadow-lg relative">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-900 mb-2">
                          Start Small: A 10-Minute Goal
                        </h3>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="px-2.5 py-1 bg-teal-500 text-white text-xs font-bold rounded-full uppercase">
                            Completed
                          </span>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>10 minutes</span>
                          </div>
                        </div>
                      </div>
                      {/* Controls */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-1 h-4 bg-gray-300 rounded-full"></div>
                        <div className="w-1 h-4 bg-gray-300 rounded-full"></div>
                        <div className="w-1 h-4 bg-gray-300 rounded-full"></div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Connection Line 1 */}
                  <div className="flex justify-center -my-2 relative z-0">
                    <div className="w-0.5 h-8 border-l-2 border-dashed border-teal-400"></div>
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-teal-400"></div>
                  </div>

                  {/* Card 2: Design Your Environment */}
                  <div className="bg-[#f0f9f4] border-2 border-teal-400 rounded-2xl p-4 shadow-lg relative">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-900 mb-2">
                          Design Your Environment
                        </h3>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="px-2.5 py-1 bg-teal-500 text-white text-xs font-bold rounded-full uppercase">
                            Environment
                          </span>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>2 minutes</span>
                          </div>
                        </div>
                      </div>
                      {/* Controls */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-1 h-4 bg-gray-300 rounded-full"></div>
                        <div className="w-1 h-4 bg-gray-300 rounded-full"></div>
                        <div className="w-1 h-4 bg-gray-300 rounded-full"></div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Connection Line 2 */}
                  <div className="flex justify-center -my-2 relative z-0">
                    <div className="w-0.5 h-8 border-l-2 border-dashed border-orange-400"></div>
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-orange-400"></div>
                  </div>

                  {/* Card 3: Commit to the Action */}
                  <div className="bg-[#fef2f2] border-2 border-orange-400 rounded-2xl p-4 shadow-lg relative">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-900 mb-2">
                          Commit to the Action
                        </h3>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="px-2.5 py-1 bg-orange-500 text-white text-xs font-bold rounded-full uppercase">
                            Action
                          </span>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>5 minutes</span>
                          </div>
                        </div>
                      </div>
                      {/* Controls */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-1 h-4 bg-gray-300 rounded-full"></div>
                        <div className="w-1 h-4 bg-gray-300 rounded-full"></div>
                        <div className="w-1 h-4 bg-gray-300 rounded-full"></div>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Connection Line 3 (continuing) */}
                  <div className="flex justify-center -my-2 relative z-0">
                    <div className="w-0.5 h-8 border-l-2 border-dashed border-orange-400"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description and Button - Third on mobile, hidden on desktop */}
            <div className="lg:hidden w-full order-3 space-y-8">
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Most productivity tools assume you know *how* to break down a
                  goal. Psychology shows that **ambiguity** is the enemy of
                  action.
                </p>
                <p>
                  We built a dual-mascot AI system that combines behavioral
                  psychology with actionable roadmaps. Mint handles strategy and
                  planning (IQ), while Kola provides motivation and emotional
                  support (EQ).
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {[
                  "n8n",
                  "Claude 3.5",
                  "React Flow",
                  "Firebase",
                  "AI Psychology",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-6">
                <button
                  className="group inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-sm border border-teal-500/20 text-teal-400 font-semibold rounded-lg hover:bg-teal-500/10 hover:border-teal-500/40 transition-colors"
                  onClick={() => navigate("/case-studies/mintkola")}
                >
                  View Full Case Study
                  <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Spidclass Case Study - Reversed Layout (Image Left, Text Right) */}
          <div className="flex flex-col lg:flex-row lg:gap-12 items-center mt-32 pt-32 border-t border-border/50">
            {/* Left Image/Visual - Phone Stack */}
            <div className="lg:w-1/2 w-full order-2 lg:order-1 mb-20 lg:mb-0">
              <div className="relative w-full max-w-md mx-auto min-h-[500px] flex items-center justify-center">
                {/* Phone 1: Profile (Back) */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 z-0 opacity-60 transform rotate-12 scale-90">
                  <PhoneFrame borderColor="border-gray-800">
                    <div className="p-4 space-y-3 bg-slate-800">
                      <div className="h-4 w-24 bg-white/20 rounded"></div>
                      <div className="h-2 w-16 bg-white/10 rounded"></div>
                    </div>
                  </PhoneFrame>
                </div>
                {/* Phone 2: Class List (Middle) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-80 transform -rotate-5 scale-95">
                  <PhoneFrame borderColor="border-gray-800">
                    <div className="p-4 space-y-2 bg-slate-800">
                      <div className="h-3 w-32 bg-white/20 rounded"></div>
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-12 bg-white/10 rounded"></div>
                      ))}
                    </div>
                  </PhoneFrame>
                </div>
                {/* Phone 3: Attendance (Front) */}
                <div className="relative z-20 transform rotate-0">
                  <PhoneFrame borderColor="border-gray-800">
                    <div className="p-4 space-y-3 bg-white">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-4 w-20 bg-slate-200 rounded"></div>
                        <div className="h-4 w-24 bg-slate-200 rounded"></div>
                      </div>
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 bg-slate-50 rounded"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                            <div className="h-2 w-16 bg-slate-300 rounded"></div>
                          </div>
                          <div className="flex gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#bef264]"></div>
                            <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </PhoneFrame>
                </div>
                {/* Glow */}
                <div className="absolute inset-0 bg-[#bef264]/10 blur-[100px] rounded-full pointer-events-none" />
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:w-1/2 w-full space-y-8 order-1 lg:order-2">
              <div className="mb-0 lg:mb-0">
                <div className="inline-block px-4 py-1.5 bg-background border border-[#bef264]/20 rounded-full text-sm font-medium text-[#bef264] mb-4">
                  <Smartphone size={14} className="inline mr-2" /> Featured Case
                  Study
                </div>
                <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Class management at <br />
                  <span className="text-[#bef264]">the speed of tap.</span>
                </h2>
              </div>

              <div className="hidden lg:block space-y-8">
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    We replaced manual spreadsheets with a lightning-fast
                    Flutter app. Teachers can now track attendance, payments,
                    and student profiles in seconds, even offline.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {[
                    "Flutter",
                    "Firebase",
                    "Offline First",
                    "Real-time Sync",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6">
                  <button
                    className="inline-flex items-center text-lg text-[#bef264] font-bold"
                    onClick={() => navigate("/case-studies/spidclass")}
                  >
                    See how we saved 5 hours/week{" "}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Description and Button */}
            <div className="lg:hidden w-full order-3 space-y-8">
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  We replaced manual spreadsheets with a lightning-fast Flutter
                  app. Teachers can now track attendance, payments, and student
                  profiles in seconds, even offline.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {["Flutter", "Firebase", "Offline First", "Real-time Sync"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>

              <div className="pt-6">
                <button
                  className="inline-flex items-center text-lg text-[#bef264] font-bold"
                  onClick={() => navigate("/case-studies/spidclass")}
                >
                  See how we saved 5 hours/week{" "}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Yellow Candle Case Study - Standard Layout (Text Left, Image Right) */}
          <div className="flex flex-col lg:flex-row lg:gap-12 items-center mt-32 pt-32 border-t border-border/50">
            {/* Left Content */}
            <div className="lg:w-1/2 w-full space-y-8 order-1 lg:order-1">
              <div className="mb-0 lg:mb-0">
                <div className="inline-block px-4 py-1.5 bg-background border border-[#facc15]/20 rounded-full text-sm font-medium text-[#facc15] mb-4">
                  <Flame size={14} className="inline mr-2" /> Featured Case
                  Study
                </div>
                <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Preserving memory in <br />
                  <span className="text-[#facc15]">the digital age.</span>
                </h2>
              </div>

              <div className="hidden lg:block space-y-8">
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    A digital memorial app serving 14,000+ members worldwide. We
                    modernized the legacy codebase to meet strict new app store
                    compliance while preserving the solemnity of the user
                    experience.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {[
                    "Flutter",
                    "Local Notifications",
                    "Store Compliance",
                    "Legacy Modernization",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6">
                  <button
                    className="inline-flex items-center text-lg text-[#facc15] font-bold"
                    onClick={() => navigate("/case-studies/yellow-candle")}
                  >
                    See how we modernized 14,000+ users{" "}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Visual: Glowing Candle Phone */}
            <div className="lg:w-1/2 w-full order-2 lg:order-2 mb-20 lg:mb-0 relative min-h-[400px] flex items-center justify-center">
              <div className="relative z-10 transform rotate-3">
                <PhoneFrame borderColor="border-[#2a2a2a]">
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#121212] relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#facc15]/5 to-transparent" />
                    <div className="w-20 h-32 bg-[#facc15]/20 rounded-lg blur-2xl absolute top-1/3 left-1/2 -translate-x-1/2 animate-pulse"></div>
                    <div className="w-4 h-12 bg-[#facc15] rounded-full blur-[2px] animate-pulse mb-2 shadow-[0_0_20px_#facc15]"></div>
                    <div className="w-24 h-40 bg-gradient-to-b from-[#fde047] to-[#eab308] rounded-t-lg opacity-90"></div>
                    <div className="mt-8 text-center px-6">
                      <div className="h-2 w-32 bg-white/20 rounded mx-auto mb-2"></div>
                      <div className="h-2 w-20 bg-white/10 rounded mx-auto"></div>
                    </div>
                  </div>
                </PhoneFrame>
              </div>
              <div className="absolute inset-0 bg-[#facc15]/10 blur-[120px] rounded-full pointer-events-none" />
            </div>

            {/* Mobile Description and Button */}
            <div className="lg:hidden w-full order-3 space-y-8">
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  A digital memorial app serving 14,000+ members worldwide. We
                  modernized the legacy codebase to meet strict new app store
                  compliance while preserving the solemnity of the user
                  experience.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {[
                  "Flutter",
                  "Local Notifications",
                  "Store Compliance",
                  "Legacy Modernization",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-6">
                <button
                  className="inline-flex items-center text-lg text-[#facc15] font-bold"
                  onClick={() => navigate("/case-studies/yellow-candle")}
                >
                  See how we modernized 14,000+ users{" "}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Portfolio Websites Case Study - Reversed Layout (Image Left, Text Right) */}
          <div className="flex flex-col lg:flex-row lg:gap-12 items-center mt-32 pt-32 border-t border-border/50">
            {/* Left Visual: Performance Browser */}
            <div className="lg:w-1/2 w-full order-2 lg:order-1 mb-20 lg:mb-0 relative min-h-[300px] flex items-center justify-center px-4">
              <div className="w-full relative z-10 group">
                <BrowserFrame borderColor="border-[#38bdf8]/20">
                  <div className="p-8 grid grid-cols-2 gap-4">
                    <div className="bg-[#1a1a1a] rounded-lg h-32 animate-pulse border border-white/5"></div>
                    <div className="bg-[#1a1a1a] rounded-lg h-32 animate-pulse border border-white/5"></div>
                    <div className="col-span-2 bg-[#1a1a1a] rounded-lg h-24 border border-white/5 p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border-4 border-[#38bdf8] flex items-center justify-center text-[#38bdf8] font-bold text-xs">
                        99
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="h-2 w-full bg-[#38bdf8]/20 rounded-full overflow-hidden">
                          <div className="h-full w-[99%] bg-[#38bdf8]"></div>
                        </div>
                        <div className="text-xs text-gray-400">
                          Performance Score
                        </div>
                      </div>
                    </div>
                  </div>
                </BrowserFrame>
                <div className="absolute -bottom-8 -right-4 w-24 h-48 bg-black rounded-2xl border-4 border-[#1a1a1a] shadow-2xl transform rotate-6 hidden md:block">
                  <div className="w-full h-full bg-[#0c0c0c] rounded-xl flex items-center justify-center">
                    <Globe size={20} className="text-[#38bdf8]" />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-[#38bdf8]/10 blur-[100px] rounded-full pointer-events-none" />
            </div>

            {/* Right Content */}
            <div className="lg:w-1/2 w-full order-1 lg:order-2 space-y-8">
              <div className="mb-0 lg:mb-0">
                <div className="inline-block px-4 py-1.5 bg-background border border-[#38bdf8]/20 rounded-full text-sm font-medium text-[#38bdf8] mb-4">
                  <Gauge size={14} className="inline mr-2" /> Performance
                </div>
                <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Pixel perfect. <br />
                  <span className="text-[#38bdf8]">Performance first.</span>
                </h2>
              </div>

              <div className="hidden lg:block space-y-8">
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    We build video-heavy portfolios that load instantly. By
                    implementing advanced lazy loading and bilingual support
                    (RTL), we help creatives showcase their work without the
                    loading spinner.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {["React", "Vite", "i18next", "Video Optimization"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>

                <div className="pt-6">
                  <button
                    className="inline-flex items-center text-lg text-[#38bdf8] font-bold"
                    onClick={() => navigate("/case-studies/portfolio-websites")}
                  >
                    See the benchmarks <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Description and Button */}
            <div className="lg:hidden w-full order-3 space-y-8">
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  We build video-heavy portfolios that load instantly. By
                  implementing advanced lazy loading and bilingual support
                  (RTL), we help creatives showcase their work without the
                  loading spinner.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {["React", "Vite", "i18next", "Video Optimization"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>

              <div className="pt-6">
                <button
                  className="inline-flex items-center text-lg text-[#38bdf8] font-bold"
                  onClick={() => navigate("/case-studies/portfolio-websites")}
                >
                  See the benchmarks <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* ITA Case Study - Standard Layout (Text Left, Image Right) */}
          <div className="flex flex-col lg:flex-row lg:gap-12 items-center mt-32 pt-32 border-t border-border/50">
            {/* Left Content */}
            <div className="lg:w-1/2 w-full space-y-8 order-1 lg:order-1">
              <div className="mb-0 lg:mb-0">
                <div className="inline-block px-4 py-1.5 bg-background border border-[#06b6d4]/20 rounded-full text-sm font-medium text-[#06b6d4] mb-4">
                  <Brain size={14} className="inline mr-2" /> AI Integration
                </div>
                <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  The AI that <br />
                  <span className="text-[#06b6d4]">sees your screen.</span>
                </h2>
              </div>

              <div className="hidden lg:block space-y-8">
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    A complex R&D project demonstrating multi-platform
                    capability. We built a Windows overlay app that uses GPT-5
                    to "see" educational content on screen and overlay real-time
                    explanations.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {[
                    "Windows WPF",
                    "n8n",
                    "GPT-5 Vision",
                    "Prompt Engineering",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6">
                  <button
                    className="inline-flex items-center text-lg text-[#06b6d4] font-bold"
                    onClick={() => navigate("/case-studies/ita")}
                  >
                    Explore the Architecture{" "}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Visual: Code/AI Overlay */}
            <div className="lg:w-1/2 w-full order-2 lg:order-2 mb-20 lg:mb-0 relative min-h-[300px] flex items-center justify-center">
              <div className="w-full relative z-10 bg-[#0f172a] rounded-lg border border-[#06b6d4]/30 p-1 shadow-2xl">
                <div className="bg-[#1e293b] p-8 rounded h-64 flex items-center justify-center relative overflow-hidden">
                  <div className="text-slate-500 font-serif text-2xl italic">
                    ∫ x² dx = ?
                  </div>
                  <div className="absolute top-4 right-4 bg-black/90 border border-[#06b6d4] p-4 rounded-lg w-48 shadow-[0_0_30px_rgba(6,182,212,0.2)] transform translate-y-2">
                    <div className="flex items-center gap-2 mb-2 text-[#06b6d4]">
                      <Brain size={14} />{" "}
                      <span className="text-xs font-bold">ITA Analysis</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-1.5 w-full bg-slate-700 rounded animate-pulse"></div>
                      <div className="h-1.5 w-3/4 bg-slate-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-[#06b6d4]/10 blur-[100px] rounded-full pointer-events-none" />
            </div>

            {/* Mobile Description and Button */}
            <div className="lg:hidden w-full order-3 space-y-8">
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  A complex R&D project demonstrating multi-platform capability.
                  We built a Windows overlay app that uses GPT-5 to "see"
                  educational content on screen and overlay real-time
                  explanations.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {[
                  "Windows WPF",
                  "n8n",
                  "GPT-5 Vision",
                  "Prompt Engineering",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-6">
                <button
                  className="inline-flex items-center text-lg text-[#06b6d4] font-bold"
                  onClick={() => navigate("/case-studies/ita")}
                >
                  Explore the Architecture{" "}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Fullstack Apps Case Study - Reversed Layout (Image Left, Text Right) */}
          <div className="flex flex-col lg:flex-row lg:gap-12 items-center mt-32 pt-32 border-t border-border/50">
            {/* Left Visual: Admin Dashboard */}
            <div className="lg:w-1/2 w-full order-2 lg:order-1 mb-20 lg:mb-0 relative min-h-[300px] flex items-center justify-center">
              <div className="w-full relative z-10 group">
                <BrowserFrame borderColor="border-[#007FFF]/20">
                  <div className="flex h-64">
                    <div className="w-16 bg-[#1a1a1a] border-r border-white/5 flex flex-col items-center py-4 gap-4">
                      <div className="w-8 h-8 rounded bg-[#007FFF]/20 flex items-center justify-center text-[#007FFF]">
                        <Layout size={16} />
                      </div>
                      <div className="w-8 h-8 rounded bg-transparent flex items-center justify-center text-gray-600">
                        <Database size={16} />
                      </div>
                      <div className="w-8 h-8 rounded bg-transparent flex items-center justify-center text-gray-600">
                        <Users size={16} />
                      </div>
                    </div>
                    <div className="flex-1 p-6 bg-[#0c0c0c]">
                      <div className="flex justify-between mb-6">
                        <div className="h-6 w-32 bg-white/10 rounded"></div>
                        <div className="h-6 w-24 bg-[#007FFF] rounded"></div>
                      </div>
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="h-12 w-full bg-[#161616] rounded border border-white/5 flex items-center px-4 justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-white/10"></div>
                              <div className="h-2 w-24 bg-white/10 rounded"></div>
                            </div>
                            <div className="h-4 w-12 bg-green-500/20 rounded-full"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </BrowserFrame>
              </div>
              <div className="absolute inset-0 bg-[#007FFF]/10 blur-[100px] rounded-full pointer-events-none" />
            </div>

            {/* Right Content */}
            <div className="lg:w-1/2 w-full order-1 lg:order-2 space-y-8">
              <div className="mb-0 lg:mb-0">
                <div className="inline-block px-4 py-1.5 bg-background border border-[#007FFF]/20 rounded-full text-sm font-medium text-[#007FFF] mb-4">
                  <Server size={14} className="inline mr-2" /> Enterprise
                  Systems
                </div>
                <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Scalable systems. <br />
                  <span className="text-[#007FFF]">Secure data.</span>
                </h2>
              </div>

              <div className="hidden lg:block space-y-8">
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    We build production-ready full-stack applications. From
                    complex permission systems to automated background workers,
                    we handle the heavy lifting so you can scale.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {["FastAPI", "Redis", "React", "OAuth 2.0"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6">
                  <button
                    className="inline-flex items-center text-lg text-[#007FFF] font-bold"
                    onClick={() => navigate("/case-studies/fullstack-apps")}
                  >
                    View Technical Specs <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Description and Button */}
            <div className="lg:hidden w-full order-3 space-y-8">
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  We build production-ready full-stack applications. From
                  complex permission systems to automated background workers, we
                  handle the heavy lifting so you can scale.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {["FastAPI", "Redis", "React", "OAuth 2.0"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-6">
                <button
                  className="inline-flex items-center text-lg text-[#007FFF] font-bold"
                  onClick={() => navigate("/case-studies/fullstack-apps")}
                >
                  View Technical Specs <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dronebag Case Study - Standard Layout (Text Left, Image Right) */}
          <div className="flex flex-col lg:flex-row lg:gap-12 items-center mt-32 pt-32 border-t border-border/50">
            {/* Left Content */}
            <div className="lg:w-1/2 w-full space-y-8 order-1 lg:order-1">
              <div className="mb-0 lg:mb-0">
                <div className="inline-block px-4 py-1.5 bg-background border border-[#f97316]/20 rounded-full text-sm font-medium text-[#f97316] mb-4">
                  <Target size={14} className="inline mr-2" /> Featured Case
                  Study
                </div>
                <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Mission critical <br />
                  <span className="text-[#f97316]">fleet command.</span>
                </h2>
              </div>

              <div className="hidden lg:block space-y-8">
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    We digitized drone operations for the IDF. A rugged,
                    offline-first mobile command center for managing batteries,
                    flight logs, and maintenance in the field.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {[
                    "Flutter",
                    "Firebase",
                    "Offline First",
                    "Inventory Mgmt",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6">
                  <button
                    className="inline-flex items-center text-lg text-[#f97316] font-bold"
                    onClick={() => navigate("/case-studies/dronebag")}
                  >
                    Declassify the details{" "}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Visual: Rugged Tablet/Map */}
            <div className="lg:w-1/2 w-full order-2 lg:order-2 mb-20 lg:mb-0 relative min-h-[400px] flex items-center justify-center">
              <div className="relative z-10 transform rotate-1">
                <div className="w-[300px] h-[400px] bg-[#1a1a1a] rounded-xl border-[6px] border-[#333] shadow-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#0f172a] opacity-50 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-[#f97316]/10 to-transparent w-full h-1/2 border-b border-[#f97316]/50 opacity-60"></div>
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="bg-black/50 backdrop-blur border border-[#f97316]/30 px-3 py-1 rounded text-[#f97316] text-xs font-mono">
                        STATUS: ONLINE
                      </div>
                      <Battery size={20} className="text-green-500" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#f97316]/20 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#f97316] rounded-full animate-ping"></div>
                    </div>
                    <div className="bg-[#1a1a1a] p-3 rounded-lg border-t-2 border-[#f97316]">
                      <div className="text-xs text-gray-400">Active Unit</div>
                      <div className="font-bold text-white">
                        Mavic 3T #Alpha
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-[#f97316]/10 blur-[100px] rounded-full pointer-events-none" />
            </div>

            {/* Mobile Description and Button */}
            <div className="lg:hidden w-full order-3 space-y-8">
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  We digitized drone operations for the IDF. A rugged,
                  offline-first mobile command center for managing batteries,
                  flight logs, and maintenance in the field.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {["Flutter", "Firebase", "Offline First", "Inventory Mgmt"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-background/50 border border-border/50 rounded-md text-sm text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>

              <div className="pt-6">
                <button
                  className="inline-flex items-center text-lg text-[#f97316] font-bold"
                  onClick={() => navigate("/case-studies/dronebag")}
                >
                  Declassify the details <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
