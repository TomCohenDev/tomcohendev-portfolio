import { useEffect, useRef, useState, useMemo } from "react";
import {
  Bot,
  Workflow,
  Smartphone,
  Rocket,
  Globe,
  Server,
  ArrowRight,
  Lightbulb,
  Code2,
  LineChart,
  Zap,
  Shield,
  Headphones,
  Users,
  Target,
  Layers,
  Sparkles,
  Brain,
  MessageSquare,
  Link,
  CheckCircle2,
  Eye,
  MousePointerClick,
  FileCode,
  User,
} from "lucide-react";
import SmallCircularChalk from "./SmallCircularChalk";
import ConnectingChalkLine from "./ConnectingChalkLine";
import { useNavigate } from "react-router-dom";

// Animated V Icon Component - cycles through v-1.svg to v-5.svg randomly
const AnimatedV = ({
  className = "w-5 h-5 text-primary shrink-0",
}: {
  className?: string;
}) => {
  const [currentVIndex, setCurrentVIndex] = useState(0);
  const vSvgs = ["/v-1.svg", "/v-2.svg", "/v-3.svg", "/v-4.svg", "/v-5.svg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVIndex((prev) => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * vSvgs.length);
        } while (newIndex === prev);
        return newIndex;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [vSvgs.length]);

  return (
    <img
      src={vSvgs[currentVIndex]}
      alt="V"
      className={className}
      style={{
        filter:
          "brightness(0) saturate(100%) invert(74%) sepia(15%) saturate(2500%) hue-rotate(240deg) brightness(100%) contrast(110%)",
      }}
    />
  );
};

interface ServiceSubSection {
  title: string;
  description: string;
  items?: string[];
}

interface ServiceProcessStep {
  title: string;
  description: string;
}

interface ServiceData {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  longDescription?: string;
  subSections?: ServiceSubSection[];
  processSteps?: ServiceProcessStep[];
  whyUs?: { title: string; description: string }[];
}

interface ServiceNode extends ServiceData {
  position: { x: number; y: number };
  angle: number;
}

interface ServiceMapProps {
  activeServiceId?: string;
}

const ServiceMap = ({ activeServiceId }: ServiceMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [linesVisible, setLinesVisible] = useState(false);
  const [orbitAnimating, setOrbitAnimating] = useState(false);
  const [isIconClicked, setIsIconClicked] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [targetRotation, setTargetRotation] = useState(0);
  const [currentBaseRotation, setCurrentBaseRotation] = useState(0);
  const [mobileActiveSection, setMobileActiveSection] = useState(0);

  // Define services data with descriptions
  const servicesList: ServiceData[] = [
    {
      id: "mvp",
      title: "MVP Build",
      icon: <Rocket className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      description:
        "Launch your minimum viable product in weeks, not months. We focus on core features that validate your business idea fast.",
      features: [
        "Fast time-to-market",
        "Core feature focus",
        "Scalable foundation",
        "Launch support",
      ],
      longDescription:
        "Product managers, developers, and designers integrate into your business as a cohesive team. We contribute all our knowledge to satisfy early adopters and ensure you're moving the right direction. Our goal is to get your product into users' hands as quickly as possible while building on a foundation that scales.",
      subSections: [
        {
          title: "Lean Development",
          description:
            "Building software version by version while focusing on end-users' pains, we help you get the products into the hands of your customers ASAP, learn how it helps them and then iteratively improve it.",
          items: [
            "Conduct product discovery",
            "Prototype and validate",
            "Get users feedback",
            "Decide based on data",
          ],
        },
        {
          title: "Smart Engineering",
          description:
            "From streamlining development with smart tools to building AI-powered features into your product — we know how to harness AI where it makes sense. Our engineering culture helps you move fast without breaking things.",
          items: [
            "Pair programming",
            "Wide test coverage",
            "Frequent delivery",
            "Fast prototyping with AI tools",
          ],
        },
        {
          title: "Pragmatic Tech Choices",
          description:
            "We pick the stack that gets you to market fastest while capturing the data you need to learn. Solid foundations that evolve with your product.",
          items: [
            "Right tools for today's needs",
            "Data capture from day one",
            "Ready to scale when you are",
            "Clean code that grows with you",
          ],
        },
      ],
      processSteps: [
        {
          title: "Discovery Session",
          description:
            "We use proven decision-making frameworks for product ideation to build the right thing from the beginning. Define scope, prioritize features, and align on success metrics.",
        },
        {
          title: "Prototype & Validate",
          description:
            "We start with minimal solutions—technical proof of concepts or clickable design prototypes to test hypotheses. This phase becomes the foundation for development.",
        },
        {
          title: "MVP Development & Launch",
          description:
            "We build the core value proposition with clean, scalable code. Continuous deployment means you see progress daily. Launch support ensures a smooth go live.",
        },
      ],
      whyUs: [
        {
          title: "Product Company Expertise",
          description:
            "We are a software agency with two main focuses: services and products. We solve real pains while focusing on essential business objectives.",
        },
        {
          title: "Startup to Scale-up",
          description:
            "We build web and mobile solutions all over the world. Leveraging engineering and product expertise, we help small startups grow into thriving businesses.",
        },
        {
          title: "Solid Development Culture",
          description:
            "We choose the tech stack according to your product needs to guarantee effortless maintenance and growth. No rebuilds, no regrets.",
        },
      ],
    },
    {
      id: "web",
      title: "Web Apps",
      icon: <Globe className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      description:
        "Full-stack web applications built with modern technologies. From dashboards to SaaS platforms, we build it all.",
      features: [
        "React/Next.js",
        "Node.js backends",
        "Database design",
        "Cloud deployment",
      ],
      longDescription:
        "We craft stellar web applications using React, Next.js, and Node.js. Whether you need an internal dashboard, a customer-facing SaaS platform, or a complex enterprise system, we deliver performant, accessible, and beautifully designed web experiences that users love.",
      subSections: [
        {
          title: "Modern Frontend",
          description:
            "We build responsive, accessible interfaces using React and Next.js. Server-side rendering, static generation, and seamless navigation create experiences that feel instant.",
          items: [
            "React & Next.js",
            "TypeScript first",
            "Responsive design",
            "WCAG accessibility",
          ],
        },
        {
          title: "Robust Backend",
          description:
            "Our Node.js backends are built for performance and reliability. RESTful APIs, GraphQL, authentication, and real-time features—all production-ready.",
          items: [
            "Node.js & Express",
            "GraphQL / REST APIs",
            "Auth & security",
            "Real-time with WebSockets",
          ],
        },
        {
          title: "Cloud Infrastructure",
          description:
            "We deploy to modern cloud platforms with CI/CD pipelines, monitoring, and auto-scaling. Your app stays fast and available as you grow.",
          items: [
            "AWS / Vercel / Railway",
            "Docker containers",
            "CI/CD pipelines",
            "Monitoring & logging",
          ],
        },
      ],
      processSteps: [
        {
          title: "Architecture Planning",
          description:
            "We design the technical architecture—database schema, API structure, and deployment strategy—before writing code. No surprises later.",
        },
        {
          title: "Iterative Development",
          description:
            "We build in sprints with weekly demos. You see progress constantly and can adjust priorities based on what you learn.",
        },
        {
          title: "Launch & Handoff",
          description:
            "We deploy to production, set up monitoring, and provide documentation. Your team is ready to take over or we continue supporting.",
        },
      ],
      whyUs: [
        {
          title: "Full-Stack Expertise",
          description:
            "Our engineers work across the entire stack. No silos, no handoff delays—just cohesive development from database to UI.",
        },
        {
          title: "Performance Obsessed",
          description:
            "We optimize for Core Web Vitals, bundle size, and perceived performance. Fast apps convert better and rank higher.",
        },
        {
          title: "Clean, Maintainable Code",
          description:
            "We write code that your future team will thank us for. Well-documented, well-tested, and following best practices.",
        },
      ],
    },
    {
      id: "personal-website",
      title: "Personal Website",
      icon: <User className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      description:
        "Professional personal websites and portfolios that showcase your work, skills, and personality. Stand out with a custom-designed site that tells your story.",
      features: [
        "Custom design",
        "Portfolio showcase",
        "SEO optimized",
        "Fast & responsive",
      ],
      longDescription:
        "We create stunning personal websites and portfolios that make a lasting impression. Whether you're a designer, developer, consultant, or creative professional, we build custom sites that showcase your work beautifully and help you stand out in your field.",
      subSections: [
        {
          title: "Custom Design",
          description:
            "Every personal website is unique. We design and build custom sites that reflect your personality and brand, ensuring you stand out from generic templates.",
          items: [
            "Unique visual identity",
            "Brand-aligned design",
            "Custom illustrations",
            "Personalized animations",
          ],
        },
        {
          title: "Portfolio Showcase",
          description:
            "We create elegant ways to display your work—case studies, project galleries, and interactive demos that let visitors experience what you do.",
          items: [
            "Project galleries",
            "Case study pages",
            "Interactive demos",
            "Testimonials & reviews",
          ],
        },
        {
          title: "Performance & SEO",
          description:
            "Fast-loading, SEO-optimized sites that rank well in search and provide an excellent user experience across all devices.",
          items: [
            "Core Web Vitals optimized",
            "Mobile responsive",
            "SEO best practices",
            "Fast page loads",
          ],
        },
      ],
      processSteps: [
        {
          title: "Discovery & Design",
          description:
            "We learn about your brand, goals, and target audience. Then we design a custom site that tells your story and showcases your work effectively.",
        },
        {
          title: "Development & Content",
          description:
            "We build your site with modern technologies, optimize for performance, and help you organize your content for maximum impact.",
        },
        {
          title: "Launch & Handoff",
          description:
            "We deploy your site, set up analytics, and provide you with everything you need to maintain and update it going forward.",
        },
      ],
      whyUs: [
        {
          title: "Personal Brand Focus",
          description:
            "We understand that your personal website is your digital identity. We craft sites that authentically represent who you are and what you do.",
        },
        {
          title: "Portfolio Expertise",
          description:
            "We've built dozens of portfolio sites for designers, developers, and creatives. We know what works and what doesn't.",
        },
        {
          title: "Future-Proof",
          description:
            "Your site is built with modern, maintainable code. Easy to update, easy to extend, and ready to grow with your career.",
        },
      ],
    },
    {
      id: "mobile",
      title: "Mobile Apps",
      icon: <Smartphone className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      description:
        "Cross-platform mobile apps that feel native. One codebase, multiple platforms, exceptional user experience.",
      features: [
        "Flutter",
        "iOS & Android",
        "Firebase / FlutterFire",
        "App Store deployment",
      ],
      longDescription:
        "With 4 years of Flutter expertise, we build beautiful iOS and Android apps from a single codebase. We combine Flutter with Firebase (FlutterFire) or other backend platforms to deliver fullstack mobile solutions that feel native, perform beautifully, and scale effortlessly.",
      subSections: [
        {
          title: "Flutter Excellence",
          description:
            "4 years of Flutter development experience. We build for iOS and Android simultaneously with native performance and beautiful custom UIs.",
          items: [
            "Flutter experts",
            "Single codebase",
            "Native performance",
            "Platform-specific polish",
          ],
        },
        {
          title: "Native Integrations",
          description:
            "We integrate seamlessly with device features—camera, biometrics, push notifications, offline storage, and more. Your app feels like it belongs on the device.",
          items: [
            "Camera & media",
            "Biometric auth",
            "Push notifications",
            "Offline-first architecture",
          ],
        },
        {
          title: "App Store Success",
          description:
            "We handle the entire App Store and Play Store submission process. ASO optimization, screenshot design, and compliance—we've shipped dozens of apps.",
          items: [
            "App Store submission",
            "Play Store submission",
            "ASO optimization",
            "Review compliance",
          ],
        },
      ],
      processSteps: [
        {
          title: "Design & Prototype",
          description:
            "Mobile-first design with platform conventions in mind. We prototype interactions so you can feel the app before we build it.",
        },
        {
          title: "Flutter + Firebase Build",
          description:
            "Development in Flutter with Firebase backend. Continuous TestFlight/internal testing. You're involved every step of the way.",
        },
        {
          title: "Launch & Iterate",
          description:
            "We submit to app stores, handle the review process, and support your launch. Then we iterate based on real user analytics.",
        },
      ],
      whyUs: [
        {
          title: "Native Feel, Shared Code",
          description:
            "We don't compromise on UX. Our cross-platform apps feel native because we sweat the platform-specific details.",
        },
        {
          title: "App Store Veterans",
          description:
            "We've navigated App Store and Play Store reviews countless times. We know what passes and what gets rejected.",
        },
        {
          title: "Performance Tuned",
          description:
            "60fps animations, fast startup times, and minimal battery drain. We build apps users actually want on their home screen.",
        },
      ],
    },
    {
      id: "ai",
      title: "AI Integration",
      icon: <Bot className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      description:
        "Integrate cutting-edge AI into your products. From chatbots to custom ML models, we make AI accessible.",
      features: [
        "LLM integration",
        "Custom AI agents",
        "Computer vision",
        "Natural language processing",
      ],
      longDescription:
        "We help you harness the power of AI to transform your business. From intelligent chatbots and virtual assistants to custom machine learning models and computer vision systems—we make cutting-edge AI accessible and practical for your specific use case.",
      subSections: [
        {
          title: "LLM & Chat Interfaces",
          description:
            "We integrate large language models like GPT-4, Claude, and open-source alternatives into your products. Build chatbots, copilots, and AI assistants that understand context.",
          items: [
            "OpenAI / Anthropic / Ollama",
            "RAG & vector search",
            "Conversational UX",
            "Context management",
          ],
        },
        {
          title: "Custom AI Agents",
          description:
            "We build autonomous AI agents that can reason, plan, and take actions. From customer support automation to complex workflow orchestration.",
          items: [
            "Multi-step reasoning",
            "Tool use & function calling",
            "Workflow automation",
            "Human-in-the-loop",
          ],
        },
        {
          title: "ML & Computer Vision",
          description:
            "Beyond LLMs, we implement custom machine learning models for classification, prediction, and computer vision tasks tailored to your data.",
          items: [
            "Image classification",
            "Object detection",
            "Predictive models",
            "Custom training",
          ],
        },
      ],
      processSteps: [
        {
          title: "AI Feasibility Assessment",
          description:
            "We evaluate your use case, data availability, and technical requirements. Not every problem needs AI—we'll be honest about what will actually work.",
        },
        {
          title: "Proof of Concept",
          description:
            "We build a working prototype to validate the approach. Test with real data, measure accuracy, and refine before full integration.",
        },
        {
          title: "Production Integration",
          description:
            "We integrate the AI system into your product with proper error handling, monitoring, and fallbacks. AI that works reliably at scale.",
        },
      ],
      whyUs: [
        {
          title: "Practical AI Focus",
          description:
            "We cut through the hype to implement AI that actually solves your problem. No buzzword bingo—just working solutions.",
        },
        {
          title: "Full-Stack AI",
          description:
            "We handle everything from model selection to API design to frontend UX. Complete AI product development, not just model wrappers.",
        },
        {
          title: "Production-Ready Systems",
          description:
            "We build AI systems with proper monitoring, cost controls, and fallbacks. Enterprise-grade reliability from day one.",
        },
      ],
    },
    {
      id: "automation",
      title: "Automation",
      icon: <Workflow className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      description:
        "Automate repetitive tasks and workflows. Save time, reduce errors, and scale your operations effortlessly.",
      features: [
        "n8n workflows",
        "API integrations",
        "Scheduled tasks",
        "Business process automation",
      ],
      longDescription:
        "We build intelligent automation systems that eliminate repetitive work and connect your tools. Using n8n, custom integrations, and AI-powered workflows, we help you scale operations without scaling headcount. Every hour saved on manual tasks is an hour invested in growth.",
      subSections: [
        {
          title: "Workflow Automation",
          description:
            "We use n8n and custom solutions to build complex, multi-step workflows that run automatically. Connect your apps, trigger actions, and let the system work while you sleep.",
          items: [
            "n8n workflows",
            "Multi-step logic",
            "Error handling & retries",
            "Scheduled triggers",
          ],
        },
        {
          title: "API Integrations",
          description:
            "We connect your existing tools—CRMs, email platforms, databases, payment systems—into unified workflows. No more copy-pasting between systems.",
          items: [
            "REST & GraphQL APIs",
            "Webhook handlers",
            "OAuth authentication",
            "Data synchronization",
          ],
        },
        {
          title: "AI-Enhanced Automation",
          description:
            "We add intelligence to your workflows with AI. Document processing, email triage, data extraction—automation that understands context.",
          items: [
            "Document parsing",
            "Email classification",
            "Data extraction",
            "Intelligent routing",
          ],
        },
      ],
      processSteps: [
        {
          title: "Process Mapping",
          description:
            "We document your current workflows, identify bottlenecks, and design the automated version. Clear before and after.",
        },
        {
          title: "Integration Development",
          description:
            "We build the automations, test thoroughly, and handle edge cases. Robust systems that don't break on unexpected inputs.",
        },
        {
          title: "Monitoring & Optimization",
          description:
            "We set up dashboards to track automation performance. Continuous improvement based on real usage data.",
        },
      ],
      whyUs: [
        {
          title: "Measurable ROI",
          description:
            "We quantify time saved and errors prevented. You'll know exactly what your automation investment returns.",
        },
        {
          title: "Robust Architecture",
          description:
            "Our automations handle failures gracefully. Retries, notifications, and fallbacks keep your operations running smoothly.",
        },
        {
          title: "Self-Service Friendly",
          description:
            "We build automations your team can modify. Visual editors and documentation mean you're not dependent on us forever.",
        },
      ],
    },
    {
      id: "backend",
      title: "Backend Solutions",
      icon: <Server className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
      description:
        "Robust server architecture and APIs. We build the backbone that powers your applications.",
      features: [
        "REST & GraphQL APIs",
        "Database architecture",
        "Server setup",
        "Microservices",
      ],
      longDescription:
        "We architect and build the server-side systems that power your applications. From RESTful and GraphQL APIs to database design, authentication, and microservices—we create backends that are fast, secure, and ready to scale with your success.",
      subSections: [
        {
          title: "API Development",
          description:
            "We design and implement APIs that are a joy to work with. Clear documentation, consistent patterns, and comprehensive error handling.",
          items: [
            "REST API design",
            "GraphQL schemas",
            "API documentation",
            "Versioning strategy",
          ],
        },
        {
          title: "Database Architecture",
          description:
            "We choose and design the right database for your needs. Relational, document, graph, or time-series—optimized for your access patterns.",
          items: [
            "PostgreSQL / MongoDB",
            "Schema design",
            "Query optimization",
            "Data migrations",
          ],
        },
        {
          title: "Infrastructure & DevOps",
          description:
            "We set up cloud infrastructure, CI/CD pipelines, and monitoring. Your backend runs reliably and deploys smoothly.",
          items: [
            "Cloud deployment",
            "Docker & Kubernetes",
            "CI/CD pipelines",
            "Monitoring & alerting",
          ],
        },
      ],
      processSteps: [
        {
          title: "Architecture Design",
          description:
            "We design the system architecture—services, databases, and APIs—with scalability and maintainability in mind.",
        },
        {
          title: "Implementation",
          description:
            "We build incrementally with comprehensive tests. Each component is production-ready before we move to the next.",
        },
        {
          title: "Deployment & Operations",
          description:
            "We deploy to your cloud, set up monitoring, and document everything. Smooth handoff or ongoing support—your choice.",
        },
      ],
      whyUs: [
        {
          title: "Scalability Built-In",
          description:
            "We design for growth from day one. No rearchitecting when you hit product-market fit.",
        },
        {
          title: "Security First",
          description:
            "Auth, encryption, input validation, and rate limiting. We bake security into every layer.",
        },
        {
          title: "API-First Design",
          description:
            "Clean, documented APIs that frontend teams and partners love to work with.",
        },
      ],
    },
  ];

  // Calculate positions dynamically to ensure a perfect circle
  const services: ServiceNode[] = useMemo(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return [];

    const minDim = Math.min(dimensions.width, dimensions.height);
    const pixelRadius = minDim * 0.35;

    return servicesList.map((service, index) => {
      const total = servicesList.length;
      // Start from -PI/2 (top)
      const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
      const angleDegrees = (index / total) * 360 - 90;

      const offsetX = Math.cos(angle) * pixelRadius;
      const offsetY = Math.sin(angle) * pixelRadius;

      const x = 50 + (offsetX / dimensions.width) * 100;
      const y = 50 + (offsetY / dimensions.height) * 100;

      return {
        ...service,
        position: { x, y },
        angle: angleDegrees,
      };
    });
  }, [dimensions.width, dimensions.height]);

  // Get current rotation from CSS animation
  const getCurrentRotation = (): number => {
    if (!orbitRef.current) return 0;
    const style = window.getComputedStyle(orbitRef.current);
    const transform = style.transform;

    if (transform === "none") return currentBaseRotation;

    // Parse rotation from matrix
    const values = transform.split("(")[1]?.split(")")[0]?.split(",");
    if (values && values.length >= 2) {
      const a = parseFloat(values[0]);
      const b = parseFloat(values[1]);
      const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
      return angle;
    }
    return currentBaseRotation;
  };

  // Core service selection logic (without navigation)
  const selectService = (serviceId: string, updateUrl: boolean = true) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    // Get current rotation before stopping animation
    let currentRot = getCurrentRotation();

    // If we are settled (selectedService is set) and not animating,
    // use the stored targetRotation to prevent "matrix normalization" jumps
    // (CSS matrix always returns 0-360, but we might be at 720+)
    if (selectedService && !orbitAnimating) {
      currentRot = targetRotation;
    }

    setCurrentBaseRotation(currentRot);

    // Calculate rotation to bring this service to bottom (180 degrees from top)
    const serviceIndex = services.findIndex((s) => s.id === serviceId);
    const serviceAngleFromTop = (serviceIndex / services.length) * 360;

    // Current angular position of the service (unwrapped)
    const currentServicePos = serviceAngleFromTop + currentRot;

    // Target position is bottom (180° from top)
    const targetPos = 180;

    // Calculate diff
    let rotationDiff = targetPos - currentServicePos;

    // Normalize to shortest path [-180, 180]
    while (rotationDiff > 180) rotationDiff -= 360;
    while (rotationDiff < -180) rotationDiff += 360;

    // Final rotation is current rotation plus the shortest path difference
    const finalRotation = currentRot + rotationDiff;

    // Step 1: Stop animation and snap to current position
    setOrbitAnimating(false);
    setTargetRotation(currentRot); // Snap to where animation currently is
    setSelectedService(serviceId);

    // Update URL without reloading (only if requested)
    if (updateUrl) {
      navigate(`/services/${serviceId}`, { replace: true });
    }

    // Step 2: In next frame, animate to final position
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTargetRotation(finalRotation);
      });
    });

    // Step 3: Smooth scroll to show half of the wheel
    if (containerRef.current) {
      const wheelRect = containerRef.current.getBoundingClientRect();
      const wheelCenter = wheelRect.top + window.scrollY + wheelRect.height / 2;
      // Scroll so the center of the wheel is at the top of the viewport
      const targetScroll = wheelCenter;

      // Small delay to sync with the rotation animation
      setTimeout(() => {
        window.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  // Handle service click (user interaction - updates URL)
  const handleServiceClick = (serviceId: string) => {
    selectService(serviceId, true);
  };

  // Handle close
  const handleClose = () => {
    setSelectedService(null);
    navigate("/services", { replace: true });

    // Smooth scroll back to the wheel, centered in the viewport
    if (containerRef.current) {
      const wheelRect = containerRef.current.getBoundingClientRect();
      const wheelCenter = wheelRect.top + window.scrollY + wheelRect.height / 2;
      const targetScroll = Math.max(0, wheelCenter - window.innerHeight / 2);

      // Let the DOM update (expanded section collapsing) before scrolling
      requestAnimationFrame(() => {
        window.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });
      });
    }

    // Resume animation after a brief delay
    setTimeout(() => {
      setCurrentBaseRotation(targetRotation);
      setOrbitAnimating(true);
    }, 100);
  };

  const handleIconClick = () => {
    setIsIconClicked(true);
    setTimeout(() => {
      setIsIconClicked(false);
    }, 1000);

    if (selectedService) {
      handleClose();
    }
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    const linesTimer = setTimeout(() => {
      setLinesVisible(true);
    }, 300);

    const orbitTimer = setTimeout(() => {
      setOrbitAnimating(true);
    }, 300);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(linesTimer);
      clearTimeout(orbitTimer);
    };
  }, []);

  // Handle initial active service from props (deep link - don't update URL since we already have it)
  useEffect(() => {
    if (
      activeServiceId &&
      services.length > 0 &&
      activeServiceId !== selectedService
    ) {
      // Find the service to validate it exists
      const service = services.find((s) => s.id === activeServiceId);
      if (service) {
        selectService(activeServiceId, false); // false = don't update URL, we're already on it
      }
    }
  }, [activeServiceId, services.length]); // Depend on services.length to ensure dimensions are set

  const getLineCoords = (
    targetPosition: { x: number; y: number },
    offsetPixels: number = 0
  ) => {
    if (dimensions.width === 0)
      return { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } };

    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const targetX = (targetPosition.x / 100) * dimensions.width;
    const targetY = (targetPosition.y / 100) * dimensions.height;

    const centerNodeRadius = dimensions.width >= 768 ? 115 : 60;
    const angle = Math.atan2(targetY - centerY, targetX - centerX);
    const startX = centerX + Math.cos(angle) * centerNodeRadius;
    const startY = centerY + Math.sin(angle) * centerNodeRadius;

    const endX = targetX + Math.cos(angle) * offsetPixels;
    const endY = targetY + Math.sin(angle) * offsetPixels;

    return {
      start: { x: startX, y: startY },
      end: { x: endX, y: endY },
    };
  };

  const selectedServiceData = services.find((s) => s.id === selectedService);

  // Mobile scroll observer
  useEffect(() => {
    if (selectedServiceData?.id !== "mobile") return;

    const handleScroll = () => {
      const sections = document.querySelectorAll(".mobile-scroll-section");
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        // If section is roughly in the middle of viewport
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          setMobileActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedServiceData]);

  return (
    <div className="w-full">
      {/* Service Map Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[500px] md:h-[700px] overflow-visible z-30"
      >
        {/* Center Node - Does NOT rotate */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center">
          <div className="relative w-28 h-28 md:w-56 md:h-56 flex items-center justify-center">
            <SmallCircularChalk />
            <div
              className="flex items-center justify-center z-10 group/icon cursor-pointer"
              onClick={handleIconClick}
            >
              <img
                src="/logo-no-bg.png"
                alt="Tom Cohen"
                className={`w-14 h-14 md:w-28 md:h-28 object-contain transition-transform duration-300 group-hover/icon:scale-110 ${
                  isIconClicked ? "scale-125" : ""
                }`}
              />
            </div>
          </div>
        </div>

        {/* Rotating Orbit Layer */}
        <div
          ref={orbitRef}
          className={`absolute inset-0 ${
            orbitAnimating && !selectedService ? "animate-orbit-ccw" : ""
          }`}
          style={{
            transformOrigin: "center center",
            transform:
              !orbitAnimating || selectedService
                ? `rotate(${targetRotation}deg)`
                : undefined,
            transition: selectedService
              ? "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
              : undefined,
          }}
        >
          {/* SVG Drawing Layer - Connecting Lines */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {dimensions.width > 0 &&
              services.map((service, index) => {
                const isSelected = selectedService === service.id;
                const offset = isSelected ? 60 : 0;
                const { start, end } = getLineCoords(service.position, offset);
                return (
                  <ConnectingChalkLine
                    key={service.id}
                    start={start}
                    end={end}
                    isVisible={linesVisible}
                    delay={index * 80}
                  />
                );
              })}
          </div>

          {/* Service Nodes */}
          {services.map((service) => (
            <div
              key={service.id}
              className={`absolute z-10 flex flex-col items-center gap-3 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                selectedService === service.id
                  ? "scale-[2.0] md:scale-[2.5] z-20 pointer-events-none"
                  : "hover:scale-105"
              }`}
              style={{
                left: `${service.position.x}%`,
                top: `${service.position.y}%`,
              }}
              onClick={() => handleServiceClick(service.id)}
            >
              {/* Counter-rotate content to keep it upright */}
              <div
                className={`flex flex-col items-center gap-3 ${
                  orbitAnimating && !selectedService ? "animate-orbit-cw" : ""
                }`}
                style={{
                  transform:
                    !orbitAnimating || selectedService
                      ? `rotate(${-targetRotation}deg) ${
                          selectedService === service.id
                            ? "translateY(60px)"
                            : ""
                        }`
                      : undefined,
                  transition: selectedService
                    ? "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
                    : undefined,
                }}
              >
                <div
                  className={`p-3 md:p-4 bg-background border-2 rounded-2xl shadow-lg transition-all duration-300 ${
                    selectedService === service.id
                      ? "border-primary shadow-primary/30"
                      : "border-primary/50 shadow-primary/10"
                  }`}
                >
                  {service.icon}
                </div>
                <span
                  className={`text-xs md:text-base font-bold bg-background/90 px-3 py-1 rounded-full border whitespace-nowrap transition-colors duration-300 ${
                    selectedService === service.id
                      ? "text-primary border-primary/50"
                      : "text-foreground border-border/50"
                  }`}
                >
                  {service.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Service Info Section */}
      <div
        className={`transition-all duration-700 ease-in-out ${
          selectedServiceData
            ? "opacity-100 mt-20 md:mt-48 overflow-visible"
            : "max-h-0 opacity-0 mt-0 overflow-hidden"
        }`}
      >
        {selectedServiceData && selectedServiceData.id === "mvp" ? (
          /* ========================================
             MVP BUILD - COMPLETE REDESIGNED SECTION
             ======================================== */
          <div className="w-full relative py-12 md:py-20 animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* HERO HEADER - Speed Focused */}
              <div className="text-center mb-16 md:mb-24">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Launch Your MVP in{" "}
                  <span className="text-primary relative">
                    Weeks
                    <svg
                      className="absolute -bottom-2 left-0 w-full"
                      height="8"
                      viewBox="0 0 100 8"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 7 Q 25 0, 50 4 T 100 3"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        className="text-primary/60"
                      />
                    </svg>
                  </span>
                  , <br className="hidden md:block" />
                  Not{" "}
                  <span className="text-muted-foreground/50 line-through">
                    Months
                  </span>
                </h2>

                <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  Full service MVP development — from validating your idea and
                  finding product market fit, to crafting the UX, writing the
                  code, and launching to real users. Just one partner who
                  handles everything,{" "}
                  <span className="text-foreground font-semibold">fast</span>.
                </p>
              </div>

              {/* VALUE CARDS - What You Get */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold text-center mb-10">
                  What You Get
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      icon: Zap,
                      title: "Fast Time to Market",
                      desc: "Go from idea to live product in weeks, not months",
                    },
                    {
                      icon: Layers,
                      title: "Scalable Foundation",
                      desc: "Built to grow with your success from day one",
                    },
                    {
                      icon: Shield,
                      title: "Production Ready Code",
                      desc: "Clean, tested, and ready for real users",
                    },
                    {
                      icon: Headphones,
                      title: "Launch Support",
                      desc: "We're with you through launch and beyond",
                    },
                  ].map((card, idx) => (
                    <div
                      key={idx}
                      className="group p-6 md:p-8 bg-card rounded-2xl border border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                    >
                      <div className="w-16 h-16 mb-5 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <card.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h4 className="text-2xl md:text-3xl font-bold mb-3">
                        {card.title}
                      </h4>
                      <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* THREE PILLARS - Numbered Visual Hierarchy */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  Our Approach
                </h3>
                <p className="text-xl md:text-2xl text-muted-foreground text-center max-w-3xl mx-auto mb-12">
                  We combine lean methodology with smart engineering to deliver
                  MVPs that validate your idea and scale with your success.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      num: "01",
                      icon: Lightbulb,
                      title: "Lean Development",
                      desc: "Building software version by version while focusing on end-users' pains. We get products into customers' hands ASAP, learn how it helps them, then iteratively improve.",
                      items: [
                        "Conduct product discovery",
                        "Prototype and validate",
                        "Get user feedback fast",
                        "Decide based on data",
                      ],
                    },
                    {
                      num: "02",
                      icon: Code2,
                      title: "Smart Engineering",
                      desc: "From streamlining development with AI tools to building intelligent features into your product — our engineering culture helps you move fast without breaking things.",
                      items: [
                        "Pair programming",
                        "Wide test coverage",
                        "Frequent delivery",
                        "AI-powered development",
                      ],
                    },
                    {
                      num: "03",
                      icon: LineChart,
                      title: "Pragmatic Tech Choices",
                      desc: "We pick the stack that gets you to market fastest while capturing the data you need to learn. Solid foundations that evolve with your product.",
                      items: [
                        "Right tools for today's needs",
                        "Data capture from day one",
                        "Ready to scale when you are",
                        "Clean code that grows with you",
                      ],
                    },
                  ].map((pillar, idx) => (
                    <div
                      key={idx}
                      className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-muted/50 to-muted/20 border border-border/50 hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="absolute -top-5 -left-2 md:-left-4">
                        <span className="text-6xl md:text-7xl font-bold text-primary/20">
                          {pillar.num}
                        </span>
                      </div>
                      <div className="pt-8">
                        <div className="flex items-center gap-3 mb-4">
                          <pillar.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                          <h4 className="text-2xl md:text-3xl font-bold">
                            {pillar.title}
                          </h4>
                        </div>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed">
                          {pillar.desc}
                        </p>
                        <ul className="space-y-4">
                          {pillar.items.map((item, itemIdx) => (
                            <li
                              key={itemIdx}
                              className="flex items-start gap-3"
                            >
                              <AnimatedV className="w-6 h-6 text-primary shrink-0 mt-1" />
                              <span className="text-lg md:text-xl">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PROCESS TIMELINE */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  From Idea to Launch
                </h3>
                <p className="text-xl md:text-2xl text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                  Your journey from concept to a live, validated product
                </p>

                {/* Desktop Timeline */}
                <div className="hidden md:block relative">
                  {/* Connecting Line */}
                  <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full" />

                  <div className="grid grid-cols-3 gap-8 relative">
                    {[
                      {
                        step: 1,
                        title: "Discovery Session",
                        desc: "We use proven decision making frameworks for product ideation to build the right thing from the beginning. Define scope, prioritize features, align on success.",
                      },
                      {
                        step: 2,
                        title: "Prototype & Validate",
                        desc: "We start with minimal solutions, technical proof of concepts or clickable prototypes to test hypotheses. This phase becomes your development foundation.",
                      },
                      {
                        step: 3,
                        title: "Build & Launch",
                        desc: "We build the core value proposition with clean, scalable code. Continuous deployment means you see progress daily. Launch support ensures smooth go live.",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center text-center"
                      >
                        <div className="w-24 h-24 rounded-full bg-primary text-purple-900 flex items-center justify-center text-4xl font-bold mb-6 shadow-lg shadow-primary/30 relative z-10">
                          {item.step}
                        </div>
                        <h4 className="text-2xl md:text-3xl font-bold mb-4">
                          {item.title}
                        </h4>
                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Timeline - Vertical */}
                <div className="md:hidden relative">
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary to-primary/20 rounded-full" />

                  <div className="space-y-12">
                    {[
                      {
                        step: 1,
                        title: "Discovery Session",
                        desc: "We use proven decision-making frameworks for product ideation to build the right thing from the beginning.",
                      },
                      {
                        step: 2,
                        title: "Prototype & Validate",
                        desc: "We start with minimal solutions — technical proof of concepts or clickable prototypes to test hypotheses.",
                      },
                      {
                        step: 3,
                        title: "Build & Launch",
                        desc: "We build the core value proposition with clean, scalable code. Launch support ensures smooth go live.",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-6 relative">
                        <div className="w-16 h-16 rounded-full bg-primary text-purple-900 flex items-center justify-center text-2xl font-bold shrink-0 shadow-lg shadow-primary/30 relative z-10">
                          {item.step}
                        </div>
                        <div className="pt-2">
                          <h4 className="text-2xl font-bold mb-2">
                            {item.title}
                          </h4>
                          <p className="text-xl text-muted-foreground leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* WHY CHOOSE US */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
                  Why Build <span className="text-primary">Fast</span> With Us?
                </h3>
                <p className="text-xl md:text-2xl text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                  We're not just developers — we're product partners invested in
                  your success
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: Target,
                      title: "Product Company Expertise",
                      desc: "We are a software agency with two main focuses: services and products. We solve real pains while focusing on essential business objectives.",
                    },
                    {
                      icon: Users,
                      title: "Startup to Scale-up",
                      desc: "We build web and mobile solutions all over the world. Leveraging engineering and product expertise, we help small startups grow into thriving businesses.",
                    },
                    {
                      icon: Code2,
                      title: "Solid Development Culture",
                      desc: "We choose the tech stack according to your product needs. No rebuilds, no regrets, built for effortless maintenance and growth from day one.",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="group p-8 md:p-10 rounded-3xl bg-card border border-border/50 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 text-center"
                    >
                      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        <item.icon className="w-10 h-10 text-primary" />
                      </div>
                      <h4 className="text-2xl md:text-3xl font-bold mb-4">
                        {item.title}
                      </h4>
                      <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ENHANCED CTA */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-10 md:p-16 lg:p-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full mb-6">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="text-base font-semibold text-primary">
                      Free 30-Minute Consultation
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    Ready to Launch?
                  </h3>

                  <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
                    Don't let months slip by. Let's turn your vision into a live
                    product your users will love — in weeks.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => navigate("/contact")}
                      className="btn-hero inline-flex items-center justify-center min-w-[240px] text-lg"
                    >
                      Start Your MVP <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                    <button
                      onClick={handleClose}
                      className="px-8 py-4 text-lg text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Explore Other Services
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : selectedServiceData && selectedServiceData.id === "web" ? (
          /* ========================================
             WEB APPS - RAILSWARE-INSPIRED LAYOUT
             ======================================== */
          <div className="w-full relative py-12 md:py-20 animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* HERO - Opening Statement */}
              <div className="mb-20 md:mb-28 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight max-w-4xl mx-auto">
                  Web applications that users{" "}
                  <span className="text-primary">actually love</span>
                </h2>
                <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  We build full-stack web applications that are fast,
                  accessible, and beautiful. From SaaS platforms to internal
                  dashboards, we craft experiences that feel instant and work
                  flawlessly across every device.
                </p>
              </div>

              {/* VALUE PROPS - Why Work With Us Grid */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  What sets our web development apart
                </h3>
                <div className="w-20 h-1 bg-primary mb-12"></div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  {[
                    {
                      title: "Product-first engineering",
                      description:
                        "We don't just write code — we build products. Every technical decision is made with your users and business goals in mind. The result is software that actually moves the needle.",
                    },
                    {
                      title: "Full-stack ownership",
                      description:
                        "Frontend, backend, database, deployment — one cohesive team handles it all. No handoff delays, no communication gaps. Just smooth, continuous progress from day one.",
                    },
                    {
                      title: "Performance obsessed",
                      description:
                        "Fast apps convert better and rank higher. We optimize for Core Web Vitals, bundle size, and perceived performance. Your users won't wait, and neither will we.",
                    },
                    {
                      title: "Built to evolve",
                      description:
                        "Clean architecture, comprehensive tests, and clear documentation. Your codebase stays maintainable as your team and product grow. No technical debt nightmares.",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <span className="text-primary font-bold text-lg">
                            0{idx + 1}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-2xl md:text-3xl font-bold mb-3">
                            {item.title}
                          </h4>
                          <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TECH STACK - Horizontal Display */}
              <div className="mb-20 md:mb-28 py-12 md:py-16 bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-3xl">
                <div className="max-w-6xl mx-auto">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Our tech stack
                  </h3>
                  <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto text-xl md:text-2xl">
                    Battle-tested technologies that scale with your ambitions
                  </p>

                  <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {[
                      "React",
                      "Next.js",
                      "TypeScript",
                      "Node.js",
                      "PostgreSQL",
                      "Supabase",
                      "Firebase",
                      "Tailwind",
                      "Vercel",
                      "AWS",
                    ].map((tech, idx) => (
                      <div
                        key={idx}
                        className="px-6 py-4 bg-background border border-border/50 rounded-xl hover:border-primary/50 transition-colors"
                      >
                        <span className="font-semibold text-lg">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* PROCESS - Vertical Timeline Style */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  How we build web apps
                </h3>
                <div className="w-20 h-1 bg-primary mb-12"></div>

                <div className="space-y-8">
                  {[
                    {
                      phase: "Discover",
                      title: "Understand the problem worth solving",
                      description:
                        "We dig deep into your users, your market, and your goals. The best code solves real problems — we make sure we're solving the right one before writing a single line.",
                    },
                    {
                      phase: "Design",
                      title: "Architect for today and tomorrow",
                      description:
                        "Database schema, API structure, component architecture — we plan the technical foundation that will serve you for years. No over-engineering, no cutting corners.",
                    },
                    {
                      phase: "Build",
                      title: "Ship incrementally, iterate constantly",
                      description:
                        "Weekly demos, continuous deployment, rapid feedback loops. You see progress every week and can adjust priorities based on what you learn. No big reveals, no surprises.",
                    },
                    {
                      phase: "Launch",
                      title: "Go live with confidence",
                      description:
                        "Monitoring, error tracking, performance optimization — we make sure your launch is smooth and your app stays healthy. Then we're ready for whatever comes next.",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6 md:gap-8 group">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl bg-primary text-purple-900 flex items-center justify-center font-bold text-xl shrink-0 shadow-lg shadow-primary/20">
                          {idx + 1}
                        </div>
                        {idx < 3 && (
                          <div className="w-0.5 h-full bg-border/50 mt-4 group-hover:bg-primary/30 transition-colors"></div>
                        )}
                      </div>
                      <div className="pb-8">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                          {item.phase}
                        </span>
                        <h4 className="text-2xl md:text-3xl font-bold mt-2 mb-3">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed max-w-2xl">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WHAT WE BUILD - Example Types */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  What we can build for you
                </h3>
                <div className="w-20 h-1 bg-primary mb-12"></div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      type: "SaaS Platforms",
                      examples:
                        "Multi-tenant apps, subscription billing, user dashboards, admin panels",
                    },
                    {
                      type: "Internal Tools",
                      examples:
                        "Custom CRMs, reporting dashboards, workflow automation, data visualization",
                    },
                    {
                      type: "Customer Portals",
                      examples:
                        "Self-service platforms, account management, support centers, booking systems",
                    },
                    {
                      type: "AI-Powered Apps",
                      examples:
                        "Chat interfaces, content generation, intelligent search, recommendation engines",
                    },
                    {
                      type: "Marketplaces",
                      examples:
                        "Two-sided platforms, vendor management, payments integration, review systems",
                    },
                    {
                      type: "Data Platforms",
                      examples:
                        "Analytics dashboards, ETL pipelines, real-time monitoring, reporting tools",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-8 bg-card border border-border/50 rounded-2xl hover:border-primary/30 transition-colors"
                    >
                      <h4 className="text-2xl md:text-3xl font-bold mb-4">
                        {item.type}
                      </h4>
                      <p className="text-muted-foreground text-xl md:text-2xl">
                        {item.examples}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center py-16 md:py-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-primary/10">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Ready to build something great?
                </h3>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4">
                  Let's talk about your web application. We'll help you figure
                  out the right approach.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => navigate("/contact")}
                    className="btn-hero inline-flex items-center justify-center min-w-[200px]"
                  >
                    Start a Project <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Explore Other Services
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : selectedServiceData && selectedServiceData.id === "mobile" ? (
          /* ========================================
             MOBILE APPS - STICKY SCROLL WITH PHONE MOCKUP
             ======================================== */
          <div className="w-full relative">
            {/* HERO - Cross Platform Message */}
            <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight max-w-4xl mx-auto">
                  Your app.
                  <br />
                  <span className="text-primary">Both platforms.</span>
                  <br />
                  Launch faster.
                </h2>
                <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  4 years building mobile apps. We deliver polished iOS and
                  Android apps that your users will love — fast to market, built
                  to scale.
                </p>
              </div>
            </div>

            {/* STICKY SCROLL SECTION - Content Left, Phone Right */}
            <div className="relative max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2">
                {/* LEFT SIDE - Scrolling Content */}
                <div className="px-4 sm:px-6 lg:px-8 lg:pr-12">
                  {/* Section 0: Flutter Fullstack - The Selling Section */}
                  <div className="min-h-[80vh] flex items-center py-16 mobile-scroll-section">
                    <div className="max-w-xl">
                      <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                        Fullstack Mobile
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                        Your vision. Any feature. Both platforms.
                      </h3>
                      <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        We combine Flutter with Firebase, Supabase, or custom
                        backends to build{" "}
                        <span className="text-foreground font-semibold">
                          fast, scalable fullstack apps
                        </span>{" "}
                        that run beautifully on iOS and Android from a single
                        codebase. Whatever you can imagine — we can build it.
                      </p>
                      <div className="space-y-4 mb-8">
                        {[
                          "iOS & Android from one codebase",
                          "Firebase, Supabase, or custom APIs",
                          "Real-time sync & offline support",
                          "Native performance, beautiful UIs",
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <AnimatedV className="w-5 h-5 text-primary shrink-0" />
                            <span className="text-lg">{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {[
                          "Flutter",
                          "Firebase",
                          "Supabase",
                          "REST APIs",
                          "GraphQL",
                        ].map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Section 1: Finance/Dashboard Apps */}
                  <div className="min-h-[80vh] flex items-center py-16 mobile-scroll-section">
                    <div className="max-w-xl">
                      <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                        Dashboard Apps
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                        Finance, banking & dashboards
                      </h3>
                      <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        Clean interfaces that make complex data simple. We build
                        apps that help your users track, manage, and understand
                        their finances, health data, or business metrics at a
                        glance.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          "Real-time data sync",
                          "Secure authentication",
                          "Beautiful charts",
                          "Offline support",
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <AnimatedV className="w-5 h-5 text-primary shrink-0" />
                            <span className="text-lg">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Fitness/Health Apps */}
                  <div className="min-h-[80vh] flex items-center py-16 mobile-scroll-section">
                    <div className="max-w-xl">
                      <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                        Health & Fitness
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                        Apps that keep users engaged
                      </h3>
                      <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        Fitness trackers, health monitors, habit apps — we build
                        engaging experiences with smooth animations, progress
                        tracking, and integrations with device sensors and
                        wearables.
                      </p>
                      <ul className="space-y-4">
                        {[
                          "Health & sensor integrations",
                          "Progress visualization",
                          "Gamification & streaks",
                          "Push notification reminders",
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <AnimatedV className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span className="text-lg">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Section 3: E-commerce / Marketplace */}
                  <div className="min-h-[80vh] flex items-center py-16 mobile-scroll-section">
                    <div className="max-w-xl">
                      <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                        E-commerce
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                        Shopping experiences that convert
                      </h3>
                      <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        Product catalogs, shopping carts, payment processing —
                        we build mobile commerce apps that make buying
                        effortless and keep customers coming back.
                      </p>
                      <ul className="space-y-4">
                        {[
                          "Product search & filters",
                          "Secure payment integration",
                          "Order tracking & history",
                          "Personalized recommendations",
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <AnimatedV className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span className="text-lg">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Section 4: Social & Messaging */}
                  <div className="min-h-[80vh] flex items-center py-16 mobile-scroll-section">
                    <div className="max-w-xl">
                      <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                        Social & Messaging
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                        Real-time chat & collaboration
                      </h3>
                      <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        Messaging apps, team collaboration tools, social
                        platforms — we build real-time features that keep users
                        connected and engaged with instant updates and smooth
                        interactions.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { icon: "💬", label: "Real-time chat" },
                          { icon: "📸", label: "Media sharing" },
                          { icon: "🔔", label: "Push notifications" },
                          { icon: "👥", label: "Group features" },
                          { icon: "📞", label: "Voice & video" },
                          { icon: "🔒", label: "End-to-end encryption" },
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                          >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Section 5: AI Apps */}
                  <div className="min-h-[80vh] flex items-center py-16 mobile-scroll-section">
                    <div className="max-w-xl">
                      <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                        AI-Powered
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                        Intelligence that works for your users
                      </h3>
                      <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        We embed AI where it matters — not as a gimmick, but as
                        features that genuinely help. Smart search, personalized
                        recommendations, predictive insights, all running
                        seamlessly in your app.
                      </p>
                      <ul className="space-y-4">
                        {[
                          "Personalized content & recommendations",
                          "Smart search that understands intent",
                          "Predictive analytics & insights",
                          "Image & voice recognition",
                          "On-device ML for privacy & speed",
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <AnimatedV className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span className="text-lg">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Section 6: App Store */}
                  <div className="min-h-[80vh] flex items-center py-16 mobile-scroll-section">
                    <div className="max-w-xl">
                      <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                        Launch
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                        From code to App Store
                      </h3>
                      <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        We handle the entire journey from development to store
                        submission. Beta testing, app store optimization, review
                        compliance — you focus on your business.
                      </p>
                      <div className="space-y-6">
                        {[
                          {
                            step: "01",
                            title: "Design",
                            desc: "UI/UX following platform guidelines",
                          },
                          {
                            step: "02",
                            title: "Develop",
                            desc: "Agile sprints with weekly demos",
                          },
                          {
                            step: "03",
                            title: "Test",
                            desc: "Device testing & beta programs",
                          },
                          {
                            step: "04",
                            title: "Launch",
                            desc: "Store submission & ASO",
                          },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary text-purple-900 flex items-center justify-center font-bold text-lg shrink-0">
                              {item.step}
                            </div>
                            <div>
                              <h4 className="text-xl font-bold">
                                {item.title}
                              </h4>
                              <p className="text-muted-foreground">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE - Sticky Phone Mockup */}
                <div className="hidden lg:block relative min-h-full">
                  <div className="sticky top-28 h-[calc(100vh-7rem)] flex items-center justify-center px-8 z-10">
                    {/* Phone Frame */}
                    <div className="relative transition-all duration-500 transform">
                      {/* Phone Body */}
                      <div className="w-[320px] h-[640px] bg-gray-950 rounded-[3.5rem] p-3 shadow-2xl shadow-black/50 border-[6px] border-gray-900">
                        {/* Dynamic Island / Notch */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-full z-20"></div>

                        {/* Screen */}
                        <div className="w-full h-full bg-slate-900 rounded-[2.8rem] overflow-hidden relative border border-gray-800/50">
                          {/* Status Bar */}
                          <div className="flex justify-between items-center px-8 pt-5 text-xs font-medium relative z-10 text-white">
                            <span>9:41</span>
                            <div className="flex items-center gap-1">
                              <div className="w-4 h-2.5 border border-current rounded-[2px] opacity-80">
                                <div className="w-3/4 h-full bg-current rounded-[1px]"></div>
                              </div>
                            </div>
                          </div>

                          {/* DYNAMIC SCREEN CONTENT */}
                          <div className="relative h-full transition-all duration-500">
                            {/* 0. YOUR APP - BEAUTIFUL GENERIC SCREEN */}
                            <div
                              className={`absolute inset-0 flex flex-col bg-slate-900 transition-opacity duration-500 ${
                                mobileActiveSection === 0
                                  ? "opacity-100 z-10"
                                  : "opacity-0 z-0"
                              }`}
                            >
                              <div className="h-14"></div>
                              {/* App header */}
                              <div className="px-5 mb-4">
                                <p className="text-slate-400 text-[10px] font-medium">
                                  Welcome back
                                </p>
                                <p className="text-white text-xl font-bold">
                                  Your App
                                </p>
                              </div>
                              {/* Quick actions */}
                              <div className="px-5 mb-4">
                                <div className="flex gap-3">
                                  {[
                                    { icon: "🏠", label: "Home" },
                                    { icon: "🔍", label: "Search" },
                                    { icon: "❤️", label: "Favorites" },
                                    { icon: "👤", label: "Profile" },
                                  ].map((item, i) => (
                                    <div
                                      key={i}
                                      className="flex-1 bg-slate-800 rounded-xl p-3 text-center"
                                    >
                                      <span className="text-lg">
                                        {item.icon}
                                      </span>
                                      <p className="text-[8px] text-slate-400 mt-1">
                                        {item.label}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {/* Feature cards */}
                              <div className="flex-1 px-5">
                                <div className="space-y-3">
                                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-3 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                      ✨
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-white text-xs font-semibold">
                                        Any Feature
                                      </p>
                                      <p className="text-white/70 text-[9px]">
                                        We build what you need
                                      </p>
                                    </div>
                                  </div>
                                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-3 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                      ⚡
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-white text-xs font-semibold">
                                        Fast & Scalable
                                      </p>
                                      <p className="text-white/70 text-[9px]">
                                        Built for growth
                                      </p>
                                    </div>
                                  </div>
                                  <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl p-3 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                      📱
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-white text-xs font-semibold">
                                        iOS & Android
                                      </p>
                                      <p className="text-white/70 text-[9px]">
                                        One codebase
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* 1. FINANCE/DASHBOARD APP SCREEN */}
                            <div
                              className={`absolute inset-0 flex flex-col bg-slate-900 transition-opacity duration-500 ${
                                mobileActiveSection === 1
                                  ? "opacity-100 z-10"
                                  : "opacity-0 z-0"
                              }`}
                            >
                              <div className="h-14"></div>
                              <div className="px-5 pb-4">
                                <p className="text-[10px] text-slate-400">
                                  Good morning
                                </p>
                                <h3 className="text-lg font-bold text-white">
                                  Sarah
                                </h3>
                              </div>
                              <div className="px-5 mb-4">
                                <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-2xl p-4">
                                  <p className="text-violet-200 text-[10px] font-medium mb-1">
                                    Total Balance
                                  </p>
                                  <p className="text-white text-2xl font-bold mb-3">
                                    $24,562.00
                                  </p>
                                  <div className="flex gap-2">
                                    <div className="flex-1 bg-white/20 rounded-xl py-2 px-3 text-center">
                                      <p className="text-white/70 text-[8px]">
                                        Income
                                      </p>
                                      <p className="text-white text-xs font-semibold">
                                        +$4,250
                                      </p>
                                    </div>
                                    <div className="flex-1 bg-white/20 rounded-xl py-2 px-3 text-center">
                                      <p className="text-white/70 text-[8px]">
                                        Spent
                                      </p>
                                      <p className="text-white text-xs font-semibold">
                                        -$1,823
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-1 px-5">
                                <p className="text-xs font-semibold mb-3 text-white">
                                  Recent
                                </p>
                                <div className="space-y-3">
                                  {[
                                    {
                                      name: "Netflix",
                                      amount: "-$15.99",
                                      icon: "🎬",
                                    },
                                    {
                                      name: "Salary",
                                      amount: "+$4,250",
                                      icon: "💼",
                                    },
                                    {
                                      name: "Grocery",
                                      amount: "-$82.50",
                                      icon: "🛒",
                                    },
                                  ].map((item, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center gap-3"
                                    >
                                      <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center text-sm">
                                        {item.icon}
                                      </div>
                                      <p className="text-xs font-medium text-white flex-1">
                                        {item.name}
                                      </p>
                                      <p
                                        className={`text-xs font-semibold ${
                                          item.amount.startsWith("+")
                                            ? "text-emerald-400"
                                            : "text-slate-300"
                                        }`}
                                      >
                                        {item.amount}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* 2. FITNESS/HEALTH APP SCREEN */}
                            <div
                              className={`absolute inset-0 flex flex-col bg-slate-900 transition-opacity duration-500 ${
                                mobileActiveSection === 2
                                  ? "opacity-100 z-10"
                                  : "opacity-0 z-0"
                              }`}
                            >
                              <div className="h-14"></div>
                              <div className="px-5 pb-2">
                                <p className="text-[10px] text-slate-400">
                                  Today
                                </p>
                                <h3 className="text-lg font-bold text-white">
                                  Activity
                                </h3>
                              </div>
                              <div className="px-5 mb-4 flex justify-center">
                                <div className="relative w-36 h-36">
                                  <svg
                                    className="w-full h-full transform -rotate-90"
                                    viewBox="0 0 100 100"
                                  >
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="42"
                                      fill="none"
                                      stroke="#334155"
                                      strokeWidth="8"
                                    />
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="42"
                                      fill="none"
                                      stroke="#ef4444"
                                      strokeWidth="8"
                                      strokeDasharray="264"
                                      strokeDashoffset="66"
                                      strokeLinecap="round"
                                    />
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="32"
                                      fill="none"
                                      stroke="#334155"
                                      strokeWidth="8"
                                    />
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="32"
                                      fill="none"
                                      stroke="#10b981"
                                      strokeWidth="8"
                                      strokeDasharray="201"
                                      strokeDashoffset="40"
                                      strokeLinecap="round"
                                    />
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="22"
                                      fill="none"
                                      stroke="#334155"
                                      strokeWidth="8"
                                    />
                                    <circle
                                      cx="50"
                                      cy="50"
                                      r="22"
                                      fill="none"
                                      stroke="#06b6d4"
                                      strokeWidth="8"
                                      strokeDasharray="138"
                                      strokeDashoffset="28"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <p className="text-2xl font-bold text-white">
                                      756
                                    </p>
                                    <p className="text-[9px] text-slate-400">
                                      calories
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="px-5 mb-4">
                                <div className="flex gap-2">
                                  {[
                                    {
                                      value: "8,432",
                                      label: "Steps",
                                      color: "text-red-400",
                                    },
                                    {
                                      value: "45",
                                      label: "Minutes",
                                      color: "text-emerald-400",
                                    },
                                    {
                                      value: "12",
                                      label: "Stand",
                                      color: "text-cyan-400",
                                    },
                                  ].map((item, i) => (
                                    <div
                                      key={i}
                                      className="flex-1 bg-slate-800 rounded-2xl p-3 text-center"
                                    >
                                      <p
                                        className={`text-base font-bold ${item.color}`}
                                      >
                                        {item.value}
                                      </p>
                                      <p className="text-[9px] text-slate-400">
                                        {item.label}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="flex-1 px-5">
                                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-lg">
                                      🏃
                                    </div>
                                    <div>
                                      <p className="text-white text-sm font-semibold">
                                        Morning Run
                                      </p>
                                      <p className="text-white/70 text-[10px]">
                                        5.2 km • 28 min
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* 3. E-COMMERCE / SHOPPING APP SCREEN */}
                            <div
                              className={`absolute inset-0 flex flex-col bg-slate-900 transition-opacity duration-500 ${
                                mobileActiveSection === 3
                                  ? "opacity-100 z-10"
                                  : "opacity-0 z-0"
                              }`}
                            >
                              <div className="h-14"></div>
                              <div className="px-5 mb-3">
                                <div className="bg-slate-800 rounded-xl px-4 py-2.5 flex items-center gap-3">
                                  <span className="text-slate-400 text-sm">
                                    🔍
                                  </span>
                                  <p className="text-xs text-slate-400">
                                    Search products...
                                  </p>
                                </div>
                              </div>
                              <div className="flex-1 px-5 overflow-hidden">
                                <div className="grid grid-cols-2 gap-2.5">
                                  {[
                                    {
                                      name: "Air Max 90",
                                      price: "$149",
                                      icon: "👟",
                                      color: "from-blue-500 to-violet-600",
                                    },
                                    {
                                      name: "Classic Bag",
                                      price: "$89",
                                      icon: "👜",
                                      color: "from-amber-500 to-orange-600",
                                    },
                                    {
                                      name: "Sport Watch",
                                      price: "$299",
                                      icon: "⌚",
                                      color: "from-slate-500 to-slate-700",
                                    },
                                    {
                                      name: "Running Pro",
                                      price: "$179",
                                      icon: "👟",
                                      color: "from-rose-500 to-pink-600",
                                    },
                                  ].map((item, i) => (
                                    <div
                                      key={i}
                                      className="bg-slate-800 rounded-xl p-2.5"
                                    >
                                      <div
                                        className={`h-16 bg-gradient-to-br ${item.color} rounded-lg mb-2 flex items-center justify-center`}
                                      >
                                        <span className="text-2xl">
                                          {item.icon}
                                        </span>
                                      </div>
                                      <p className="text-[10px] font-semibold text-white truncate">
                                        {item.name}
                                      </p>
                                      <p className="text-xs font-bold text-violet-400">
                                        {item.price}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="px-5 py-4 pb-8">
                                <div className="bg-violet-600 rounded-xl py-3 px-4 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm">🛒</span>
                                    <span className="text-xs font-medium text-white">
                                      2 items
                                    </span>
                                  </div>
                                  <span className="text-xs font-bold text-white">
                                    $238.00
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* 4. MESSAGING / CHAT APP SCREEN */}
                            <div
                              className={`absolute inset-0 flex flex-col bg-slate-900 transition-opacity duration-500 ${
                                mobileActiveSection === 4
                                  ? "opacity-100 z-10"
                                  : "opacity-0 z-0"
                              }`}
                            >
                              <div className="h-14"></div>
                              <div className="px-5 pb-2 flex items-center gap-3 border-b border-slate-800">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">
                                    T
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-semibold text-white">
                                    Team Chat
                                  </p>
                                  <p className="text-[9px] text-emerald-400">
                                    ● Online
                                  </p>
                                </div>
                              </div>
                              <div className="flex-1 px-4 py-3 space-y-3 overflow-hidden">
                                <div className="flex gap-2 items-end">
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shrink-0 flex items-center justify-center">
                                    <span className="text-white text-[8px] font-bold">
                                      A
                                    </span>
                                  </div>
                                  <div className="bg-slate-800 rounded-2xl rounded-bl-sm px-3 py-2 max-w-[75%]">
                                    <p className="text-[11px] text-white">
                                      Hey! How's the project?
                                    </p>
                                  </div>
                                </div>
                                <div className="flex justify-end items-end gap-2">
                                  <div className="bg-violet-600 rounded-2xl rounded-br-sm px-3 py-2 max-w-[75%]">
                                    <p className="text-[11px] text-white">
                                      Almost done with MVP 🚀
                                    </p>
                                  </div>
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shrink-0 flex items-center justify-center">
                                    <span className="text-white text-[8px] font-bold">
                                      Y
                                    </span>
                                  </div>
                                </div>
                                <div className="flex gap-2 items-end">
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shrink-0 flex items-center justify-center">
                                    <span className="text-white text-[8px] font-bold">
                                      A
                                    </span>
                                  </div>
                                  <div className="bg-slate-800 rounded-2xl rounded-bl-sm px-3 py-2 max-w-[75%]">
                                    <p className="text-[11px] text-white">
                                      Can't wait to see it! 🎉
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="px-4 pt-2 pb-10">
                                <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-3 border border-slate-700/50">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="flex-1 bg-slate-700/50 rounded-xl px-3 py-2">
                                      <p className="text-[11px] text-slate-400">
                                        Type a message...
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className="w-7 h-7 rounded-lg bg-slate-700/50 flex items-center justify-center">
                                        <span className="text-xs">📎</span>
                                      </div>
                                      <div className="w-7 h-7 rounded-lg bg-slate-700/50 flex items-center justify-center">
                                        <span className="text-xs">😊</span>
                                      </div>
                                      <div className="w-7 h-7 rounded-lg bg-slate-700/50 flex items-center justify-center">
                                        <span className="text-xs">🎤</span>
                                      </div>
                                    </div>
                                    <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                                      <span className="text-white text-sm font-bold">
                                        ↑
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* 5. AI-POWERED DASHBOARD SCREEN */}
                            <div
                              className={`absolute inset-0 flex flex-col bg-slate-900 transition-opacity duration-500 ${
                                mobileActiveSection === 5
                                  ? "opacity-100 z-10"
                                  : "opacity-0 z-0"
                              }`}
                            >
                              <div className="h-14"></div>
                              {/* Header with AI indicator */}
                              <div className="px-5 mb-3 flex items-center justify-between">
                                <div>
                                  <p className="text-slate-400 text-[10px]">
                                    Good evening
                                  </p>
                                  <p className="text-white text-lg font-bold">
                                    For You
                                  </p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center animate-pulse">
                                  <span className="text-xs">✨</span>
                                </div>
                              </div>
                              {/* AI Insight Card */}
                              <div className="px-5 mb-3">
                                <div className="bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 border border-violet-500/30 rounded-2xl p-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-5 h-5 rounded-lg bg-violet-500 flex items-center justify-center">
                                      <span className="text-[8px]">🧠</span>
                                    </div>
                                    <span className="text-[10px] text-violet-300 font-medium">
                                      AI Insight
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-white leading-relaxed">
                                    Based on your activity, you're 23% more
                                    productive on Tuesdays.
                                  </p>
                                </div>
                              </div>
                              {/* Smart Recommendations */}
                              <div className="px-5 mb-3">
                                <p className="text-[10px] text-slate-400 mb-2">
                                  Recommended for you
                                </p>
                                <div className="space-y-2">
                                  {[
                                    {
                                      icon: "🎵",
                                      title: "Focus Playlist",
                                      subtitle: "Curated by AI",
                                      color: "from-emerald-600 to-teal-600",
                                    },
                                    {
                                      icon: "📚",
                                      title: "Learn React",
                                      subtitle: "Based on your interests",
                                      color: "from-blue-600 to-cyan-600",
                                    },
                                  ].map((item, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center gap-3 bg-slate-800/50 rounded-xl p-2.5"
                                    >
                                      <div
                                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
                                      >
                                        <span className="text-base">
                                          {item.icon}
                                        </span>
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-[11px] text-white font-medium">
                                          {item.title}
                                        </p>
                                        <p className="text-[9px] text-slate-400">
                                          {item.subtitle}
                                        </p>
                                      </div>
                                      <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center">
                                        <span className="text-[10px] text-white">
                                          →
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {/* Predictive Cards */}
                              <div className="px-5 flex-1">
                                <p className="text-[10px] text-slate-400 mb-2">
                                  Predictions
                                </p>
                                <div className="flex gap-2">
                                  <div className="flex-1 bg-slate-800 rounded-xl p-3">
                                    <span className="text-lg">📈</span>
                                    <p className="text-[10px] text-white font-medium mt-1">
                                      +15%
                                    </p>
                                    <p className="text-[8px] text-slate-400">
                                      This week
                                    </p>
                                  </div>
                                  <div className="flex-1 bg-slate-800 rounded-xl p-3">
                                    <span className="text-lg">⏰</span>
                                    <p className="text-[10px] text-white font-medium mt-1">
                                      2:30 PM
                                    </p>
                                    <p className="text-[8px] text-slate-400">
                                      Best focus
                                    </p>
                                  </div>
                                  <div className="flex-1 bg-slate-800 rounded-xl p-3">
                                    <span className="text-lg">🎯</span>
                                    <p className="text-[10px] text-white font-medium mt-1">
                                      89%
                                    </p>
                                    <p className="text-[8px] text-slate-400">
                                      Goal rate
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* 6. APP STORE LISTING SCREEN */}
                            <div
                              className={`absolute inset-0 flex flex-col bg-slate-900 transition-opacity duration-500 ${
                                mobileActiveSection === 6
                                  ? "opacity-100 z-10"
                                  : "opacity-0 z-0"
                              }`}
                            >
                              <div className="h-14"></div>
                              <div className="px-5 pb-4 flex gap-4">
                                <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-[20px] flex items-center justify-center">
                                  <span className="text-white text-2xl font-bold">
                                    Y
                                  </span>
                                </div>
                                <div className="flex-1 pt-1">
                                  <h3 className="font-bold text-base text-white mb-0.5">
                                    Your App
                                  </h3>
                                  <p className="text-[10px] text-slate-400 mb-2">
                                    Your Company
                                  </p>
                                  <div className="flex items-center gap-3">
                                    <div className="bg-blue-500 text-white px-4 py-1.5 rounded-full">
                                      <span className="text-[10px] font-bold">
                                        GET
                                      </span>
                                    </div>
                                    <span className="text-amber-400 text-xs">
                                      ★★★★★
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="px-5 mb-4">
                                <div className="flex gap-2">
                                  {[
                                    "from-violet-600 to-purple-700",
                                    "from-cyan-600 to-blue-700",
                                    "from-emerald-600 to-teal-700",
                                  ].map((color, i) => (
                                    <div
                                      key={i}
                                      className={`w-16 h-28 bg-gradient-to-b ${color} rounded-xl shrink-0`}
                                    ></div>
                                  ))}
                                </div>
                              </div>
                              <div className="flex-1 px-5">
                                <div className="flex gap-4 mb-4 pb-3 border-b border-slate-800">
                                  {[
                                    { value: "4.9", label: "Rating" },
                                    { value: "17+", label: "Age" },
                                    { value: "#2", label: "Charts" },
                                  ].map((item, i) => (
                                    <div key={i} className="flex-1 text-center">
                                      <p className="text-sm font-bold text-white">
                                        {item.value}
                                      </p>
                                      <p className="text-[9px] text-slate-400">
                                        {item.label}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                                <p className="text-xs font-semibold text-white mb-1">
                                  What's New
                                </p>
                                <p className="text-[10px] text-slate-400">
                                  Version 2.0 - Complete redesign
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Bottom Nav Indicator */}
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/20 rounded-full z-20"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="px-4 sm:px-6 lg:px-8 py-20">
              <div className="max-w-4xl mx-auto text-center py-16 md:py-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-primary/10">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Ready to go mobile?
                </h3>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4">
                  Let's discuss your app idea. We'll help you choose the right
                  approach for iOS and Android.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => navigate("/contact")}
                    className="btn-hero inline-flex items-center justify-center min-w-[200px]"
                  >
                    Start a Project <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Explore Other Services
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : selectedServiceData && selectedServiceData.id === "ai" ? (
          /* ========================================
             AI INTEGRATIONS - COMPREHENSIVE AI SECTION
             ======================================== */
          <div className="w-full relative py-12 md:py-20 animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* HERO - Opening Statement */}
              <div className="mb-20 md:mb-28 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight max-w-4xl mx-auto">
                  Ship AI features that{" "}
                  <span className="text-primary">
                    actually work in production
                  </span>
                </h2>
                <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  We've built AI into production apps—chatbots that handle
                  support, agents that automate workflows, features that users
                  actually rely on. Not demos that impress in meetings. Working
                  code that ships.
                </p>
              </div>

              {/* CAPABILITIES GRID - Three Main AI Areas */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Our AI capabilities
                </h3>
                <div className="w-20 h-1 bg-primary mb-12"></div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: MessageSquare,
                      title: "LLM & Chat Interfaces",
                      description:
                        "We integrate large language models and alternatives into your products. Build chatbots, copilots, and AI assistants that understand context and deliver real value.",
                      items: [
                        "Leading LLM providers",
                        "RAG & vector search",
                        "Conversational UX",
                        "Context management",
                      ],
                    },
                    {
                      icon: Bot,
                      title: "Custom AI Agents",
                      description:
                        "We integrate AI into your business pipeline—from customer support automation to complex workflow orchestration. Build autonomous agents that reason, plan, and take actions reliably across your operations.",
                      items: [
                        "Multi-step reasoning",
                        "Tool use & function calling",
                        "Workflow automation",
                        "Human-in-the-loop",
                      ],
                    },
                    {
                      icon: Brain,
                      title: "ML & Computer Vision",
                      description:
                        "Beyond LLMs, we implement custom machine learning models for classification, prediction, and computer vision tasks tailored to your specific data and use cases.",
                      items: [
                        "Image classification",
                        "Object detection",
                        "Predictive models",
                        "Custom training",
                      ],
                    },
                  ].map((capability, idx) => (
                    <div
                      key={idx}
                      className="p-8 bg-card border border-border/50 rounded-2xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                    >
                      <div className="w-16 h-16 mb-6 rounded-xl bg-primary/10 flex items-center justify-center">
                        <capability.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h4 className="text-2xl md:text-3xl font-bold mb-4">
                        {capability.title}
                      </h4>
                      <p className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed">
                        {capability.description}
                      </p>
                      <ul className="space-y-3">
                        {capability.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-3">
                            <AnimatedV className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span className="text-lg md:text-xl text-foreground/80">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* PROCESS - Vertical Timeline Style */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  How we integrate AI
                </h3>
                <div className="w-20 h-1 bg-primary mb-12"></div>

                <div className="space-y-8">
                  {[
                    {
                      phase: "Assess",
                      title: "AI Feasibility Assessment",
                      description:
                        "We evaluate where AI fits in your business pipeline. We'll assess your use case, data, and workflows to determine what will deliver the most value for your business.",
                    },
                    {
                      phase: "Prototype",
                      title: "Proof of Concept",
                      description:
                        "We build a working prototype first. Test it with real data and workflows. If it doesn't prove value, you don't move forward. No multi-month contracts—just validated outcomes before you commit.",
                    },
                    {
                      phase: "Integrate",
                      title: "Production Integration",
                      description:
                        "We integrate AI seamlessly into your business operations with proper error handling, monitoring, and fallbacks. AI that becomes part of your daily workflow and works reliably at scale.",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6 md:gap-8 group">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl bg-primary text-purple-900 flex items-center justify-center font-bold text-xl shrink-0 shadow-lg shadow-primary/20">
                          {idx + 1}
                        </div>
                        {idx < 2 && (
                          <div className="w-0.5 h-full bg-border/50 mt-4 group-hover:bg-primary/30 transition-colors"></div>
                        )}
                      </div>
                      <div className="pb-8">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                          {item.phase}
                        </span>
                        <h4 className="text-2xl md:text-3xl font-bold mt-2 mb-3">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed max-w-2xl">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WHAT WE BUILD - AI Use Cases */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  What we can build with AI
                </h3>
                <div className="w-20 h-1 bg-primary mb-12"></div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      type: "AI Chatbots & Assistants",
                      examples:
                        "Customer support bots, sales assistants, help desk automation, conversational interfaces",
                    },
                    {
                      type: "AI Copilots",
                      examples:
                        "Code assistants, writing copilots, design tools, productivity enhancements",
                    },
                    {
                      type: "Content Generation",
                      examples:
                        "Automated content creation, personalized recommendations, dynamic copywriting",
                    },
                    {
                      type: "Intelligent Search",
                      examples:
                        "Semantic search, RAG systems, knowledge bases, document Q&A",
                    },
                    {
                      type: "Computer Vision",
                      examples:
                        "Image classification, object detection, quality control, visual analytics",
                    },
                    {
                      type: "Predictive Analytics",
                      examples:
                        "Forecasting models, anomaly detection, risk assessment, trend analysis",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-8 bg-card border border-border/50 rounded-2xl hover:border-primary/30 transition-colors"
                    >
                      <h4 className="text-2xl md:text-3xl font-bold mb-4">
                        {item.type}
                      </h4>
                      <p className="text-muted-foreground text-xl md:text-2xl">
                        {item.examples}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* WHY US - Value Props */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Why build AI with us
                </h3>
                <div className="w-20 h-1 bg-primary mb-12"></div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  {[
                    {
                      icon: Code2,
                      title: "Built by practitioners, not consultants",
                      description:
                        "We write the code, deploy to production, and maintain the systems. Same team that builds ships—no handoffs, no slides, just working software.",
                    },
                    {
                      icon: Zap,
                      title: "Fast iteration, low risk",
                      description:
                        "Prototype first. If it doesn't prove value, you don't pay for full integration. We move fast but validate before scaling.",
                    },
                    {
                      icon: Shield,
                      title: "Production-hardened",
                      description:
                        "Every AI feature we build includes monitoring, error handling, and fallbacks. Systems that work when users depend on them, not just in demos.",
                    },
                    {
                      icon: Sparkles,
                      title: "Full integration, not just APIs",
                      description:
                        "We handle the entire stack—from model selection through frontend UX. Your AI feature works end-to-end, not as a disconnected service.",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-2xl md:text-3xl font-bold mb-3">
                            {item.title}
                          </h4>
                          <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center py-16 md:py-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-primary/10">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Ready to add AI to your product?
                </h3>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4">
                  Let's discuss how AI can solve your specific challenges. We'll
                  help you find the right approach.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => navigate("/contact")}
                    className="btn-hero inline-flex items-center justify-center min-w-[200px]"
                  >
                    Start a Project <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Explore Other Services
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : selectedServiceData && selectedServiceData.id === "automation" ? (
          /* ========================================
             AUTOMATION - WORKFLOW AUTOMATION SECTION
             ======================================== */
          <div className="w-full relative py-12 md:py-20 animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* HERO - Opening Statement */}
              <div className="mb-20 md:mb-28 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight max-w-4xl mx-auto">
                  Automate the manual work that{" "}
                  <span className="text-primary">wastes hours every week</span>
                </h2>
                <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  We build automations that run reliably—not Zapier chains that
                  break silently. Built on n8n, deployed with monitoring,
                  maintained by us.
                </p>
              </div>

              {/* CAPABILITIES GRID - Two Main Automation Areas */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Our automation capabilities
                </h3>
                <div className="w-20 h-1 bg-primary mb-12"></div>

                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      icon: Workflow,
                      title: "Workflow Automation",
                      description:
                        "Multi-step processes that handle errors gracefully. Built on n8n with error handling, retries, and monitoring. Scheduled triggers and event-driven workflows that run while you sleep.",
                      items: [
                        "Multi-step logic",
                        "Error handling & retries",
                        "Scheduled triggers",
                        "Event-driven workflows",
                      ],
                    },
                    {
                      icon: Link,
                      title: "System Integrations",
                      description:
                        "Connect your stack: CRM, email, payments, databases. No more exporting CSVs to import somewhere else. Real-time data sync between tools with REST & GraphQL APIs, webhooks, and OAuth.",
                      items: [
                        "REST & GraphQL APIs",
                        "Webhook handlers",
                        "OAuth authentication",
                        "Real-time data sync",
                      ],
                    },
                  ].map((capability, idx) => (
                    <div
                      key={idx}
                      className="p-8 bg-card border border-border/50 rounded-2xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                    >
                      <div className="w-16 h-16 mb-6 rounded-xl bg-primary/10 flex items-center justify-center">
                        <capability.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h4 className="text-2xl md:text-3xl font-bold mb-4">
                        {capability.title}
                      </h4>
                      <p className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed">
                        {capability.description}
                      </p>
                      <ul className="space-y-3">
                        {capability.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-3">
                            <AnimatedV className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span className="text-lg md:text-xl text-foreground/80">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* REAL EXAMPLE / PROOF */}
              <div className="mb-20 md:mb-28 py-12 md:py-16 bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-3xl">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-6 h-6 text-primary" />
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                      Real Example
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    Content pipeline automation
                  </h3>
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                    We built a content pipeline that pulls from 3 sources,
                    filters for relevance, generates platform-specific posts,
                    and tracks everything in Sheets—runs 3x daily without
                    intervention.
                  </p>
                </div>
              </div>

              {/* PROCESS - Vertical Timeline Style */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  How we build automations
                </h3>
                <div className="w-20 h-1 bg-primary mb-12"></div>

                <div className="space-y-8">
                  {[
                    {
                      phase: "Map",
                      title: "Process Mapping",
                      description:
                        "We document what you're doing manually (often you'll realize it's more than you thought). We identify bottlenecks, repetitive steps, and tool gaps to design the automated version.",
                    },
                    {
                      phase: "Build",
                      title: "Build & Test",
                      description:
                        "Working automation with test data, you approve before it touches real systems. We build with error handling and test thoroughly—no surprises, just validated workflows.",
                    },
                    {
                      phase: "Run",
                      title: "Deploy & Monitor",
                      description:
                        "Deployed with monitoring. When something fails, we know before you do. Every automation includes error handling, retries, and we maintain what we build.",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6 md:gap-8 group">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl bg-primary text-purple-900 flex items-center justify-center font-bold text-xl shrink-0 shadow-lg shadow-primary/20">
                          {idx + 1}
                        </div>
                        {idx < 2 && (
                          <div className="w-0.5 h-full bg-border/50 mt-4 group-hover:bg-primary/30 transition-colors"></div>
                        )}
                      </div>
                      <div className="pb-8">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                          {item.phase}
                        </span>
                        <h4 className="text-2xl md:text-3xl font-bold mt-2 mb-3">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed max-w-2xl">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WHAT WE AUTOMATE - Specific Use Cases */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  What we automate
                </h3>
                <div className="w-20 h-1 bg-primary mb-12"></div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      type: "Lead Processing",
                      example:
                        "Typeform → HubSpot with lead scoring based on answers",
                    },
                    {
                      type: "Payment Workflows",
                      example:
                        "Stripe webhook → Slack notification + Google Sheet row + email sequence trigger",
                    },
                    {
                      type: "Invoice Automation",
                      example:
                        "Email attachments → Parse invoices → Add to accounting system + send approval request",
                    },
                    {
                      type: "Contact Management",
                      example:
                        "Contact form → CRM creation + welcome email + calendar invite + Slack notification",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-8 bg-card border border-border/50 rounded-2xl hover:border-primary/30 transition-colors"
                    >
                      <h4 className="text-2xl md:text-3xl font-bold mb-4">
                        {item.type}
                      </h4>
                      <p className="text-muted-foreground text-xl md:text-2xl">
                        {item.example}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* WHY US - Differentiation */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Why build automations with us
                </h3>
                <div className="w-20 h-1 bg-primary mb-12"></div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  {[
                    {
                      icon: Code2,
                      title: "Built by practitioners",
                      description:
                        "We build the workflows, not slide decks. Same team that builds ships—no handoffs, no slides, just working automations.",
                    },
                    {
                      icon: Zap,
                      title: "Fast iteration, low risk",
                      description:
                        "Prototype automations quickly. Test with real data before production. If it doesn't prove value, you don't pay for full integration.",
                    },
                    {
                      icon: Shield,
                      title: "Production-ready",
                      description:
                        "Monitoring, error handling, retries built in. Every automation includes proper error handling and fallbacks—systems that work when you depend on them.",
                    },
                    {
                      icon: CheckCircle2,
                      title: "We maintain what we build",
                      description:
                        "Most agencies build and disappear. We maintain what we build. When something fails, we know before you do and fix it.",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-2xl md:text-3xl font-bold mb-3">
                            {item.title}
                          </h4>
                          <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center py-16 md:py-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-primary/10">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Ready to automate your workflows?
                </h3>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4">
                  Let's identify the manual work that's wasting your time and
                  build automations that run reliably.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => navigate("/contact")}
                    className="btn-hero inline-flex items-center justify-center min-w-[200px]"
                  >
                    Start a Project <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Explore Other Services
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : selectedServiceData && selectedServiceData.id === "backend" ? (
          /* ========================================
             BACKEND SOLUTIONS - BACKEND DEVELOPMENT SECTION
             ======================================== */
          <div className="w-full relative py-12 md:py-20 animate-fade-in">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* HERO - Opening Statement */}
              <div className="mb-20 md:mb-28 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight max-w-4xl mx-auto">
                  Your app needs a backend that{" "}
                  <span className="text-primary">
                    won't fall over at 1,000 users
                  </span>
                </h2>
                <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  Most backend problems come from over-engineering or
                  under-engineering. We build what you actually need—reliable,
                  maintainable, and ready to grow when you are.
                </p>
              </div>

              {/* CAPABILITIES GRID - Build vs Fix */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  What we build
                </h3>
                <div className="w-20 h-1 bg-primary mb-12"></div>

                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      icon: Code2,
                      title: "Build",
                      subtitle: "New backends for apps that don't exist yet",
                      description:
                        "Right-sized architecture—not over-engineered. Auth, APIs, databases, hosting—handled. We build what fits your stage, not what looks impressive on an architecture diagram.",
                      items: [
                        "Authentication & authorization",
                        "API design & implementation",
                        "Database architecture",
                        "Deployment & hosting",
                      ],
                    },
                    {
                      icon: Shield,
                      title: "Fix",
                      subtitle:
                        "Rescue projects: slow, broken, or unmaintainable backends",
                      description:
                        "Performance optimization, refactoring, modernization. Your last agency left a mess. We've seen it before. We untangle it, document it, make it maintainable again.",
                      items: [
                        "Performance optimization",
                        "Code refactoring",
                        "Architecture modernization",
                        "Technical debt cleanup",
                      ],
                    },
                  ].map((capability, idx) => (
                    <div
                      key={idx}
                      className="p-8 bg-card border border-border/50 rounded-2xl hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                    >
                      <div className="w-16 h-16 mb-6 rounded-xl bg-primary/10 flex items-center justify-center">
                        <capability.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h4 className="text-2xl md:text-3xl font-bold mb-2">
                        {capability.title}
                      </h4>
                      <p className="text-xl md:text-2xl font-semibold text-primary mb-4">
                        {capability.subtitle}
                      </p>
                      <p className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed">
                        {capability.description}
                      </p>
                      <ul className="space-y-3">
                        {capability.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-3">
                            <AnimatedV className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <span className="text-lg md:text-xl text-foreground/80">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* WHAT WE HANDLE - The Boring Stuff, Done Right */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  The stuff you shouldn't have to think about
                </h3>
                <div className="w-20 h-1 bg-primary mb-12"></div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Authentication",
                      description:
                        "Login, signup, password reset, OAuth, sessions. Done right so you don't get hacked.",
                    },
                    {
                      title: "Database design",
                      description:
                        "Schema that makes sense now and doesn't require a rewrite in 6 months.",
                    },
                    {
                      title: "API structure",
                      description:
                        "Endpoints your frontend team will actually enjoy using.",
                    },
                    {
                      title: "Error handling",
                      description:
                        "When things break (they will), you'll know why and where.",
                    },
                    {
                      title: "Deployment",
                      description:
                        "CI/CD, staging environments, production. Push code, it goes live.",
                    },
                    {
                      title: "Monitoring",
                      description:
                        "Know when something's wrong before your users tell you.",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-8 bg-card border border-border/50 rounded-2xl hover:border-primary/30 transition-colors"
                    >
                      <h4 className="text-2xl md:text-3xl font-bold mb-4">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* PROCESS - Vertical Timeline Style */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  How we build backends
                </h3>
                <div className="w-20 h-1 bg-primary mb-12"></div>

                <div className="space-y-8">
                  {[
                    {
                      phase: "Understand",
                      title: "Understand what you're building",
                      description:
                        "We don't start with architecture diagrams. We start with: What does your product do? Who uses it? What happens when it works? Only then do we design the backend.",
                    },
                    {
                      phase: "Build",
                      title: "Build in working increments",
                      description:
                        "You see progress weekly, not after 3 months. Each piece works in isolation before we connect it. You can test as we go.",
                    },
                    {
                      phase: "Hand off",
                      title: "Hand off or stay on",
                      description:
                        "Full documentation, clean code, deployment scripts. Your next developer won't curse us. Or we stick around for maintenance—your call.",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6 md:gap-8 group">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl bg-primary text-purple-900 flex items-center justify-center font-bold text-xl shrink-0 shadow-lg shadow-primary/20">
                          {idx + 1}
                        </div>
                        {idx < 2 && (
                          <div className="w-0.5 h-full bg-border/50 mt-4 group-hover:bg-primary/30 transition-colors"></div>
                        )}
                      </div>
                      <div className="pb-8">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                          {item.phase}
                        </span>
                        <h4 className="text-2xl md:text-3xl font-bold mt-2 mb-3">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed max-w-2xl">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SPECIFIC USE CASES */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  What we build
                </h3>
                <div className="w-20 h-1 bg-primary mb-12"></div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      type: "Mobile app backend",
                      example:
                        "REST/GraphQL API, user auth, push notifications, file storage",
                    },
                    {
                      type: "SaaS product",
                      example:
                        "Multi-tenant database, subscription billing, admin dashboard API",
                    },
                    {
                      type: "Partner integrations",
                      example:
                        "Public API with docs, rate limiting, API keys, webhooks",
                    },
                    {
                      type: "Legacy rescue",
                      example:
                        "Audit, document, refactor. Make it maintainable again.",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-8 bg-card border border-border/50 rounded-2xl hover:border-primary/30 transition-colors"
                    >
                      <h4 className="text-2xl md:text-3xl font-bold mb-4">
                        {item.type}
                      </h4>
                      <p className="text-muted-foreground text-xl md:text-2xl">
                        {item.example}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* DIFFERENTIATION */}
              <div className="mb-20 md:mb-28">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Why build backends with us
                </h3>
                <div className="w-20 h-1 bg-primary mb-12"></div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  {[
                    {
                      icon: Target,
                      title: "Right-sized",
                      description:
                        "We'll tell you if you don't need microservices. Most startups don't. We build what fits your stage, not what looks impressive on an architecture diagram.",
                    },
                    {
                      icon: Zap,
                      title: "Speed",
                      description:
                        "Working API in week one. We ship fast because we've built this before—auth, CRUD, file uploads, payments. It's not our first time.",
                    },
                    {
                      icon: Code2,
                      title: "Maintainability",
                      description:
                        "Code that the next developer can actually understand. Comments, documentation, sensible structure. No job security through obscurity.",
                    },
                    {
                      icon: Layers,
                      title: "Full-stack context",
                      description:
                        "We build frontends too, so our APIs make sense from the consumer side. No 'works on my machine' energy.",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="group">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-2xl md:text-3xl font-bold mb-3">
                            {item.title}
                          </h4>
                          <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TECH STACK */}
              <div className="mb-20 md:mb-28 py-12 md:py-16 bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-3xl">
                <div className="max-w-6xl mx-auto">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Our tools
                  </h3>
                  <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto text-xl md:text-2xl">
                    We typically work with: Node.js, PostgreSQL, Supabase,
                    Firebase, AWS, Docker. But we're pragmatic. If your project
                    needs something else, we'll tell you—or learn it.
                  </p>

                  <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {[
                      "Node.js",
                      "Python",
                      "PostgreSQL",
                      "Firebase",
                      "Supabase",
                      "AWS",
                      "Google Cloud",
                      "Docker",
                    ].map((tech, idx) => (
                      <div
                        key={idx}
                        className="px-6 py-4 bg-background border border-border/50 rounded-xl hover:border-primary/50 transition-colors"
                      >
                        <span className="font-semibold text-lg">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center py-16 md:py-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-primary/10">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Ready to build your backend?
                </h3>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4">
                  Let's talk about what your app actually needs—not what looks
                  impressive on a slide deck.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => navigate("/contact")}
                    className="btn-hero inline-flex items-center justify-center min-w-[200px]"
                  >
                    Start a Project <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Explore Other Services
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : selectedServiceData ? (
          /* ========================================
             DEFAULT SERVICE SECTION (Non-MVP, Non-Web, Non-Mobile)
             ======================================== */
          <div className="w-full relative py-16 animate-fade-in">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              {/* Header Section */}
              <div className="text-center mb-16">
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  {selectedServiceData.longDescription ||
                    selectedServiceData.description}
                </p>

                <div className="flex flex-wrap justify-center gap-3 mt-8">
                  {selectedServiceData.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-secondary/50 text-secondary-foreground rounded-full text-base font-medium border border-border/50"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* SubSections */}
              {selectedServiceData.subSections && (
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                  {selectedServiceData.subSections.map((section, idx) => (
                    <div
                      key={idx}
                      className="bg-card p-8 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
                        {idx === 0 && (
                          <Lightbulb className="w-6 h-6 text-primary" />
                        )}
                        {idx === 1 && (
                          <Code2 className="w-6 h-6 text-primary" />
                        )}
                        {idx === 2 && (
                          <LineChart className="w-6 h-6 text-primary" />
                        )}
                        {section.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 text-base md:text-lg leading-relaxed">
                        {section.description}
                      </p>
                      {section.items && (
                        <ul className="space-y-3">
                          {section.items.map((item, itemIdx) => (
                            <li
                              key={itemIdx}
                              className="flex items-start gap-3 text-base"
                            >
                              <AnimatedV className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Process Steps */}
              {selectedServiceData.processSteps && (
                <div className="mb-20">
                  <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    From Idea to Launch
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {selectedServiceData.processSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="relative p-6 md:p-8 rounded-2xl bg-muted/30 border border-border/50"
                      >
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
                          {idx + 1}
                        </div>
                        <h4 className="text-xl md:text-2xl font-bold mb-3 mt-4">
                          {step.title}
                        </h4>
                        <p className="text-base md:text-lg text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Why Us / Expertise */}
              {selectedServiceData.whyUs && (
                <div className="mb-16">
                  <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Why Build With Us?
                  </h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    {selectedServiceData.whyUs.map((item, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-5xl md:text-6xl font-bold text-primary/20 mb-4">
                          0{idx + 1}
                        </div>
                        <h4 className="text-xl md:text-2xl font-bold mb-3">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground text-base md:text-lg">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="text-center bg-primary/5 rounded-3xl p-10 md:p-16 border border-primary/10">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Ready to build with us?
                </h3>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Let's turn your vision into reality. Schedule a free
                  consultation to discuss your project.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => navigate("/contact")}
                    className="btn-hero inline-flex items-center justify-center min-w-[200px]"
                  >
                    Start a Project <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Explore Other Services
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ServiceMap;
