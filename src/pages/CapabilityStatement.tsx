import { ArrowLeft, Download, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CapabilityStatement() {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 text-white py-8 px-8"
        style={{ backgroundColor: '#2563eb' }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between relative z-10">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors print:hidden"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          
          <a 
            href="/Capabilities-Statement-Vol.1.pdf" 
            download
            className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors print:hidden"
          >
            <Download size={18} />
            Download PDF
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-16 px-6 relative z-0">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden relative">
          
          {/* Title Section - Blue with Logo and Green Accent */}
          <div 
            className="p-8 relative"
            style={{ backgroundColor: '#2563eb' }}
          >
            {/* Green accent */}
            <div 
              className="absolute top-0 right-0 w-32 h-32 rounded-bl-full pointer-events-none"
              style={{ 
                backgroundColor: '#84cc16', 
                zIndex: 1,
                opacity: 0.7
              }}
            ></div>
            
            {/* Logo - White background box matching homepage style */}
            <div className="relative z-10 mb-6 inline-block bg-white rounded-lg px-4 py-2 shadow-lg">
              <img 
                src="/logo-horizontal.png" 
                alt="Assistant Plus" 
                className="h-10 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 relative z-10">
              CAPABILITY STATEMENT
            </h1>
            <p className="text-xl text-white/80 relative z-10"></p>
          </div>

          <div className="p-8 space-y-8 relative z-10">
            {/* Company Overview */}
            <section>
              <h2 
                className="text-2xl font-bold mb-4 flex items-center gap-2"
                style={{ color: '#2563eb' }}
              >
                <span 
                  className="w-2 h-8 rounded-full"
                  style={{ backgroundColor: '#84cc16' }}
                ></span>
                Company Overview
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Assistant Plus, LLC provides professional contact center and administrative 
                support services to commercial and government clients. We specialize in 
                delivering reliable, scalable customer service solutions across inbound and 
                outbound communication channels. With over 20 years of industry experience, 
                we operate with a strong focus on performance, compliance, and customer 
                satisfaction.
              </p>
            </section>

            {/* Company Snapshot */}
            <section 
              className="p-6 rounded-xl border-l-4"
              style={{ backgroundColor: '#f9fafb', borderColor: '#84cc16' }}
            >
              <h2 
                className="text-xl font-bold mb-4"
                style={{ color: '#2563eb' }}
              >
                Company Snapshot
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'UEI', value: 'VGDGKZ4115Y' },
                  { label: 'CAGE Code', value: '1AYU2' },
                  { label: 'Business Type', value: 'Small Business' },
                  { label: 'Location', value: 'Bergen County, NJ' }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500 uppercase mb-1">{item.label}</p>
                    <p className="font-bold" style={{ color: '#2563eb' }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* NAICS Codes */}
            <section>
              <h2 
                className="text-xl font-bold mb-4 flex items-center gap-2"
                style={{ color: '#2563eb' }}
              >
                <span 
                  className="w-2 h-6 rounded-full"
                  style={{ backgroundColor: '#84cc16' }}
                ></span>
                NAICS Codes
              </h2>
              <div className="space-y-2">
                {[
                  { code: '561422', desc: 'Contact Centers (Primary)', highlight: true },
                  { code: '561421', desc: 'Telephone Answering Services', highlight: false },
                  { code: '561110', desc: 'Administrative Services', highlight: false }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center gap-3 p-3 rounded-lg ${item.highlight ? 'bg-blue-50' : 'bg-gray-50'}`}
                  >
                    <span className="font-bold w-16" style={{ color: '#2563eb' }}>{item.code}</span>
                    <span className="text-gray-700">{item.desc}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Core Competencies */}
            <section>
              <h2 
                className="text-2xl font-bold mb-4 flex items-center gap-2"
                style={{ color: '#2563eb' }}
              >
                <span 
                  className="w-2 h-8 rounded-full"
                  style={{ backgroundColor: '#84cc16' }}
                ></span>
                Core Competencies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Inbound & Outbound Customer Support',
                  'Contact Center Operations (Voice, Chat, Email)',
                  'Administrative & Back-Office Support',
                  'Data Entry & CRM Management',
                  'Quality Assurance & Call Monitoring',
                  'Customer Issue Resolution',
                  'Remote Workforce Support',
                  'HIPAA-Trained & Compliance-Focused'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span 
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: '#84cc16' }}
                    ></span>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Differentiators */}
            <section>
              <h2 
                className="text-2xl font-bold mb-4 flex items-center gap-2"
                style={{ color: '#2563eb' }}
              >
                <span 
                  className="w-2 h-8 rounded-full"
                  style={{ backgroundColor: '#84cc16' }}
                ></span>
                Differentiators
              </h2>
              <div className="space-y-3">
                {[
                  '20+ years of customer service experience',
                  'Proven performance in SLA-driven environments',
                  'Multi-industry experience (healthcare, finance, retail)',
                  'HIPAA-trained and compliance-focused',
                  'Scalable and reliable service delivery'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span 
                      className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                      style={{ backgroundColor: '#84cc16', color: '#1e3a8a' }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-gray-700 pt-0.5">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 
                className="text-2xl font-bold mb-4 flex items-center gap-2"
                style={{ color: '#2563eb' }}
              >
                <span 
                  className="w-2 h-8 rounded-full"
                  style={{ backgroundColor: '#84cc16' }}
                ></span>
                Experience & Client Programs
              </h2>
              <div 
                className="p-6 rounded-xl"
                style={{ backgroundColor: '#eff6ff' }}
              >
                <h3 
                  className="font-bold mb-2"
                  style={{ color: '#2563eb' }}
                >
                  Assistant Plus, LLC – Subcontracted Contact Center Services
                </h3>
                <p className="text-sm text-gray-500 mb-4">January 2023 – April 2024</p>
                
                <ul className="space-y-2 mb-6">
                  {[
                    'Provided customer service support across multiple client programs',
                    'Delivered high-volume inbound call handling and customer issue resolution',
                    'Maintained compliance with program-specific guidelines and performance standards',
                    'Supported diverse industries including healthcare (HIPAA-compliant), finance, retail, and nonprofit'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span style={{ color: '#84cc16' }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <h4 
                  className="font-bold mb-3"
                  style={{ color: '#2563eb' }}
                >
                  Client Programs Supported:
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Modivcare (Healthcare)',
                    'Intuit (Phone & Video)',
                    'Home Depot (Retail)',
                    'Stand Up To Cancer'
                  ].map((client, i) => (
                    <div key={i} className="bg-white p-3 rounded-lg shadow-sm text-center">
                      <span className="text-sm font-medium text-gray-700">{client}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact - Blue section with green accent */}
            <section 
              className="text-white p-8 rounded-xl relative overflow-hidden"
              style={{ backgroundColor: '#2563eb' }}
            >
              {/* Green accent */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 rounded-bl-full pointer-events-none"
                style={{ 
                  backgroundColor: '#84cc16', 
                  zIndex: 1,
                  opacity: 0.7
                }}
              ></div>
              
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 relative z-10">
                <span 
                  className="w-2 h-8 rounded-full"
                  style={{ backgroundColor: '#84cc16' }}
                ></span>
                Contact Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div>
                  <p className="text-xs text-white/70 uppercase mb-1">Primary Contact</p>
                  <p className="text-lg font-medium">Nakia Davis, Founder</p>
                </div>
                <div>
                  <p className="text-xs text-white/70 uppercase mb-1">Phone</p>
                  <a 
                    href="tel:201-289-4500" 
                    className="text-lg font-medium hover:text-lime-300 transition-colors flex items-center gap-2"
                  >
                    <Phone size={18} />
                    (888) 652-6315
                  </a>
                </div>
                <div>
                  <p className="text-xs text-white/70 uppercase mb-1">Email</p>
                  <a 
                    href="mailto:n.davis@assistantplusworks.com" 
                    className="text-lg font-medium hover:text-lime-300 transition-colors flex items-center gap-2"
                  >
                    <Mail size={18} />
                    n.davis@assistantplusworks.com
                  </a>
                </div>
                <div>
                  <p className="text-xs text-white/70 uppercase mb-1">Website</p>
                  <a 
                    href="http://www.AssistantPlusWorks.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-lg font-medium hover:text-lime-300 transition-colors flex items-center gap-2"
                  >
                    <ExternalLink size={18} />
                    AssistantPlusWorks.com
                  </a>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20 relative z-10">
                <p className="text-xs text-white/70 uppercase mb-1">Location</p>
                <p className="font-medium flex items-center gap-2">
                  <MapPin size={18} />
                  Bergen County, New Jersey
                </p>
              </div>
            </section>
          </div>

          {/* Footer */}
           </div>
            </main>

      {/* Footer - Full width */}
<footer className="py-12 px-6" style={{ backgroundColor: '#1e3a8a' }}>
  <div className="max-w-6xl mx-auto">
    <div className="grid md:grid-cols-3 gap-8 mb-8">
      {/* Company Info */}
      <div className="mb-4">
        <img 
          src="/logo_white.png" 
          alt="Assistant Plus" 
          className="h-20 md:h-24 w-auto mb-5 border border-red-500"
          style={{ maxWidth: '260px' }}
        />
        <p className="text-white/70 text-sm leading-relaxed max-w-sm">
          Professional contact center and administrative support services for government agencies and growing organizations.
        </p>
      </div>
      
      {/* Quick Links */}
      <div>
        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
        <nav className="space-y-2">
          <button onClick={() => navigate('/')} className="block text-white/70 hover:text-lime-400 transition-colors text-sm">Home</button>
          <button onClick={() => navigate('/services')} className="block text-white/70 hover:text-lime-400 transition-colors text-sm">Services</button>
          <button onClick={() => navigate('/capability-statement')} className="block text-white/70 hover:text-lime-400 transition-colors text-sm">Capability Statement</button>
          <button onClick={() => navigate('/#contact')} className="block text-white/70 hover:text-lime-400 transition-colors text-sm">Contact</button>
        </nav>
      </div>
      
      {/* Contact Info */}
      <div>
        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
        <div className="space-y-2 text-sm text-white/70">
          <p>(888) 652-6315</p>
          <p>info@assistantplusworks.com</p>
          <p>Bergen County, New Jersey</p>
        </div>
      </div>
    </div>
    
    {/* Bottom bar */}
    <div className="pt-8 border-t border-white/20 text-center">
      <p className="text-white/50 text-sm">
        © 2024 Assistant Plus, LLC. All rights reserved.
      </p>
    </div>
  </div>
</footer>
    </div>
  );
}