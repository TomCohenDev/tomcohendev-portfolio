import { useState, useEffect } from "react";

const DevPrint = () => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [breakpoint, setBreakpoint] = useState("");

  useEffect(() => {
    const updateScreenInfo = () => {
      const width = window.innerWidth;
      setScreenWidth(width);

      // Determine breakpoint based on Tailwind CSS breakpoints
      if (width >= 1536) {
        setBreakpoint("2xl");
      } else if (width >= 1280) {
        setBreakpoint("xl");
      } else if (width >= 1024) {
        setBreakpoint("lg");
      } else if (width >= 768) {
        setBreakpoint("md");
      } else if (width >= 640) {
        setBreakpoint("sm");
      } else {
        setBreakpoint("xs");
      }
    };

    // Set initial values
    updateScreenInfo();

    // Add event listener for window resize
    window.addEventListener("resize", updateScreenInfo);

    // Cleanup
    return () => window.removeEventListener("resize", updateScreenInfo);
  }, []);

  // Only show in development mode
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-3 rounded-lg font-mono text-sm shadow-lg border border-white/20">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-yellow-400">📱</span>
          <span className="font-bold">{breakpoint.toUpperCase()}</span>
        </div>
        <div className="text-xs text-gray-300">{screenWidth}px</div>
        <div className="text-xs text-blue-400">
          {breakpoint === "2xl" && "≥1536px"}
          {breakpoint === "xl" && "≥1280px"}
          {breakpoint === "lg" && "≥1024px"}
          {breakpoint === "md" && "≥768px"}
          {breakpoint === "sm" && "≥640px"}
          {breakpoint === "xs" && "<640px"}
        </div>
      </div>
    </div>
  );
};

export default DevPrint;
