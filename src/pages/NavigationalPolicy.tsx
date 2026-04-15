import Header from "../components/Header";
import Footer from "../components/Footer";

const NavigationalPolicy = () => {
  return (
    <div className="min-h-screen bg-[#1D201F] text-[#E0D0C1] font-sans">
      <Header />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="section-padding relative pt-32 pb-12 md:pt-48 md:pb-16">
          <div className="container-padding max-w-4xl mx-auto">
            <h1 className="excalifont-title text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.1] tracking-tight text-white">
              Navigational Policy
            </h1>
            <p className="text-xl md:text-2xl text-[#B9BBBE] leading-relaxed max-w-2xl">
              Last updated: January 2025
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding relative">
          <div className="container-padding max-w-4xl mx-auto">
            <div className="space-y-12 text-[#B9BBBE] leading-relaxed">
              {/* Introduction */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Introduction
                </h2>
                <p className="text-lg">
                  This Navigational Policy outlines how users can access and
                  navigate the End2End Startup website. We are committed to
                  providing a clear, accessible, and user-friendly experience
                  for all visitors.
                </p>
              </div>

              {/* Site Structure */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Site Structure
                </h2>
                <p className="text-lg mb-4">
                  Our website is organized into the following main sections:
                </p>
                <div className="space-y-4">
                  <div className="p-6 bg-[#161918] border border-white/10 rounded-xl">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Home
                    </h3>
                    <p className="text-lg">
                      The homepage provides an overview of our services,
                      featured case studies, and a direct path to contact us.
                    </p>
                  </div>
                  <div className="p-6 bg-[#161918] border border-white/10 rounded-xl">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Services
                    </h3>
                    <p className="text-lg">
                      Detailed information about our service offerings,
                      including MVP development, web applications, mobile apps,
                      AI integration, and automation solutions.
                    </p>
                  </div>
                  <div className="p-6 bg-[#161918] border border-white/10 rounded-xl">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Case Studies
                    </h3>
                    <p className="text-lg">
                      Comprehensive case studies showcasing our past projects,
                      technologies used, and outcomes achieved.
                    </p>
                  </div>
                  <div className="p-6 bg-[#161918] border border-white/10 rounded-xl">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      About
                    </h3>
                    <p className="text-lg">
                      Information about our company, team, processes, and
                      approach to building products.
                    </p>
                  </div>
                  <div className="p-6 bg-[#161918] border border-white/10 rounded-xl">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Contact
                    </h3>
                    <p className="text-lg">
                      Multiple ways to reach out, including contact forms,
                      project inquiries, and scheduling consultations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Methods */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Navigation Methods
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Header Navigation
                    </h3>
                    <p className="text-lg mb-2">
                      The main navigation menu is located at the top of every
                      page and includes links to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Home</li>
                      <li>Services</li>
                      <li>Case Studies</li>
                      <li>About</li>
                      <li>Contact</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Footer Navigation
                    </h3>
                    <p className="text-lg mb-2">
                      The footer contains organized links grouped by category:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Service categories and offerings</li>
                      <li>About us and company information</li>
                      <li>Individual case study links</li>
                      <li>Legal pages (Privacy Policy, Navigational Policy)</li>
                      <li>Social media links</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      In-Page Navigation
                    </h3>
                    <p className="text-lg">
                      Throughout the site, you'll find contextual links and call-to-action
                      buttons that guide you to related content or actions, such
                      as viewing case studies or starting a project.
                    </p>
                  </div>
                </div>
              </div>

              {/* Breadcrumbs */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Breadcrumbs and Context
                </h2>
                <p className="text-lg">
                  On deeper pages, especially case studies and service detail
                  pages, we provide clear visual indicators of your current
                  location within the site hierarchy, making it easy to
                  navigate back to parent sections.
                </p>
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Mobile Navigation
                </h2>
                <p className="text-lg">
                  On mobile devices, the navigation menu is accessible through a
                  hamburger menu icon. Tapping this icon opens a full-screen
                  menu with all available navigation options, optimized for
                  touch interaction.
                </p>
              </div>

              {/* Search Functionality */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Search and Discovery
                </h2>
                <p className="text-lg">
                  While we focus on clear, intuitive navigation through our
                  organized structure, all pages are designed to be easily
                  discoverable through search engines. Our case studies and
                  services are clearly labeled and categorized for easy
                  browsing.
                </p>
              </div>

              {/* Accessibility */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Accessibility
                </h2>
                <p className="text-lg mb-2">
                  We are committed to making our website accessible to all
                  users. Our navigation is designed to be:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Keyboard navigable</li>
                  <li>Screen reader friendly</li>
                  <li>Visually clear with appropriate contrast</li>
                  <li>Mobile-responsive</li>
                  <li>Compatible with assistive technologies</li>
                </ul>
              </div>

              {/* External Links */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-4">
                  External Links
                </h2>
                <p className="text-lg">
                  Our website may contain links to external websites, including
                  social media profiles and third-party services. These links
                  will open in a new tab or window. We are not responsible for
                  the content or navigation of external sites.
                </p>
              </div>

              {/* Feedback */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Navigation Feedback
                </h2>
                <p className="text-lg">
                  We continuously work to improve our website's navigation based
                  on user feedback and analytics. If you experience any
                  difficulties navigating our site or have suggestions for
                  improvement, please{" "}
                  <a
                    href="/contact"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    contact us
                  </a>
                  .
                </p>
              </div>

              {/* Updates */}
              <div className="space-y-4 pb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Policy Updates
                </h2>
                <p className="text-lg">
                  We may update this Navigational Policy from time to time to
                  reflect changes in our website structure or navigation
                  methods. Any significant changes will be noted with an updated
                  "Last updated" date at the top of this page.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NavigationalPolicy;


