import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container-padding section-padding">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <img
                src="/icon.svg"
                alt="Tom Cohen"
                className="h-8 w-auto"
              />
              <h3 className="text-lg font-bold text-foreground">
                Tom Cohen
              </h3>
            </div>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
              I&apos;m a full-stack developer: I ship products end to end—from APIs and data
              layers to polished frontends and deployment. From idea to launch, I move fast.
            </p>
            <div className="flex flex-col gap-3">
              <button
                className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors w-fit"
                onClick={() => navigate("/contact")}
              >
                Start a Project <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>

          {/* My Services */}
          <div className="space-y-6">
            <Link
              to="/services"
              className="text-sm font-bold text-foreground uppercase tracking-wider hover:text-primary transition-colors block cursor-pointer"
            >
              My Services
            </Link>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/services/mvp"
                  className="hover:text-primary transition-colors"
                >
                  MVP Build
                </Link>
              </li>
              <li>
                <Link
                  to="/services/web"
                  className="hover:text-primary transition-colors"
                >
                  Web Apps
                </Link>
              </li>
              <li>
                <Link
                  to="/services/personal-website"
                  className="hover:text-primary transition-colors"
                >
                  Personal Website
                </Link>
              </li>
              <li>
                <Link
                  to="/services/mobile"
                  className="hover:text-primary transition-colors"
                >
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link
                  to="/services/ai"
                  className="hover:text-primary transition-colors"
                >
                  AI Integration
                </Link>
              </li>
              <li>
                <Link
                  to="/services/automation"
                  className="hover:text-primary transition-colors"
                >
                  Automation
                </Link>
              </li>
              <li>
                <Link
                  to="/services/backend"
                  className="hover:text-primary transition-colors"
                >
                  Backend Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Case Studies */}
          <div className="space-y-6">
            <Link
              to="/#case-studies"
              className="text-sm font-bold text-foreground uppercase tracking-wider hover:text-primary transition-colors block cursor-pointer"
            >
              Case Studies
            </Link>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/case-studies/gomlin-jobs"
                  className="hover:text-primary transition-colors"
                >
                  Gomlin Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies/nightwing"
                  className="hover:text-primary transition-colors"
                >
                  Nightwing
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies/ai-social-media-strategist"
                  className="hover:text-primary transition-colors"
                >
                  AI Social Media Strategist
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies/blog-automation"
                  className="hover:text-primary transition-colors"
                >
                  Blog Automation
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies/mintkola"
                  className="hover:text-primary transition-colors"
                >
                  Mintkola
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies/spidclass"
                  className="hover:text-primary transition-colors"
                >
                  Spidclass
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies/yellow-candle"
                  className="hover:text-primary transition-colors"
                >
                  Yellow Candle
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies/portfolio-websites"
                  className="hover:text-primary transition-colors"
                >
                  Portfolio Websites
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies/ita"
                  className="hover:text-primary transition-colors"
                >
                  ITA
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies/fullstack-apps"
                  className="hover:text-primary transition-colors"
                >
                  Fullstack Apps
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies/dronebag"
                  className="hover:text-primary transition-colors"
                >
                  Dronebag
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Tom Cohen. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link
                to="/privacy-policy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <span>•</span>
              <Link
                to="/navigational-policy"
                className="hover:text-primary transition-colors"
              >
                Navigational Policy
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://x.com/Tom_Ends"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Tom Cohen on X (Twitter)"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/tom-cohen-07778585/"
              className="text-muted-foreground hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tom Cohen on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://github.com/TomCohenDev"
              className="text-muted-foreground hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tom Cohen on GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
