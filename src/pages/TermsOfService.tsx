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
          <p className="text-gray-500 mb-12">Assistant Plus, LLC | Last Updated: May 2026</p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">1. Overview</h2>
              <p>These Terms of Service ("Terms") govern the use of services provided by Assistant Plus, LLC ("Assistant Plus," "we," "our," or "us"). By engaging our services, signing a Service Agreement, or accessing any deliverables, the client ("Client," "you," or "your") agrees to be bound by these Terms.</p>
              <p>These Terms apply to all service models, including hourly support, retainers, project‑based work, and staffing placements.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">2. Services Provided</h2>
              <p>Assistant Plus provides professional administrative, operational, and customer support services, including but not limited to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Administrative Support:</strong> email management, scheduling, data entry, document preparation, CRM updates, workflow support.</li>
                <li><strong>Customer Support:</strong> inbound/outbound calls, message handling, appointment setting, escalation management.</li>
                <li><strong>Back‑Office Operations:</strong> research, reporting, file organization, process support.</li>
                <li><strong>Staffing & Placement:</strong> sourcing, onboarding, and managing virtual assistants or customer service agents for Client use.</li>
                <li><strong>Contact Center Support:</strong> small‑team call coverage, intake, and customer experience management.</li>
              </ul>
              <p>Services may be expanded or modified through a written Service Agreement or Statement of Work ("SOW").</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">3. Engagement Models</h2>
              <p>Clients may engage Assistant Plus under one or more of the following models:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Hourly Services:</strong> billed based on actual hours worked.</li>
                <li><strong>Monthly Retainer:</strong> a fixed number of hours per month at a discounted rate.</li>
                <li><strong>Project‑Based Engagements:</strong> fixed‑fee or milestone‑based pricing for defined deliverables.</li>
                <li><strong>Staffing Placement:</strong> one‑time or recurring fees for sourcing and placing personnel.</li>
              </ul>
              <p>The specific model, scope, and pricing will be outlined in the Client's Service Agreement or SOW.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">4. Payment Terms</h2>
              <p>Unless otherwise stated in the SOW:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>First month is due upfront before services begin.</li>
                <li>Ongoing invoices are Net 15 or Net 30, depending on the engagement.</li>
                <li>Late payments may incur a 1.5% monthly late fee or the maximum allowed by law.</li>
                <li>Retainer hours do not roll over unless explicitly stated.</li>
                <li>Deposits for project‑based work are non‑refundable.</li>
                <li>Assistant Plus may suspend services for nonpayment after 5 business days' notice.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">5. Client Responsibilities</h2>
              <p>Clients agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate information, timely feedback, and necessary access to systems.</li>
                <li>Maintain secure login credentials and comply with data‑security best practices.</li>
                <li>Use services only for lawful, ethical, and authorized purposes.</li>
                <li>Not request tasks that violate privacy, compliance, or regulatory requirements.</li>
                <li>Communicate respectfully with all Assistant Plus personnel.</li>
              </ul>
              <p>Clients acknowledge that Assistant Plus is not liable for delays, errors, or additional costs caused by incomplete, inaccurate, or untimely information provided by the Client.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">6. Restrictions on Use</h2>
              <p>Clients may not:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use services for illegal, fraudulent, harmful, or deceptive activities.</li>
                <li>Request that staff perform tasks requiring professional licensure (legal, medical, financial, etc.).</li>
                <li>Share Assistant Plus training materials, SOPs, or internal documents with third parties.</li>
                <li>Directly hire, solicit, or contract with Assistant Plus staff for 12 months after engagement without paying a buyout fee equal to $5,000 or 50% of the staff member's annualized compensation, whichever is greater.</li>
                <li>Provide unauthorized access to sensitive systems or data.</li>
                <li>Use services to spam, harass, or mislead customers.</li>
              </ul>
              <p>Assistant Plus reserves the right to refuse or discontinue services that violate these restrictions.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">7. Confidentiality & Data Security</h2>
              <p>Both parties agree to maintain the confidentiality of all non‑public information shared during the engagement. Assistant Plus may sign a separate NDA upon request.</p>
              <p>In the event of a data breach affecting Client information, Assistant Plus will notify the Client within 72 hours of discovery.</p>
              <p>Upon termination, Assistant Plus will return or securely destroy all Client data and materials within 10 business days, unless otherwise directed by the Client in writing. Clients must revoke system access within 24 hours of termination.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">8. Intellectual Property</h2>
              <p>Unless otherwise stated:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Assistant Plus retains ownership of internal tools, templates, SOPs, and training materials.</li>
                <li>Client retains ownership of all data, documents, and materials created specifically for their business.</li>
                <li>Deliverables may not be resold, redistributed, or repurposed without written consent.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">9. Liability Limitations</h2>
              <p>To the fullest extent permitted by law:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Assistant Plus's total liability is capped at the amount paid by the Client in the 30 days preceding the claim.</li>
                <li>Assistant Plus is not liable for indirect or consequential damages, lost profits or business interruption, errors caused by third‑party platforms or software, Client misuse of deliverables, or delays caused by incomplete or inaccurate Client information.</li>
              </ul>
              <p>These limitations apply regardless of the legal theory asserted.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">10. Termination & Cancellation</h2>
              <p>Unless otherwise stated in the SOW:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Hourly & Retainer Engagements:</strong> Either party may terminate with 14 days written notice.</li>
                <li><strong>Project‑Based Engagements:</strong> Either party may terminate with 30 days written notice. Deposits are non‑refundable.</li>
                <li><strong>Staffing Placements:</strong> Either party may terminate with 30 days written notice. Placements may require a minimum 90‑day commitment or an early termination fee equal to one month's placement fee.</li>
              </ul>
              <p>Assistant Plus may terminate immediately for nonpayment, abusive behavior, or illegal activity.</p>
              <p>Upon termination:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All outstanding invoices become due immediately.</li>
                <li>No refunds are issued for unused retainer hours or deposits.</li>
                <li>Access to systems and shared platforms must be revoked within 24 hours.</li>
                <li>Assistant Plus will provide reasonable transition support for up to 5 business days at standard hourly rates to ensure continuity of critical operations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">11. Service Modifications</h2>
              <p>Assistant Plus may update or modify these Terms at any time. Clients will be notified of material changes via email or client portal.</p>
              <p>Continued use of services constitutes acceptance of updated Terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">12. Force Majeure</h2>
              <p>Neither party shall be liable for failures or delays caused by events beyond their reasonable control, including but not limited to: acts of God, natural disasters, pandemics, government restrictions, internet outages, or third‑party platform failures. Affected obligations will be suspended for the duration of the event, and both parties will work in good faith to resume services promptly.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">13. Dispute Resolution</h2>
              <p>Any dispute arising from these Terms shall first be submitted to non‑binding mediation. If mediation fails within 30 days, either party may pursue litigation. Mediation costs shall be split equally between both parties.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">14. Governing Law</h2>
              <p>These Terms are governed by the laws of the State of New York, without regard to conflict‑of‑law principles.</p>
              <p>Any disputes shall be resolved in the state or federal courts located in New York.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">15. Insurance</h2>
              <p>Assistant Plus maintains general liability insurance and errors & omissions (E&O) insurance appropriate to the nature and scope of services provided. Certificates of insurance are available upon request.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">16. Entire Agreement</h2>
              <p>These Terms, together with the Service Agreement and any SOWs, constitute the entire agreement between the parties and supersede all prior discussions or understandings.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">17. Contact Information</h2>
              <p>For questions regarding these Terms:</p>
              <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                <p className="font-semibold text-[#1e3a8a]">Assistant Plus, LLC</p>
                <p className="mt-2">Email: info@assistantplusworks.com</p>
                <p>Phone: (888) 652-6315</p>
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