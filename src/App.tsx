import { useEffect, useRef, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TrendingUp, Users, Settings, ArrowRight, Phone, FileText, Users2, Briefcase } from 'lucide-react';
import './App.css';

import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import ContentSection from './sections/ContentSection';
import ContactSection from './sections/ContactSection';
import Services from './pages/Services';
import About from './pages/About';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ─── Service Data for What We Do section ───
const servicePillars = [
  {
    id: 'contact-center',
    icon: Phone,
    title: 'Contact Center Support',
    description: 'Customer-facing support services that help organizations deliver responsive, professional experiences across phone, email, chat, and other communication channels.',
    examples: [
      'Inbound & outbound call handling',
      'Email, chat & ticket management',
      'Omnichannel customer engagement',
      'Help desk & technical support'
    ]
  },
  {
    id: 'back-office',
    icon: FileText,
    title: 'Back-Office Outsourcing',
    description: 'Operational and administrative support services that streamline workflows, maintain records, manage documentation, and keep business processes running efficiently.',
    examples: [
      'Data entry & database management',
      'Document processing & records keeping',
      'CRM updates & workflow coordination',
      'Reporting & quality assurance'
    ]
  },
  {
    id: 'lead-generation',
    icon: Users2,
    title: 'Lead Generation & Customer Outreach',
    description: 'Engagement services designed to support lead qualification, appointment scheduling, follow-up communications, customer outreach campaigns, and relationship-building initiatives.',
    examples: [
      'Lead qualification & intake screening',
      'Appointment scheduling & confirmations',
      'Follow-up campaigns & nurture sequences',
      'Customer retention & win-back outreach'
    ]
  },
  {
    id: 'workforce',
    icon: Briefcase,
    title: 'Workforce Solutions',
    description: 'Flexible staffing and support models that help organizations scale operations, manage workload demands, and supplement internal teams with qualified professionals.',
    examples: [
      'Seasonal & surge capacity support',
      'Dedicated team allocation',
      'Project-based staffing models',
      'Flexible scheduling & coverage options'
    ]
  }
];

// ─── Inline What We Do Section with 4-card grid ───
function WhatWeDoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const accent1Ref = useRef<HTMLDivElement>(null);
  const accent2Ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    if (!section || !panel) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=125%',
            pin: true,
            scrub: 0.6,
            onLeaveBack: () => {
              gsap.set([h2Ref.current, introRef.current, cardsRef.current, accent1Ref.current, accent2Ref.current], {
                opacity: 1, x: 0, y: 0, scale: 1
              });
            }
          }
        });

        scrollTl
          .fromTo(h2Ref.current, { x: '-55vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
          .fromTo(introRef.current, { y: '16vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.08)
          .fromTo(cardsRef.current, { y: '20vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12)
          .fromTo(accent1Ref.current, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none' }, 0.10)
          .fromTo(accent2Ref.current, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none' }, 0.15);

        scrollTl
          .fromTo(h2Ref.current, { x: 0, opacity: 1 }, { x: '-35vw', opacity: 0, ease: 'power2.in' }, 0.70)
          .fromTo(introRef.current, { y: 0, opacity: 1 }, { y: '12vh', opacity: 0, ease: 'power2.in' }, 0.72)
          .fromTo(cardsRef.current, { y: 0, opacity: 1 }, { y: '12vh', opacity: 0, ease: 'power2.in' }, 0.74)
          .fromTo([accent1Ref.current, accent2Ref.current], { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.75);
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="section-pinned" style={{ zIndex: 20 }}>
      {/* MOBILE */}
      <div className="md:hidden flex flex-col px-6 pt-16 pb-6">
        <div className="mb-3">
          <div className="text-[1.75rem] font-black leading-[1.1] tracking-tight text-white">WHAT</div>
          <div className="text-[1.75rem] font-black leading-[1.1] tracking-tight text-white">WE DO</div>
        </div>
        <p className="text-base text-white/90 mb-5 leading-relaxed">
          Four service pillars designed to extend your team, streamline operations, and deliver consistent results.
        </p>
        <div className="space-y-3">
          {servicePillars.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-lime flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-cobalt" />
                  </div>
                  <h3 className="text-base font-bold text-white">{service.title}</h3>
                </div>
                <p className="text-sm text-white/80 mb-2 leading-relaxed">{service.description}</p>
                <ul className="space-y-1 mb-3">
                  {service.examples.slice(0, 3).map((ex, i) => (
                    <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-lime mt-1.5 flex-shrink-0" />
                      {ex}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate(`/services#${service.id}`)}
                  className="text-sm font-medium text-lime hover:text-white transition-colors flex items-center gap-1"
                >
                  Learn More <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* DESKTOP */}
      <div ref={panelRef} className="hidden md:block section-inner">
        <div ref={h2Ref} className="absolute" style={{ left: '6vw', top: '12vh', width: '88vw' }}>
          <div className="text-h2 text-white">WHAT</div>
          <div className="text-h2 text-white">WE DO</div>
        </div>

        <div ref={introRef} className="absolute" style={{ left: '6vw', top: '32vh', width: '88vw' }}>
          <p className="text-body text-white/90 mb-4">
            Assistant Plus is a Business Process Outsourcing (BPO) company specializing in Contact Center Operations and Back-Office Support Services. We provide scalable solutions that keep organizations responsive, efficient, and focused on growth.
          </p>
          <div className="flex flex-wrap gap-3">
            {servicePillars.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => navigate(`/services#${service.id}`)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-lime text-cobalt text-sm font-semibold hover:bg-white hover:scale-105 transition-all duration-200 cursor-pointer"
                >
                  <Icon size={14} />
                  {service.title}
                </button>
              );
            })}
          </div>
        </div>

        <div ref={cardsRef} className="absolute" style={{ left: '6vw', top: '52vh', width: '88vw' }}>
          <div className="grid grid-cols-2 gap-8">
            {servicePillars.slice(0, 2).map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => navigate(`/services#${service.id}`)}
                  className="text-left bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/20 hover:border-lime/50 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-lime flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={20} className="text-cobalt" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-lime transition-colors duration-300">{service.title}</h3>
                  </div>
                  <p className="text-base text-white/80 mb-5 leading-relaxed">{service.description}</p>
                  <span className="text-sm font-medium text-lime group-hover:text-white transition-colors duration-300 flex items-center gap-1">
                    Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={accent1Ref} className="absolute accent-lime" style={{ left: '88vw', top: '8vh', width: '14vw', height: '14vw', borderRadius: '0 0 0 100%' }} />
        <div ref={accent2Ref} className="absolute ring-white" style={{ left: '6vw', top: '88vh', width: '8vw', height: '8vw', background: 'transparent', borderWidth: '8px' }} />
      </div>
    </section>
  );
}

// ─── Inline Why Outsource With Us Section ───
function WhyOutsourceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const accent1Ref = useRef<HTMLDivElement>(null);
  const accent2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    if (!section || !panel) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=125%',
            pin: true,
            scrub: 0.6,
            onLeaveBack: () => {
              gsap.set([h2Ref.current, introRef.current, itemsRef.current, photoRef.current, accent1Ref.current, accent2Ref.current], {
                opacity: 1, x: 0, y: 0, scale: 1
              });
            }
          }
        });

        scrollTl
          .fromTo(h2Ref.current, { x: '-55vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
          .fromTo(introRef.current, { y: '16vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.08)
          .fromTo(itemsRef.current, { y: '20vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12)
          .fromTo(photoRef.current, { x: '55vw', scale: 0.98, opacity: 0 }, { x: 0, scale: 1, opacity: 1, ease: 'none' }, 0)
          .fromTo(accent1Ref.current, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none' }, 0.10)
          .fromTo(accent2Ref.current, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none' }, 0.15);

        scrollTl
          .fromTo(h2Ref.current, { x: 0, opacity: 1 }, { x: '-35vw', opacity: 0, ease: 'power2.in' }, 0.70)
          .fromTo(introRef.current, { y: 0, opacity: 1 }, { y: '12vh', opacity: 0, ease: 'power2.in' }, 0.72)
          .fromTo(itemsRef.current, { y: 0, opacity: 1 }, { y: '12vh', opacity: 0, ease: 'power2.in' }, 0.74)
          .fromTo(photoRef.current, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.70)
          .fromTo([accent1Ref.current, accent2Ref.current], { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.75);
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why-outsource" className="section-pinned" style={{ zIndex: 35 }}>
      {/* MOBILE */}
      <div className="md:hidden flex flex-col px-6 pt-16 pb-6">
        <div className="mb-3">
          <div className="text-[1.75rem] font-black leading-[1.1] tracking-tight text-white">WHY</div>
          <div className="text-[1.75rem] font-black leading-[1.1] tracking-tight text-white">OUTSOURCE</div>
          <div className="text-[1.75rem] font-black leading-[1.1] tracking-tight text-white">WITH US</div>
        </div>
        <p className="text-base text-white/90 mb-5 leading-relaxed">
          Partnering with Assistant Plus means more than extra hands — it means operational leverage without the overhead.
        </p>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-lime flex items-center justify-center flex-shrink-0">
              <TrendingUp size={16} className="text-cobalt" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Cost Efficiency</h3>
              <p className="text-sm text-white/80">Reduce overhead without sacrificing quality. Pay for output, not idle time.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-lime flex items-center justify-center flex-shrink-0">
              <Users size={16} className="text-cobalt" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Scalability</h3>
              <p className="text-sm text-white/80">Scale teams up or down based on demand. No long-term hiring commitments.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-lime flex items-center justify-center flex-shrink-0">
              <Settings size={16} className="text-cobalt" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Process Expertise</h3>
              <p className="text-sm text-white/80">We manage the workflow, not just the workforce. Structured, measurable, and consistent.</p>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div ref={panelRef} className="hidden md:block section-inner">
        <div ref={h2Ref} className="absolute" style={{ left: '6vw', top: '18vh', width: '44vw' }}>
          <div className="text-h2 text-white">WHY</div>
          <div className="text-h2 text-white">OUTSOURCE</div>
          <div className="text-h2 text-white">WITH US</div>
        </div>

        <div ref={introRef} className="absolute" style={{ left: '6vw', top: '48vh', width: '32vw' }}>
          <p className="text-body text-white/90">
            Partnering with Assistant Plus means more than extra hands — it means operational leverage without the overhead.
          </p>
        </div>

        <div ref={itemsRef} className="absolute" style={{ left: '6vw', top: '58vh', width: '36vw' }}>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-lime flex items-center justify-center flex-shrink-0">
                <TrendingUp size={18} className="text-cobalt" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Cost Efficiency</h3>
                <p className="text-sm text-white/80">Reduce overhead without sacrificing quality. Pay for output, not idle time.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-lime flex items-center justify-center flex-shrink-0">
                <Users size={18} className="text-cobalt" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Scalability</h3>
                <p className="text-sm text-white/80">Scale teams up or down based on demand. No long-term hiring commitments.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-lime flex items-center justify-center flex-shrink-0">
                <Settings size={18} className="text-cobalt" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Process Expertise</h3>
                <p className="text-sm text-white/80">We manage the workflow, not just the workforce. Structured, measurable, and consistent.</p>
              </div>
            </div>
          </div>
        </div>

        <div ref={photoRef} className="absolute photo-block" style={{ left: '56vw', top: '18vh', width: '38vw', height: '62vh' }}>
          <img src="/team_meetingss.png" alt="Team collaboration" className="w-full h-full object-cover" />
        </div>

        <div ref={accent1Ref} className="absolute accent-lime" style={{ left: '84vw', top: '10vh', width: '18vw', height: '18vw', borderRadius: '0 0 0 100%' }} />
        <div ref={accent2Ref} className="absolute ring-white" style={{ left: '48vw', top: '74vh', width: '8vw', height: '8vw', background: 'transparent', borderWidth: '8px' }} />
      </div>
    </section>
  );
}

// Main page component with all sections
function MainPage() {
  const location = useLocation();
  const scrollTarget = useRef<string | null>(null);

  // Store scroll target from navigation state
  useEffect(() => {
    if (location.state?.scrollTo) {
      scrollTarget.current = location.state.scrollTo;
    }
  }, [location]);

  // Handle scroll to section after GSAP initializes
  useEffect(() => {
    if (!scrollTarget.current) return;

    const attemptScroll = () => {
      const element = document.getElementById(scrollTarget.current!);
      if (element) {
        gsap.to(window, {
          scrollTo: { y: element, offsetY: 0 },
          duration: 1,
          ease: 'power2.inOut'
        });
        scrollTarget.current = null;
      } else {
        setTimeout(attemptScroll, 200);
      }
    };

    const timer = setTimeout(attemptScroll, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out'
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      <div className="grain-overlay" />
      <Navigation />
      <main className="relative">
        <HeroSection />

        {/* Section 2: What We Do */}
        <WhatWeDoSection />

        {/* Section 3: Why Outsource With Us */}
        <WhyOutsourceSection />

        {/* Section 4: How We Work */}
        <div id="process">
          <ContentSection
            zIndex={40}
            headline={['HOW', 'WE WORK']}
            body=""
            cta="Start a Conversation"
            ctaLink="/services#get-started"
            imageSrc="/collaboration_desk.jpg"
            imageAlt="Professionals collaborating"
            accentType="ring-bottom-left"
            timelineItems={[
              'Discovery: We map your operational needs, support volume, and service goals — then design the support structure that fits.',
              'Alignment: We match trained professionals to your environment, ensuring responsive coverage across day-to-day operations.',
              'Launch: Fast, structured onboarding with ongoing oversight from day one.'
            ]}
          />
        </div>

        {/* Section 5: Industries */}
        <div id="industries">
          <ContentSection
            zIndex={50}
            headline={['INDUSTRIES', 'WE SERVE']}
            body="Support that adapts to industry requirements — from public sector compliance to private-sector pace."
            imageSrc="/desk_work.png"
            imageAlt="Professional at desk"
            accentType="quarter-top-right"
            cardItems={[
              'Government Agencies',
              'Professional Services',
              'Utilities & Consumer Services',
              'Financial Services & Insurance',
              'Travel & Hospitality',
              'Healthcare & Wellness',
              'E-Commerce'
            ]}
            downloadCta={{
              label: 'Download Capability Statement',
              file: '/capability-statement.pdf'
            }}
          />
        </div>

        {/* Section 6: Results */}
        <div id="results">
          <ContentSection
            zIndex={60}
            headline={['RESULTS', 'THAT MATTER']}
            body=""
            cta="Talk to our team"
            imageSrc="/agent_smile.png"
            imageAlt="Smiling support agent"
            accentType="ring-bottom-left"
            stats={[
              { value: '48-72h', label: 'Average Deployment Timeline' },
              { value: '1-day', label: 'Standard Response Time' },
              { value: 'On-Demand', label: 'Support Models & Coverage' }
            ]}
          />
        </div>

        {/* Section 7: Contact */}
        <div id="contact">
          <ContactSection />
        </div>
      </main>
    </div>
  );
}

// App with Router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;