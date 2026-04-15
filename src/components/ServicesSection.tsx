import { ArrowRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    // Group 1: For Startups (Validation & MVP)
    {
      group: "For Startups",
      items: [
        {
          title: "MVP Strategy",
          description: "Turn your idea into a concrete plan. We help you validate, prototype, and define your roadmap.",
          tags: ["Validation", "Prototyping", "Roadmap"],
          icon: "/strategy.svg",
        },
        {
          title: "Rapid MVP Build",
          description: "Get to market fast. We build scalable MVPs using the best tools for the job (Code or No-Code).",
          tags: ["React", "Flutter", "Supabase"],
          icon: "/development.svg",
        },
      ],
    },
    // Group 2: For Scale-ups (Growth & Optimization)
    {
      group: "For Scale-ups",
      items: [
        {
          title: "Custom Development",
          description: "Complex web & mobile apps. We handle the heavy lifting so you can focus on growth.",
          tags: ["Full-Stack", "Architecture", "Cloud"],
          icon: "/infrastructure.svg",
        },
        {
          title: "n8n Automation",
          description: "Automate your business logic. We integrate your tools to save 100+ hours per month.",
          tags: ["n8n", "Integrations", "Workflows"],
          icon: "/circle.svg", // Using circle as a placeholder for automation
        },
      ],
    },
  ];

  const products = [
    {
      title: "AI Customer Support Agent",
      description: "24/7 AI Support integrated with your business. Handle inquiries autonomously.",
      image: "/marketing.svg",
      link: "#products",
    },
    // Placeholder for future products
    // {
    //   title: "SaaS Starter Kit",
    //   description: "Launch your next SaaS in days, not months. Pre-configured auth, payments, and more.",
    //   image: "/placeholder.svg",
    //   link: "#",
    // },
  ];

  return (
    <section className="bg-card section-padding" id="services">
      <div className="container-padding">
        <div className="max-w-7xl mx-auto">
          
          {/* Services Section */}
          <div className="mb-24">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Build Your Product
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  Whether you're validating an idea or scaling a platform, we have the expertise to get you there.
                </p>
              </div>
              <button 
                className="hidden md:flex items-center text-primary font-semibold hover:text-primary/80 transition-colors mt-4 md:mt-0"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Start a Project <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {services.map((group, idx) => (
                <div key={idx} className="space-y-6">
                  <h3 className="text-xl font-semibold text-primary border-b border-border/50 pb-2">
                    {group.group}
                  </h3>
                  <div className="grid gap-6">
                    {group.items.map((service, sIdx) => (
                      <div 
                        key={sIdx} 
                        className="group p-6 bg-background/50 border border-border/50 rounded-xl hover:border-primary/50 transition-colors duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                            <img src={service.icon} alt="" className="w-8 h-8" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-foreground mb-2">{service.title}</h4>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                              {service.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {service.tags.map((tag) => (
                                <span key={tag} className="text-xs font-medium px-2 py-1 bg-muted rounded text-muted-foreground">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 md:hidden">
              <button 
                className="w-full flex items-center justify-center text-primary font-semibold hover:text-primary/80 transition-colors py-3 border border-border rounded-lg"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Start a Project <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Products Section */}
          <div id="products" className="pt-12 border-t border-border/30">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Use Our Products
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  Proven tools we built to solve real problems. Available for your business today.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {products.map((product, idx) => (
                <div 
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-background hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="p-8 relative z-10">
                    <div className="w-12 h-12 mb-6 bg-primary/10 rounded-xl flex items-center justify-center">
                      <img src={product.image} alt="" className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <button 
                      className="inline-flex items-center font-semibold text-foreground group-hover:text-primary transition-colors"
                      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      Learn More <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Coming Soon Card */}
              <div className="rounded-2xl border border-border border-dashed bg-muted/30 p-8 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 mb-4 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-2xl text-muted-foreground">+</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">More Coming Soon</h3>
                <p className="text-sm text-muted-foreground">
                  We're always building new tools to help startups grow.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
