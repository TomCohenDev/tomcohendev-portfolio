import { useState, ReactNode, useEffect } from "react";

interface InteractiveSvgWidgetProps {
  svg: ReactNode;
  defaultColor?: string;
  hoverColor?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  animationDelay?: number;
  size?: "xs" | "sm" | "md" | "lg";
}

const InteractiveSvgWidget = ({
  svg,
  defaultColor = "#ffffff",
  hoverColor = "#bf95f9",
  onClick,
  className = "",
  disabled = false,
  animationDelay = 0,
  size = "lg",
}: InteractiveSvgWidgetProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [animationDelay]);

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
      // Generate random rotation: -8 to +8 degrees
      const randomDegree = Math.floor(Math.random() * 17) - 8;
      setRotation(randomDegree);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setIsHovered(false);
      // Generate random default rotation: -3 to +3 degrees
      const randomDefaultDegree = Math.floor(Math.random() * 7) - 3;
      setRotation(randomDefaultDegree);
    }
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`transition-all duration-500 ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div
        className={`transition-all duration-300 relative ${
          isHovered && !disabled
            ? "opacity-100 scale-110"
            : "opacity-90 scale-100"
        } ${
          size === "xs"
            ? "w-[185px] sm:w-[240px] md:w-[180px] lg:w-[240px]"
            : size === "sm"
            ? "w-[250px] sm:w-[300px] md:w-[280px] lg:w-[300px]"
            : size === "md"
            ? "w-[350px] sm:w-[400px] md:w-[380px] lg:w-[400px]"
            : "w-[450px] sm:w-[500px] md:w-[400px] lg:w-[500px]"
        }`}
        style={{
          color: isHovered && !disabled ? hoverColor : defaultColor,
        }}
      >
        {/* SVG Content with clock animation */}
        <div
          className={`relative ${isVisible ? "animate-clock-reveal" : ""}`}
          style={{
            clipPath: isVisible
              ? undefined
              : "polygon(50% 50%, 50% 0%, 50% 0%, 50% 50%)",
            opacity: isVisible ? undefined : 0,
          }}
        >
          {svg}
        </div>
      </div>
    </div>
  );
};

export default InteractiveSvgWidget;
