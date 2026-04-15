import { motion } from "framer-motion";
import { 
  Code2, 
  Zap, 
  Layers, 
  Smartphone, 
  ArrowRight, 
  Sparkles,
  Database,
  Bot,
  Globe,
  Terminal,
  Workflow,
  Server
} from "lucide-react";

// --- HELPERS ---

const StaticElement = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) => (
  <div className={`absolute ${className}`}>
    {children}
  </div>
);

const PhotoCard = ({ src, alt, size = "md" }: { src: string; alt: string; size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-20 h-20 rounded-2xl",
    md: "w-32 h-32 rounded-3xl",
    lg: "w-48 h-48 rounded-[2rem]",
  };

  return (
    <div className={`${sizeClasses[size]} overflow-hidden border-2 border-white/10 shadow-2xl relative`}>
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-orange-500/20 mix-blend-overlay z-10" />
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

const IconBubble = ({ icon: Icon, color }: { icon: any; color: string }) => (
  <div className="w-16 h-16 bg-[#1D201F] border border-white/10 rounded-full flex items-center justify-center shadow-xl z-20">
    <Icon className={`w-8 h-8 ${color}`} />
  </div>
);

// --- MAIN COMPONENT ---

const CreativeHeroVisual = () => {

  return (
    <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-visible bg-[#1D201F]">
      
      {/* 1. THE FLUID GRADIENT BACKDROP (The "Blob") */}
      <div 
        className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-15 blur-[60px]"
        style={{
          background: "conic-gradient(from 0deg, #bf95f9, #f97316, #14b8a6, #bf95f9)",
          borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" 
        }}
      />

      {/* 2. THE DOODLE LAYER (SVG Arrows & Annotations) */}
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-visible">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#E0D0C1" />
          </marker>
        </defs>
        
        {/* Static Arrows with High Contrast */}
        <path
          d="M 300 200 Q 200 250 250 380"
          fill="none"
          stroke="#E0D0C1"
          strokeWidth="3"
          strokeDasharray="10 6"
          markerEnd="url(#arrowhead)"
          className="hidden md:block opacity-80"
        />

        <path
          d="M 650 450 Q 750 350 680 250"
          fill="none"
          stroke="#E0D0C1"
          strokeWidth="3"
          strokeDasharray="10 6"
          markerEnd="url(#arrowhead)"
          className="hidden md:block opacity-80"
        />

        {/* Doodle Circles */}
        <circle cx="150" cy="100" r="8" fill="none" stroke="#E0D0C1" strokeWidth="2" opacity="0.4" className="hidden md:block" />
        <circle cx="750" cy="150" r="6" fill="none" stroke="#E0D0C1" strokeWidth="2" opacity="0.4" className="hidden md:block" />
        <circle cx="500" cy="600" r="10" fill="none" stroke="#E0D0C1" strokeWidth="2" opacity="0.4" className="hidden md:block" />
        <circle cx="100" cy="500" r="7" fill="none" stroke="#E0D0C1" strokeWidth="2" opacity="0.4" className="hidden md:block" />
        <circle cx="800" cy="500" r="9" fill="none" stroke="#E0D0C1" strokeWidth="2" opacity="0.4" className="hidden md:block" />

        {/* Doodle Squiggly Lines */}
        <path d="M 120 300 Q 140 280 160 300 Q 180 320 200 300" fill="none" stroke="#E0D0C1" strokeWidth="1.5" opacity="0.3" className="hidden md:block" />
        <path d="M 700 400 Q 720 380 740 400 Q 760 420 780 400" fill="none" stroke="#E0D0C1" strokeWidth="1.5" opacity="0.3" className="hidden md:block" />
        <path d="M 400 100 Q 420 120 440 100 Q 460 80 480 100" fill="none" stroke="#E0D0C1" strokeWidth="1.5" opacity="0.3" className="hidden md:block" />

        {/* Doodle Dots */}
        <circle cx="250" cy="350" r="3" fill="#E0D0C1" opacity="0.5" className="hidden md:block" />
        <circle cx="600" cy="200" r="3" fill="#E0D0C1" opacity="0.5" className="hidden md:block" />
        <circle cx="350" cy="550" r="3" fill="#E0D0C1" opacity="0.5" className="hidden md:block" />
        <circle cx="700" cy="300" r="3" fill="#E0D0C1" opacity="0.5" className="hidden md:block" />

        {/* Additional Small Arrows */}
        <path d="M 180 250 L 200 250" stroke="#E0D0C1" strokeWidth="2" opacity="0.4" markerEnd="url(#arrowhead)" className="hidden md:block" />
        <path d="M 650 350 L 670 350" stroke="#E0D0C1" strokeWidth="2" opacity="0.4" markerEnd="url(#arrowhead)" className="hidden md:block" />
        <path d="M 450 200 L 470 220" stroke="#E0D0C1" strokeWidth="2" opacity="0.4" markerEnd="url(#arrowhead)" className="hidden md:block" />
      </svg>

      {/* 3. FLOATING CONTENT GRID */}
      <div className="relative z-20 w-full max-w-5xl h-full">
        
        {/* --- GROUP 1: OUR SOLUTIONS (Top Left) --- */}
        <div className="absolute top-[15%] left-[5%] md:left-[15%]">
          <div className="excalifont-title text-[#E0D0C1] text-xl -rotate-12 mb-4 ml-8">
            our solutions
          </div>
          
          <div className="relative">
            <StaticElement className="z-30">
              <IconBubble icon={Code2} color="text-[#bf95f9]" />
            </StaticElement>
            <StaticElement className="left-16 top-8 z-20">
              <IconBubble icon={Smartphone} color="text-[#f97316]" />
            </StaticElement>
            <StaticElement className="left-8 top-20 z-10">
              <IconBubble icon={Layers} color="text-[#14b8a6]" />
            </StaticElement>
          </div>
        </div>

        {/* --- GROUP 2: THE TEAM (Right Side) --- */}
        <div className="absolute top-[20%] right-[5%] md:right-[10%] w-80 h-80">
           {/* Main Portrait */}
           <StaticElement className="right-0 top-0 z-10">
              <PhotoCard 
                src="/tom_ceo.webp" 
                alt="Tom CEO" 
                size="lg" 
              />
           </StaticElement>
           
           {/* Secondary Portrait */}
           <StaticElement className="right-48 top-32 z-0">
              <PhotoCard 
                src="/dvir.webp" 
                alt="Dvir" 
                size="md" 
              />
           </StaticElement>
        </div>

        {/* --- GROUP 3: THE PROCESS (Bottom Center) --- */}
        <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 flex items-center gap-8">
           <StaticElement className="-left-32 -top-10">
              <PhotoCard 
                src="/team.webp" 
                alt="The Team" 
                size="sm" 
              />
           </StaticElement>

           <div className="flex flex-col items-center">
             <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center mb-2">
                <Zap className="text-white fill-white" />
             </div>
             <div className="excalifont-title text-[#E0D0C1] text-2xl">
               the approach
             </div>
           </div>

           <StaticElement className="-right-24 top-0">
              <div className="bg-[#bf95f9] text-black font-bold p-4 rounded-full h-16 w-16 flex items-center justify-center transform rotate-12 shadow-lg shadow-purple-500/20">
                MVP
              </div>
           </StaticElement>
        </div>

        {/* --- CENTRAL FLUID TEXTURE --- */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
           <div className="w-[300px] h-[300px] border border-white/5 rounded-full" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-white/5 rounded-full" />
        </div>

      </div>
    </div>
  );
};

export default CreativeHeroVisual;

