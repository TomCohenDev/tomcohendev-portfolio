import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ServiceCTAProps {
  title: string;
  description: string;
  onExplore: () => void;
  showConsultationBadge?: boolean;
  primaryButtonText?: string;
}

const ServiceCTA = ({
  title,
  description,
  onExplore,
  showConsultationBadge = false,
  primaryButtonText = "Start a Project",
}: ServiceCTAProps) => {
  const navigate = useNavigate();
  const [borderAnimation, setBorderAnimation] = useState({
    scale: 1,
    x: 2,
    y: -2,
    rotate: -0.5,
  });
  const [borderAnimation2, setBorderAnimation2] = useState({
    scale: 1,
    x: -2,
    y: 2,
    rotate: 0.5,
  });
  const [borderAnimation3, setBorderAnimation3] = useState({
    scale: 1,
    x: 1,
    y: 1,
    rotate: -0.3,
  });

  useEffect(() => {
    const updateAnimation = () => {
      setBorderAnimation({
        scale: 0.98 + Math.random() * 0.04,
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 6,
        rotate: (Math.random() - 0.5) * 2,
      });
      setBorderAnimation2({
        scale: 0.98 + Math.random() * 0.04,
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 6,
        rotate: (Math.random() - 0.5) * 2,
      });
      setBorderAnimation3({
        scale: 0.98 + Math.random() * 0.04,
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 6,
        rotate: (Math.random() - 0.5) * 2,
      });
    };

    updateAnimation();
    const interval = setInterval(updateAnimation, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <motion.div
        className="absolute inset-0 border-2 border-primary/30 rounded-2xl"
        animate={borderAnimation}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
      />
      <motion.div
        className="absolute inset-0 border-2 border-primary/20 rounded-2xl"
        animate={borderAnimation2}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
      />
      <motion.div
        className="absolute inset-0 border-2 border-primary/15 rounded-2xl"
        animate={borderAnimation3}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <div
        className="relative rounded-2xl bg-muted/50 p-10 md:p-16 text-center"
        style={{ transform: "rotate(0.3deg)" }}
      >
        {showConsultationBadge && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full mb-6">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-base font-semibold text-primary">
              Free 30-Minute Consultation
            </span>
          </div>
        )}

        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {title}
        </h3>

        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/contact")}
            className="btn-hero inline-flex items-center justify-center min-w-[240px] text-lg"
          >
            {primaryButtonText} <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          <button
            onClick={onExplore}
            className="px-8 py-4 text-lg text-muted-foreground hover:text-foreground transition-colors"
          >
            Explore Other Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCTA;

