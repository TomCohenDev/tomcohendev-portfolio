import { useEffect, useRef } from "react";

interface CircularChalkLineProps {
  isVisible: boolean;
}

const CircularChalkLine = ({ isVisible }: CircularChalkLineProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current && isVisible) {
      // Clear any existing content
      svgRef.current.innerHTML = "";

      // Animate circular chalk line drawing progressively
      const animateCircularChalkLine = async () => {
        const totalPoints = 120; // More points for smoother circle
        const points: [number, number][] = [];

        // Container dimensions (bigger circle around the positioning area)
        const centerX = 200;
        const centerY = 300;
        const radiusX = 195; // Bigger horizontal radius
        const radiusY = 295; // Bigger vertical radius (taller oval)

        // Generate smooth elliptical path points for TWO complete circles with spiral offset
        for (let i = 0; i <= totalPoints * 2; i++) {
          // Multiply by 2 for two circles
          const t = (i / totalPoints) * Math.PI * 2; // Full rotation per totalPoints
          const spiralOffset = (i / (totalPoints * 2)) * 10; // Gradual spiral outward to avoid overlap

          // Create elliptical path with some hand-drawn wobble
          const currentRadiusX = radiusX + spiralOffset;
          const currentRadiusY = radiusY + spiralOffset;

          const x =
            centerX +
            Math.cos(t) * currentRadiusX +
            Math.sin(t * 3) * 3 +
            Math.cos(t * 5) * 1.5;
          const y =
            centerY +
            Math.sin(t) * currentRadiusY +
            Math.cos(t * 4) * 4 +
            Math.sin(t * 6) * 2;

          points.push([x, y]);
        }

        // Draw the line progressively
        for (let i = 2; i <= points.length; i++) {
          const currentPoints = points.slice(0, i);

          // Clear previous line
          if (svgRef.current) {
            const existingLine = svgRef.current.querySelector(
              ".circular-chalk-line"
            );
            if (existingLine) {
              existingLine.remove();
            }
          }

          // Draw current line segment
          if (svgRef.current && currentPoints.length >= 2) {
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
            chalkLine.setAttribute("stroke", "#a855f7"); // Purple color
            chalkLine.setAttribute("stroke-width", "4");
            chalkLine.setAttribute("fill", "none");
            chalkLine.setAttribute("stroke-linecap", "round");
            chalkLine.classList.add("circular-chalk-line");

            svgRef.current.appendChild(chalkLine);

            // Add rounded endings
            if (currentPoints.length >= 2) {
              const startPoint = currentPoints[0];
              const endPoint = currentPoints[currentPoints.length - 1];

              // Start point circle
              const startCircle = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
              );
              startCircle.setAttribute("cx", startPoint[0].toString());
              startCircle.setAttribute("cy", startPoint[1].toString());
              startCircle.setAttribute("r", "2");
              startCircle.setAttribute("fill", "#a855f7");
              svgRef.current.appendChild(startCircle);

              // End point circle
              const endCircle = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
              );
              endCircle.setAttribute("cx", endPoint[0].toString());
              endCircle.setAttribute("cy", endPoint[1].toString());
              endCircle.setAttribute("r", "2");
              endCircle.setAttribute("fill", "#a855f7");
              svgRef.current.appendChild(endCircle);
            }
          }

          // Wait before drawing next segment (similar speed to original chalk lines)
          await new Promise((resolve) => setTimeout(resolve, 20));
        }
      };

      // Start animation after all SVGs have appeared
      setTimeout(() => {
        animateCircularChalkLine();
      }, 1200); // Start after the last SVG appears
    }
  }, [isVisible]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 600"
    />
  );
};

export default CircularChalkLine;
