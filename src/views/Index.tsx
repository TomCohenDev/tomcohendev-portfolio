import HeroSection from "../components/HeroSection";
import CaseStudySection from "../components/CaseStudySection";

import Footer from "../components/Footer";
import Header from "../components/Header";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <CaseStudySection />

      <Footer />
    </div>
  );
};

export default Index;
