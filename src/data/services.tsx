import {
  Bot,
  Workflow,
  Smartphone,
  Rocket,
  Globe,
  Server,
  Shapes,
  User,
} from "lucide-react";

export interface ServiceStep {
  title: string;
  description: string;
}

export interface ServicePillar {
  title: string;
  description: string;
  points: string[];
}

export interface ServiceData {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  richDetails?: {
    headline: string;
    subheadline: string;
    pillars: ServicePillar[];
    processTitle?: string;
    processSteps?: ServiceStep[];
  };
}

export const servicesList: ServiceData[] = [
  {
    id: "prototype",
    title: "Prototype",
    icon: <Shapes className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
    description:
      "Transform your ideas into interactive prototypes. We create clickable mockups that let you test concepts before investing in full development.",
    features: [
      "Interactive mockups",
      "User flow design",
      "Rapid iteration",
      "Stakeholder demos",
    ],
  },
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
    richDetails: {
      headline: "Get your working MVP",
      subheadline:
        "We deliver vital MVPs proofed by unique product development frameworks and years of experience. Product managers, developers, and designers integrate into your business as a cohesive team.",
      pillars: [
        {
          title: "Lean Development",
          description:
            "Building software version by version while focusing on end-users' pains, we help you get the products into the hands of your customers ASAP, learn how it helps them and then iteratively improve it.",
          points: [
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
          points: [
            "Pair programming",
            "Wide test coverage",
            "Frequent delivery",
            "Fast prototyping with AI tools",
          ],
        },
        {
          title: "Scalable Technologies",
          description:
            "As technology agnostics, we choose the tech stack according to your product needs to guarantee its effortless maintenance and growth. We make sure you won't need to change the tech stack or rebuild your database in the future.",
          points: [
            "Genuine engineering culture",
            "Engineers with product mindset",
            "Future-proof architecture",
            "Scalable infrastructure",
          ],
        },
      ],
      processTitle: "From idea to a solid MVP",
      processSteps: [
        {
          title: "Discovery session",
          description:
            "We use proven decision-making frameworks for product ideation to build the right thing from the beginning.",
        },
        {
          title: "Prototype & Validate",
          description:
            "We start with minimal solutions. Like a technical proof of concept or clickable design prototypes to test hypotheses. This phase results become an important foundation for the further development steps.",
        },
        {
          title: "MVP Development",
          description:
            "We build the core features that provide immediate value to your users, ensuring a solid foundation for future growth.",
        },
      ],
    },
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
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    icon: <Smartphone className="w-6 h-6 md:w-8 md:h-8 text-primary" />,
    description:
      "4 years of Flutter expertise. Fullstack mobile apps with Flutter and Firebase — beautiful UIs, native performance.",
    features: [
      "Flutter",
      "iOS & Android",
      "Firebase / FlutterFire",
      "App Store deployment",
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
  },
];
