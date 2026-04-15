import { useEffect, useRef } from "react";

interface ChalkLinesProps {
  isVisible: boolean;
}

const ChalkLines = ({ isVisible }: ChalkLinesProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current && isVisible) {
      // Clear any existing content
      svgRef.current.innerHTML = "";

      // Animate two chalk lines drawing progressively
      const animateChalkLines = async () => {
        const totalPoints = 30;
        const points1: [number, number][] = [];
        const points2: [number, number][] = [];

        // Generate smooth curve points for first line
        for (let i = 0; i <= totalPoints; i++) {
          const t = i / totalPoints;
          const x = -50 + (280 - -50) * t;
          const y1 =
            6 + Math.sin(t * Math.PI * 2) * 4 + Math.sin(t * Math.PI * 4) * 2;
          points1.push([x, y1]);
        }

        // Generate smooth curve points for second line (different path)
        for (let i = 0; i <= totalPoints; i++) {
          const t = i / totalPoints;
          const x = -38 + (280 - -40) * t; // Start 10 pixels to the right
          const y2 =
            16 +
            Math.sin(t * Math.PI * 1.5) * 3 +
            Math.sin(t * Math.PI * 3) * 1.5;
          points2.push([x, y2]);
        }

        // Draw first line quickly
        for (let i = 2; i <= points1.length; i++) {
          const currentPoints = points1.slice(0, i);

          // Clear previous first line
          if (svgRef.current) {
            const existingLine1 = svgRef.current.querySelector(".chalk-line-1");
            if (existingLine1) {
              existingLine1.remove();
            }
          }

          // Draw current first line segment
          if (svgRef.current && currentPoints.length >= 2) {
            const pathData = currentPoints
              .map((point, index) => {
                if (index === 0) return `M ${point[0]} ${point[1]}`;
                return `L ${point[0]} ${point[1]}`;
              })
              .join(" ");

            const chalkLine1 = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "path"
            );
            chalkLine1.setAttribute("d", pathData);
            chalkLine1.setAttribute("stroke", "#8b5cf6");
            chalkLine1.setAttribute("stroke-width", "5");
            chalkLine1.setAttribute("fill", "none");
            chalkLine1.setAttribute("stroke-linecap", "round");
            chalkLine1.classList.add("chalk-line-1");

            svgRef.current.appendChild(chalkLine1);

            // Add rounded endings for first line
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
              startCircle.setAttribute("r", "2.5");
              startCircle.setAttribute("fill", "#8b5cf6");
              svgRef.current.appendChild(startCircle);

              // End point circle
              const endCircle = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
              );
              endCircle.setAttribute("cx", endPoint[0].toString());
              endCircle.setAttribute("cy", endPoint[1].toString());
              endCircle.setAttribute("r", "2.5");
              endCircle.setAttribute("fill", "#8b5cf6");
              svgRef.current.appendChild(endCircle);
            }
          }

          // Wait before drawing next segment (faster)
          await new Promise((resolve) => setTimeout(resolve, 15));
        }

        // Small pause between lines
        await new Promise((resolve) => setTimeout(resolve, 50));

        // Draw second line quickly
        for (let i = 2; i <= points2.length; i++) {
          const currentPoints = points2.slice(0, i);

          // Clear previous second line
          if (svgRef.current) {
            const existingLine2 = svgRef.current.querySelector(".chalk-line-2");
            if (existingLine2) {
              existingLine2.remove();
            }
          }

          // Draw current second line segment
          if (svgRef.current && currentPoints.length >= 2) {
            const pathData = currentPoints
              .map((point, index) => {
                if (index === 0) return `M ${point[0]} ${point[1]}`;
                return `L ${point[0]} ${point[1]}`;
              })
              .join(" ");

            const chalkLine2 = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "path"
            );
            chalkLine2.setAttribute("d", pathData);
            chalkLine2.setAttribute("stroke", "#a855f7");
            chalkLine2.setAttribute("stroke-width", "4");
            chalkLine2.setAttribute("fill", "none");
            chalkLine2.setAttribute("stroke-linecap", "round");
            chalkLine2.classList.add("chalk-line-2");

            svgRef.current.appendChild(chalkLine2);

            // Add rounded endings for second line
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
              startCircle.setAttribute("fill", "#8b5cf6");
              svgRef.current.appendChild(startCircle);

              // End point circle
              const endCircle = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "circle"
              );
              endCircle.setAttribute("cx", endPoint[0].toString());
              endCircle.setAttribute("cy", endPoint[1].toString());
              endCircle.setAttribute("r", "2");
              endCircle.setAttribute("fill", "#8b5cf6");
              svgRef.current.appendChild(endCircle);
            }
          }

          // Wait before drawing next segment (faster)
          await new Promise((resolve) => setTimeout(resolve, 15));
        }
      };

      // Start animation after a short delay
      setTimeout(() => {
        animateChalkLines();
      }, 300);
    }
  }, [isVisible]);

  return (
    <div className="mb-2 transform rotate-1">
      <svg
        ref={svgRef}
        width="340"
        height="20"
        viewBox="-20 0 340 20"
        className="w-full max-w-[200px] sm:max-w-[210px] md:max-w-[270px] lg:max-w-sm -mt-2"
      />
    </div>
  );
};

export default ChalkLines;
