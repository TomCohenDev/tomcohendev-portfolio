import React from "react";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ServiceData } from "../data/services";

interface ServiceDetailProps {
  service: ServiceData;
  onClose: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onClose }) => {
  const navigate = useNavigate();
  const { richDetails } = service;

  return (
    <div className="bg-card border border-border/50 rounded-2xl relative overflow-hidden animate-fade-in">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 hover:bg-muted rounded-full transition-colors"
      >
        <X className="w-5 h-5 text-muted-foreground" />
      </button>

      {/* Hero Section */}
      <div className="p-6 md:p-10 border-b border-border/30">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 md:p-4 bg-primary/10 rounded-2xl text-primary">
              {service.icon}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {richDetails?.headline || service.title}
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {richDetails?.subheadline || service.description}
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            <button
              onClick={() => navigate("/contact")}
              className="btn-hero inline-flex items-center justify-center px-8 py-3 text-base"
            >
              Start a Project <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Rich Content - Pillars */}
      {richDetails?.pillars && (
        <div className="p-6 md:p-10 bg-muted/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {richDetails.pillars.map((pillar, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold text-primary">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {pillar.description}
                </p>
                <ul className="space-y-2 mt-2">
                  {pillar.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Process Section */}
      {richDetails?.processSteps && (
        <div className="p-6 md:p-10 border-t border-border/30">
          <h3 className="text-2xl font-bold mb-8 text-center">
            {richDetails.processTitle || "Our Process"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
             {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-border -z-10" />
            
            {richDetails.processSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-4 bg-card p-4 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {idx + 1}
                </div>
                <h4 className="text-lg font-semibold">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fallback Features (if no rich pillars) */}
      {!richDetails && (
        <div className="p-6 md:p-10 bg-muted/20">
           <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
            What's Included
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border/50">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;

