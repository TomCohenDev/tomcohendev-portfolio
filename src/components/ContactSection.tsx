import { useState, useEffect } from "react";
import ScheduleSelector from "./ScheduleSelector";

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [scheduledTime, setScheduledTime] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [hasValidationAttempted, setHasValidationAttempted] = useState(false);

  const plans = [
    {
      id: "kickstart",
      name: "Kickstart Session",
      description: "1-hour strategic session",
      price: "$597",
      recurring: false,
    },
    {
      id: "growth",
      name: "Growth Partner",
      description: "Weekly guidance sessions",
      price: "$1,997/month",
      recurring: true,
    },
    {
      id: "full",
      name: "Full Solution",
      description: "Complete end-to-end development",
      price: "Custom pricing",
      recurring: false,
    },
  ];

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    // Validate scheduling for plans that require it
    if (
      (selectedPlan === "kickstart" || selectedPlan === "growth") &&
      !scheduledDate
    ) {
      newErrors.message = "Please select a date and time for your session";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => {
        const newErrors = {
          ...prev,
          [name]: "",
        };
        // Clear validation attempt flag if all errors are cleared
        if (Object.values(newErrors).every((error) => error === "")) {
          setHasValidationAttempted(false);
        }
        return newErrors;
      });
    }
  };

  // Clear validation attempt flag when all errors are cleared
  useEffect(() => {
    if (hasValidationAttempted && Object.values(errors).every((error) => error === "")) {
      setHasValidationAttempted(false);
    }
  }, [errors, hasValidationAttempted]);

  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId);
    // Clear scheduling when plan changes
    setScheduledDate(null);
    setScheduledTime("");
  };

  const handleScheduleChange = (date: Date | null, time: string) => {
    setScheduledDate(date);
    setScheduledTime(time);
    // Clear scheduling error
    if (errors.message && date) {
      setErrors((prev) => ({
        ...prev,
        message: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasValidationAttempted(true);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Use environment variables for webhook URL
      const webhookUrl =
        import.meta.env.VITE_N8N_WEBHOOK_URL ||
        "https://n8n.yarden-zamir.com/webhook/client-contact-form";

      // Prepare the request body with enhanced scheduling information
      const requestBody = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        selectedPlan: selectedPlan,
        planDetails: plans.find((plan) => plan.id === selectedPlan),
        scheduling: {
          scheduledDate: scheduledDate?.toISOString(),
          scheduledTime: scheduledTime,
          isRecurring: selectedPlan === "growth",
          recurringFrequency: selectedPlan === "growth" ? "weekly" : null,
          recurringDay:
            selectedPlan === "growth" && scheduledDate
              ? scheduledDate.toLocaleDateString("en-US", { weekday: "long" })
              : null,
          formattedDateTime:
            scheduledDate && scheduledTime
              ? `${scheduledDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })} at ${scheduledTime}`
              : null,
        },
        timestamp: new Date().toISOString(),
        source: "client-contact-form",
        userAgent: navigator.userAgent,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // Check if response is ok (200 status)
      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setHasValidationAttempted(false);

        // Reset form and after 4 seconds
        setFormData({ name: "", email: "", message: "" });
        setSelectedPlan("");
        setScheduledDate(null);
        setScheduledTime("");
        setTimeout(() => {
          setIsSubmitted(false);
        }, 4000);
      } else {
        // Try to get error message from response
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      // Show error message to user
      setErrors((prev) => ({
        ...prev,
        message: "Failed to submit form. Please try again.",
      }));
    }
  };

  const getSelectedPlan = () => {
    return plans.find((plan) => plan.id === selectedPlan);
  };

  return (
    <section className="bg-background section-padding" id="contact">
      <div className="container-padding">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to launch your startup? Let's discuss your project and find
              the perfect solution for your needs.
            </p>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Plan Selection */}
                <div className="space-y-4 relative group">
                  <label className="block text-sm font-semibold text-foreground/90 uppercase tracking-wider">
                    Select Your Plan *
                  </label>
                  <div className="relative">
                    <select
                      value={selectedPlan}
                      onChange={(e) => handlePlanChange(e.target.value)}
                      className="w-full p-4 bg-background/70 border-2 border-border/50 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/40 hover:bg-background/80 cursor-pointer appearance-none font-medium"
                      required
                      style={{
                        backgroundImage: "none",
                      }}
                    >
                      <option
                        value=""
                        className="text-muted-foreground bg-background/90"
                      >
                        Choose your perfect plan...
                      </option>
                      {plans.map((plan) => (
                        <option
                          key={plan.id}
                          value={plan.id}
                          className="py-3 bg-background/90 hover:bg-primary/20"
                        >
                          {plan.name} - {plan.description} ({plan.price})
                        </option>
                      ))}
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Scheduling Section */}
                {(selectedPlan === "kickstart" ||
                  selectedPlan === "growth") && (
                  <div className="w-full">
                    <ScheduleSelector
                      isVisible={true}
                      isRecurring={selectedPlan === "growth"}
                      onScheduleChange={handleScheduleChange}
                    />
                  </div>
                )}

                {/* Full Solution Message */}
                {selectedPlan === "full" && (
                  <div className="relative p-6 bg-gradient-to-br from-primary/15 to-primary/5 border-2 border-primary/30 rounded-xl">
                    <div className="absolute top-3 left-3 w-3 h-3 bg-primary/40 rounded-full animate-pulse"></div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          Let's Talk Custom Solutions
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          For our Full Solution package, we'll schedule an
                          initial consultation call to discuss your project
                          requirements and provide a custom quote tailored to
                          your vision.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Details Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-3 group">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-foreground/90 uppercase tracking-wider group-focus-within:text-primary transition-colors"
                    >
                      Your Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full p-4 bg-background/70 border-2 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 hover:bg-background/80 ${
                          errors.name
                            ? "border-red-500 focus:border-red-500"
                            : "border-border/50 focus:border-primary hover:border-primary/40"
                        }`}
                        placeholder="What should we call you?"
                        required
                      />
                      {/* Input decoration */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                    {errors.name && (
                      <p className="text-sm text-red-500 flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-3 group">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-foreground/90 uppercase tracking-wider group-focus-within:text-primary transition-colors"
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full p-4 bg-background/70 border-2 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 hover:bg-background/80 ${
                          errors.email
                            ? "border-red-500 focus:border-red-500"
                            : "border-border/50 focus:border-primary hover:border-primary/40"
                        }`}
                        placeholder="your@email.com"
                        required
                      />
                      {/* Input decoration */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500 flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-3 group">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-foreground/90 uppercase tracking-wider group-focus-within:text-primary transition-colors"
                  >
                    Tell Us About Your Vision *
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full p-4 bg-background/70 border-2 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 hover:bg-background/80 resize-none ${
                        errors.message
                          ? "border-red-500 focus:border-red-500"
                          : "border-border/50 focus:border-primary hover:border-primary/40"
                      }`}
                      placeholder="Share your startup idea, current stage, specific goals, and how we can help bring your vision to life..."
                      required
                    />
                    {/* Input decoration */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                  {errors.message && (
                    <p className="text-sm text-red-500 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Session Summary */}
                {(selectedPlan === "kickstart" || selectedPlan === "growth") &&
                  scheduledDate &&
                  scheduledTime && (
                    <div className="relative p-6 bg-gradient-to-br from-primary/15 to-primary/5 border-2 border-primary/30 rounded-xl">
                      <div className="absolute top-3 right-3 w-3 h-3 bg-primary/40 rounded-full animate-pulse"></div>

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-foreground mb-2">
                            Session Summary
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p className="text-foreground/80">
                              <span className="font-semibold">Plan:</span>{" "}
                              {plans.find((p) => p.id === selectedPlan)?.name}
                            </p>
                            <p className="text-foreground/80">
                              <span className="font-semibold">
                                Date & Time:
                              </span>{" "}
                              {scheduledDate.toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}{" "}
                              at {scheduledTime}
                            </p>
                            {selectedPlan === "growth" && (
                              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full">
                                <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse"></div>
                                <span className="text-xs text-primary font-medium">
                                  🔄 Weekly recurring on{" "}
                                  {scheduledDate.toLocaleDateString("en-US", {
                                    weekday: "long",
                                  })}
                                  s
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                {/* Submit Button */}
                <div className="flex flex-col items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-12 py-4 bg-primary text-purple-900 font-bold text-lg rounded-xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center gap-3">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>Launch My Startup</>
                      )}
                    </span>
                  </button>
                  {hasValidationAttempted && Object.values(errors).some((error) => error !== "") && (
                    <p className="text-sm text-red-500 flex items-center gap-2 mt-3">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Please fill in all required fields
                    </p>
                  )}
                </div>

                {/* Success Message */}
                {isSubmitted && (
                  <div className="relative p-6 bg-white border-4 border-black rounded-lg text-center animate-fade-in shadow-lg">
                    {/* Hand-drawn checkmark */}
                    <div className="w-16 h-16 mx-auto mb-4 border-4 border-black rounded-full flex items-center justify-center bg-yellow-100">
                      <svg
                        className="w-8 h-8 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>

                    <h4 className="text-2xl font-bold text-black mb-2">
                      Message Sent!
                    </h4>

                    <p className="text-black text-lg mb-4">
                      We'll get back to you within 24 hours
                    </p>

                    <p className="text-black/70 text-base">
                      Your entrepreneurial journey starts now! 🚀
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
