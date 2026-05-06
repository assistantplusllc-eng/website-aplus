import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Menu, X, Check, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

/* ─────────── Content Block (white bg, scrollable) ─────────── */
interface ContentBlockProps {
  headline: string[];
  body: string | string[];
  listItems?: string[];
  imageSrc?: string;
  imageAlt?: string;
  reverse?: boolean;
}

function ContentBlock({ headline, body, listItems, imageSrc, imageAlt, reverse = false }: ContentBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const block = blockRef.current;
    if (!block) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(block, { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: block, start: 'top 85%', toggleActions: 'play none none reverse' }
      });
    }, block);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={blockRef} className={`grid md:grid-cols-2 gap-8 lg:gap-16 items-center py-16 border-b border-gray-200 ${reverse ? 'md:grid-flow-dense' : ''}`}>
      <div className={reverse ? 'md:col-start-2' : ''}>
        {headline.map((line, i) => (
          <h2 key={i} className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1e3a8a' }}>{line}</h2>
        ))}
        {Array.isArray(body) ? (
          <div className="space-y-4 mb-6">
            {body.map((p, i) => (
              <p key={i} className="text-gray-600 text-lg leading-relaxed">{p}</p>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-lg leading-relaxed mb-6">{body}</p>
        )}
        {listItems && (
          <ul className="space-y-3">
            {listItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#84cc16' }}>
                  <Check size={12} className="text-white" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {imageSrc && (
        <div className={`relative ${reverse ? 'md:col-start-1' : ''}`}>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img src={imageSrc} alt={imageAlt || ''} className="w-full h-[280px] md:h-[320px] object-cover" />
            <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full" style={{ backgroundColor: '#84cc16', opacity: 0.8 }} />
          </div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full border-4 pointer-events-none" style={{ borderColor: '#2563eb', opacity: 0.3 }} />
        </div>
      )}
    </div>
  );
}

/* ─────────── Main About Page ─────────── */
export default function About() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(hero.querySelectorAll('.animate-in'), { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
      });
    }, hero);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Logo */}
      <button onClick={() => navigate('/')} className="fixed top-4 left-4 z-[400] cursor-pointer">
        <div className="bg-white rounded-md shadow-md hover:bg-white transition-colors overflow-hidden leading-none">
          <img src="/logo-horizontal.png" alt="Assistant Plus" className="h-8 w-auto object-contain" />
        </div>
      </button>

      {/* Fixed Blue Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-6" style={{ backgroundColor: '#2563eb' }}>
        <div className="flex items-center justify-end">
          <button
            onClick={() => setMenuOpen(true)}
            className={`z-[300] flex items-center gap-2 transition-all duration-300 ${
              isScrolled ? 'bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg' : 'text-white'
            }`}
          >
            <span className="text-sm font-medium">Menu</span>
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Full Screen Menu */}
      <div className={`fixed inset-0 z-[100] bg-white transition-transform duration-500 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col p-8 md:p-16">
          <div className="flex justify-end">
            <button onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-text-primary hover:text-cobalt transition-colors">
              <span className="text-sm font-medium">Close</span>
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <nav className="space-y-6">
              <button onClick={() => { setMenuOpen(false); navigate('/'); }} className="block text-h2 text-text-primary hover:text-cobalt transition-colors text-left">Home</button>
              <button onClick={() => { setMenuOpen(false); navigate('/', { state: { scrollTo: 'industries' } }); }} className="block text-h2 text-text-primary hover:text-cobalt transition-colors text-left">Industries</button>
              <button onClick={() => { setMenuOpen(false); navigate('/', { state: { scrollTo: 'process' } }); }} className="block text-h2 text-text-primary hover:text-cobalt transition-colors text-left">How We Work</button>
              <button onClick={() => { setMenuOpen(false); navigate('/', { state: { scrollTo: 'results' } }); }} className="block text-h2 text-text-primary hover:text-cobalt transition-colors text-left">Results</button>
              <button onClick={() => { setMenuOpen(false); navigate('/', { state: { scrollTo: 'contact' } }); }} className="block text-h2 text-text-primary hover:text-cobalt transition-colors text-left">Contact</button>
            </nav>
          </div>
          <div className="pt-8 border-t border-gray-200">
            <button onClick={() => { setMenuOpen(false); navigate('/', { state: { scrollTo: 'contact' } }); }} className="btn-primary bg-cobalt text-white">
              Request Staffing <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ─── HERO ─── */}
      <div ref={heroRef} className="pt-20 pb-32 px-6 lg:px-8 relative" style={{ backgroundColor: '#2563eb' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative max-w-xl">
              <p className="animate-in absolute -left-4 md:-left-6 -top-8 text-micro text-white/90 uppercase tracking-wider">
                Built For Operational Support
              </p>
              <h1 className="animate-in pt-8 text-h1 text-white mb-8">
                About Assistant Plus:
              </h1>
              <p className="animate-in text-body text-white/90 mb-4">
  A support partner built on real operational experience in high-volume customer service environments.
</p>
<p className="animate-in text-body text-white/90">
  We provide structured contact center and administrative support designed to integrate seamlessly into your operations and improve efficiency at scale.
</p>
            </div>
            <div className="animate-in relative">
              <div className="group relative rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border-4 border-white/30">
                <img src="/about-hero.png" alt="Assistant Plus team" className="w-full h-[380px] md:h-[420px] lg:h-[460px] object-cover object-center brightness-95 contrast-105 transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
              </div>
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full pointer-events-none bg-[#84cc16] opacity-80" />
              <div className="absolute -bottom-10 -left-20 w-16 h-16 rounded-full border-4 border-white opacity-50 pointer-events-none" />
              {/* Lime ring accent — positioned left */}
              <div 
                className="absolute ring-lime"
                style={{ 
                  left: '-46vw', 
                  top: '90vh', 
                  width: '6vw', 
                  height: '6vw',
                  background: 'transparent'
                }}
              />
            </div>
          </div>
        </div>

        {/* Bounce arrow */}
        <button
          onClick={() => document.getElementById('how-we-work')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/70 hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* ─── CONTENT SECTIONS (scrollable, white bg) ─── */}
      <div id="how-we-work" className="bg-white">
        <main className="max-w-6xl mx-auto px-6 py-8">

          {/* How We Work */}
          <ContentBlock
            headline={['How We Work']}
            body={[
              "Assistant Plus is built to support organizations that need reliable, consistent reliable customer service and administrative support without the complexity of building internal teams.",
              "We focus on structured support, clear processes, and seamless integration into existing workflows, allowing our clients to maintain service quality while improving efficiency."
            ]}
            imageSrc="/work-team.png"
            imageAlt="Team collaboration"
          />

          {/* What Makes Us Different */}
          <ContentBlock
            headline={['What Makes Us', 'Different']}
            body={[
              "Our approach is grounded in real-world experience, not theory. With a background in high-volume support environments, we understand the operational demands that come with managing customer interactions at scale.",
              "We prioritize consistency, responsiveness, and professionalism across every interaction, ensuring that support operations remain consistent, responsive, and dependable."
            ]}
            imageSrc="/differences.png"
            imageAlt="Professional support"
            reverse
          />

          {/* Experience */}
          <ContentBlock
            headline={['Experience', 'That Matters']}
            body={[
              "Assistant Plus has supported customer service operations across industries including financial services, consumer support, and administrative service environments.",
              "Our work includes managing inbound and outbound customer support operations, appointment scheduling, customer inquiries, and administrative support in fast-paced environments."
            ]}
            listItems={[
              'Financial services support',
              'High-volume customer service programs',
              'Administrative & back-office operations',
              'Inbound & outbound customer communications'
            ]}
            imageSrc="/contact-center.png"
            imageAlt="Team experience"
          />

          {/* Our Foundation */}
          <div className="py-16 border-b border-gray-200 relative overflow-hidden">
            {/* Large half-circle accent — homepage style */}
            <div className="absolute -right-20 top-20 w-64 h-64 rounded-full bg-[#84cc16] opacity-10 pointer-events-none" />

            <h2 className="text-h2 text-[#1e3a8a] mb-12">Our Foundation</h2>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left: Vision & Mission stacked */}
              <div className="space-y-10">
                {/* Vision */}
                <div className="relative pl-6 border-l-4 border-[#2563eb]">
                  <h3 className="text-2xl font-bold text-[#1e3a8a] mb-3">Vision</h3>
                  <p className="text-body text-gray-600">
                    Our vision is to build an environment where individuals are supported, accountable, and positioned for long-term success, creating a strong, reliable workforce that enables us to be a trusted partner for organizations seeking dependable, scalable support that drives operational excellence.
                  </p>
                </div>

                {/* Mission */}
                <div className="relative pl-6 border-l-4 border-[#84cc16]">
                  <h3 className="text-2xl font-bold text-[#1e3a8a] mb-3">Mission</h3>
                  <p className="text-body text-gray-600">
                    To deliver structured, reliable support through trained professionals who integrate seamlessly into client operations, improving efficiency without the burden of internal hiring.
                  </p>
                </div>
              </div>

              {/* Right: Company Values with detailed explanations */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative">
                {/* Blue ring accent — different from lime corners */}
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full border-4 border-[#2563eb] opacity-20 pointer-events-none" />

                <h3 className="text-2xl font-bold text-[#1e3a8a] mb-6">Company Values</h3>

                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#2563eb] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">01</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1e3a8a] mb-1">Consistency</h4>
                      <p className="text-sm text-gray-600">We deliver the same level of quality and professionalism across every interaction, ensuring your customers always receive dependable service.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#2563eb] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">02</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1e3a8a] mb-1">Responsiveness</h4>
                      <p className="text-sm text-gray-600">We adapt quickly to changing needs and priorities, keeping your operations agile and your customers satisfied with timely support.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#2563eb] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">03</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1e3a8a] mb-1">Professionalism</h4>
                      <p className="text-sm text-gray-600">Our team represents your brand with integrity, maintaining high standards of conduct and communication in every engagement.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#84cc16] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#1e3a8a] font-bold text-sm">04</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1e3a8a] mb-1">Reliability</h4>
                      <p className="text-sm text-gray-600">You can count on us to show up, follow through, and maintain the operational stability your business depends on day after day.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* ─── CTA SECTION (blue) ─── */}
      <div style={{ backgroundColor: '#2563eb' }}>
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            We are committed to providing dependable support that organizations can rely on to maintain service quality and operational efficiency.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/', { state: { scrollTo: 'contact' } })}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium bg-white text-blue-600 hover:bg-gray-100 transition-colors"
            >
              <MessageCircle size={20} />
              Request a Consultation
            </button>
            <button
              onClick={() => navigate('/services')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium border-2 border-white text-white hover:bg-white/10 transition-colors"
            >
              Explore Our Services
            </button>
          </div>
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 px-6" style={{ backgroundColor: '#1e3a8a' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img
                src="/logo_white.png"
                alt="Assistant Plus"
                className="h-8 w-auto mb-4 block"
                style={{ background: 'none', backgroundColor: 'transparent' }}
              />
              <p className="text-white/70 text-sm leading-relaxed">
                Professional contact center and administrative support services for government agencies and growing organizations.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <nav className="space-y-2">
                <button onClick={() => navigate('/')} className="block text-white/70 hover:text-[#84cc16] transition-colors text-sm">Home</button>
                <button onClick={() => navigate('/services')} className="block text-white/70 hover:text-[#84cc16] transition-colors text-sm">Services</button>
                <button onClick={() => navigate('/capability-statement')} className="block text-white/70 hover:text-[#84cc16] transition-colors text-sm">Capability Statement</button>
                <button onClick={() => navigate('/', { state: { scrollTo: 'contact' } })} className="block text-white/70 hover:text-[#84cc16] transition-colors text-sm">Contact</button>
              </nav>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2 text-sm text-white/70">
                <p>(888) 652-6315</p>
                <p>info@assistantplusworks.com</p>
                <p>Bergen County, New Jersey</p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/20 text-center">
            <p className="text-white/50 text-sm">© 2026 Assistant Plus, LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}