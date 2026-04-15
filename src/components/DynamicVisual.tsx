import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface DynamicVisualProps {
  currentSvgIndex: number;
  overrideIndex?: number | null;
}

// Color constants for smooth animation (Tailwind equivalents)
const colors = {
  blue400: "#60a5fa",
  green400: "#4ade80",
  orange400: "#fb923c",
  purple400: "#c084fc",
  red400: "#f87171",
  pink400: "#f472b6",
  indigo400: "#818cf8",
  teal400: "#2dd4bf",
  cyan400: "#22d3ee",
  yellow400: "#facc15",
  gray400: "#9ca3af",
  // With opacity (pre-computed)
  gray400_20: "rgba(156, 163, 175, 0.2)",
  blue400_20: "rgba(96, 165, 250, 0.2)",
  green400_20: "rgba(74, 222, 128, 0.2)",
  purple400_20: "rgba(192, 132, 252, 0.2)",
  primary: "#a1a1aa", // zinc-400 as primary stand-in
  primary60: "rgba(161, 161, 170, 0.6)",
  primary40: "rgba(161, 161, 170, 0.4)",
  primary10: "rgba(161, 161, 170, 0.1)",
  primary5: "rgba(161, 161, 170, 0.05)",
  transparent: "rgba(0, 0, 0, 0)",
};

// Configuration interfaces
interface ShapeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
  ry?: number; // Added ry for independent vertical radius control
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  opacity: number;
}

interface LineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  stroke?: string;
  strokeWidth?: number;
}

const DynamicVisual: React.FC<DynamicVisualProps> = ({
  currentSvgIndex,
  overrideIndex = null,
}) => {
  // Use overrideIndex if provided, otherwise use currentSvgIndex
  const effectiveIndex =
    overrideIndex !== null ? overrideIndex : currentSvgIndex;

  // Responsive scaling logic
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Max width of visual is 480px (from getContainerProps)
      const maxVisualWidth = 480;
      const screenWidth = window.innerWidth;

      let availableWidth: number;

      // Between 768px and 1024px: 2-column layout, visual gets ~half the screen
      if (screenWidth >= 768 && screenWidth < 1024) {
        // Account for 2-column grid: roughly half screen minus gaps and padding
        availableWidth = screenWidth / 2 - 48; // Half screen minus gap/padding
      } else {
        // Mobile (full width) or large screens (plenty of space)
        const padding = 32;
        availableWidth = screenWidth - padding;
      }

      const newScale = Math.min(1, availableWidth / maxVisualWidth);
      setScale(newScale);
    };

    handleResize(); // Initial calculation
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Random rotation for the background border
  const [backgroundRotation, setBackgroundRotation] = useState(
    Math.random() * 6 - 3 // Random between -4 and 4 degrees
  );

  // Update rotation when effectiveIndex changes
  useEffect(() => {
    setBackgroundRotation(Math.random() * 8 - 4); // Random between -4 and 4 degrees
  }, [effectiveIndex]);

  // Get container dimensions for each state
  const getContainerProps = () => {
    switch (effectiveIndex) {
      case 0: // MVP - Standard rectangle
        return { width: 400, height: 300 };
      case 1: // Mobile Apps - Phone tall and narrow
        return { width: 200, height: 400 };
      case 2: // Web Apps - Browser
        return { width: 420, height: 300 };
      case 3: // SAAS - Dashboard wide
        return { width: 420, height: 280 };
      case 4: // N8N - Workflow wide
        return { width: 450, height: 200 };
      case 5: // AI - Square for network
        return { width: 320, height: 320 };
      default:
        return { width: 400, height: 300 };
    }
  };

  const containerProps = getContainerProps();

  // Define properties for 9 distinct shapes that morph across all states
  const getShapeProps = (index: number): ShapeProps => {
    // Default hidden state (parked at center)
    const hidden: ShapeProps = {
      x: 50,
      y: 50,
      width: 0,
      height: 0,
      rx: 0,
      fill: colors.transparent,
      opacity: 0,
    };

    // Aspect Ratios (Width/Height) for correction
    // MVP (400/300) = 1.33
    // Mobile (200/400) = 0.5
    // Web (480/300) = 1.6
    // SaaS (420/280) = 1.5
    // N8N (450/200) = 2.25
    // AI (320/320) = 1.0

    switch (effectiveIndex) {
      case 0: // MVP - Gantt Chart Bars (uses 4 shapes)
        // Aspect 1.33.
        // Adjusting heights/Y to look proportional?
        // Bars are abstract, keeping them as defined roughly but scaling Y to fit the 100 unit space better?
        // Original: y=25, 40, 55, 70. Spacing 15.
        // If we keep 100x100 space, it just stretches.
        // We want bars to look like bars. The container is 4:3.
        // 100x100 stretched to 400x300. Y pixels = Y_units * 3. X pixels = X_units * 4.
        // So 1 Y unit is 0.75 X units.
        // If we want circular radius, ry = rx * 1.33.
        if (index === 0)
          return {
            x: 10,
            y: 25,
            width: 50,
            height: 8,
            rx: 2,
            ry: 2.66,
            fill: colors.blue400,
            opacity: 1,
          };
        if (index === 1)
          return {
            x: 10,
            y: 40,
            width: 70,
            height: 8,
            rx: 2,
            ry: 2.66,
            fill: colors.green400,
            opacity: 1,
          };
        if (index === 2)
          return {
            x: 10,
            y: 55,
            width: 40,
            height: 8,
            rx: 2,
            ry: 2.66,
            fill: colors.orange400,
            opacity: 1,
          };
        if (index === 3)
          return {
            x: 10,
            y: 70,
            width: 60,
            height: 8,
            rx: 2,
            ry: 2.66,
            fill: colors.purple400,
            opacity: 1,
          };
        return hidden;

      case 1: {
        // Mobile Apps - App Icons Grid (uses 9 shapes)
        // Aspect 0.5. Container is Tall (200x400).
        // To get square icons: height = width * 0.5. ry = rx * 0.5.
        // To get square grid: Y spacing = X spacing * 0.5.
        const row = Math.floor(index / 3);
        const col = index % 3;
        const iconColors = [
          colors.blue400,
          colors.green400,
          colors.orange400,
          colors.purple400,
          colors.red400,
          colors.pink400,
          colors.indigo400,
          colors.teal400,
          colors.cyan400,
        ];
        // Original grid: x = 15 + col*26, y = 20 + row*26
        // Corrected Y: 20 + row * 13.
        // Corrected Height: 18 * 0.5 = 9.
        // Corrected Ry: 4 * 0.5 = 2.
        // Center Y vertically: (100 - (2*13 + 9))/2 ~ 32 start y?
        // 3 rows. Total height = 9 + 13 + 9 + 13 + 9 = 53 units.
        // Start Y = (100 - 53)/2 = 23.5.
        return {
          x: 15 + col * 26,
          y: 23.5 + row * 13,
          width: 18,
          height: 9,
          rx: 4,
          ry: 2,
          fill: iconColors[index] || colors.primary,
          opacity: 1,
        };
      }

      case 2: // Web Apps - Browser (uses 7 shapes)
        // Aspect 1.6. Container is Wide (480x300).
        // Correction: height = width * 1.6. ry = rx * 1.6.
        // For squares/circles, we need height = width * 1.6
        // Header height: 15 units. 15 * 1.6 = 24 units of width physically? No.
        // 100 units Y = 300px -> 1 unit Y = 3px.
        // 100 units X = 480px -> 1 unit X = 4.8px.
        // Aspect ratio correction factor = 4.8 / 3 = 1.6.
        // To make a square: height_units = width_units * 1.6.

        if (index === 0)
          return {
            x: 0,
            y: 0,
            width: 100,
            height: 100, // Fill container
            rx: 4,
            ry: 6.4,
            fill: colors.transparent,
            stroke: "none",
            strokeWidth: 0,
            opacity: 1,
          };
        if (index === 1)
          return {
            x: 0,
            y: 0,
            width: 100,
            height: 15, // Taller header
            rx: 0,
            ry: 0,
            fill: colors.gray400_20,
            opacity: 1,
          };
        // Buttons: width 4 units = 19.2px. height needs to be 19.2px.
        // 19.2px / 3px/unit = 6.4 units.
        // Position Y: Center of header (15/2 = 7.5). Top = 7.5 - 3.2 = 4.3.
        if (index === 2)
          return {
            x: 5,
            y: 4.3,
            width: 4,
            height: 6.4,
            rx: 2, // Half of width for circle
            ry: 3.2, // Half of height for circle
            fill: colors.red400,
            opacity: 1,
          };
        if (index === 3)
          return {
            x: 11,
            y: 4.3,
            width: 4,
            height: 6.4,
            rx: 2,
            ry: 3.2,
            fill: colors.yellow400,
            opacity: 1,
          };
        if (index === 4)
          return {
            x: 17,
            y: 4.3,
            width: 4,
            height: 6.4,
            rx: 2,
            ry: 3.2,
            fill: colors.green400,
            opacity: 1,
          };
        // Content blocks
        if (index === 5)
          return {
            x: 0,
            y: 15, // Below header
            width: 25, // Sidebar width
            height: 85, // Full height remaining
            rx: 0,
            fill: colors.primary5,
            opacity: 1,
          };
        if (index === 6)
          return {
            x: 30, // Gap after sidebar
            y: 25, // Top margin
            width: 65, // Main content width
            height: 40, // Hero section
            rx: 2,
            ry: 3.2,
            fill: colors.blue400_20,
            opacity: 1,
          };
        return hidden;

      case 3: // SAAS - Dashboard (uses 6 shapes)
        // Aspect 1.5. Wide.
        // height = width * 1.5.
        // Cards x=10, 55. width 35. height 25.
        // To look rectangular 35x25 physically? 35*scaleX, 25*scaleY.
        // 35*4.2 = 147px. 25*2.8 = 70px. 2:1 rect.
        // That's fine for cards.
        // Corner radius rx=4. ry = 4*1.5 = 6.
        if (index === 0)
          return {
            x: 10,
            y: 15,
            width: 35,
            height: 25,
            rx: 4,
            ry: 6,
            fill: colors.blue400_20,
            opacity: 1,
          };
        if (index === 1)
          return {
            x: 55,
            y: 15,
            width: 35,
            height: 25,
            rx: 4,
            ry: 6,
            fill: colors.green400_20,
            opacity: 1,
          };
        if (index === 2)
          return {
            x: 10,
            y: 50,
            width: 80,
            height: 35,
            rx: 4,
            ry: 6,
            fill: colors.purple400_20,
            opacity: 1,
          };
        if (index === 3)
          return {
            x: 15,
            y: 65,
            width: 6,
            height: 15,
            rx: 1,
            ry: 1.5,
            fill: colors.blue400,
            opacity: 1,
          };
        if (index === 4)
          return {
            x: 25,
            y: 60,
            width: 6,
            height: 20,
            rx: 1,
            ry: 1.5,
            fill: colors.green400,
            opacity: 1,
          };
        if (index === 5)
          return {
            x: 35,
            y: 55,
            width: 6,
            height: 25,
            rx: 1,
            ry: 1.5,
            fill: colors.orange400,
            opacity: 1,
          };
        return hidden;

      case 4: // N8N - Workflow Nodes (uses 5 shapes)
        // Aspect 2.25 (450/200). Very Wide.
        // Correction factor = 2.25
        // Nodes need to be rounded squares, not circles.
        // Size: 12x12 (radius 6) -> Height needs to be 12 * 2.25 = 27.
        // To make them rounded squares, rx needs to be small, not "50%".
        // rx = 4. ry = 4 * 2.25 = 9.
        // Centralize nodes: Center is 50, 50.
        // Spread them more?
        // Node 1 (Start): Left side.
        // Node 2 (Branch Top): Middle Top.
        // Node 3 (Branch Bottom): Middle Bottom.
        // Node 4 (Merge): Right.
        // Node 5 (End): Far Right.

        if (index === 0)
          return {
            x: 10, // Far Left
            y: 36.5, // Center Y (50) - Half Height (27/2 = 13.5) = 36.5
            width: 12,
            height: 27,
            rx: 2,
            ry: 4.5,
            fill: colors.blue400,
            opacity: 1,
          };
        if (index === 1)
          return {
            x: 35, // Middle Left
            y: 15, // Top Branch
            width: 12,
            height: 27,
            rx: 2,
            ry: 4.5,
            fill: colors.green400,
            opacity: 1,
          };
        if (index === 2)
          return {
            x: 35, // Middle Left
            y: 58, // Bottom Branch
            width: 12,
            height: 27,
            rx: 2,
            ry: 4.5,
            fill: colors.orange400,
            opacity: 1,
          };
        if (index === 3)
          return {
            x: 60, // Middle Right
            y: 36.5, // Center Y
            width: 12,
            height: 27,
            rx: 2,
            ry: 4.5,
            fill: colors.purple400,
            opacity: 1,
          };
        if (index === 4)
          return {
            x: 80, // Far Right
            y: 36.5, // Center Y
            width: 12,
            height: 27,
            rx: 2,
            ry: 4.5,
            fill: colors.red400,
            opacity: 1,
          };
        return hidden;

      case 5: // AI - Neural Network (uses 6 shapes)
        // Aspect 1.0 (320/320). No correction needed.
        if (index === 0)
          return {
            x: 42,
            y: 42,
            width: 16,
            height: 16,
            rx: 8, // Half of width/height for circle
            ry: 8,
            fill: colors.purple400,
            opacity: 1,
          }; // Center
        if (index === 1)
          return {
            x: 26,
            y: 26,
            width: 8,
            height: 8,
            rx: 4, // Half of width/height for circle
            ry: 4,
            fill: colors.blue400,
            opacity: 1,
          };
        if (index === 2)
          return {
            x: 66,
            y: 26,
            width: 8,
            height: 8,
            rx: 4,
            ry: 4,
            fill: colors.green400,
            opacity: 1,
          };
        if (index === 3)
          return {
            x: 26,
            y: 66,
            width: 8,
            height: 8,
            rx: 4,
            ry: 4,
            fill: colors.orange400,
            opacity: 1,
          };
        if (index === 4)
          return {
            x: 66,
            y: 66,
            width: 8,
            height: 8,
            rx: 4,
            ry: 4,
            fill: colors.red400,
            opacity: 1,
          };
        return hidden;

      default:
        return hidden;
    }
  };

  // Define properties for 5 lines that appear/disappear
  const getLineProps = (index: number): LineProps => {
    const hidden: LineProps = {
      x1: 50,
      y1: 50,
      x2: 50,
      y2: 50,
      opacity: 0,
      strokeWidth: 0,
      stroke: colors.transparent,
    };

    switch (effectiveIndex) {
      case 4: // N8N - Connections
        // Node centers logic:
        // Center X = x + width/2
        // Center Y = y + height/2

        // Node 1: x=10, y=36.5, w=12, h=27. Center: (16, 50)
        // Node 2: x=35, y=15, w=12, h=27. Center: (41, 28.5)
        // Node 3: x=35, y=58, w=12, h=27. Center: (41, 71.5)
        // Node 4: x=60, y=36.5, w=12, h=27. Center: (66, 50)
        // Node 5: x=80, y=36.5, w=12, h=27. Center: (86, 50)

        // Connections:
        // 1 -> 2: (16, 50) -> (41, 28.5)
        // 1 -> 3: (16, 50) -> (41, 71.5)
        // 2 -> 4: (41, 28.5) -> (66, 50)
        // 3 -> 4: (41, 71.5) -> (66, 50)
        // 4 -> 5: (66, 50) -> (86, 50)

        // Adjust start/end points to touch edges of nodes?
        // Or just center to center with z-index handling (lines are behind nodes in SVG order so fine)

        if (index === 0)
          return {
            x1: 16,
            y1: 50,
            x2: 41,
            y2: 28.5,
            opacity: 1,
            strokeWidth: 1,
            stroke: colors.primary40,
          };
        if (index === 1)
          return {
            x1: 16,
            y1: 50,
            x2: 41,
            y2: 71.5,
            opacity: 1,
            strokeWidth: 1,
            stroke: colors.primary40,
          };
        if (index === 2)
          return {
            x1: 41,
            y1: 28.5,
            x2: 66,
            y2: 50,
            opacity: 1,
            strokeWidth: 1,
            stroke: colors.primary40,
          };
        if (index === 3)
          return {
            x1: 41,
            y1: 71.5,
            x2: 66,
            y2: 50,
            opacity: 1,
            strokeWidth: 1,
            stroke: colors.primary40,
          };
        if (index === 4)
          return {
            x1: 66,
            y1: 50,
            x2: 86,
            y2: 50,
            opacity: 1,
            strokeWidth: 1,
            stroke: colors.primary40,
          };
        return hidden;

      case 5: // AI - Neural Connections
        // Centers:
        // C: 50, 50 (42+8, 42+8)
        // TL: 30, 30 (26+4, 26+4)
        // TR: 70, 30
        // BL: 30, 70
        // BR: 70, 70
        if (index === 0)
          return {
            x1: 42,
            y1: 42,
            x2: 34,
            y2: 34,
            opacity: 0.5,
            strokeWidth: 1,
            stroke: colors.purple400,
          };
        if (index === 1)
          return {
            x1: 58,
            y1: 42,
            x2: 66,
            y2: 34,
            opacity: 0.5,
            strokeWidth: 1,
            stroke: colors.purple400,
          };
        if (index === 2)
          return {
            x1: 42,
            y1: 58,
            x2: 34,
            y2: 66,
            opacity: 0.5,
            strokeWidth: 1,
            stroke: colors.purple400,
          };
        if (index === 3)
          return {
            x1: 58,
            y1: 58,
            x2: 66,
            y2: 66,
            opacity: 0.5,
            strokeWidth: 1,
            stroke: colors.purple400,
          };
        return hidden;

      default:
        return hidden;
    }
  };

  // Transition settings for synchronized movement
  const transitionConfig = {
    duration: 1.2,
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    type: "tween" as const,
  };

  return (
    <div className="w-full h-full flex items-center justify-center max-w-full overflow-hidden px-2 md:px-0">
      {/* Morphing container with purple border */}
      <div
        className="relative flex items-center justify-center origin-center"
        style={{
          transform: `scale(${scale})`,
          width: "480px", // Fixed base layout width
          height: "400px", // Fixed base layout height to accommodate all states
          flexShrink: 0,
        }}
      >
        {/* Slightly misaligned background border for hand-drawn effect */}
        <motion.div
          initial={{
            width: containerProps.width,
            height: containerProps.height,
            rotate: backgroundRotation,
          }}
          animate={{
            width: containerProps.width,
            height: containerProps.height,
            rotate: backgroundRotation,
          }}
          transition={transitionConfig}
          className="absolute border-2 border-primary/30 rounded-2xl"
          style={{
            willChange: "width, height, transform",
            transform: "translate(2px, -2px)",
            maxWidth: "100%",
          }}
        />

        {/* Main border */}
        <motion.div
          initial={{
            width: containerProps.width,
            height: containerProps.height,
          }}
          animate={{
            width: containerProps.width,
            height: containerProps.height,
          }}
          transition={transitionConfig}
          className="border-4 border-primary rounded-2xl bg-muted/50 flex items-center justify-center relative overflow-hidden"
          style={{
            willChange: "width, height",
            transform: "rotate(0.3deg)",
            // Removed maxWidth/maxHeight 100% to prevent aspect ratio distortion
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            {/* Lines Pool */}
            {[0, 1, 2, 3, 4].map((i) => {
              const props = getLineProps(i);
              return (
                <motion.line
                  key={`line-${i}`}
                  animate={{
                    x1: props.x1,
                    y1: props.y1,
                    x2: props.x2,
                    y2: props.y2,
                    opacity: props.opacity,
                    stroke: props.stroke || colors.transparent,
                    strokeWidth: props.strokeWidth || 0,
                  }}
                  transition={transitionConfig}
                />
              );
            })}

            {/* Shapes Pool */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
              const props = getShapeProps(i);
              return (
                <motion.rect
                  key={`shape-${i}`}
                  animate={{
                    x: props.x,
                    y: props.y,
                    width: props.width,
                    height: props.height,
                    rx: props.rx,
                    ry: props.ry || props.rx, // Use ry if provided, else rx
                    fill: props.fill,
                    stroke: props.stroke || "none",
                    strokeWidth: props.strokeWidth || 0,
                    opacity: props.opacity,
                  }}
                  transition={transitionConfig}
                />
              );
            })}
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default DynamicVisual;
