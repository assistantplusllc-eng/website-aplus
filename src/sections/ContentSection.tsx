import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface ContentSectionProps {
  zIndex: number;
  headline: string[];
  body?: string | string[];
  cta?: string;
  imageSrc: string;
  imageAlt: string;
  accentType: 'quarter-top-right' | 'ring-bottom-left' | 'quarter-behind';
  listItems?: string[];
  stats?: { value: string; label: string }[];
  quote?: { text: string; attribution: string };
  endOffset?: string;
  subheader?: string;
  boldListItems?: boolean;
  ctaLink?: string;
  cardItems?: string[];
  downloadCta?: {
    label: string;
    file: string;
  };
  timelineItems?: string[];
  scrollArrowTarget?: string;
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
  boldListItems,
  ctaLink,
  cardItems,
  downloadCta,
  timelineItems,
  scrollArrowTarget,
}: ContentSectionProps) {
  const navigate = useNavigate();
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

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: endOffset,
            pin: true,
            scrub: 0.6,
            onLeaveBack: () => {
              gsap.set([h2Ref.current, contentRef.current, photoRef.current, accent1Ref.current, accent2Ref.current], {
                opacity: 1, x: 0, y: 0, scale: 1
              });
            }
          }
        });

        scrollTl
          .fromTo(h2Ref.current, { x: '-55vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
          .fromTo(contentRef.current, { y: '16vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.08)
          .fromTo(photoRef.current, { x: '55vw', scale: 0.98, opacity: 0 }, { x: 0, scale: 1, opacity: 1, ease: 'none' }, 0)
          .fromTo(accent1Ref.current, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none' }, 0.10)
          .fromTo(accent2Ref.current, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none' }, 0.15);

        scrollTl
          .fromTo(h2Ref.current, { x: 0, opacity: 1 }, { x: '-35vw', opacity: 0, ease: 'power2.in' }, 0.70)
          .fromTo(contentRef.current, { y: 0, opacity: 1 }, { y: '12vh', opacity: 0, ease: 'power2.in' }, 0.72)
          .fromTo(photoRef.current, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.70)
          .fromTo([accent1Ref.current, accent2Ref.current], { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.75);
      }
    }, section);

    return () => ctx.revert();
  }, [endOffset]);

  const renderAccent = () => {
    switch (accentType) {
      case 'quarter-top-right':
        return (
          <>
            <div ref={accent1Ref} className="absolute accent-lime" style={{ left: '84vw', top: '10vh', width: '18vw', height: '18vw', borderRadius: '0 0 0 100%' }} />
            <div ref={accent2Ref} className="absolute ring-white" style={{ left: '48vw', top: '74vh', width: '8vw', height: '8vw', background: 'transparent', borderWidth: '8px' }} />
          </>
        );
      case 'ring-bottom-left':
        return (
          <>
            <div ref={accent1Ref} className="absolute ring-lime" style={{ left: '44vw', top: '74vh', width: '10vw', height: '10vw', background: 'transparent' }} />
            <div ref={accent2Ref} className="absolute ring-white" style={{ left: '90vw', top: '62vh', width: '6vw', height: '6vw', background: 'transparent', borderWidth: '8px' }} />
          </>
        );
      case 'quarter-behind':
        return (
          <>
            <div ref={accent1Ref} className="absolute accent-lime" style={{ left: '82vw', top: '8vh', width: '16vw', height: '16vw', borderRadius: '0 0 0 100%', zIndex: -1 }} />
            <div ref={accent2Ref} className="absolute ring-white" style={{ left: '90vw', top: '62vh', width: '6vw', height: '6vw', background: 'transparent', borderWidth: '8px' }} />
          </>
        );
    }
  };

  const renderContent = () => (
    <>
      {subheader ? (
        <p className="text-base text-white/90 mb-3 font-medium md:text-body">{subheader}</p>
      ) : null}

      {body && (
        <div className="mb-5 space-y-3 md:mb-6 md:space-y-4">
          {Array.isArray(body) ? (
            body.filter(p => p.trim() !== '').map((paragraph, i) => (
              <p key={i} className="text-base text-white/80 leading-relaxed md:text-body">{paragraph}</p>
            ))
          ) : (
            <p className="text-base text-white/80 leading-relaxed md:text-body">{body}</p>
          )}
        </div>
      )}

      {listItems && (
        <ul className="space-y-2 mb-5 md:space-y-3 md:mb-6">
          {listItems.map((item, i) => {
            if (boldListItems) {
              const colonIndex = item.indexOf(':');
              if (colonIndex > 0) {
                const firstWord = item.substring(0, colonIndex);
                const rest = item.substring(colonIndex);
                return (
                  <li key={i} className="text-base text-white/90 flex items-start gap-3 md:text-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime mt-2 flex-shrink-0" />
                    <span><b>{firstWord}</b>{rest}</span>
                  </li>
                );
              }
            }
            return (
              <li key={i} className="text-base text-white/90 flex items-start gap-3 md:text-body">
                <span className="w-1.5 h-1.5 rounded-full bg-lime mt-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      )}

      {timelineItems && (
        <div className="relative mb-5 md:mb-6">
          <div className="absolute w-[2px] bg-lime/40" style={{ top: '24px', bottom: '24px', left: '19px' }} />
          <div className="space-y-4 md:space-y-5">
            {timelineItems.map((item, i) => {
              const colonIndex = item.indexOf(':');
              const hasColon = colonIndex > 0;
              const firstWord = hasColon ? item.substring(0, colonIndex) : '';
              const rest = hasColon ? item.substring(colonIndex) : item;
              return (
                <div key={i} className="flex items-start gap-4 relative">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-lime flex items-center justify-center flex-shrink-0 z-10 shadow-lg">
                    <span className="text-sm font-bold text-cobalt">{i + 1}</span>
                  </div>
                  <div className="pt-1.5 md:pt-2 text-base text-white/90 md:text-body">
                    {hasColon ? <><b>{firstWord}</b>{rest}</> : item}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {cardItems && (
        <div className="flex flex-wrap gap-2 mb-5 md:gap-3 md:mb-6">
          {cardItems.map((item, i) => (
            <div key={i} className="px-4 py-2.5 rounded-full bg-lime text-cobalt text-sm font-semibold hover:bg-white hover:scale-105 transition-all duration-200 cursor-default">
              {item}
            </div>
          ))}
        </div>
      )}

      {stats && (
        <div className="flex flex-col gap-4 mb-5 md:flex-row md:gap-8 md:mb-6">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-2xl font-black text-lime md:text-h2">{stat.value}</div>
              <div className="text-xs text-white/70 mt-1 md:text-micro">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {quote && (
        <div className="mb-5 md:mb-6">
          <p className="text-base text-white/90 italic mb-2 md:text-body md:mb-3">"{quote.text}"</p>
          <p className="text-xs text-white/60 md:text-micro">{quote.attribution}</p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        {cta && !scrollArrowTarget && (
          ctaLink ? (
            (() => {
              const hashMatch = ctaLink.match(/^(.+)#(.+)$/);
              if (hashMatch) {
                const [, path, hash] = hashMatch;
                return (
                  <button onClick={() => navigate(path, { state: { scrollTo: hash } })} className="btn-secondary inline-flex items-center gap-2 w-full md:w-auto justify-center">
                    {cta}
                    <ArrowRight size={18} />
                  </button>
                );
              }
              if (ctaLink.startsWith('/')) {
                return (
                  <button onClick={() => navigate(ctaLink)} className="btn-secondary inline-flex items-center gap-2 w-full md:w-auto justify-center">
                    {cta}
                    <ArrowRight size={18} />
                  </button>
                );
              }
              return (
                <a href={ctaLink} className="btn-secondary inline-flex items-center gap-2 w-full md:w-auto justify-center">
                  {cta}
                  <ArrowRight size={18} />
                </a>
              );
            })()
          ) : (
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn-secondary w-full md:w-auto justify-center">
              {cta}
              <ArrowRight size={18} />
            </button>
          )
        )}

        {scrollArrowTarget && (
          <button onClick={() => document.querySelector(scrollArrowTarget)?.scrollIntoView({ behavior: 'smooth' })} className="text-white/70 hover:text-white transition-colors animate-bounce cursor-pointer mt-4" aria-label="Scroll to next section">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        )}

        {downloadCta && (
          <a href={downloadCta.file} download className="btn-secondary inline-flex items-center gap-2 w-full md:w-auto justify-center">
            <Download size={18} />
            {downloadCta.label}
          </a>
        )}
      </div>
    </>
  );

  return (
    <section ref={sectionRef} className="section-pinned" style={{ zIndex }}>
      {/* MOBILE LAYOUT - more top padding to clear nav, full-width image */}
      <div className="md:hidden flex flex-col px-6 pt-20 pb-10">
        <div className="mb-4">
          {headline.map((line, i) => (
            <div key={i} className="text-[1.75rem] font-black leading-[1.1] tracking-tight text-white md:text-h2">{line}</div>
          ))}
        </div>

        <div className="mb-6">
          {renderContent()}
        </div>

        <div className="w-full h-[200px] rounded-xl overflow-hidden -mx-6">
          <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover object-top" />
        </div>
      </div>

      {/* DESKTOP LAYOUT - exact original */}
      <div ref={panelRef} className="hidden md:block section-inner">
        <div ref={h2Ref} className="absolute" style={{ left: '6vw', top: '18vh', width: '44vw' }}>
          {headline.map((line, i) => (
            <div key={i} className="text-h2 text-white">{line}</div>
          ))}
        </div>

        <div ref={contentRef} className="absolute" style={{ left: '6vw', top: '40vh', width: '32vw' }}>
          {renderContent()}
        </div>

        <div ref={photoRef} className="absolute photo-block" style={{ left: '56vw', top: '18vh', width: '38vw', height: '62vh' }}>
          <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
        </div>

        {renderAccent()}
      </div>
    </section>
  );
}