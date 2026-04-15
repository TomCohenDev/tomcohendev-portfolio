import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#1D201F] text-[#E0D0C1] font-sans">
      <Header />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="section-padding relative pt-32 pb-12 md:pt-48 md:pb-16">
          <div className="container-padding max-w-4xl mx-auto">
            <h1 className="excalifont-title text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.1] tracking-tight text-white">
              Privacy Policy
            </h1>
            <p className="text-xl md:text-2xl text-[#B9BBBE] leading-relaxed max-w-2xl">
              Last updated: January 2025
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding relative">
          <div className="container-padding max-w-4xl mx-auto">
            <div className="space-y-12 text-[#B9BBBE] leading-relaxed">
              {/* Introduction */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Introduction
                </h2>
                <p className="text-lg">
                  Tom Cohen respects your privacy and is committed
                  to protecting your personal data. This privacy policy explains
                  how we collect, use, and safeguard your information when you
                  visit our website or use our services.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Information We Collect
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Information You Provide
                    </h3>
                    <p className="text-lg">
                      We collect information that you provide directly to us,
                      including:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                      <li>Name and contact information</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>Project details and requirements</li>
                      <li>Any other information you choose to share</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Automatically Collected Information
                    </h3>
                    <p className="text-lg">
                      When you visit our website, we may automatically collect
                      certain information about your device, including:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                      <li>IP address</li>
                      <li>Browser type and version</li>
                      <li>Pages you visit and time spent on pages</li>
                      <li>Referring website addresses</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-4">
                  How We Use Your Information
                </h2>
                <p className="text-lg mb-2">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Respond to your inquiries and requests</li>
                  <li>Send you updates about our services</li>
                  <li>Monitor and analyze usage patterns</li>
                  <li>Detect, prevent, and address technical issues</li>
                  <li>
                    Comply with legal obligations and protect our rights
                  </li>
                </ul>
              </div>

              {/* Data Sharing */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Data Sharing and Disclosure
                </h2>
                <p className="text-lg mb-2">
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share your information only in the
                  following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    With service providers who assist us in operating our
                    business
                  </li>
                  <li>When required by law or legal process</li>
                  <li>
                    To protect our rights, property, or safety, or that of
                    others
                  </li>
                  <li>
                    In connection with a business transfer or merger
                  </li>
                </ul>
              </div>

              {/* Data Security */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Data Security
                </h2>
                <p className="text-lg">
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. However, no
                  method of transmission over the Internet is 100% secure, and
                  we cannot guarantee absolute security.
                </p>
              </div>

              {/* Your Rights */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Your Rights
                </h2>
                <p className="text-lg mb-2">
                  Depending on your location, you may have certain rights
                  regarding your personal information, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The right to access your personal information</li>
                  <li>The right to correct inaccurate information</li>
                  <li>The right to request deletion of your information</li>
                  <li>The right to object to processing of your information</li>
                  <li>The right to data portability</li>
                </ul>
              </div>

              {/* Cookies */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-4">Cookies</h2>
                <p className="text-lg">
                  We use cookies and similar tracking technologies to track
                  activity on our website and hold certain information. You can
                  instruct your browser to refuse all cookies or to indicate
                  when a cookie is being sent. However, if you do not accept
                  cookies, you may not be able to use some portions of our
                  website.
                </p>
              </div>

              {/* Third-Party Links */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Third-Party Links
                </h2>
                <p className="text-lg">
                  Our website may contain links to third-party websites. We are
                  not responsible for the privacy practices or content of these
                  external sites. We encourage you to review the privacy
                  policies of any third-party sites you visit.
                </p>
              </div>

              {/* Changes to This Policy */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Changes to This Policy
                </h2>
                <p className="text-lg">
                  We may update this privacy policy from time to time. We will
                  notify you of any changes by posting the new policy on this
                  page and updating the "Last updated" date. You are advised to
                  review this policy periodically for any changes.
                </p>
              </div>

              {/* Contact */}
              <div className="space-y-4 pb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Contact
                </h2>
                <p className="text-lg">
                  If you have any questions about this privacy policy or our
                  data practices, you can reach me at:
                </p>
                <div className="mt-4 p-6 bg-[#161918] border border-white/10 rounded-xl">
                  <p className="text-lg text-white font-semibold mb-2">
                    Tom Cohen
                  </p>
                  <p className="text-lg text-[#B9BBBE]">
                    Email:{" "}
                    <a
                      href="mailto:tom@tomcohendev.com"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      tom@tomcohendev.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;


