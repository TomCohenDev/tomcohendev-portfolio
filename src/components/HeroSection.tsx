import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HandwritingMVP from "./HandwritingMVP";
import DynamicVisual from "./DynamicVisual";

// Individual Animated Star Component
const AnimatedStar = () => {
  const [currentStarIndex, setCurrentStarIndex] = useState(0);
  const starSvgs = [
    "/star-1.svg",
    "/star-2.svg",
    "/star-3.svg",
    "/star-4.svg",
    "/star-5.svg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStarIndex((prev) => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * starSvgs.length);
        } while (newIndex === prev);
        return newIndex;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [starSvgs.length]);

  return (
    <img
      src={starSvgs[currentStarIndex]}
      alt="Star"
      className="w-4 h-4"
      style={{
        filter:
          "brightness(0) saturate(100%) invert(74%) sepia(15%) saturate(2500%) hue-rotate(240deg) brightness(100%) contrast(110%)",
      }}
    />
  );
};

// Animated Stars Component
const AnimatedStars = () => {
  return (
    <div className="flex justify-center gap-1">
      {[...Array(5)].map((_, index) => (
        <AnimatedStar key={index} />
      ))}
    </div>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSvgIndex, setCurrentSvgIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setCurrentSvgIndex((prev) => (prev + 1) % 6);
      }
    }, 3500); // Switch every 2.5 seconds

    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleNextAnimation = () => {
    if (isAnimating) return; // Prevent clicks during animation
    
    setIsAnimating(true);
    setCurrentSvgIndex((prev) => (prev + 1) % 6);
    
    // Re-enable clicks after animation completes (1.5 seconds for safety)
    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  return (
    <section className="bg-background min-h-[80vh] sm:min-h-[70vh] flex flex-col justify-center">
      <div className="container-padding w-full pt-24 md:pt-32">
        <div className="max-w-7xl mx-auto min-h-[60vh] py-0 md:py-10">
          {/* Single column: title → subtext → animation → CTA */}
          <div className="flex flex-col items-center text-center w-full gap-8 md:gap-10">
            {/* Title */}
            <div className="w-full overflow-hidden">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight inline-block cursor-pointer"
                onClick={handleNextAnimation}
              >
                <HandwritingMVP currentSvgIndex={currentSvgIndex} />
              </h1>
            </div>

            {/* Subtext — larger for readability */}
            <p className="text-xl md:text-2xl lg:text-[1.65rem] text-foreground/85 leading-[1.65] max-w-4xl px-1">
              Senior full-stack developer specializing in end-to-end product development, AI
              systems, mobile, and deployment automation. Built and shipped cross-platform apps,
              local AI products, scraper pipelines, MCP servers, and production infrastructure
              across mobile, backend, and cloud environments.
            </p>

            {/* Animation */}
            <div className="flex items-center justify-center w-full max-w-3xl min-h-[260px] md:min-h-[360px] overflow-hidden">
              <div
                className="w-full flex items-center justify-center cursor-pointer"
                onClick={handleNextAnimation}
              >
                <DynamicVisual currentSvgIndex={currentSvgIndex} />
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-md sm:max-w-none">
              <button
                className="btn-hero text-xl px-8 py-4 w-full sm:w-auto"
                onClick={() => navigate("/contact")}
              >
                Build Your Product
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-6xl mx-auto mt-20 sm:mt-8 px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 text-center">
              <div className="mb-3">
                <AnimatedStars />
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Working with Tom to build our custom app was an outstanding
                experience. The process was smooth, from onboarding to delivery.
                Tom was responsive, detail-oriented, and always found ways to
                improve the product beyond what we imagined. Highly recommended
                for anyone who wants a complete product build.
              </p>
              <div className="font-medium text-foreground text-sm">David</div>
              <div className="text-xs text-muted-foreground">Luxcal</div>
            </div>

            {/* Review 2 */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 text-center">
              <div className="mb-3">
                <AnimatedStars />
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                I want to start by saying what a pleasure it was working with
                Tom. He stayed in constant communication, made suggestions based
                on our needs. I decided to work with Tom because he was the only
                one to lay out a clear timeline for my project based on my
                correspondence.
              </p>
              <div className="font-medium text-foreground text-sm">
                Jonathan
              </div>
              <div className="text-xs text-muted-foreground"></div>
            </div>

            {/* Review 3 */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 text-center">
              <div className="mb-3">
                <AnimatedStars />
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Tom made launching our project much easier. Everything was on
                time, the experience felt truly professional from start to
                finish. Having Tom help us gave us confidence that our product
                was in good hands.
              </p>
              <div className="font-medium text-foreground text-sm">Yuval</div>
            </div>
          </div>
        </div>

        {/* My work */}
        <div className="max-w-4xl mx-auto text-center mt-16 mb-8 px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            My work
          </h2>
        </div>

        {/* Bottom padding for reviews section */}
        <div className="pb-16"></div>
      </div>
    </section>
  );
};

export default HeroSection;
