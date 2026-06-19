import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e3a8a] py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white hover:text-[#84cc16] transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Back to Home</span>
          </button>
          <div className="bg-transparent">
            <img 
              src="/logo_white.png" 
              alt="Assistant Plus" 
              className="h-8 w-auto block"
              style={{ filter: 'none', boxShadow: 'none', background: 'transparent', mixBlendMode: 'normal' }}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#1e3a8a] mb-2">Privacy Policy</h1>
          <p className="text-gray-500 mb-12">Assistant Plus, LLC | Last Updated: June 2026</p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">1. Introduction</h2>
              <p>Assistant Plus, LLC ("Assistant Plus," "we," "our," or "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and safeguard your information when you visit our website, use our services, or engage with us as a client, contractor, or visitor.</p>
              <p>By accessing our website or using our services, you agree to the practices described in this Privacy Policy.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-[#1e3a8a] mb-3">A. Information from Website Visitors</h3>
              <p>We may collect information voluntarily submitted through:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact forms</li>
                <li>Request information forms</li>
                <li>Email communications</li>
                <li>Phone inquiries</li>
              </ul>
              <p className="mt-4">Information collected may include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company name</li>
                <li>Information provided in messages or inquiries</li>
              </ul>
              <p className="mt-4">The website may also automatically collect limited technical information such as browser type, device information, IP address, and website usage data.</p>

              <h3 className="text-xl font-semibold text-[#1e3a8a] mb-3 mt-8">B. Information from Staff and Contractors</h3>
              <p>When necessary for business operations and compliance, we may collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name</li>
                <li>Address</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>Tax information (W-9)</li>
                <li>Social Security Number or Tax Identification Number</li>
                <li>Payment information</li>
                <li>Resume and employment history</li>
                <li>Background check information (if applicable)</li>
              </ul>
              <p className="mt-4">Such information is collected solely for legitimate business, contracting, payroll, compliance, or onboarding purposes. Sensitive data such as Social Security Numbers and background check information is collected only when required by law or contract.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to inquiries and provide requested services</li>
                <li>Process payments and manage accounts</li>
                <li>Perform payroll, tax, and compliance functions</li>
                <li>Communicate about services, updates, or important notices</li>
                <li>Improve website functionality and user experience</li>
                <li>Maintain business and legal records</li>
                <li>Enforce agreements and resolve disputes</li>
                <li>Comply with applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">4. How We Share Your Information</h2>
              <p className="text-lg font-semibold text-[#1e3a8a] mb-4">Assistant Plus does not sell personal information. We do not sell personal information to third parties for monetary or other valuable consideration. We do not share personal information for targeted advertising.</p>
              <p>We may share information only as necessary to operate our business, including with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payroll processors</li>
                <li>Payment processors</li>
                <li>Accounting software providers</li>
                <li>CRM platforms</li>
                <li>Cloud storage providers</li>
                <li>Background check vendors</li>
                <li>Government agencies when legally required</li>
              </ul>
              <p className="mt-4">All third-party service providers are contractually obligated to protect your information and use it only for the purposes we specify.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">5. Cookies and Tracking Technologies</h2>
              <p>Our website may use:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Essential website cookies (required for site functionality)</li>
                <li>Analytics tools (to understand website traffic and usage)</li>
                <li>Performance monitoring tools (to improve site speed and reliability)</li>
              </ul>
              <p className="mt-4">Examples may include Google Analytics, website hosting analytics, and security or spam prevention services.</p>
              <p className="mt-4">You can manage cookie preferences through your browser settings. Disabling certain cookies may affect website functionality.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">6. Data Retention</h2>
              <p>We retain information only as long as reasonably necessary to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide services</li>
                <li>Maintain business records</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes</li>
                <li>Enforce agreements</li>
              </ul>
              <p className="mt-4">Specific retention periods are:</p>
              <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Client records:</strong> 7 years</li>
                  <li><strong>Contractor and tax records:</strong> 7 years</li>
                  <li><strong>Website inquiries:</strong> 12–24 months, unless a business relationship develops</li>
                </ul>
              </div>
              <p className="mt-4">When information is no longer needed, we securely delete or anonymize it.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">7. Data Security</h2>
              <p>We implement reasonable administrative, technical, and physical safeguards to protect personal information from unauthorized access, disclosure, alteration, or destruction. These measures include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Secure data storage and encryption where appropriate</li>
                <li>Access controls and authentication protocols</li>
                <li>Regular security assessments and monitoring</li>
                <li>Staff training on data protection practices</li>
              </ul>
              <p className="mt-4">While we take these precautions, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">8. Your Privacy Rights</h2>
              <p>Depending on your state of residence, you may have rights under applicable privacy laws, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>California (CCPA/CPRA)</li>
                <li>Virginia (VCDPA)</li>
                <li>Colorado (CPA)</li>
                <li>Connecticut (CTDPA)</li>
                <li>Utah (UCPA)</li>
              </ul>
              <p className="mt-4">These rights may include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The right to know what personal information we collect</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to opt out of the sale of personal information (we do not sell data)</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to request a copy of your personal information</li>
              </ul>
              <p className="mt-4">We will not discriminate against you for exercising your privacy rights.</p>
              <p className="mt-4">To exercise your rights, contact us using the information in Section 10. We will respond within the timeframe required by applicable law.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">9. Children's Privacy</h2>
              <p>Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately and we will delete it.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">10. Contact Information</h2>
              <p>For privacy-related questions, requests, or concerns:</p>
              <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                <p className="font-semibold text-[#1e3a8a]">Assistant Plus, LLC</p>
                <p className="mt-2">Email: privacy@assistantplusworks.com</p>
                <p>Alternative: info@assistantplusworks.com</p>
                <p className="mt-4">New York, United States</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">11. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.</p>
              <p>Continued use of our website or services after changes constitutes acceptance of the updated Privacy Policy.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">12. International Users</h2>
              <p>Our website and services are intended for users in the United States. If you access our site from outside the U.S., you consent to the transfer, storage, and processing of your information in the United States, where data protection laws may differ from those in your jurisdiction.</p>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 bg-[#1e3a8a]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/50 text-sm">© 2026 Assistant Plus, LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}