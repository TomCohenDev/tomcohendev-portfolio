import { motion } from "framer-motion";

const LOGO_PATHS = [
  {
    d: "M134.974 183.674 L244.907 374.083",
    stroke: "url(#paint0_linear_29_31)"
  },
  {
    d: "M278.974 206.674 L332.89 300.06",
    stroke: "url(#paint1_linear_29_31)"
  },
  {
    d: "M90.9742 326.674 L108.68 357.342",
    stroke: "url(#paint2_linear_29_31)"
  },
  {
    d: "M40.006 232.642 L228.442 119.36",
    stroke: "url(#paint3_linear_29_31)"
  },
  {
    d: "M53.8332 65.5332C53.8332 65.5332 57.2458 63.2183 69.8332 55.5332C82.4206 47.8481 106.558 39.3983 126.333 40.0332C146.108 40.6681 144.421 40.0646 178.333 55.5332C212.245 71.0018 224.833 111.128 224.833 111.128",
    stroke: "url(#paint4_linear_29_31)"
  }
];

const draw = {
  hidden: { pathLength: 0, opacity: 0, strokeWidth: 0 },
  visible: (i: number) => {
    const delay = i * 0.08;
    return {
      pathLength: 1,
      opacity: 1,
      strokeWidth: 80,
      transition: {
        pathLength: { delay, type: "spring", duration: 0.8, bounce: 0.4 },
        opacity: { delay, duration: 0.01 },
        strokeWidth: { delay, type: "spring", duration: 0.8, bounce: 0.4 }
      }
    };
  }
};

const AnimatedLogo = ({ shouldAnimate = true, className = "h-12 w-auto aspect-[373/429]" }: { shouldAnimate?: boolean; className?: string }) => {
  return (
    <motion.svg
      width="373"
      height="429"
      viewBox="0 0 373 429"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={{
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delayChildren: shouldAnimate ? 0.1 : 0,
            staggerChildren: shouldAnimate ? 0.05 : 0,
            type: "spring",
            stiffness: 200,
            damping: 15
          }
        }
      }}
    >
      <defs>
        <linearGradient id="paint0_linear_29_31" x1="174.333" y1="320.533" x2="229.833" y2="428.974" gradientUnits="userSpaceOnUse">
          <stop stopColor="#AE92FF"/>
          <stop offset="1" stopColor="#D3C4FF"/>
        </linearGradient>
        <linearGradient id="paint1_linear_29_31" x1="223.9" y1="192.283" x2="317.816" y2="354.951" gradientUnits="userSpaceOnUse">
          <stop offset="0.0240385" stopColor="#855BFF"/>
          <stop offset="0.441283" stopColor="#AE92FF"/>
          <stop offset="1" stopColor="#D3C4FF"/>
        </linearGradient>
        <linearGradient id="paint2_linear_29_31" x1="35.9002" y1="312.283" x2="93.6063" y2="412.233" gradientUnits="userSpaceOnUse">
          <stop offset="0.120192" stopColor="#8C64FF"/>
          <stop offset="0.44147" stopColor="#AE92FF"/>
          <stop offset="1" stopColor="#D3C4FF"/>
        </linearGradient>
        <linearGradient id="paint3_linear_29_31" x1="264.333" y1="297.533" x2="77.8408" y2="82.2118" gradientUnits="userSpaceOnUse">
          <stop offset="0.640002" stopColor="#AE92FF"/>
          <stop offset="0.808516" stopColor="#8B5CF6"/>
        </linearGradient>
        <linearGradient id="paint4_linear_29_31" x1="220.333" y1="104.033" x2="129.333" y2="-4.46676" gradientUnits="userSpaceOnUse">
          <stop stopColor="#AE92FF"/>
          <stop offset="0.803207" stopColor="#8B5CF6"/>
          <stop offset="1" stopColor="#7F46FF"/>
        </linearGradient>
      </defs>
      {LOGO_PATHS.map((item, index) => (
        <motion.path
          key={index}
          d={item.d}
          stroke={item.stroke}
          strokeWidth="80"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
          custom={index}
        />
      ))}
    </motion.svg>
  );
};

export default AnimatedLogo;



