import { ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceMap from "../components/ServiceMap";

const Services = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  return (
    <div className="min-h-screen">
      <Header />
      <section className="bg-card section-padding pt-32 min-h-screen">
        <div className="container-padding">
          <div className="max-w-7xl mx-auto">
            <div className="mb-0 md:mb-8 text-center">
              <h1 className="excalifont-title mb-4 md:mb-6">Our Services</h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                We build end-to-end digital products, intelligent agents, and
                automated systems.
              </p>
            </div>

            {/* Radial Service Map */}
            <ServiceMap activeServiceId={serviceId} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Services;
