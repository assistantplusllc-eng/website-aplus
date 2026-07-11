import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MessageCircle, Check, Menu, X, ArrowDown, Phone } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface ServiceGroup {
  header: string;
  items: string[];
}

interface ServiceCardProps {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  serviceGroups: ServiceGroup[];
  result: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  wideImage?: boolean;
  imagePosition?: string;
}

function ServiceCard({
  id,
  number,
  title,
  subtitle,
  description,
  serviceGroups,
  result,
  imageSrc,
  imageAlt,
  reverse = false,
  wideImage = false,
  imagePosition,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0.95 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, card);
    return () => ctx.revert();
  }, []);

  // FIX: Flip grid ratio when reversed so image always gets the wider column
  const gridCols = wideImage
    ? (reverse ? 'md:grid-cols-[1.6fr_1fr]' : 'md:grid-cols-[1fr_1.6fr]')
    : (reverse ? 'md:grid-cols-[1.3fr_1fr]' : 'md:grid-cols-[1fr_1.3fr]');

  return (
    <div
      id={id}
      ref={cardRef}
      className={`grid ${gridCols} gap-8 lg:gap-16 items-center py-16 border-b border-gray-200 ${
        reverse ? 'md:grid-flow-dense' : ''
      }`}
      style={{ scrollMarginTop: '120px' }}
    >
      {/* Content */}
      <div className={reverse ? 'md:col-start-2' : ''}>
        <div className="flex items-center gap-4 mb-4">
          <span
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white"
            style={{ backgroundColor: '#2563eb' }}
          >
            {number}
          </span>
          <span
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: '#84cc16' }}
          >
            {subtitle}
          </span>
        </div>

        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: '#1e3a8a' }}
        >
          {title}
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          {description}
        </p>

        {/* Grouped list */}
        <div className="space-y-6 mb-6">
          {serviceGroups.map((group, gi) => (
            <div key={gi}>
              <h4 className="font-bold text-gray-800 mb-2">{group.header}</h4>
              <ul className="space-y-2">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: '#84cc16' }}
                    >
                      <Check size={12} className="text-white" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg" style={{ backgroundColor: '#f0fdf4' }}>
          <Check size={18} className="text-[#84cc16] flex-shrink-0 mt-0.5" />
          <p className="text-gray-700 font-medium">
            {result}
          </p>
        </div>
      </div>

      {/* Image */}
      <div className={`relative overflow-visible ${reverse ? 'md:col-start-1' : ''}`}>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-[400px] object-cover"
            style={{ objectPosition: imagePosition || 'center' }}
          />
          <div
            className="absolute top-0 right-0 w-24 h-24 rounded-bl-full"
            style={{ backgroundColor: '#84cc16', opacity: 0.8 }}
          />
        </div>
        <div
          className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full border-4 pointer-events-none"
          style={{ borderColor: '#2563eb', opacity: 0.3 }}
        />
      </div>
    </div>
  );
}

export default function Services() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 600);
      }
    }
  }, []);

  const location = useLocation();
  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        hero.querySelectorAll('.animate-in'),
        { y: 30 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    }, hero);
    return () => ctx.revert();
  }, []);

  const services = [
    {
      id: 'customer-support',
      number: '01',
      title: 'Customer Support',
      subtitle: 'We Answer, Resolve & Support',
      description:
        'Customer Support is the foundation of every successful customer experience. Our trained professionals represent your organization across phone, email, chat, SMS, and other communication channels—providing responsive, consistent support that reflects your brand.',
      serviceGroups: [
        {
          header: 'Customer Support',
          items: ['Live Answering Services', 'Customer Service', 'Help Desk (Tier 1)'],
        },
        {
          header: 'Customer Coordination',
          items: ['Appointment Scheduling', 'Order & Account Support', 'Message Taking'],
        },
        {
          header: 'Multichannel Support',
          items: ['Chat & Email Support', 'Overflow Call Handling'],
        },
      ],
      result:
        'Professional support. Faster response times. More capacity without additional headcount.',
      imageSrc: '/services-contact-center.png',
      imageAlt: 'Customer support team handling calls and inquiries',
      wideImage: true,
    },
    {
      id: 'customer-outreach',
      number: '02',
      title: 'Customer Outreach',
      subtitle: 'We Engage, Follow Up & Generate Opportunities',
      description:
        'Engagement services designed to support lead qualification, appointment scheduling, follow-up communications, customer outreach campaigns, and relationship-building initiatives.',
      serviceGroups: [
        {
          header: 'Lead Development',
          items: ['Lead Generation', 'Lead Qualification', 'Appointment Setting'],
        },
        {
          header: 'Customer Engagement',
          items: ['Welcome Calls', 'Customer Follow-Up', 'Customer Retention'],
        },
        {
          header: 'Campaign Support',
          items: ['Outbound Calling', 'Survey Campaigns'],
        },
      ],
      result: 'More qualified leads. Better conversion opportunities. Stronger customer relationships.',
      imageSrc: '/services-customer-support.jpeg',
      imageAlt: 'Outreach team engaging with customers',
      wideImage: true,
      imagePosition: '75% center',
    },
    {
      id: 'customer-operations',
      number: '03',
      title: 'Customer Operations',
      subtitle: 'We Coordinate the Workflows',
      description:
        "We coordinate the workflows that keep customer interactions moving. Notice what isn't here: no payroll, no bookkeeping, no HR, no accounting. Instead, operational tasks that support the customer experience — exactly where our expertise lives.",
      serviceGroups: [
        {
          header: 'Intake & Coordination',
          items: ['Intake Coordination', 'Case Coordination', 'Service Request Coordination'],
        },
        {
          header: 'Workflow Management',
          items: ['Workflow Coordination', 'Dispatch Support', 'Escalation Management'],
        },
        {
          header: 'Customer Records & Systems',
          items: ['CRM Management', 'Customer Documentation'],
        },
      ],
      result: 'Less administrative overhead. More focus on core operations. Processes that run smoothly behind the scenes.',
      imageSrc: '/services-administrative.jpg',
      imageAlt: 'Operations team coordinating workflows',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Logo */}
      <button 
        onClick={() => { window.scrollTo(0, 0); navigate('/'); }}
        className="fixed top-4 left-4 z-[400] cursor-pointer"
      >
        <div className="bg-white px-1 py-0.5 rounded-md shadow-md hover:bg-white transition-colors">
          <img 
            src="/logo-horizontal.png" 
            alt="Assistant Plus" 
            className="h-8 w-auto object-contain" 
          />
        </div>
      </button>

      {/* Fixed Blue Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-6"
        style={{ backgroundColor: '#2563eb' }}
      >
        <div className="flex items-center justify-end">
          <button
            onClick={() => setMenuOpen(true)}
            className={`z-[300] flex items-center gap-2 transition-all duration-300 ${
              isScrolled 
                ? 'bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg' 
                : 'text-white'
            }`}
          >
            <span className="text-sm font-medium">Menu</span>
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Full Screen Menu */}
      <div 
        className={`fixed inset-0 z-[100] bg-white transition-transform duration-500 ease-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col p-8 md:p-16">
          <div className="flex justify-end">
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-text-primary hover:text-cobalt transition-colors"
            >
              <span className="text-sm font-medium">Close</span>
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <nav className="space-y-6">
              <button onClick={() => { setMenuOpen(false); navigate('/'); }} className="block text-h2 text-text-primary hover:text-cobalt transition-colors text-left">Home</button>
              <button onClick={() => { setMenuOpen(false); navigate('/', { state: { scrollTo: 'industries' } }); }} className="block text-h2 text-text-primary hover:text-cobalt transition-colors text-left">Industries</button>
              <button onClick={() => { setMenuOpen(false); navigate('/about'); }} className="block text-h2 text-text-primary hover:text-cobalt transition-colors text-left">How We Work</button>
              <button onClick={() => { setMenuOpen(false); navigate('/', { state: { scrollTo: 'results' } }); }} className="block text-h2 text-text-primary hover:text-cobalt transition-colors text-left">Results</button>
              <button onClick={() => { setMenuOpen(false); navigate('/', { state: { scrollTo: 'contact' } }); }} className="block text-h2 text-text-primary hover:text-cobalt transition-colors text-left">Start a Conversation</button>
            </nav>
          </div>

          {/* Bottom Row: CTA + Phone Number */}
          <div className="pt-8 border-t border-gray-200 flex items-center justify-between">
            <button onClick={() => { setMenuOpen(false); navigate('/#contact'); }} className="btn-primary bg-cobalt text-white">
              Submit Inquiry <ArrowRight size={18} />
            </button>
            <a 
              href="tel:+18886526315" 
              className="flex items-center gap-2 text-h2 text-text-primary hover:text-cobalt transition-colors"
            >
              <Phone size={24} />
              <span>(888) 652-6315</span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div ref={heroRef} className="pt-20 pb-32 px-6 lg:px-8 relative" style={{ backgroundColor: '#2563eb' }}>
        <div className="max-w-7xl mx-auto relative">
          {/* Text block — matches About page positioning */}
          <div className="relative max-w-xl pt-8" style={{ marginLeft: '0', width: '52vw' }}>
            <h1 className="animate-in text-h1 text-white mb-12 uppercase leading-[1.05]">
              Customer<br />
              Operations<br />
              Designed<br />
              Around Your<br />
              Business
            </h1>
            <p className="animate-in text-body text-white/90" style={{ width: '38vw' }}>
              Assistant Plus delivers customer support, outreach, and operational coordination services that integrate seamlessly with your organization. Whether you need overflow coverage, dedicated support, or ongoing operational assistance, we help you scale with confidence.
            </p>
          </div>

          {/* Image — positioned right, closer to text */}
          <div className="animate-in absolute hidden md:block" style={{ left: '42vw', top: '8vh', width: '38vw', height: '55vh' }}>
            <div className="group relative rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border-4 border-white/30 h-full">
              <img src="/services-hero.jpeg" alt="Professional support team" className="w-full h-full object-cover object-top brightness-95 contrast-105 transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
            </div>
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full pointer-events-none" style={{ backgroundColor: '#84cc16', opacity: 0.8 }} />
            <div className="absolute -bottom-8 -left-4 w-16 h-16 rounded-full border-4" style={{ borderColor: 'white', opacity: 0.5 }} />
          </div>
        </div>

        {/* Mobile image */}
        <div className="animate-in md:hidden mt-8 px-6">
          <div className="group relative rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border-4 border-white/30">
            <img src="/services-hero.jpeg" alt="Professional support team" className="w-full h-[300px] object-cover object-top brightness-95 contrast-105" />
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer z-10"
             onClick={() => document.getElementById('services-list')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ArrowDown className="w-8 h-8 text-white/70 hover:text-white transition-colors" />
        </div>
      </div>

      {/* Services List */}
      <div id="services-list" className="bg-white">
        <main className="max-w-6xl mx-auto px-6 py-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              {...service}
              reverse={index % 2 === 1}
            />
          ))}
        </main>
      </div>

      {/* Client Path Strip */}
      <div className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center">
          <p className="text-gray-600 text-lg">
            Most clients start with <span className="font-semibold text-[#1e3a8a]">Customer Support</span> and expand into <span className="font-semibold text-[#1e3a8a]">Customer Operations</span> as their needs grow.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div id="get-started" style={{ backgroundColor: '#2563eb' }}>
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Not Sure Where to Start?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Tell us what you're handling in-house. We'll show you what we can take on.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/', { state: { scrollTo: 'contact' } })} className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium bg-white text-blue-600 hover:bg-gray-100 transition-colors">
              <MessageCircle size={20} />
              Request a Consultation
            </button>
            <a href="/capability-statement.pdf" download className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium border-2 border-white text-white hover:bg-white/10 transition-colors">
              Download Capability Statement
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6" style={{ backgroundColor: '#1e3a8a' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src="/logo_white.png" alt="Assistant Plus" className="h-8 w-auto mb-4 block" style={{ background: 'none', backgroundColor: 'transparent' }} />
              <p className="text-white/70 text-sm leading-relaxed">
                Professional customer support, outreach, and operational support services for government agencies and growing organizations.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <nav className="space-y-2">
                <button onClick={() => navigate('/')} className="block text-white/70 hover:text-[#84cc16] transition-colors text-sm">Home</button>
                <button onClick={() => navigate('/about')} className="block text-white/70 hover:text-[#84cc16] transition-colors text-sm">About</button>
                <button onClick={() => navigate('/', { state: { scrollTo: 'contact' } })} className="block text-white/70 hover:text-[#84cc16] transition-colors text-sm">Contact</button>
              </nav>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2 text-sm text-white/70">
                <p>info@assistantplusworks.com</p>
                <p>(888) 652-6315</p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="w-24 md:w-32" />
              <div className="text-micro text-white/60 tracking-wider text-center">
                © 2026 ASSISTANT PLUS, LLC. ALL RIGHTS RESERVED.
              </div>
              <div className="flex gap-6 w-24 md:w-32 justify-end">
                <a href="/privacy-policy" className="text-micro text-white/60 hover:text-white transition-colors tracking-wider uppercase">Privacy</a>
                <a href="/terms-of-service" className="text-micro text-white/60 hover:text-white transition-colors tracking-wider uppercase">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}