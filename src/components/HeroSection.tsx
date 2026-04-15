import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import _Marquee from "react-fast-marquee";
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
  const clientProjectReviews = [
    {
      text: "From kickoff to launch, Tom ran this like a real product partner, not just a developer. Weekly progress was clear, feedback loops were fast, and he kept improving the UX without us asking. End result: better than the original scope and ready to ship.",
      name: "David",
      project: "Luxcal",
    },
    {
      text: "I picked Tom because he was the only one who gave me a real timeline instead of vague promises. He communicated constantly, pushed smart suggestions, and actually listened. The whole thing felt structured and calm, which made a stressful project feel manageable.",
      name: "Jonathan",
      project: "Client Review",
    },
    {
      text: "Launch week was smooth, no drama. Everything landed on time, and every decision felt professional. Tom gave us confidence because he always had a plan and executed it.",
      name: "Yuval",
      project: "Original Review",
    },
    {
      text: "Dronebag had to work in real conditions, not in a demo. Tom got that immediately. He translated operational needs into a stable app, kept communication tight, and delivered on schedule. Day-to-day work is now faster and far less messy.",
      name: "Roi",
      project: "Dronebag",
    },
    {
      text: "On ITA, Tom was the bridge between concept and execution. Strong architecture choices, practical trade-offs, and fast iteration. We did not just get code, we got a product that feels stable and useful. I would absolutely team up with him again.",
      name: "Avishay",
      project: "ITA",
    },
    {
      text: "I came in with references and a vibe, Tom turned that into an actual site that feels like me. He was quick, direct, and had a great eye for what to keep simple. Super happy with both the look and the speed.",
      name: "Lior",
      project: "Lior Site",
    },
    {
      text: "Tom understood our business constraints fast and built around them. No overengineering, just the right system shipped quickly. We saw value immediately in daily operations, and the process stayed clear the whole way.",
      name: "Noam",
      project: "Nightwing",
    },
    {
      text: "Best part of working with Tom: details. He cared about typography, spacing, load speed, animation timing, everything. The process felt collaborative, and the final portfolio looks premium without feeling overdesigned.",
      name: "Rotem",
      project: "Rotem Portfolio",
    },
    {
      text: "Spidclass started as a complicated flow and Tom simplified it in a way users understood right away. Progress was fast, check-ins were clear, and we always knew what was next. Great execution.",
      name: "Liran",
      project: "Spidclass",
    },
    {
      text: "For the course site, I needed something practical, not flashy. Tom delivered exactly that: cleaner content management, better student flow, and fewer manual headaches. Responsive, professional, and easy to work with.",
      name: "Yuval",
      project: "Yuval Course Site",
    },
    {
      text: "I barely had to over-explain anything. Tom understood the direction quickly, organized the build, and shipped fast. The final site is sharp, smooth, and gives me the exact online presence I wanted.",
      name: "Adoalm",
      project: "Adoalm Portfolio",
    },
  ];
  const googleReviews = [
    {
      text: "Would work with them again. Fast delivery and good people.",
      name: "Scott",
      details: "Google Review",
    },
    {
      text: "Understood what I wanted, gave honest advice, and delivered on time. The site looks great, thanks!",
      name: "Gal Ashiri",
      details: "Google Review",
    },
    {
      text: "This guy is the best. Definitely recommended!",
      name: "LIOZ DAYAN",
      details: "Google Review",
    },
    {
      text: "Working with Tom was and is awesome, highly professional, and really good at drilling down into what is actually needed and making it happen.",
      name: "yarden zamir",
      details: "Google Local Guide",
    },
  ];
  const allReviews = [
    ...clientProjectReviews.map((review) => ({
      key: `${review.name}-${review.project}`,
      text: review.text,
      name: review.name,
      subtitle: review.project,
    })),
    ...googleReviews.map((review) => ({
      key: `${review.name}-google`,
      text: review.text,
      name: review.name,
      subtitle: review.details,
    })),
  ];

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
        <div className="max-w-7xl mx-auto mt-20 sm:mt-8 px-4">
          <_Marquee speed={24} gradient={false} pauseOnHover>
            {allReviews.map((review) => (
              <div
                key={review.key}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 text-center mx-3 w-[320px] md:w-[360px] h-[320px] flex flex-col"
              >
                <div className="mb-3">
                  <AnimatedStars />
                </div>
                <p className="text-muted-foreground text-sm mb-4 flex-1 overflow-y-auto">
                  {review.text}
                </p>
                <div className="font-medium text-foreground text-sm">
                  {review.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {review.subtitle}
                </div>
              </div>
            ))}
          </_Marquee>
        </div>

        {/* Bottom padding for reviews section */}
        <div className="pb-16"></div>
      </div>
    </section>
  );
};

export default HeroSection;
