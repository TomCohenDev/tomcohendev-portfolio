import { useEffect, useRef } from "react";

interface SmallCircularChalkProps {
  isVisible?: boolean;
}

const SmallCircularChalk = ({ isVisible = true }: SmallCircularChalkProps) => {
  const groupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (groupRef.current && isVisible) {
      groupRef.current.innerHTML = "";

      const animateCircularChalkLine = async () => {
        const totalPoints = 60; // Fewer points for smaller circle
        const points: [number, number][] = [];

        // Dimensions for 100x100 viewbox
        const centerX = 50;
        const centerY = 50;
        const radius = 42;

        // Randomize the wobble for this drawing instance
        const randPhase = Math.random() * Math.PI * 2;
        const randAmpX = 0.3 + Math.random() * 0.5; // Amplitude between 0.3 and 0.8
        const randAmpY = 0.3 + Math.random() * 0.5;
        const randFreq = 3 + Math.random() * 2; // Frequency variation

        // Generate smooth elliptical path points for ONE AND A HALF circles with spiral offset
        for (let i = 0; i <= totalPoints * 1.7; i++) {
          const t = (i / totalPoints) * Math.PI * 2;
          const spiralOffset = (i / (totalPoints * 1.5)) * 2; // Small spiral outward

          // Create elliptical path with hand-drawn wobble
          const currentRadius = radius + spiralOffset;

          const x =
            centerX +
            Math.cos(t) * currentRadius +
            Math.sin(t * randFreq + randPhase) * randAmpX +
            Math.cos(t * (randFreq + 2)) * (randAmpX * 0.6);
          const y =
            centerY +
            Math.sin(t) * currentRadius +
            Math.cos(t * (randFreq + 1) + randPhase) * randAmpY +
            Math.sin(t * (randFreq + 3)) * (randAmpY * 0.6);

          points.push([x, y]);
        }

        // Draw the line progressively
        for (let i = 2; i <= points.length; i++) {
          const currentPoints = points.slice(0, i);

          if (groupRef.current) {
            const existingLine = groupRef.current.querySelector(
              ".circular-chalk-line"
            );
            if (existingLine) {
              existingLine.remove();
            }
          }

          if (groupRef.current && currentPoints.length >= 2) {
            const pathData = currentPoints
              .map((point, index) => {
                if (index === 0) return `M ${point[0]} ${point[1]}`;
                return `L ${point[0]} ${point[1]}`;
              })
              .join(" ");

            const chalkLine = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "path"
            );
            chalkLine.setAttribute("d", pathData);
            // Use the gradient defined in defs
            chalkLine.setAttribute("stroke", "url(#chalkGradient)");
            chalkLine.setAttribute("stroke-width", "2");
            chalkLine.setAttribute("fill", "none");
            chalkLine.setAttribute("stroke-linecap", "round");
            chalkLine.classList.add("circular-chalk-line");

            groupRef.current.appendChild(chalkLine);
          }

          // Faster animation for smaller circle
          await new Promise((resolve) => setTimeout(resolve, 4));
        }
      };

      animateCircularChalkLine();
    }
  }, [isVisible]);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none transform scale-110 md:scale-125"
      viewBox="0 0 100 100"
    >
      <defs>
        <linearGradient
          id="chalkGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="100"
          y2="100"
        >
          <stop offset="0%" stopColor="#a855f7" /> {/* Primary Purple */}
          <stop offset="100%" stopColor="#d8b4fe" /> {/* Brighter Purple */}
        </linearGradient>
      </defs>
      {/* Group has opacity applied for "slightly transparent" look */}
      <g ref={groupRef} style={{ opacity: 0.8 }} />
    </svg>
  );
};

export default SmallCircularChalk;
