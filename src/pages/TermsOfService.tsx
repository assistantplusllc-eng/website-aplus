import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
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
          <h1 className="text-4xl font-bold text-[#1e3a8a] mb-2">Terms of Service</h1>
          <p className="text-gray-500 mb-12">Assistant Plus, LLC | Last Updated: June 2026</p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">1. Acceptance of Terms</h2>
              <p>These Website Terms of Service ("Terms") govern your access to and use of the Assistant Plus, LLC website, including all pages, forms, content, and features (collectively, the "Site"). By using this Site, you agree to these Terms. If you do not agree, please discontinue use immediately.</p>
              <p>Use of this Site does not create a client relationship. A formal Service Agreement or Statement of Work is required before any services begin. Contacting us through the Site — including submitting forms, sending emails, or requesting information — does not constitute a binding engagement or obligation on either party.</p>
              <p>You agree to use the Site only for lawful purposes and in a manner that does not harm, disable, or impair the Site or interfere with others' use.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">2. No Professional Advice</h2>
              <p>Content on this Site is provided for informational purposes only. Nothing on the Site should be interpreted as:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>legal advice</li>
                <li>financial advice</li>
                <li>employment guarantees</li>
                <li>service guarantees</li>
                <li>a binding offer</li>
              </ul>
              <p>Any reliance on Site content is at your own discretion. Assistant Plus is not responsible for any actions, decisions, or outcomes resulting from your use of Site content. You are solely responsible for how you apply or act upon any information obtained from this Site.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">3. Intellectual Property</h2>
              <p>All content on the Site — including text, graphics, logos, icons, images, videos, downloadable materials, and branding — is the property of Assistant Plus, LLC or its licensors.</p>
              <p>You may not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>copy, reproduce, or distribute Site content</li>
                <li>use our branding or materials without permission</li>
                <li>repurpose or resell any content</li>
                <li>scrape or extract data from the Site</li>
                <li>use our content for AI training, dataset creation, or automated extraction</li>
              </ul>
              <p>Limited personal viewing is permitted.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">4. User Submissions</h2>
              <p>If you submit information through forms, contact pages, or email:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You represent that the information is accurate and lawful.</li>
                <li>You grant Assistant Plus permission to contact you regarding your inquiry.</li>
                <li>Submission does not obligate Assistant Plus to provide services.</li>
                <li>We reserve the right to decline inquiries at our discretion.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">5. Privacy</h2>
              <p>Your use of the Site is also governed by our <a href="/privacy-policy" className="text-[#2563eb] hover:underline font-medium">Privacy Policy</a>, which explains how we collect, use, and protect information submitted through the Site.</p>
              <p>By using the Site, you consent to the practices described in the Privacy Policy.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">6. Third-Party Links and Platforms</h2>
              <p>The Site may contain links to third-party websites, tools, or integrated platforms (e.g., scheduling widgets, contact forms, CRM systems).</p>
              <p>Assistant Plus is not responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>the content of third-party sites</li>
                <li>their privacy practices</li>
                <li>their accuracy or reliability</li>
                <li>the performance, availability, or security of third-party platforms integrated with the Site</li>
              </ul>
              <p>Accessing third-party links is at your own risk.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">7. Acceptable Use Restrictions</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>use the Site for fraudulent or harmful purposes</li>
                <li>attempt to gain unauthorized access to any systems</li>
                <li>upload malicious code, bots, or automated scripts</li>
                <li>interfere with Site functionality</li>
                <li>impersonate another person or entity</li>
              </ul>
              <p>Violations may result in restricted access or legal action.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">8. Disclaimer of Warranties</h2>
              <p>The Site is provided "as is" and "as available." Assistant Plus makes no warranties — express or implied — regarding:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>accuracy or completeness of content</li>
                <li>uninterrupted or error-free operation</li>
                <li>suitability of the Site for any purpose</li>
              </ul>
              <p>Use of the Site is at your own risk.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">9. Limitation of Liability</h2>
              <p>To the fullest extent permitted by law, Assistant Plus, LLC is not liable for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>any direct, indirect, incidental, or consequential damages</li>
                <li>loss of data, revenue, or business</li>
                <li>issues arising from third-party platforms or links</li>
                <li>unauthorized access to your submissions</li>
              </ul>
              <p>This limitation applies even if we have been advised of the possibility of such damages.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">10. Changes to the Site or Terms</h2>
              <p>We may update the Site or modify these Terms at any time. Continued use of the Site after changes are posted constitutes acceptance of the updated Terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">11. DMCA / Copyright Complaints</h2>
              <p>If you believe that any content on the Site infringes your copyright, please contact us with the following information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>A description of the copyrighted work you claim has been infringed</li>
                <li>A description of where the allegedly infringing material is located on the Site</li>
                <li>Your contact information</li>
                <li>A statement that you have a good-faith belief that the use is not authorized</li>
                <li>A statement that the information in your notice is accurate, and under penalty of perjury, that you are the copyright owner or authorized to act on their behalf</li>
              </ul>
              <p>Upon receipt of a valid notice, we will investigate and take appropriate action, including removing the content if necessary.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">12. Governing Law</h2>
              <p>These Terms are governed by the laws of the State of New York, without regard to conflict-of-law principles. Any disputes related to Site use shall be resolved in the state or federal courts located in New York.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">13. Contact Information</h2>
              <p>For questions about these Terms or the Site:</p>
              <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                <p className="font-semibold text-[#1e3a8a]">Assistant Plus, LLC</p>
                <p className="mt-2">Email: info@assistantplusworks.com</p>
                <p>Address: Bergen County, New Jersey</p>
              </div>
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