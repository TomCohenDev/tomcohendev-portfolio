const FounderMessage = () => {
  return (
    <section className="bg-background py-16">
      <div className="container-padding">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-150 opacity-50"></div>

            <div className="relative z-10">
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  From{" "}
                  <span className="inline-block transform -rotate-1 text-primary relative">
                    Founder
                    {/* Underline decoration */}
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-3 text-primary/30"
                      viewBox="0 0 200 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 6C50 2 100 10 198 6"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>{" "}
                  to{" "}
                  <span className="inline-block transform rotate-1 text-primary relative">
                    Founder
                  </span>
                </h2>
              </div>

              {/* Message Card */}
              <div className="package-card doodle-border bg-card/50 backdrop-blur-sm p-8 transform transition-all duration-300 hover:shadow-2xl">
                <div className="relative">
                  {/* Quote marks */}
                  <div className="absolute -top-4 -left-2 text-6xl text-primary/20 font-serif">
                    "
                  </div>

                  <p className="text-xl md:text-2xl text-foreground leading-relaxed italic pl-8 pr-4">
                    We built this service because we've seen too many great
                    ideas fail due to fragmented execution. Startups need{" "}
                    <span className="text-primary font-semibold">
                      one partner
                    </span>{" "}
                    who understands the{" "}
                    <span className="text-primary font-semibold">
                      entire journey
                    </span>{" "}
                    - from concept to customer acquisition. That's what we
                    provide.
                  </p>

                  <div className="absolute -bottom-4 -right-2 text-6xl text-primary/20 font-serif">
                    "
                  </div>
                </div>

                {/* Founder Info */}
                <div className="mt-8 flex items-center gap-6 pt-4 border-t border-primary/20">
                  <img
                    src="/tom_face.webp"
                    alt="Tom Cohen"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-xl text-foreground">
                      Tom Cohen
                    </p>
                    <p className="text-primary font-semibold">
                      Founder & Lead Developer
                    </p>
                    <p className="text-sm text-muted-foreground">
                      End2End Startup Team
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute top-8 left-8 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60"></div>
              <div className="absolute bottom-8 right-12 w-3 h-3 bg-primary/50 rounded-full animate-bounce delay-300"></div>
              <div className="absolute top-12 right-16 w-1.5 h-1.5 bg-primary/70 rounded-full animate-ping delay-700"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
