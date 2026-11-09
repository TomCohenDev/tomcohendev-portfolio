/** Metadata and concrete paths for the statically rendered English site. */
export const englishPages = [
  { path: "/en", title: "Tom Cohen | Developer & Product Builder", description: "Tom Cohen builds web and mobile apps, MVPs, AI integrations and business automations. Explore real projects and get in touch about yours." },
  { path: "/en/services", title: "Development & Automation Services | Tom Cohen", description: "End-to-end product development: MVPs, web apps, Flutter mobile apps, AI integrations, workflow automation and backend systems." },
  { path: "/en/products", title: "Products | Tom Cohen", description: "Explore the products built by Tom Cohen and get in touch about developing your own digital product." },
  { path: "/en/contact", title: "Contact Tom Cohen | Discuss Your Project", description: "Have an idea for an app, website or automation? Contact Tom Cohen to discuss your project, goals and next steps." },
  { path: "/en/privacy-policy", title: "Privacy Policy | Tom Cohen", description: "How the Tom Cohen website handles personal information, contact inquiries, cookies and analytics." },
  { path: "/en/navigational-policy", title: "Navigational Policy | Tom Cohen", description: "Information about navigation, accessibility and external links on the Tom Cohen website." },
  ...[
    ["mvp", "MVP Development", "Build and launch a minimum viable product with focused scope, iterative development and a foundation for growth."],
    ["web", "Web App Development", "Custom web applications with modern frontends, backend systems and cloud infrastructure, from planning through launch."],
    ["personal-website", "Personal Website Development", "Custom personal websites and portfolios that showcase your work, with responsive design and attention to performance."],
    ["mobile", "Mobile App Development", "Flutter apps for iPhone and Android, including Firebase integration, native features and app store submission."],
    ["ai", "AI Integration", "Add AI to your product with LLM chat interfaces, custom agents and practical machine learning integrations."],
    ["automation", "Business Automation", "Connect systems and automate repetitive workflows with API integrations, monitoring and AI where it helps."],
    ["backend", "Backend Development", "Backend systems, REST and GraphQL APIs, database architecture and cloud infrastructure built for your application."],
  ].map(([slug, title, description]) => ({ path: `/en/services/${slug}`, title: `${title} | Tom Cohen`, description })),
  ...[
    ["gomlin-jobs", "Gomlin Jobs", "A mobile and web job platform with profiles, messaging and AI-powered matching. Explore the Gomlin Jobs development case study."],
    ["nightwing", "Nightwing", "Explore the Nightwing ordering platform: a web app with menu browsing, shopping cart and automated order notifications."],
    ["ai-social-media-strategist", "AI Social Media Strategist", "Explore an AI-powered social media strategy project and how automation supports content planning."],
    ["blog-automation", "Blog Automation", "Explore a blog automation project connecting content workflows and publishing tools."],
    ["mintkola", "Mintkola", "Explore Mintkola, a product that turns goals into actionable roadmaps with AI-assisted planning."],
    ["spidclass", "Spidclass", "Explore the Spidclass project and Tom Cohen's approach to building digital products."],
    ["yellow-candle", "Virtual Yellow Candle", "A mobile app for virtual memorial candle lighting, with reminders and educational content. Explore the development case study."],
    ["portfolio-websites", "Portfolio Websites", "Custom portfolio websites with responsive layouts, bilingual content and attention to performance. Explore the case study."],
    ["ita", "ITA", "Explore the ITA project and the product development work by Tom Cohen."],
    ["fullstack-apps", "Full-Stack Applications", "Explore full-stack application projects, connecting frontend experiences with backend services."],
    ["dronebag", "Dronebag", "A drone fleet management app with flight logging, battery tracking, issue reporting and team dashboards. Explore the case study."],
  ].map(([slug, name, description]) => ({ path: `/en/case-studies/${slug}`, title: `${name} Case Study | Tom Cohen`, description })),
];

export const englishPage = (path: string) => englishPages.find((page) => page.path === path);
