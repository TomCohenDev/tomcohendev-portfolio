import { useEffect, useRef } from "react";

interface ConnectingChalkLineProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
  isVisible?: boolean;
  delay?: number;
}

const ConnectingChalkLine = ({
  start,
  end,
  isVisible = true,
  delay = 0,
}: ConnectingChalkLineProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const gradientRef = useRef<SVGLinearGradientElement | null>(null);
  const drawnState = useRef<"idle" | "animating" | "drawn">("idle");
  // Generate a unique ID for the gradient for this component instance
  const gradientId = useRef(
    `chalk-gradient-${Math.random().toString(36).substr(2, 9)}`
  ).current;

  // Helper to generate points
  const generatePoints = (
    s: { x: number; y: number },
    e: { x: number; y: number }
  ) => {
    const totalPoints = 40;
    const points: [number, number][] = [];

    const midX = (s.x + e.x) / 2;
    const midY = (s.y + e.y) / 2;
    const curveOffset = 20;

    // Deterministic pseudo-randomness based on coordinates to prevent jitter on redraw
    const pseudoRandom = Math.sin(s.x * s.y + e.x * e.y) > 0;
    const controlX = midX + (pseudoRandom ? curveOffset : -curveOffset);
    const controlY = midY + (!pseudoRandom ? curveOffset : -curveOffset);

    for (let i = 0; i <= totalPoints; i++) {
      const t = i / totalPoints;
      // Quadratic Bezier: (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
      const x =
        Math.pow(1 - t, 2) * s.x +
        2 * (1 - t) * t * controlX +
        Math.pow(t, 2) * e.x;
      const y =
        Math.pow(1 - t, 2) * s.y +
        2 * (1 - t) * t * controlY +
        Math.pow(t, 2) * e.y;

      // Deterministic wobble
      const wobble = Math.sin(t * Math.PI * 4 + (s.x + e.y) / 100) * 2;

      points.push([x + wobble, y + wobble]);
    }
    return points;
  };

  const pointsToPath = (points: [number, number][]) => {
    return points
      .map((p, idx) => (idx === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`))
      .join(" ");
  };

  // Helper to update gradient coordinates
  const updateGradient = (
    s: { x: number; y: number },
    e: { x: number; y: number }
  ) => {
    if (gradientRef.current) {
      gradientRef.current.setAttribute("x1", s.x.toString());
      gradientRef.current.setAttribute("y1", s.y.toString());
      gradientRef.current.setAttribute("x2", e.x.toString());
      gradientRef.current.setAttribute("y2", e.y.toString());
    }
  };

  useEffect(() => {
    if (!isVisible) {
      if (svgRef.current) svgRef.current.innerHTML = "";
      pathRef.current = null;
      gradientRef.current = null;
      drawnState.current = "idle";
      return;
    }

    // If already fully drawn, update the path and gradient
    if (drawnState.current === "drawn" && pathRef.current) {
      const points = generatePoints(start, end);
      const d = pointsToPath(points);
      pathRef.current.setAttribute("d", d);
      updateGradient(start, end);
      return;
    }

    // Initial Draw Animation
    if (drawnState.current === "idle") {
      drawnState.current = "animating";

      const animateLine = async () => {
        if (delay > 0) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
        if (!svgRef.current || !isVisible) return;

        // Clean slate (just in case)
        svgRef.current.innerHTML = "";

        // 1. Create Defs & Gradient
        const defs = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs"
        );
        const gradient = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "linearGradient"
        );
        gradient.setAttribute("id", gradientId);
        gradient.setAttribute("gradientUnits", "userSpaceOnUse");
        // Initial coords
        gradient.setAttribute("x1", start.x.toString());
        gradient.setAttribute("y1", start.y.toString());
        gradient.setAttribute("x2", end.x.toString());
        gradient.setAttribute("y2", end.y.toString());

        const stop1 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("stop-color", "#a855f7"); // Primary Purple

        const stop2 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        stop2.setAttribute("offset", "100%");
        stop2.setAttribute("stop-color", "#d8b4fe"); // Brighter Purple (purple-300)

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svgRef.current.appendChild(defs);
        gradientRef.current = gradient;

        // 2. Create Path
        const points = generatePoints(start, end);
        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        path.setAttribute("stroke", `url(#${gradientId})`);
        path.setAttribute("stroke-width", "3");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-dasharray", "5,5");
        path.classList.add("connecting-line");
        path.style.opacity = "0.7"; // Slight transparency
        path.style.transition = "d 0.5s ease-out"; // Smooth update

        svgRef.current.appendChild(path);
        pathRef.current = path;

        // 3. Animate Draw
        for (let i = 2; i <= points.length; i++) {
          if (!svgRef.current || !isVisible) return;
          const currentPoints = points.slice(0, i);
          path.setAttribute("d", pointsToPath(currentPoints));
          await new Promise((resolve) => setTimeout(resolve, 5));
        }

        drawnState.current = "drawn";
      };

      animateLine();
    }
  }, [isVisible, start.x, start.y, end.x, end.y, delay, gradientId]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ overflow: "visible" }}
    />
  );
};

export default ConnectingChalkLine;
