import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLDivElement>(null);
  const h1Line1Ref = useRef<HTMLDivElement>(null);
  const h1Line2Ref = useRef<HTMLDivElement>(null);
  const h1Line3Ref = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const accent1Ref = useRef<HTMLDivElement>(null);
  const accent2Ref = useRef<HTMLDivElement>(null);
  const accent3Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    if (!section || !panel) return;

    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      
      loadTl
        .fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0)
        .fromTo(microRef.current, { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.15)
        .fromTo(h1Line1Ref.current, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, 0.35)
        .fromTo(h1Line2Ref.current, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, 0.43)
        .fromTo(h1Line3Ref.current, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, 0.51)
        .fromTo(bodyRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.75)
        .fromTo(ctaRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.85)
        .fromTo(photoRef.current, { x: '18vw', scale: 0.96, opacity: 0 }, { x: 0, scale: 1, opacity: 1, duration: 0.6 }, 0.45)
        .fromTo([accent1Ref.current, accent2Ref.current, accent3Ref.current], 
          { scale: 0.7, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08 }, 
          0.65
        );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([microRef.current, h1Line1Ref.current, h1Line2Ref.current, h1Line3Ref.current, bodyRef.current, ctaRef.current, photoRef.current], {
              opacity: 1, x: 0, y: 0, scale: 1
            });
          }
        }
      });

      scrollTl
        .fromTo([h1Line1Ref.current, h1Line2Ref.current, h1Line3Ref.current], 
          { x: 0, opacity: 1 }, 
          { x: '-40vw', opacity: 0, ease: 'power2.in' }, 
          0.70
        )
        .fromTo([bodyRef.current, ctaRef.current], 
          { y: 0, opacity: 1 }, 
          { y: '18vh', opacity: 0, ease: 'power2.in' }, 
          0.72
        )
        .fromTo(photoRef.current, 
          { x: 0, scale: 1, opacity: 1 }, 
          { x: '18vw', scale: 0.98, opacity: 0, ease: 'power2.in' }, 
          0.70
        )
        .fromTo([accent1Ref.current, accent2Ref.current, accent3Ref.current], 
          { opacity: 1 }, 
          { opacity: 0, ease: 'power2.in' }, 
          0.75
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-10">
      <div ref={panelRef} className="section-inner">
        {/* Micro label */}
        <div 
          ref={microRef}
          className="absolute text-micro text-white/80"
          style={{ left: '6vw', top: '7vh' }}
        >
          U.S.-BASED STAFFING PARTNER
        </div>

        {/* H1 Headlines */}
        <div 
          className="absolute"
          style={{ left: '6vw', top: '18vh', width: '52vw' }}
        >
          <div ref={h1Line1Ref} className="text-h1 text-white">SCALABLE</div>
          <div ref={h1Line2Ref} className="text-h1 text-white">CUSTOMER SUPPORT</div>
          <div ref={h1Line3Ref} className="text-h1 text-white">& ADMINISTRATIVE STAFFING</div>
        </div>

        {/* Body copy */}
        <div 
          ref={bodyRef}
          className="absolute text-body text-white/90"
          style={{ left: '6vw', top: '60vh', width: '34vw' }}
        >
          Experienced professionals ready to support your operations, improve response times, and reduce internal workload 
          — without the overhead.
        </div>

        {/* CTA Row */}
        <div 
          ref={ctaRef}
          className="absolute flex items-center gap-10"
          style={{ left: '6vw', top: '78vh' }}
        >
          <button 
            className="btn-primary"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Request Staffing
            <ArrowRight size={18} />
          </button>
          <button 
            className="btn-secondary"
            onClick={() => navigate('/capability-statement')}
          >
            <Download size={18} />
            View Capability Statement
          </button>
        </div>

        {/* Hero Photo Block */}
        <div 
          ref={photoRef}
          className="absolute photo-block"
          style={{ 
            left: '62vw', 
            top: '18vh', 
            width: '32vw', 
            height: '62vh' 
          }}
        >
          <img 
            src="/hero_agent.jpg" 
            alt="Professional customer service agent" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Accent Shapes */}
        <div 
          ref={accent1Ref}
          className="absolute accent-lime"
          style={{ 
            left: '58vw', 
            top: '12vh', 
            width: '18vw', 
            height: '18vw',
            borderRadius: '0 0 100% 0'
          }}
        />
        
        <div 
          ref={accent2Ref}
          className="absolute ring-lime"
          style={{ 
            left: '44vw', 
            top: '78vh', 
            width: '10vw', 
            height: '10vw',
            background: 'transparent'
          }}
        />
        
        <div 
          ref={accent3Ref}
          className="absolute ring-white"
          style={{ 
            left: '90vw', 
            top: '62vh', 
            width: '6vw', 
            height: '6vw',
            background: 'transparent',
            borderWidth: '8px'
          }}
        />
      </div>
    </section>
  );
}