import { useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./views/Index";
import Services from "./views/Services";
import Products from "./views/Products";
import Contact from "./views/Contact";
import PrivacyPolicy from "./views/PrivacyPolicy";
import NavigationalPolicy from "./views/NavigationalPolicy";
import NotFound from "./views/NotFound";
import GomlinJobs from "./views/case-studies/GomlinJobs";
import Nightwing from "./views/case-studies/Nightwing";
import AISocialMediaStrategist from "./views/case-studies/AISocialMediaStrategist";
import BlogAutomation from "./views/case-studies/BlogAutomation";
import Mintkola from "./views/case-studies/Mintkola";
import Spidclass from "./views/case-studies/Spidclass";
import YellowCandle from "./views/case-studies/YellowCandle";
import PortfolioWebsites from "./views/case-studies/PortfolioWebsites";
import ITA from "./views/case-studies/ITA";
import FullstackApps from "./views/case-studies/FullstackApps";
import Dronebag from "./views/case-studies/Dronebag";

const queryClient = new QueryClient();

// Scroll to top on route change (but not for sub-routes within the same section)
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    const prevPath = prevPathRef.current;
    prevPathRef.current = pathname;

    // Don't scroll if navigating within /services (e.g., /services -> /services/mvp)
    const isServicesRoute = (path: string) => path.startsWith("/services");
    if (isServicesRoute(prevPath) && isServicesRoute(pathname)) {
      return;
    }

    if (pathname === "/" && hash === "#case-studies") {
      const el = document.getElementById("case-studies");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* The English site lives under /en; the Hebrew site is at the root. */}
      <BrowserRouter basename="/en">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/navigational-policy" element={<NavigationalPolicy />} />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
