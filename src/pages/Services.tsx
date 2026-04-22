import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MessageCircle, Check, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  services: string[];
  result: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

function ServiceCard({
  number,
  title,
  subtitle,
  description,
  services,
  result,
  imageSrc,
  imageAlt,
  reverse = false,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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

  return (
    <div
      ref={cardRef}
      className={`grid md:grid-cols-2 gap-8 lg:gap-16 items-center py-16 border-b border-gray-200 ${
        reverse ? 'md:grid-flow-dense' : ''
      }`}
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

        <ul className="space-y-3 mb-6">
          {services.map((item, i) => (
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

        <div
          className="p-4 rounded-lg border-l-4 mb-6"
          style={{ backgroundColor: '#eff6ff', borderColor: '#84cc16' }}
        >
          <p className="text-gray-700 italic">
            <span className="font-semibold">Result: </span>
            {result}
          </p>
        </div>
      </div>

      {/* Image */}
      <div className={`relative ${reverse ? 'md:col-start-1' : ''}`}>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-[400px] object-cover"
          />
          {/* Accent corner */}
          <div
            className="absolute top-0 right-0 w-24 h-24 rounded-bl-full"
            style={{
              backgroundColor: '#84cc16',
              opacity: 0.8,
            }}
          />
        </div>
        {/* Decorative ring */}
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

  // Scroll to top when component mounts - FIX for scroll position issue
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        }
      );
    }, hero);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      number: '01',
      title: 'Customer Support',
      subtitle: 'Professional Customer Interaction',
      description:
        'We manage your customer interactions with professionalism and care, ensuring every call, message, and inquiry is handled efficiently.',
      services: [
        'Inbound call handling',
        'Outbound follow-ups',
        'Email and chat support',
        'Appointment scheduling',
        'Order status and general inquiries',
      ],
      result:
        'Improved customer satisfaction and faster response times without expanding your internal team.',
      imageSrc: '/services-customer-support.jpeg',
      imageAlt: 'Customer service agent handling calls professionally',
    },
    {
      number: '02',
      title: 'Administrative Support',
      subtitle: 'Back-Office Operations',
      description:
        'We handle time-consuming back-office tasks so you can stay focused on running and growing your business.',
      services: [
        'Data entry and database management',
        'CRM updates and maintenance',
        'Document processing',
        'Email management',
        'Reporting and basic administrative support',
      ],
      result: 'Streamlined operations and reduced workload for your internal team.',
      imageSrc: '/services-administrative.jpg',
      imageAlt: 'Professional managing administrative tasks',
    },
    {
      number: '03',
      title: 'Contact Center',
      subtitle: 'Flexible Scaling Solutions',
      description:
        'Flexible support solutions designed for businesses that need help managing call volume or scaling operations.',
      services: [
        'Dedicated support agents',
        'Overflow call handling',
        'Seasonal or project-based support',
        'Program support for customer service operations',
      ],
      result:
        'The ability to scale your support team without long-term hiring commitments.',
      imageSrc: '/services-contact-center.jpg',
      imageAlt: 'Contact center team providing support',
    },
    {
      number: '04',
      title: 'Specialized Support',
      subtitle: 'Industry-Aware & Compliance-Ready',
      description:
        'Industry-aware support tailored to meet specific operational and compliance needs.',
      services: [
        'Healthcare support environments (HIPAA-aware)',
        'Financial and member service support',
        'High-volume customer service programs',
      ],
      result:
        'Professional service delivered with an understanding of industry expectations and standards.',
      imageSrc: '/services-specialized.jpg',
      imageAlt: 'Specialized professional support',
    },
    {
      number: '05',
      title: 'Custom Solutions',
      subtitle: 'Tailored to Your Operations',
      description:
        "Don't see exactly what you need? We offer flexible service solutions tailored to your business operations.",
      services: [
        'Hybrid service combinations',
        'Project-based engagements',
        'Dedicated team allocation',
        'Flexible scheduling options',
      ],
      result: 'A support structure designed specifically for your unique business needs.',
      imageSrc: '/services-custom.jpg',
      imageAlt: 'Team collaborating on custom solutions',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
            {/* Logo - Fixed top left, above everything */}
      <button 
        onClick={() => navigate('/')}
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

      {/* Fixed Blue Header Bar - Menu only */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-6"
        style={{ backgroundColor: '#2563eb' }}
      >
        <div className="flex items-center justify-end">
          {/* Menu Button - Top Right with scroll behavior */}
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

      {/* Full Screen Menu Overlay - Behind logo/menu (z-[100]) */}
      <div 
        className={`fixed inset-0 z-[100] bg-white transition-transform duration-500 ease-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col p-8 md:p-16">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-text-primary hover:text-cobalt transition-colors"
            >
              <span className="text-sm font-medium">Close</span>
              <X size={24} />
            </button>
          </div>

          {/* Nav Links - Matches homepage Navigation */}
          <div className="flex-1 flex flex-col justify-center">
            <nav className="space-y-6">
              <button
                onClick={() => { 
                  setMenuOpen(false); 
                  navigate('/');
                }}
                className="block text-h2 text-text-primary hover:text-cobalt transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => { 
                  setMenuOpen(false); 
                  navigate('/', { state: { scrollTo: 'industries' } });
                }}
                className="block text-h2 text-text-primary hover:text-cobalt transition-colors text-left"
              >
                Industries
              </button>
              <button
                onClick={() => { 
                  setMenuOpen(false); 
                  navigate('/', { state: { scrollTo: 'process' } });
                }}
                className="block text-h2 text-text-primary hover:text-cobalt transition-colors text-left"
              >
                How We Work
              </button>
              <button
                onClick={() => { 
                  setMenuOpen(false); 
                  navigate('/', { state: { scrollTo: 'results' } });
                }}
                className="block text-h2 text-text-primary hover:text-cobalt transition-colors text-left"
              >
                Results
              </button>
              <button
                onClick={() => { 
                  setMenuOpen(false); 
                  navigate('/', { state: { scrollTo: 'contact' } });
                }}
                className="block text-h2 text-text-primary hover:text-cobalt transition-colors text-left"
              >
                Contact
              </button>
            </nav>
          </div>

          {/* CTA */}
          <div className="pt-8 border-t border-gray-200">
            <button 
              onClick={() => { setMenuOpen(false); navigate('/#contact'); }}
              className="btn-primary bg-cobalt text-white"
            >
              Request Staffing
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section - More spacious layout */}
      <div
        ref={heroRef}
        className="pt-20 pb-32 px-6 lg:px-8 relative"
        style={{ backgroundColor: '#2563eb' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 lg:gap-12 items-center">
            <div className="relative max-w-xl">
              {/* Subheader - positioned up and left, smaller text */}
              <p
  className="animate-in absolute -left-6 md:-left-8 -top-2 text-white/90 font-bold uppercase tracking-[0.18em] text-sm"
  >
    Comprehensive Staffing Solutions
  </p>

  <h1 className="animate-in pt-16 text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight md:leading-[1.2] lg:leading-[1.25]">
    Support Services Designed to Help Your Business Grow
  </h1>

  <p className="animate-in text-xl text-white/90 leading-relaxed mb-10">
    At Assistant Plus, we provide customer support and administrative
    services designed to help businesses operate more efficiently
    without the need to hire, train, or manage additional staff.
  </p>
</div>

            {/* Image - right side, taller and positioned higher */}
            <div className="animate-in relative">
              <div className="group relative rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border-4 border-white/30">
                <img
                  src="/services-hero.jpeg"
                  alt="Professional support team"
                  className="w-full h-[420px] md:h-[460px] lg:h-[500px] object-cover object-center brightness-95 contrast-105 transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
              </div>
              {/* Decorative elements */}
              <div
                className="absolute -top-6 -right-6 w-20 h-20 rounded-full pointer-events-none"
                style={{ backgroundColor: '#84cc16', opacity: 0.8 }}
              />
              <div
                className="absolute -bottom-10 -left-20 w-16 h-16 rounded-full border-4"
                style={{ borderColor: 'white', opacity: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Bouncing scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
             onClick={() => document.getElementById('services-list')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <svg 
            className="w-8 h-8 text-white/70 hover:text-white transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>

      {/* Services List - Full width white background */}
      <div id="services-list" className="bg-white">
        <main className="max-w-6xl mx-auto px-6 py-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              {...service}
              reverse={index % 2 === 1}
            />
          ))}
        </main>
      </div>

      {/* CTA Section - Full width blue background */}
      <div style={{ backgroundColor: '#2563eb' }}>
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Whether you need consistent daily support or help managing increased
            demand, our team is equipped to step in and deliver dependable,
            professional service.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium bg-white text-blue-600 hover:bg-gray-100 transition-colors"
            >
              <MessageCircle size={20} />
              Request a Consultation
            </a>
            <button
              onClick={() => navigate('/capability-statement')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium border-2 border-white text-white hover:bg-white/10 transition-colors"
            >
              View Capability Statement
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* Footer - Full width */}
<footer className="py-12 px-6" style={{ backgroundColor: '#1e3a8a' }}>
  <div className="max-w-6xl mx-auto">
    <div className="grid md:grid-cols-3 gap-8 mb-8">
      {/* Company Info */}
      <div>
        <img 
          src="/logo_white.png" 
          alt="Assistant Plus" 
          className="h-10 w-auto mb-4"
        />
        <p className="text-white/70 text-sm leading-relaxed">
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