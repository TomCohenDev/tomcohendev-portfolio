import AnimatedLogo from "./AnimatedLogo";
import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// Menu icon paths (3 horizontal lines)
const MENU_PATHS = [
  "M5.8382 5C5.93039 5 6.02259 5 14.3681 5.1844C22.7136 5.3688 39.3097 5.7376 48.0897 5.88149C56.8697 6.02537 57.3307 5.93318 57.937 5.88568C58.5433 5.83818 59.2809 5.83818 60.0408 5.83818",
  "M5 24.2782C5.0922 24.2782 5.1844 24.2782 12.7462 24.3704C20.3081 24.4626 35.3367 24.647 44.0929 24.6037C52.8492 24.5604 54.8776 24.2838 56.7062 24.1413C58.5349 23.9989 60.1023 23.9989 61.7172 23.9989",
  "M6.11758 41.3213C6.20978 41.3213 6.30198 41.3213 15.2007 41.4596C24.0994 41.5979 41.8019 41.8745 51.1058 41.9709C60.4096 42.0673 60.7784 41.9751 61.1528 41.9276C61.5272 41.8801 61.896 41.8801 62.276 41.8801",
];

// X icon paths (2 diagonal lines)
const X_PATHS = [
  "M5 5.83842C5.55599 6.39442 9.06799 9.35322 18.6163 16.9109C25.615 22.4504 39.4606 32.638 46.9986 38.2343C54.5367 43.8305 55.4587 44.3838 56.1181 44.807C56.7775 45.2303 57.1463 45.5069 58.3644 46.0713",
  "M58.6438 5.00024C58.5516 5.00024 58.4594 5.00024 58.0892 5.32294C57.719 5.64564 57.0736 6.29104 49.5956 13.4002C42.1176 20.5094 27.8266 34.0629 13.1025 48.0271",
];

// Animation variants for drawing/undrawing paths
const menuDrawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay: i * 0.08,
        type: "spring",
        duration: 0.4,
        bounce: 0,
        stiffness: 200,
        damping: 30,
      },
      opacity: { delay: i * 0.04, duration: 0.01 },
    },
  }),
  exit: (i: number) => {
    const totalPaths = 3;
    const reverseDelay = (totalPaths - i) * 0.03;
    return {
      pathLength: 0,
      opacity: 0,
      transition: {
        pathLength: {
          delay: reverseDelay,
          type: "spring",
          duration: 0.2,
          bounce: 0,
          stiffness: 300,
          damping: 35,
        },
        opacity: { delay: reverseDelay + 0.08, duration: 0.03 },
      },
    };
  },
};

// Animated Menu/X Icon Component
const AnimatedMenuIcon = ({ isOpen }: { isOpen: boolean }) => {
  const paths = isOpen ? X_PATHS : MENU_PATHS;
  const viewBox = isOpen ? "0 0 64 54" : "0 0 68 48";

  return (
    <AnimatePresence mode="wait">
      <motion.svg
        key={isOpen ? "x" : "menu"}
        width="28"
        height="28"
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {paths.map((path, index) => (
          <motion.path
            key={`${isOpen ? "x" : "menu"}-${index}`}
            d={path}
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            variants={menuDrawVariants}
            custom={index}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
        ))}
      </motion.svg>
    </AnimatePresence>
  );
};

// Scrappy hand-drawn underline paths (jittery/wobbly lines)
const SCRAPPY_UNDERLINES = [
  "M2 4C8 3.2 18 5.1 32 3.8C46 2.5 62 4.6 78 3.2C94 1.8 108 4.2 118 3.5",
  "M3 3.5C12 4.8 28 2.1 45 4.2C62 6.3 82 2.8 98 4.1C110 5.2 116 3.8 118 4",
  "M2 4.2C15 2.8 35 5.5 55 3.1C75 0.7 95 4.8 108 3.2C115 2.6 117 4.1 118 3.8",
  "M3 3.8C20 5.2 40 2.4 60 4.5C80 6.6 100 3.1 112 4.2C116 4.5 117 3.6 118 4",
];

// Animated scrappy underline component
const ScrappyUnderline = ({
  index,
  isVisible,
}: {
  index: number;
  isVisible: boolean;
}) => {
  // Pick a random-ish path based on index
  const pathIndex = index % SCRAPPY_UNDERLINES.length;
  const path = SCRAPPY_UNDERLINES[pathIndex];

  return (
    <motion.svg
      width="100%"
      height="8"
      viewBox="0 0 120 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 right-0"
    >
      <motion.path
        d={path}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="text-primary/40"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          isVisible
            ? {
                pathLength: 1,
                opacity: 1,
                transition: {
                  pathLength: {
                    delay: 0.1 + index * 0.12,
                    type: "spring",
                    duration: 0.5,
                    bounce: 0,
                    stiffness: 100,
                    damping: 20,
                  },
                  opacity: { delay: 0.1 + index * 0.12, duration: 0.01 },
                },
              }
            : { pathLength: 0, opacity: 0 }
        }
      />
    </motion.svg>
  );
};

// Unsymmetric chalk circle SVG with random deviations
const ChalkCircle = () => {
  const { d1, d2 } = useMemo(() => {
    const randomOffset = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const d1 = `M${10 + randomOffset(-2, 2)},${30 + randomOffset(-2, 2)} C${
      10 + randomOffset(-2, 2)
    },${10 + randomOffset(-2, 2)} ${25 + randomOffset(-2, 2)},${
      5 + randomOffset(-2, 2)
    } ${50 + randomOffset(-2, 2)},${5 + randomOffset(-2, 2)} C ${
      75 + randomOffset(-2, 2)
    },${5 + randomOffset(-2, 2)} ${90 + randomOffset(-2, 2)},${
      15 + randomOffset(-2, 2)
    } ${90 + randomOffset(-2, 2)},${30 + randomOffset(-2, 2)} C ${
      90 + randomOffset(-2, 2)
    },${45 + randomOffset(-2, 2)} ${75 + randomOffset(-2, 2)},${
      55 + randomOffset(-2, 2)
    } ${50 + randomOffset(-2, 2)},${55 + randomOffset(-2, 2)} C ${
      25 + randomOffset(-2, 2)
    },${55 + randomOffset(-2, 2)} ${10 + randomOffset(-2, 2)},${
      45 + randomOffset(-2, 2)
    } ${10 + randomOffset(-2, 2)},${30 + randomOffset(-2, 2)} Z`;

    const d2 = `M${12 + randomOffset(-2, 2)},${32 + randomOffset(-2, 2)} C${
      12 + randomOffset(-2, 2)
    },${12 + randomOffset(-2, 2)} ${27 + randomOffset(-2, 2)},${
      7 + randomOffset(-2, 2)
    } ${52 + randomOffset(-2, 2)},${7 + randomOffset(-2, 2)} C ${
      77 + randomOffset(-2, 2)
    },${7 + randomOffset(-2, 2)} ${92 + randomOffset(-2, 2)},${
      17 + randomOffset(-2, 2)
    } ${92 + randomOffset(-2, 2)},${32 + randomOffset(-2, 2)} C ${
      92 + randomOffset(-2, 2)
    },${47 + randomOffset(-2, 2)} ${77 + randomOffset(-2, 2)},${
      57 + randomOffset(-2, 2)
    } ${52 + randomOffset(-2, 2)},${57 + randomOffset(-2, 2)} C ${
      27 + randomOffset(-2, 2)
    },${57 + randomOffset(-2, 2)} ${12 + randomOffset(-2, 2)},${
      47 + randomOffset(-2, 2)
    } ${12 + randomOffset(-2, 2)},${32 + randomOffset(-2, 2)}`;

    return { d1, d2 };
  }, []);

  return (
    <svg
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[160%] -z-10 pointer-events-none text-primary"
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d={d1}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="animate-draw"
      />
      {/* Second pass for sketchiness */}
      <path
        d={d2}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.6"
        strokeLinecap="round"
        fill="none"
        className="animate-draw-delay"
      />
    </svg>
  );
};

// Outside component to track initial load
let isAppInitialLoad = true;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const shouldAnimate = isAppInitialLoad && location.pathname === "/";

  useEffect(() => {
    // After the first render (which uses the initial value), we mark it as false
    // so subsequent navigations don't trigger animation
    isAppInitialLoad = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Dark Overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-background transition-all duration-300"
          // Removed border-b logic from here to handle it with a separate animated element
        )}
      >
        <div
          className={cn(
            "transition-all duration-500 ease-in-out container-padding",
            isScrolled
              ? "max-w-[78rem]" // Barely noticeable contraction from max-w-7xl (80rem)
              : ""
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between relative transition-all duration-300",
              isScrolled ? "py-3" : "py-6"
            )}
          >
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 pl-2 sm:pl-0 z-10"
            >
              <AnimatedLogo shouldAnimate={shouldAnimate} />
              <h1 className="text-2xl font-bold text-foreground hidden lg:block">
                Tom Cohen
              </h1>
              <h1 className="text-2xl font-bold text-foreground hidden md:block lg:hidden">
                Tom Cohen
              </h1>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <div className="relative">
                <Link
                  to="/services"
                  className={`hover:text-primary font-semibold transition-colors text-lg relative z-10 ${
                    isActive("/services")
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  My Services
                </Link>
                {isActive("/services") && <ChalkCircle />}
              </div>
            </nav>

            {/* Right Side: Contact Button & Mobile Toggle */}
            <div className="flex items-center gap-4 z-10">
              <Link
                to="/contact"
                id="contact-header-btn"
                className={cn(
                  "hidden md:inline-flex items-center px-6 py-2 font-bold border-2 border-primary transition-all duration-200 rounded-lg transform",
                  location.pathname === "/contact"
                    ? "bg-primary text-purple-900 scale-105"
                    : "bg-transparent text-primary hover:bg-primary hover:text-purple-900 hover:scale-105"
                )}
              >
                Contact
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <AnimatedMenuIcon isOpen={isMenuOpen} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border/50 p-4 animate-in slide-in-from-top-5 duration-200 shadow-lg">
            <nav className="flex flex-col space-y-2">
              <div className="relative">
                <Link
                  to="/services"
                  className={`block text-xl font-semibold hover:text-primary transition-colors px-4 py-3 rounded-lg hover:bg-muted/50 ${
                    isActive("/services") ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Services
                </Link>
                <ScrappyUnderline index={0} isVisible={isMenuOpen} />
              </div>
              <div className="relative">
                <Link
                  to="/contact"
                  className="block text-xl font-semibold text-foreground hover:text-primary transition-colors px-4 py-3 rounded-lg hover:bg-muted/50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <ScrappyUnderline index={1} isVisible={isMenuOpen} />
              </div>
            </nav>
          </div>
        )}

        {/* Dynamic Separator Line - Expands from center */}
        <div
          className={cn(
            "absolute bottom-0 left-1/2 h-[1px] bg-border/50 -translate-x-1/2 transition-all duration-1000 ease-in-out",
            isScrolled ? "w-full opacity-100" : "w-0 opacity-0"
          )}
        />
      </header>
    </>
  );
};

export default Header;
