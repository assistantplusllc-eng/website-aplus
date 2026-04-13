import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContentSectionProps {
  zIndex: number;
  headline: string[];
  body: string;
  cta: string;
  imageSrc: string;
  imageAlt: string;
  accentType: 'quarter-top-right' | 'ring-bottom-left' | 'quarter-behind';
  listItems?: string[];
  stats?: { value: string; label: string }[];
  quote?: { text: string; attribution: string };
  endOffset?: string;
  subheader?: string;
}

export default function ContentSection({
  zIndex,
  headline,
  body,
  cta,
  imageSrc,
  imageAlt,
  accentType,
  listItems,
  stats,
  quote,
  endOffset = '+=125%',
  subheader,
}: ContentSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const accent1Ref = useRef<HTMLDivElement>(null);
  const accent2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    if (!section || !panel) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: endOffset,
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(h2Ref.current, 
          { x: '-55vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(contentRef.current, 
          { y: '16vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.08
        )
        .fromTo(photoRef.current, 
          { x: '55vw', scale: 0.98, opacity: 0 }, 
          { x: 0, scale: 1, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(accent1Ref.current, 
          { scale: 0.6, opacity: 0 }, 
          { scale: 1, opacity: 1, ease: 'none' }, 
          0.10
        )
        .fromTo(accent2Ref.current, 
          { scale: 0.6, opacity: 0 }, 
          { scale: 1, opacity: 1, ease: 'none' }, 
          0.15
        );

      // SETTLE (30-70%): Hold positions

      // EXIT (70-100%)
      scrollTl
        .fromTo(h2Ref.current, 
          { x: 0, opacity: 1 }, 
          { x: '-35vw', opacity: 0, ease: 'power2.in' }, 
          0.70
        )
        .fromTo(contentRef.current, 
          { y: 0, opacity: 1 }, 
          { y: '12vh', opacity: 0, ease: 'power2.in' }, 
          0.72
        )
        .fromTo(photoRef.current, 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.70
        )
        .fromTo([accent1Ref.current, accent2Ref.current], 
          { opacity: 1 }, 
          { opacity: 0, ease: 'power2.in' }, 
          0.75
        );

    }, section);

    return () => ctx.revert();
  }, [endOffset]);

  const renderAccent = () => {
    switch (accentType) {
      case 'quarter-top-right':
        return (
          <>
            <div 
              ref={accent1Ref}
              className="absolute accent-lime"
              style={{ 
                left: '84vw', 
                top: '10vh', 
                width: '18vw', 
                height: '18vw',
                borderRadius: '0 0 0 100%'
              }}
            />
            <div 
              ref={accent2Ref}
              className="absolute ring-white"
              style={{ 
                left: '48vw', 
                top: '74vh', 
                width: '8vw', 
                height: '8vw',
                background: 'transparent',
                borderWidth: '8px'
              }}
            />
          </>
        );
      case 'ring-bottom-left':
        return (
          <>
            <div 
              ref={accent1Ref}
              className="absolute ring-lime"
              style={{ 
                left: '44vw', 
                top: '74vh', 
                width: '10vw', 
                height: '10vw',
                background: 'transparent'
              }}
            />
            <div 
              ref={accent2Ref}
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
          </>
        );
      case 'quarter-behind':
        return (
          <>
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
          </>
        );
    }
  };

  return (
    <section ref={sectionRef} className="section-pinned" style={{ zIndex }}>
      <div ref={panelRef} className="section-inner">
        {/* H2 Headline */}
        <div 
          ref={h2Ref}
          className="absolute"
          style={{ left: '6vw', top: '18vh', width: '44vw' }}
        >
          {headline.map((line, i) => (
            <div key={i} className="text-h2 text-white">{line}</div>
          ))}
        </div>

        {/* Content Block */}
        <div 
          ref={contentRef}
          className="absolute"
          style={{ left: '6vw', top: '40vh', width: '32vw' }}
        >
          {/* Subheader */}
          {subheader ? (
            <p className="text-body text-white/90 mb-4 font-medium">
              {subheader}
            </p>
          ) : null}
         
          {/* Body text - NOW SHOWS ABOVE LIST ITEMS */}
          {body ? (
            <p className="text-sm text-white/80 mb-6 leading-relaxed">
              {body}
            </p>
          ) : null}

          {/* List items if provided */}
          {listItems && (
            <ul className="space-y-3 mb-6">
              {listItems.map((item, i) => (
                <li key={i} className="text-body text-white/90 flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {/* Stats if provided */}
          {stats && (
            <div className="flex gap-8 mb-6">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-h2 text-lime">{stat.value}</div>
                  <div className="text-micro text-white/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Quote if provided */}
          {quote && (
            <div className="mb-6">
              <p className="text-body text-white/90 italic mb-3">"{quote.text}"</p>
              <p className="text-micro text-white/60">{quote.attribution}</p>
            </div>
          )}

          {/* Fallback body text when no listItems/stats/quote */}
          {!listItems && !stats && !quote && !body && (
            <p className="text-body text-white/90 mb-6">{body}</p>
          )}

          {/* CTA */}
          <button className="btn-secondary">
            {cta}
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Photo Block */}
        <div 
          ref={photoRef}
          className="absolute photo-block"
          style={{ 
            left: '56vw', 
            top: '18vh', 
            width: '38vw', 
            height: '62vh' 
          }}
        >
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Accent Shapes */}
        {renderAccent()}
      </div>
    </section>
  );
}