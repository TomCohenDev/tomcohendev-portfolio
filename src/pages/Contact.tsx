import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import Header from "../components/Header";
import Footer from "../components/Footer";
import AnimatedLogo from "../components/AnimatedLogo";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { PhoneInput } from "../components/PhoneInput";
import { ArrowRight } from "lucide-react";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    budget: "",
    contribution: "",
    referralSource: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    budget: "",
    contribution: "",
    referralSource: "",
  });
  const [hasValidationAttempted, setHasValidationAttempted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea to fit content
  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.max(textarea.scrollHeight, 120)}px`;
    }
  };

  // Continuously update random border animation values
  useEffect(() => {
    const updateAnimation = () => {
      setBorderAnimation({
        scale: 0.98 + Math.random() * 0.04, // Random scale between 0.98 and 1.02
        x: (Math.random() - 0.5) * 6, // Random x offset between -3 and 3
        y: (Math.random() - 0.5) * 6, // Random y offset between -3 and 3
        rotate: (Math.random() - 0.5) * 2, // Random rotation between -1 and 1 degrees
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

    // Initial update
    updateAnimation();

    // Update every 2 seconds for continuous movement
    const interval = setInterval(updateAnimation, 2000);

    return () => clearInterval(interval);
  }, []);

  // Clear validation attempt flag when all errors are cleared
  useEffect(() => {
    if (hasValidationAttempted && Object.values(errors).every((error) => error === "")) {
      setHasValidationAttempted(false);
    }
  }, [errors, hasValidationAttempted]);

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "", // Added phone error key
      message: "",
      budget: "",
      contribution: "",
      referralSource: "",
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (optional but validated if present)
    // Allows: +1234567890, (123) 456-7890, 123-456-7890, 123.456.7890
    if (formData.phone.trim()) {
      // Check for invalid characters (only allow digits, spaces, dashes, parentheses, plus, and dots)
      if (!/^[\d\s\-()+.]+$/.test(formData.phone)) {
        newErrors.phone =
          "Please enter a valid phone number (only digits and +()-. allowed)";
      } else {
        const digits = formData.phone.replace(/\D/g, "");
        if (digits.length < 7) {
          newErrors.phone =
            "Please enter a valid phone number (at least 7 digits)";
        }
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message is too short (min 10 characters)";
    }

    setErrors(newErrors);
    // Check if all error values are empty strings
    return Object.values(newErrors).every((error) => error === "");
  };

  const validateField = (fieldName: string, value: string) => {
    let error = "";

    switch (fieldName) {
      case "name": {
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;
      }

      case "email": {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value.trim()) {
          error = "Email is required";
        } else if (!emailRegex.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      }

      case "phone": {
        if (value.trim()) {
          // Check for invalid characters (only allow digits, spaces, dashes, parentheses, plus, and dots)
          if (!/^[\d\s\-()+.]+$/.test(value)) {
            error =
              "Please enter a valid phone number (only digits and +()-. allowed)";
          } else {
            const digits = value.replace(/\D/g, "");
            if (digits.length < 7) {
              error = "Please enter a valid phone number (at least 7 digits)";
            }
          }
        }
        break;
      }

      case "message": {
        if (!value.trim()) {
          error = "Message is required";
        } else if (value.trim().length < 10) {
          error = "Message is too short (min 10 characters)";
        }
        break;
      }
    }

    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasValidationAttempted(true);
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Determine which webhook URL to use based on environment
      const isDev = import.meta.env.VITE_ENVIRONMENT === "development";
      const devWebhookUrl =
        "https://n8n.yarden-zamir.com/webhook-test/client-contact-form";
      const prodWebhookUrl =
        "https://n8n.yarden-zamir.com/webhook/client-contact-form";

      const webhookUrl = isDev ? devWebhookUrl : prodWebhookUrl;

      console.log(
        `[Contact Form] Using ${isDev ? "DEVELOPMENT" : "PRODUCTION"} webhook:`,
        webhookUrl
      );

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: "contact-page",
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setHasValidationAttempted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          budget: "",
          contribution: "",
          referralSource: "",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors((prev) => ({
        ...prev,
        message: "Failed to submit form. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-background pt-32 pb-20">
        <div className="container-padding max-w-4xl mx-auto">
          <div className="relative">
            {/* Background border 1 - diverted border effect with continuous animation */}
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
            {/* Background border 2 - diverted border effect with continuous animation */}
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
            {/* Background border 3 - diverted border effect with continuous animation */}
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

            {/* Main card */}
            <div
              id="client-contact-form-card"
              className="relative border-4 border-primary/20 rounded-2xl bg-muted/50 p-6 md:p-10 lg:p-14"
              style={{ transform: "rotate(0.3deg)" }}
            >
              {isSubmitted ? (
                <div className="text-center animate-in fade-in zoom-in duration-500 py-12">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
                    Message Received!
                  </h1>
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 tracking-tight">
                    We'll be in touch shortly
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-16 max-w-2xl mx-auto">
                    Thanks for reaching out. We've sent a confirmation email to
                    your inbox with the details of your submission.
                  </p>

                  <img
                    src="/icon.svg"
                    alt="Tom Cohen"
                    className="h-40 w-auto mx-auto mb-0"
                  />
                </div>
              ) : (
                <>
                  {/* Title and subtitle */}
                  <div className="text-center mb-10 md:mb-14 max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
                      Got a Vision?
                    </h1>
                    <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 tracking-tight">
                      Let's Build Something Amazing
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                      Whether you're building a new product, validating a fresh
                      idea, polishing an MVP, or scaling your existing product —
                      we're the end-to-end partner you need to get it done
                      right.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-10"
                  >
                    {/* Name, Email & Phone Section */}
                    <div className="space-y-6 md:space-y-8">
                      {/* Full Name */}
                      <div className="space-y-3">
                        <label
                          htmlFor="name"
                          className="text-xl font-medium text-primary block"
                        >
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          required
                          className={`h-14 bg-background/80 border-2 border-border/60 focus-visible:border-primary/50 focus-visible:ring-0 focus-visible:ring-offset-0 text-base px-4 ${
                            errors.name ? "border-destructive" : ""
                          }`}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email and Phone Grid */}
                      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        <div className="space-y-3">
                          <label
                            htmlFor="email"
                            className="text-xl font-medium text-primary block"
                          >
                            Work Email *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            required
                            className={`h-14 bg-background/80 border-2 border-border/60 focus-visible:border-primary/50 focus-visible:ring-0 focus-visible:ring-offset-0 text-base px-4 ${
                              errors.email ? "border-destructive" : ""
                            }`}
                          />
                          {errors.email && (
                            <p className="text-sm text-destructive mt-1">
                              {errors.email}
                            </p>
                          )}
                        </div>
                        <div className="space-y-3">
                          <label
                            htmlFor="phone"
                            className="text-xl font-medium text-primary block"
                          >
                            Phone Number
                          </label>
                          <PhoneInput
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={(value) =>
                              setFormData((prev) => ({ ...prev, phone: value }))
                            }
                            onBlur={handleBlur}
                            hasError={!!errors.phone}
                          />
                          {errors.phone && (
                            <p className="text-sm text-destructive mt-1">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Message Section */}
                    <div className="space-y-3">
                      <label
                        htmlFor="message"
                        className="text-xl font-medium text-primary block"
                      >
                        Message *
                      </label>
                      <Textarea
                        ref={textareaRef}
                        id="message"
                        name="message"
                        placeholder="Tell us about your project..."
                        value={formData.message}
                        onChange={(e) => {
                          handleInputChange(e);
                          autoResizeTextarea();
                        }}
                        onBlur={handleBlur}
                        required
                        rows={5}
                        className={`bg-background/80 border-2 border-border/60 focus-visible:border-primary/50 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none p-4 text-base overflow-hidden ${
                          errors.message ? "border-destructive" : ""
                        }`}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border/40" />

                    {/* Budget Section */}
                    <div className="space-y-4">
                      <label className="text-xl font-medium text-primary block">
                        Select your budget
                      </label>
                      <RadioGroup
                        value={formData.budget}
                        onValueChange={(value) =>
                          handleRadioChange("budget", value)
                        }
                        className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3"
                      >
                        <label
                          htmlFor="budget-less-than-10k"
                          className={`flex items-center gap-2 p-3 md:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.budget === "less-than-10k"
                              ? "border-primary bg-primary/10"
                              : "border-border/60 bg-background/40 hover:border-primary/50 hover:bg-background/60"
                          }`}
                        >
                          <RadioGroupItem
                            value="less-than-10k"
                            id="budget-less-than-10k"
                          />
                          <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                            Less than $10K
                          </span>
                        </label>
                        <label
                          htmlFor="budget-10k-50k"
                          className={`flex items-center gap-2 p-3 md:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.budget === "10k-50k"
                              ? "border-primary bg-primary/10"
                              : "border-border/60 bg-background/40 hover:border-primary/50 hover:bg-background/60"
                          }`}
                        >
                          <RadioGroupItem value="10k-50k" id="budget-10k-50k" />
                          <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                            $10K to $50K
                          </span>
                        </label>
                        <label
                          htmlFor="budget-50k-100k"
                          className={`flex items-center gap-2 p-3 md:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.budget === "50k-100k"
                              ? "border-primary bg-primary/10"
                              : "border-border/60 bg-background/40 hover:border-primary/50 hover:bg-background/60"
                          }`}
                        >
                          <RadioGroupItem
                            value="50k-100k"
                            id="budget-50k-100k"
                          />
                          <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                            $50K to $100K
                          </span>
                        </label>
                        <label
                          htmlFor="budget-over-100k"
                          className={`flex items-center gap-2 p-3 md:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.budget === "over-100k"
                              ? "border-primary bg-primary/10"
                              : "border-border/60 bg-background/40 hover:border-primary/50 hover:bg-background/60"
                          }`}
                        >
                          <RadioGroupItem
                            value="over-100k"
                            id="budget-over-100k"
                          />
                          <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                            Over $100K
                          </span>
                        </label>
                      </RadioGroup>
                      {errors.budget && (
                        <p className="text-sm text-destructive">
                          {errors.budget}
                        </p>
                      )}
                    </div>

                    {/* Contribution Section */}
                    <div className="space-y-4">
                      <label className="text-xl font-medium text-primary block">
                        How can Tom help contribute to the project?
                      </label>
                      <RadioGroup
                        value={formData.contribution}
                        onValueChange={(value) =>
                          handleRadioChange("contribution", value)
                        }
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                      >
                        <label
                          htmlFor="contribution-complete-solution"
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.contribution === "complete-solution"
                              ? "border-primary bg-primary/10"
                              : "border-border/60 bg-background/40 hover:border-primary/50 hover:bg-background/60"
                          }`}
                        >
                          <RadioGroupItem
                            value="complete-solution"
                            id="contribution-complete-solution"
                          />
                          <span className="text-sm font-medium">
                            Complete solution
                          </span>
                        </label>
                        <label
                          htmlFor="contribution-mvp"
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.contribution === "mvp"
                              ? "border-primary bg-primary/10"
                              : "border-border/60 bg-background/40 hover:border-primary/50 hover:bg-background/60"
                          }`}
                        >
                          <RadioGroupItem value="mvp" id="contribution-mvp" />
                          <span className="text-sm font-medium">
                            Minimum viable product
                          </span>
                        </label>
                        <label
                          htmlFor="contribution-existing-product"
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.contribution === "existing-product"
                              ? "border-primary bg-primary/10"
                              : "border-border/60 bg-background/40 hover:border-primary/50 hover:bg-background/60"
                          }`}
                        >
                          <RadioGroupItem
                            value="existing-product"
                            id="contribution-existing-product"
                          />
                          <span className="text-sm font-medium">
                            Help with existing product
                          </span>
                        </label>
                        <label
                          htmlFor="contribution-other"
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.contribution === "other"
                              ? "border-primary bg-primary/10"
                              : "border-border/60 bg-background/40 hover:border-primary/50 hover:bg-background/60"
                          }`}
                        >
                          <RadioGroupItem
                            value="other"
                            id="contribution-other"
                          />
                          <span className="text-sm font-medium">Other</span>
                        </label>
                      </RadioGroup>
                      {errors.contribution && (
                        <p className="text-sm text-destructive">
                          {errors.contribution}
                        </p>
                      )}
                    </div>

                    {/* Referral Section */}
                    <div className="space-y-4">
                      <label className="text-xl font-medium text-primary block">
                        How did you find out about Tom Cohen?
                      </label>
                      <RadioGroup
                        value={formData.referralSource}
                        onValueChange={(value) =>
                          handleRadioChange("referralSource", value)
                        }
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
                      >
                        <label
                          htmlFor="referral-youtube"
                          className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.referralSource === "youtube"
                              ? "border-primary bg-primary/10"
                              : "border-border/60 bg-background/40 hover:border-primary/50 hover:bg-background/60"
                          }`}
                        >
                          <RadioGroupItem
                            value="youtube"
                            id="referral-youtube"
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">YouTube</span>
                        </label>
                        <label
                          htmlFor="referral-facebook"
                          className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.referralSource === "facebook"
                              ? "border-primary bg-primary/10"
                              : "border-border/60 bg-background/40 hover:border-primary/50 hover:bg-background/60"
                          }`}
                        >
                          <RadioGroupItem
                            value="facebook"
                            id="referral-facebook"
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">Facebook</span>
                        </label>
                        <label
                          htmlFor="referral-google"
                          className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.referralSource === "google"
                              ? "border-primary bg-primary/10"
                              : "border-border/60 bg-background/40 hover:border-primary/50 hover:bg-background/60"
                          }`}
                        >
                          <RadioGroupItem
                            value="google"
                            id="referral-google"
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">Google</span>
                        </label>
                        <label
                          htmlFor="referral-twitter"
                          className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.referralSource === "twitter"
                              ? "border-primary bg-primary/10"
                              : "border-border/60 bg-background/40 hover:border-primary/50 hover:bg-background/60"
                          }`}
                        >
                          <RadioGroupItem
                            value="twitter"
                            id="referral-twitter"
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">
                            Twitter (X)
                          </span>
                        </label>
                        <label
                          htmlFor="referral-ai"
                          className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.referralSource === "ai"
                              ? "border-primary bg-primary/10"
                              : "border-border/60 bg-background/40 hover:border-primary/50 hover:bg-background/60"
                          }`}
                        >
                          <RadioGroupItem
                            value="ai"
                            id="referral-ai"
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">AI</span>
                        </label>
                        <label
                          htmlFor="referral-other"
                          className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            formData.referralSource === "other"
                              ? "border-primary bg-primary/10"
                              : "border-border/60 bg-background/40 hover:border-primary/50 hover:bg-background/60"
                          }`}
                        >
                          <RadioGroupItem
                            value="other"
                            id="referral-other"
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">Other</span>
                        </label>
                      </RadioGroup>
                      {errors.referralSource && (
                        <p className="text-sm text-destructive">
                          {errors.referralSource}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col items-center pt-6">
                      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button
                          type="submit"
                          id="contact-submit-btn"
                          disabled={isSubmitting}
                          className="btn-hero w-full md:w-auto min-w-[240px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:rotate-0"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center gap-3">
                              <span className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                              Sending...
                            </span>
                          ) : (
                            "Send message"
                          )}
                        </button>

                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-1">
                            In case you hate forms
                          </p>
                          <a
                            href="mailto:tom@tomcohendev.com"
                            className="text-base font-bold text-primary hover:underline"
                          >
                            tom@tomcohendev.com
                          </a>
                        </div>
                      </div>
                      {hasValidationAttempted && Object.values(errors).some((error) => error !== "") && (
                        <p className="text-sm text-destructive flex items-center gap-2 mt-3">
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
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
