import { useRef, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Maximize2,
  Layers,
  Cpu,
  Server,
  CreditCard,
  Activity,
  Globe,
  Bot,
} from "lucide-react";

// Employer Dashboard Bento Grid Component
const EmployerDashboardSection = ({
  webAssets,
}: {
  webAssets: Array<{
    src: string;
    alt: string;
    title: string;
    subtitle: string;
  }>;
}) => {
  // Filter out welcome modal and find hero asset (Applicant Management)
  const filteredAssets = webAssets.filter(
    (asset) => !asset.src.includes("welcome-modal")
  );
  const heroAsset =
    filteredAssets.find((a) => a.src.includes("applicant-management")) ||
    filteredAssets[0];
  const secondaryAssets = filteredAssets
    .filter((a) => a !== heroAsset)
    .slice(0, 2); // Take 2 others (Job Dashboard and Job Posting Form)

  return (
    <section className="section-padding bg-[#1D201F] relative overflow-hidden">
      <div className="container-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#E0D0C1] mb-4">
              The Employer Command Center
            </h2>
            <p className="text-xl text-[#B9BBBE] max-w-2xl mx-auto">
              A comprehensive dashboard designed for velocity. No clutter, just
              candidates.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 gap-y-3 items-end">
            {/* Hero Card - Spans 8 columns (Large) */}
            <div className="md:col-span-12 lg:col-span-8 row-span-2 group relative">
              {/* Image */}
              <img
                src={heroAsset.src}
                alt={heroAsset.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-xl border-[0.5px] border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
              />
            </div>

            {/* Secondary Cards - Grid of 2x2 on right side */}
            {secondaryAssets.map((asset, idx) => {
              const isLast = idx === secondaryAssets.length - 1;
              return (
                <div
                  key={idx}
                  className={`md:col-span-6 lg:col-span-4 group relative ${
                    idx === 0 ? "lg:pr-2" : "lg:pl-2"
                  }`}
                >
                  <img
                    src={asset.src}
                    alt={asset.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto rounded-xl border-[0.5px] border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const GomlinJobs = () => {
  const navigate = useNavigate();

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

    updateAnimation();
    const interval = setInterval(updateAnimation, 2000);
    return () => clearInterval(interval);
  }, []);
  const basePath = "/case_studies/gomlinjobs/assets";
  const mobileShowcaseRef = useRef<HTMLDivElement>(null);

  // Web assets for stacked cards
  const webAssets = useMemo(
    () => [
      {
        src: `${basePath}/screenshots/web/web-platform-welcome-modal.webp`,
        alt: "Welcome modal for new clients",
        title: "Welcome Modal",
        subtitle: "Onboarding Experience",
      },
      {
        src: `${basePath}/screenshots/web/web-platform-job-postings-dashboard.webp`,
        alt: "Job postings dashboard",
        title: "Job Dashboard",
        subtitle: "Manage Listings",
      },
      {
        src: `${basePath}/screenshots/web/web-platform-job-posting-form.webp`,
        alt: "Job posting form",
        title: "Job Posting Form",
        subtitle: "Create Opportunities",
      },
      {
        src: `${basePath}/screenshots/web/web-platform-applicant-management.webp`,
        alt: "Applicant management dashboard",
        title: "Applicant Management",
        subtitle: "Talent Pipeline",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#1D201F] text-[#E0D0C1]">
      <Header />
      <main>
        {/* 1. Hero Section: The "Hook" */}
        <section className="section-padding relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="container-padding relative z-10 pt-2 pb-20">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
                {/* Left: Text Content */}
                <div className="space-y-8 lg:pr-8">
                  <div className="inline-block px-4 py-1.5 bg-white/5 backdrop-blur-sm border border-[#bf95f9]/20 rounded-full text-sm font-medium text-[#bf95f9] mb-4">
                    <Bot size={14} className="inline mr-2" /> Internal Project
                  </div>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#E0D0C1] leading-tight">
                    From Day-Long Hiring to{" "}
                    <span className="text-[#bf95f9]">5-Minute Matches</span>
                  </h1>

                  <p className="text-xl md:text-2xl text-[#B9BBBE] leading-relaxed">
                    How we built a dual-platform ecosystem that reduced hiring
                    time from 8 hours to 5 minutes.
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    {["Flutter", "React", "Python/Flask", "n8n", "OpenAI"].map(
                      (tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-sm text-[#B9BBBE]"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Right: Composite Visual - Studio Standard Layout */}
                <div className="relative w-full lg:w-auto flex items-center justify-center lg:justify-end h-full min-h-[500px]">
                  <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
                    {/* Back Layer: Mac Browser Model with Web Dashboard */}
                    <div className="relative w-[95%] max-w-4xl z-10">
                      <div className="bg-gray-900 rounded-t-lg shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden">
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
                            src={`${basePath}/screenshots/web/web-platform-landing-page.webp`}
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
                            src={`${basePath}/icons/app-feature-preview.webp`}
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
              </div>

              {/* Metric Bar (Floating at bottom of Hero) */}
              <div className="mt-20 grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                  <div className="text-4xl font-bold text-[#bf95f9] mb-2">
                    5 min
                  </div>
                  <div className="text-sm text-[#B9BBBE]">
                    Match Time (was 8 hrs)
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                  <div className="text-4xl font-bold text-[#bf95f9] mb-2">
                    92%
                  </div>
                  <div className="text-sm text-[#B9BBBE]">Match Accuracy</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                  <div className="text-4xl font-bold text-[#bf95f9] mb-2">
                    2
                  </div>
                  <div className="text-sm text-[#B9BBBE]">
                    Platforms Synced Real-time
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. The Challenge: "The Old Way Was Broken" */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-[#E0D0C1] mb-6 text-center">
                The Old Way Was Broken
              </h2>

              <div className="space-y-8 mb-12">
                <p className="text-xl text-[#B9BBBE] text-center max-w-3xl mx-auto">
                  <strong className="text-[#E0D0C1]">The Pain:</strong> Manual
                  spreadsheets. Endless email threads. 70% of leads lost to slow
                  response times.
                </p>
              </div>

              {/* The Old Way - Visual Examples */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Traditional Job Board */}
                <div className="relative">
                  <img
                    src={`${basePath}/screenshots/before-after/traditional-job-board.webp`}
                    alt="Traditional job board"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto max-w-md mx-auto rounded-xl opacity-75"
                  />
                </div>

                {/* Manual Resume Review */}
                <div className="relative">
                  <img
                    src={`${basePath}/screenshots/before-after/manual-resume-review.webp`}
                    alt="Manual resume review process"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto max-w-md mx-auto rounded-xl opacity-75"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. The Match Experience (Mobile Showcase) - Combined with Solution */}
        <section className="section-padding bg-[#1D201F] overflow-hidden">
          <div className="container-padding">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-[#E0D0C1] mb-4 text-center">
                The Match Experience
              </h2>
              <p className="text-xl text-[#B9BBBE] text-center mb-16 max-w-3xl mx-auto">
                Frictionless discovery. Job seekers swipe right to apply, left
                to pass. No cover letters, no forms.
              </p>

              {/* The Brain (AI) Section - Combined from Solution */}
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 md:mb-16 lg:mb-24">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Brain className="w-8 h-8 text-[#bf95f9]" />
                    <h3 className="text-3xl font-bold text-[#E0D0C1]">
                      The Brain (AI)
                    </h3>
                  </div>
                  <p className="text-lg text-[#B9BBBE] leading-relaxed">
                    We didn't just digitize the process; we automated the
                    intelligence. The SmartMatch™ engine analyzes resume
                    keywords against job requirements in real-time.
                  </p>
                </div>
                {/* Welcome Image Only - Mac Browser Frame */}
                <div className="relative w-full max-w-2xl mx-auto">
                  <div className="bg-gray-900 rounded-t-lg shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden">
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
                        src={`${basePath}/screenshots/web/web-platform-welcome-modal.webp`}
                        alt="Welcome modal for new clients"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Cascade */}
              <div
                ref={mobileShowcaseRef}
                className="relative flex justify-center items-end gap-8 md:gap-12 min-h-0 md:min-h-[600px]"
              >
                {/* Left Phone - Onboarding */}
                <div className="w-48 md:w-64 transform -rotate-12">
                  <div className="relative bg-gray-950 rounded-[2.5rem] p-2 shadow-[0_20px_50px_-12px_rgba(191,149,249,0.25)]">
                    {/* Notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10"></div>
                    {/* Screen */}
                    <div className="bg-black rounded-[2rem] overflow-hidden">
                      <img
                        src={`${basePath}/screenshots/mobile/mobile-app-expertise-selection.webp`}
                        alt="Mobile app onboarding"
                        loading="lazy"
                        decoding="async"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Center Phone - Hero (Swipe UI) */}
                <div className="w-64 md:w-80 transform z-10">
                  <div className="relative bg-gray-950 rounded-[2.5rem] p-2 shadow-[0_20px_50px_-12px_rgba(191,149,249,0.4)]">
                    {/* Notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10"></div>
                    {/* Screen */}
                    <div className="bg-black rounded-[2rem] overflow-hidden">
                      <img
                        src={`${basePath}/screenshots/mobile/mobile-app-job-posting-card.webp`}
                        alt="Match experience swipe interface"
                        loading="lazy"
                        decoding="async"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Phone - Chat Result */}
                <div className="w-48 md:w-64 transform rotate-12">
                  <div className="relative bg-gray-950 rounded-[2.5rem] p-2 shadow-[0_20px_50px_-12px_rgba(191,149,249,0.25)]">
                    {/* Notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10"></div>
                    {/* Screen */}
                    <div className="bg-black rounded-[2rem] overflow-hidden">
                      <img
                        src={`${basePath}/screenshots/mobile/mobile-app-chat-conversation.webp`}
                        alt="Real-time chat after match"
                        loading="lazy"
                        decoding="async"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. The Employer Dashboard (Web Showcase with Stacked Cards) */}
        <EmployerDashboardSection webAssets={webAssets} />

        {/* 6. How We Built It - Article & Sidebar Layout */}
        <section className="section-padding bg-[#1D201F] text-[#E0D0C1] py-20">
          <div className="container-padding">
            <div className="max-w-7xl mx-auto">
              {/* 1. Project Specs Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/10 pb-12 mb-12">
                <div className="flex flex-col gap-2">
                  <span className="text-[#bf95f9] font-medium flex items-center gap-2">
                    <Layers size={18} /> Architecture
                  </span>
                  <span className="text-white text-lg font-semibold">
                    Dual-Platform
                  </span>
                  <span className="text-sm text-[#B9BBBE]">
                    Web (Employers) & Mobile (Seekers)
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[#bf95f9] font-medium flex items-center gap-2">
                    <Cpu size={18} /> AI Model
                  </span>
                  <span className="text-white text-lg font-semibold">
                    SmartMatch™
                  </span>
                  <span className="text-sm text-[#B9BBBE]">
                    GPT-4o Contextual Analysis
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[#bf95f9] font-medium flex items-center gap-2">
                    <Server size={18} /> Infrastructure
                  </span>
                  <span className="text-white text-lg font-semibold">
                    Dockerized Flask
                  </span>
                  <span className="text-sm text-[#B9BBBE]">
                    Scalable Microservices
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[#bf95f9] font-medium flex items-center gap-2">
                    <Activity size={18} /> Automation
                  </span>
                  <span className="text-white text-lg font-semibold">
                    n8n Workflows
                  </span>
                  <span className="text-sm text-[#B9BBBE]">
                    Auto-scraping & Reporting
                  </span>
                </div>
              </div>

              <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
                {/* LEFT COLUMN: Narrative & Involvement */}
                <div className="lg:col-span-7 space-y-12">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      Involvement
                    </h2>
                    <p className="text-lg text-[#B9BBBE] leading-relaxed mb-6">
                      We delivered a full-cycle ecosystem, separating concerns
                      between a web dashboard for employers and a mobile app for
                      job seekers. Our goal was to move beyond simple keyword
                      matching.
                    </p>
                    <p className="text-lg text-[#B9BBBE] leading-relaxed mb-6">
                      We engineered a dedicated{" "}
                      <strong className="text-[#E0D0C1]">
                        AI Matching Service
                      </strong>{" "}
                      using GPT-4o-mini to analyze context, skills, and
                      potential. This SmartMatch™ system provides fit scores and
                      detailed recommendations, rather than just filtering by
                      job titles.
                    </p>
                    <p className="text-lg text-[#B9BBBE] leading-relaxed">
                      To support this, we built a production-ready
                      infrastructure using Docker and Gunicorn across three
                      Flask servers (Main, AI, IAP). We integrated{" "}
                      <strong className="text-[#E0D0C1]">n8n workflows</strong>{" "}
                      to handle complex backend tasks—allowing users to query
                      natural language analytics via WhatsApp and automating job
                      scraping from external sources.
                    </p>
                  </div>

                  {/* Services List */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-[#bf95f9] pl-4">
                      Services Delivered
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8 text-[#E0D0C1]">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#bf95f9]"></span>
                        Full-Stack Architecture
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#bf95f9]"></span>
                        AI Model Engineering
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#bf95f9]"></span>
                        Mobile Development (Flutter)
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#bf95f9]"></span>
                        Payment System Integration
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#bf95f9]"></span>
                        Database Design (SQL/NoSQL)
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#bf95f9]"></span>
                        Automated Workflow Design
                      </div>
                    </div>
                  </div>

                  {/* Complex Flows Highlight */}
                  <div className="bg-white/5 rounded-xl p-8 border border-white/5">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Complex Flows Solved
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex gap-4">
                        <div className="min-w-10 h-10 rounded-full bg-[#bf95f9]/10 flex items-center justify-center text-[#bf95f9]">
                          <CreditCard size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">
                            Unified Payments
                          </h4>
                          <p className="text-sm text-[#B9BBBE] mt-1">
                            One integration handling Web, iOS, and Android
                            payments with automatic 7% commission splits via
                            Lemon Squeezy.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="min-w-10 h-10 rounded-full bg-[#bf95f9]/10 flex items-center justify-center text-[#bf95f9]">
                          <Globe size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">
                            Real-Time Sync
                          </h4>
                          <p className="text-sm text-[#B9BBBE] mt-1">
                            Stream Chat integration with custom token management
                            and real-time feed updates via Firestore.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* RIGHT COLUMN: Technologies */}
                <div className="lg:col-span-5">
                  <div className="sticky top-10">
                    <h3 className="text-2xl font-bold text-white mb-8">
                      Technologies
                    </h3>

                    <div className="space-y-8">
                      {/* Category 1 */}
                      <div>
                        <h4 className="text-sm uppercase tracking-wider text-[#bf95f9] font-bold mb-3">
                          Core Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Flutter",
                            "Python/Flask",
                            "React",
                            "Next.js",
                            "Node.js",
                          ].map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-white/5 text-[#E0D0C1] rounded border border-white/10 text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Category 2 */}
                      <div>
                        <h4 className="text-sm uppercase tracking-wider text-[#bf95f9] font-bold mb-3">
                          Data & Infrastructure
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Firebase",
                            "Supabase",
                            "PostgreSQL",
                            "MongoDB",
                            "BigQuery",
                            "Docker",
                          ].map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-white/5 text-[#E0D0C1] rounded border border-white/10 text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Category 3 */}
                      <div>
                        <h4 className="text-sm uppercase tracking-wider text-[#bf95f9] font-bold mb-3">
                          AI & Automation
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "OpenAI API",
                            "Claude API",
                            "n8n",
                            "Stream Chat",
                            "Lemon Squeezy",
                          ].map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-white/5 text-[#E0D0C1] rounded border border-white/10 text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Quote / Highlight Box */}
                    <div className="mt-12 p-6 bg-[#bf95f9]/5 border-l-2 border-[#bf95f9] rounded-r-xl">
                      <p className="italic text-[#E0D0C1] text-lg">
                        "Built with scale in mind from day one—three separate
                        servers, production-ready Docker configs, and automated
                        analytics."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Footer / Call to Action */}
        <section className="section-padding bg-[#1D201F]">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <motion.div
                  className="absolute inset-0 border-2 border-[#bf95f9]/30 rounded-2xl"
                  animate={borderAnimation}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-[#bf95f9]/20 rounded-2xl"
                  animate={borderAnimation2}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <motion.div
                  className="absolute inset-0 border-2 border-[#bf95f9]/15 rounded-2xl"
                  animate={borderAnimation3}
                  transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                />

                <div
                  className="relative rounded-2xl bg-muted/50 p-10 md:p-16 text-center"
                  style={{ transform: "rotate(0.3deg)" }}
                >
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#E0D0C1]">
                    Ready to build your own platform?
                  </h3>

                  <p className="text-xl md:text-2xl text-[#B9BBBE] mb-10 max-w-3xl mx-auto leading-relaxed">
                    Let's turn your idea into a production-ready product.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => navigate("/contact")}
                      className="btn-hero inline-flex items-center justify-center min-w-[240px] text-lg"
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

export default GomlinJobs;
