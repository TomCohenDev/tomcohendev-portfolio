import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { Mail, Phone } from "lucide-react";

const PHONE_DISPLAY = "+972 54-555-2149";
const PHONE_TEL = "+972545552149";
const EMAIL = "tom.cohen9@gmail.com";

const Contact = () => {
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-background pt-32 pb-20">
        <div className="container-padding max-w-4xl mx-auto">
          <div className="relative">
            <motion.div
              className="absolute inset-0 border-2 border-primary/30 rounded-2xl"
              animate={{
                scale: borderAnimation.scale,
                x: borderAnimation.x,
                y: borderAnimation.y,
                rotate: borderAnimation.rotate,
              }}
              transition={{
                duration: 2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-primary/20 rounded-2xl"
              animate={{
                scale: borderAnimation2.scale,
                x: borderAnimation2.x,
                y: borderAnimation2.y,
                rotate: borderAnimation2.rotate,
              }}
              transition={{
                duration: 2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-primary/15 rounded-2xl"
              animate={{
                scale: borderAnimation3.scale,
                x: borderAnimation3.x,
                y: borderAnimation3.y,
                rotate: borderAnimation3.rotate,
              }}
              transition={{
                duration: 2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            />

            <div
              className="relative border-4 border-primary/20 rounded-2xl bg-muted/50 p-6 md:p-10 lg:p-14"
              style={{ transform: "rotate(0.3deg)" }}
            >
              <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                  Contact
                </h1>
              </div>

              <div className="flex flex-col items-center gap-8 md:gap-10 max-w-md mx-auto text-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Name
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-foreground">
                    Tom Cohen
                  </p>
                </div>

                <div className="w-full border-t border-border/40 pt-8">
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" aria-hidden />
                    Phone
                  </p>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="text-xl md:text-2xl font-semibold text-primary hover:underline break-all"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>

                <div className="w-full border-t border-border/40 pt-8">
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" aria-hidden />
                    Email
                  </p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-xl md:text-2xl font-semibold text-primary hover:underline break-all"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
