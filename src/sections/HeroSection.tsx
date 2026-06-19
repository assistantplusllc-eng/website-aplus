import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
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

    const isMobile = window.innerWidth < 768;

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
        .fromTo(photoRef.current, { x: isMobile ? '8vw' : '18vw', scale: 0.96, opacity: 0 }, { x: 0, scale: 1, opacity: 1, duration: 0.6 }, 0.45)
        .fromTo([accent1Ref.current, accent2Ref.current, accent3Ref.current], 
          { scale: 0.7, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08 }, 
          0.65
        );

      if (!isMobile) {
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
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned z-10">
      {/* MOBILE LAYOUT - contained, no overflow */}
      <div className="md:hidden relative overflow-hidden">
        <div className="px-6 pt-24 pb-8">
          <div ref={microRef} className="text-[11px] font-semibold tracking-[0.15em] text-white/80 uppercase mb-6">
            CALL CENTER BPO SERVICES
          </div>

          <div className="mb-5">
            <div ref={h1Line1Ref} className="text-[2.5rem] font-black leading-[1.05] tracking-tight text-white">SCALABLE</div>
            <div ref={h1Line2Ref} className="text-[2.5rem] font-black leading-[1.05] tracking-tight text-white">CUSTOMER</div>
            <div className="text-[2.5rem] font-black leading-[1.05] tracking-tight text-white">SUPPORT</div>
            <div ref={h1Line3Ref} className="text-[2.5rem] font-black leading-[1.05] tracking-tight text-white">& OPERATIONAL</div>
            <div className="text-[2.5rem] font-black leading-[1.05] tracking-tight text-white">SOLUTIONS</div>
          </div>

          <div ref={bodyRef} className="text-base text-white/90 mb-6 leading-relaxed">
            We handle the people, processes, and performance so you can focus on growth.
          </div>

          <div ref={ctaRef} className="mb-6">
            <button 
              className="btn-primary w-full justify-center"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Request Staffing
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div ref={photoRef} className="w-full h-[280px]">
          <img 
            src="/hero_agent.png" 
            alt="Professional customer service agent" 
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      {/* DESKTOP LAYOUT - exact original */}
      <div ref={panelRef} className="hidden md:block section-inner">
        <div 
          ref={microRef}
          className="absolute text-micro text-white/80"
          style={{ left: '6vw', top: '7vh' }}
        >
          CALL CENTER BPO SERVICES
        </div>

        <div 
          className="absolute"
          style={{ left: '6vw', top: '18vh', width: '52vw' }}
        >
          <div ref={h1Line1Ref} className="text-h1 text-white">SCALABLE</div>
          <div ref={h1Line2Ref} className="text-h1 text-white">CUSTOMER SUPPORT</div>
          <div ref={h1Line3Ref} className="text-h1 text-white">& OPERATIONAL SOLUTIONS</div>
        </div>

        <div 
          ref={bodyRef}
          className="absolute text-body text-white/90"
          style={{ left: '6vw', top: '60vh', width: '34vw' }}
        >
          We handle the people, processes, and performance so you can focus on growth.
        </div>

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
        </div>

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
            src="/hero_agent.png" 
            alt="Professional customer service agent" 
            className="w-full h-full object-cover"
          />
        </div>

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

        <button
          onClick={() => {
            const nextSection = document.getElementById('services');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce cursor-pointer"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
}