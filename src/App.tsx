import { useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ConsentProvider } from "./contexts/ConsentContext";
import { CookieConsent } from "./components/CookieConsent";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NavigationalPolicy from "./pages/NavigationalPolicy";
import NotFound from "./pages/NotFound";
import GomlinJobs from "./pages/case-studies/GomlinJobs";
import Nightwing from "./pages/case-studies/Nightwing";
import AISocialMediaStrategist from "./pages/case-studies/AISocialMediaStrategist";
import BlogAutomation from "./pages/case-studies/BlogAutomation";
import Mintkola from "./pages/case-studies/Mintkola";
import Spidclass from "./pages/case-studies/Spidclass";
import YellowCandle from "./pages/case-studies/YellowCandle";
import PortfolioWebsites from "./pages/case-studies/PortfolioWebsites";
import ITA from "./pages/case-studies/ITA";
import FullstackApps from "./pages/case-studies/FullstackApps";
import Dronebag from "./pages/case-studies/Dronebag";
import CaseStudies from "./pages/CaseStudies";

const queryClient = new QueryClient();

// Scroll to top on route change (but not for sub-routes within the same section)
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    const prevPath = prevPathRef.current;
    prevPathRef.current = pathname;

    // Don't scroll if navigating within /services (e.g., /services -> /services/mvp)
    const isServicesRoute = (path: string) => path.startsWith("/services");
    if (isServicesRoute(prevPath) && isServicesRoute(pathname)) {
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ConsentProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/navigational-policy" element={<NavigationalPolicy />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/gomlin-jobs" element={<GomlinJobs />} />
            <Route path="/case-studies/nightwing" element={<Nightwing />} />
            <Route path="/case-studies/ai-social-media-strategist" element={<AISocialMediaStrategist />} />
            <Route path="/case-studies/blog-automation" element={<BlogAutomation />} />
            <Route path="/case-studies/mintkola" element={<Mintkola />} />
            <Route path="/case-studies/spidclass" element={<Spidclass />} />
            <Route path="/case-studies/yellow-candle" element={<YellowCandle />} />
            <Route path="/case-studies/portfolio-websites" element={<PortfolioWebsites />} />
            <Route path="/case-studies/ita" element={<ITA />} />
            <Route path="/case-studies/fullstack-apps" element={<FullstackApps />} />
            <Route path="/case-studies/dronebag" element={<Dronebag />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </ConsentProvider>
  </QueryClientProvider>
);

export default App;
