import { ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Products = () => {
  const products = [
    {
      title: "AI Customer Support Agent",
      description: "24/7 AI Support integrated with your business. Handle inquiries autonomously.",
      image: "/marketing.svg",
      link: "#", // This could link to a specific product page if desired
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
    <div className="min-h-screen">
      <Header />
      <section className="bg-card section-padding pt-32 min-h-screen">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h1 className="excalifont-title mb-6">
                  Use Our Products
                </h1>
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
                      onClick={() => window.location.href = "/#contact"}
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
      </section>
      <Footer />
    </div>
  );
};

export default Products;






