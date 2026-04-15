import InteractiveSvgWidget from "./InteractiveSvgWidget";

const ExampleSvgWidgets = () => {
  // Example 1: Simple Icon SVG
  const heartSvg = (
    <svg viewBox="0 0 24 24" className="w-full h-auto">
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );

  // Example 2: Check Icon SVG
  const checkSvg = (
    <svg viewBox="0 0 24 24" className="w-full h-auto">
      <path
        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
        fill="currentColor"
      />
    </svg>
  );

  // Example 3: Star Icon SVG
  const starSvg = (
    <svg viewBox="0 0 24 24" className="w-full h-auto">
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );

  const handleHeartClick = () => {
    console.log("Heart clicked!");
    alert("Heart clicked! ❤️");
  };

  const handleCheckClick = () => {
    console.log("Check clicked!");
    alert("Check clicked! ✅");
  };

  const handleStarClick = () => {
    console.log("Star clicked!");
    alert("Star clicked! ⭐");
  };

  return (
    <div className="p-8 bg-background">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Interactive SVG Widget Examples
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {/* Heart Widget */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Heart Icon</h3>
          <div className="w-24 h-24 mx-auto">
            <InteractiveSvgWidget
              svg={heartSvg}
              defaultColor="#e5e7eb"
              hoverColor="#ef4444"
              onClick={handleHeartClick}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Gray → Red on hover
          </p>
        </div>

        {/* Check Widget */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Check Icon</h3>
          <div className="w-24 h-24 mx-auto">
            <InteractiveSvgWidget
              svg={checkSvg}
              defaultColor="#6b7280"
              hoverColor="#10b981"
              onClick={handleCheckClick}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Gray → Green on hover
          </p>
        </div>

        {/* Star Widget */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Star Icon</h3>
          <div className="w-24 h-24 mx-auto">
            <InteractiveSvgWidget
              svg={starSvg}
              defaultColor="#9ca3af"
              hoverColor="#f59e0b"
              onClick={handleStarClick}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Gray → Yellow on hover
          </p>
        </div>
      </div>

      {/* Disabled Example */}
      <div className="mt-12 text-center">
        <h3 className="text-lg font-semibold mb-4">Disabled Example</h3>
        <div className="w-24 h-24 mx-auto">
          <InteractiveSvgWidget
            svg={heartSvg}
            defaultColor="#e5e7eb"
            hoverColor="#ef4444"
            onClick={() => {}}
            disabled={true}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Disabled state (no hover/click)
        </p>
      </div>
    </div>
  );
};

export default ExampleSvgWidgets;
