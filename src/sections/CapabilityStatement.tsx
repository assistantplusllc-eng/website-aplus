import { Download, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

export default function CapabilityStatement() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-cobalt text-white py-8 px-8">
        <div className="max-w-4xl mx-auto">
          <img 
            src="/logo-horizontal.png" 
            alt="Assistant Plus, LLC" 
            className="h-12 w-auto mb-4"
          />
          <h1 className="text-3xl md:text-4xl font-heading font-bold">
            CAPABILITY STATEMENT
          </h1>
        </div>
      </header>

      {/* Print/Download Button */}
      <div className="max-w-4xl mx-auto px-8 py-4 print:hidden">
        <button 
          onClick={handlePrint}
          className="btn-primary bg-cobalt text-white"
        >
          <Download size={18} />
          Print / Save as PDF
        </button>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-8 py-8 space-y-10">
        
        {/* Company Overview */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-cobalt mb-4">
            Company Overview
          </h2>
          <p className="text-body text-text-secondary leading-relaxed">
            Assistant Plus, LLC provides professional contact center and administrative 
            support services to commercial and government clients. We specialize in 
            delivering reliable, scalable customer service solutions across inbound and 
            outbound communication channels. With over 20 years of industry experience, 
            we operate with a strong focus on performance, compliance, and customer 
            satisfaction.
          </p>
        </section>

        {/* Company Information */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-heading font-bold text-cobalt mb-4">
            Company Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-micro text-gray-500 uppercase">UEI</p>
              <p className="text-body font-medium">VGDGKZ4115Y</p>
            </div>
            <div>
              <p className="text-micro text-gray-500 uppercase">CAGE Code</p>
              <p className="text-body font-medium">1AYU2</p>
            </div>
            <div>
              <p className="text-micro text-gray-500 uppercase">Business Type</p>
              <p className="text-body font-medium">Small Business</p>
            </div>
            <div>
              <p className="text-micro text-gray-500 uppercase">Location</p>
              <p className="text-body font-medium">Bergen County, NJ</p>
            </div>
          </div>
        </section>

        {/* NAICS Codes */}
        <section>
          <h2 className="text-xl font-heading font-bold text-cobalt mb-4">
            NAICS Codes
          </h2>
          <ul className="space-y-2">
            <li className="text-body text-text-secondary">
              <span className="font-medium text-cobalt">561422</span> – Contact Centers (Primary)
            </li>
            <li className="text-body text-text-secondary">
              <span className="font-medium text-cobalt">561421</span> – Telephone Answering Services
            </li>
            <li className="text-body text-text-secondary">
              <span className="font-medium text-cobalt">561110</span> – Administrative Services
            </li>
          </ul>
          <p className="text-body text-text-secondary mt-4">
            <span className="font-medium">Certifications:</span> SAM.GOV Registered (Active), HIPAA-Trained
          </p>
        </section>

        {/* Core Competencies */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-cobalt mb-4">
            Core Competencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Inbound & Outbound Customer Support',
              'Contact Center Operations (Voice, Chat, Email)',
              'Administrative & Back-Office Support',
              'Data Entry & CRM Management',
              'Quality Assurance & Call Monitoring',
              'Customer Issue Resolution',
              'Remote Workforce Support'
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-lime mt-2 flex-shrink-0" />
                <span className="text-body text-text-secondary">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Differentiators */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-cobalt mb-4">
            Differentiators
          </h2>
          <ul className="space-y-3">
            {[
              '20+ years of customer service experience',
              'Proven performance in SLA-driven environments',
              'Multi-industry experience (healthcare, finance, retail)',
              'HIPAA-trained and compliance-focused',
              'Scalable and reliable service delivery'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-lime mt-2 flex-shrink-0" />
                <span className="text-body text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-cobalt mb-4">
            Experience & Client Programs
          </h2>
          <p className="text-body text-text-secondary mb-4">
            Assistant Plus, LLC – Subcontracted Contact Center Services (January 2023 – April 2024)
          </p>
          <ul className="space-y-2 mb-6">
            <li className="text-body text-text-secondary flex items-start gap-2">
              <span className="text-lime">•</span>
              Provided customer service support across multiple client programs
            </li>
            <li className="text-body text-text-secondary flex items-start gap-2">
              <span className="text-lime">•</span>
              Delivered high-volume inbound call handling and customer issue resolution
            </li>
            <li className="text-body text-text-secondary flex items-start gap-2">
              <span className="text-lime">•</span>
              Maintained compliance with program-specific guidelines and performance standards
            </li>
            <li className="text-body text-text-secondary flex items-start gap-2">
              <span className="text-lime">•</span>
              Supported diverse industries including healthcare (HIPAA-compliant), finance, retail, and nonprofit
            </li>
          </ul>
          
          <h3 className="text-lg font-heading font-bold text-cobalt mb-3">
            Client Programs Supported:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Modivcare (Healthcare / Transportation)',
              'Intuit (Phone & Video Support)',
              'Home Depot (Retail Support)',
              'Stand Up To Cancer Campaign'
            ].map((client, i) => (
              <div key={i} className="bg-gray-50 p-3 rounded-lg">
                <span className="text-body font-medium text-text-primary">{client}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-cobalt text-white p-8 rounded-lg">
          <h2 className="text-2xl font-heading font-bold mb-6">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-micro text-white/70 uppercase mb-1">Primary Contact</p>
              <p className="text-lg font-medium">Nakia Davis, Founder</p>
            </div>
            <div>
              <p className="text-micro text-white/70 uppercase mb-1">Phone</p>
              <a href="tel:201-289-4500" className="text-lg font-medium hover:text-lime transition-colors flex items-center gap-2">
                <Phone size={18} />
                (201) 289-4500
              </a>
            </div>
            <div>
              <p className="text-micro text-white/70 uppercase mb-1">Email</p>
              <a href="mailto:n.davis@assistantplusworks.com" className="text-lg font-medium hover:text-lime transition-colors flex items-center gap-2">
                <Mail size={18} />
                n.davis@assistantplusworks.com
              </a>
            </div>
            <div>
              <p className="text-micro text-white/70 uppercase mb-1">Website</p>
              <a href="http://www.AssistantPlusWorks.com/" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-lime transition-colors flex items-center gap-2">
                <ExternalLink size={18} />
                AssistantPlusWorks.com
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-micro text-white/70 uppercase mb-1">Location</p>
            <p className="font-medium flex items-center gap-2">
              <MapPin size={18} />
              Bergen County, New Jersey
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 px-8 mt-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-micro text-gray-500">
            Assistant Plus, LLC | SAM.GOV Registered | Small Business
          </p>
          <p className="text-micro text-gray-400 mt-1">
            (201) 289-4500 | info@assistantplusworks.com | AssistantPlusWorks.com
          </p>
        </div>
      </footer>
    </div>
  );
}