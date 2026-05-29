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

    const ctx = gsap.context(() => {
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
            <div 
              ref={accent1Ref}
              className="absolute accent-lime"
              style={{ 
                left: '82vw',
                top: '8vh',
                width: '16vw',
                height: '16vw',
                borderRadius: '0 0 0 100%',
                zIndex: -1
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
        <div ref={h2Ref} className="absolute" style={{ left: '6vw', top: '18vh', width: '44vw' }}>
          {headline.map((line, i) => (
            <div key={i} className="text-h2 text-white">{line}</div>
          ))}
        </div>

        <div ref={contentRef} className="absolute" style={{ left: '6vw', top: '40vh', width: '32vw' }}>
          {subheader ? (
            <p className="text-body text-white/90 mb-4 font-medium">{subheader}</p>
          ) : null}

          {body && (
            <div className="mb-6 space-y-4">
              {Array.isArray(body) ? (
                body.map((paragraph, i) => (
                  <p key={i} className="text-body text-white/80 leading-relaxed">{paragraph}</p>
                ))
              ) : (
                <p className="text-body text-white/80 leading-relaxed">{body}</p>
              )}
            </div>
          )}

          {/* Regular bullet list (for What We Do, etc.) */}
          {listItems && (
            <ul className="space-y-3 mb-6">
              {listItems.map((item, i) => {
                if (boldListItems) {
                  const colonIndex = item.indexOf(':');
                  if (colonIndex > 0) {
                    const firstWord = item.substring(0, colonIndex);
                    const rest = item.substring(colonIndex);
                    return (
                      <li key={i} className="text-body text-white/90 flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-lime mt-2 flex-shrink-0" />
                        <span><b>{firstWord}</b>{rest}</span>
                      </li>
                    );
                  }
                }
                return (
                  <li key={i} className="text-body text-white/90 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-lime mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          )}

          {/* NEW: Connected Timeline (only for How We Work) */}
          {timelineItems && (
            <div className="relative mb-6">
              {/* Vertical connecting line */}
              <div 
                className="absolute w-[2px] bg-lime/40"
                style={{ 
                  top: '24px', 
                  bottom: '24px',
                  left: '19px'
                }}
              />

              <div className="space-y-5">
                {timelineItems.map((item, i) => {
                  const colonIndex = item.indexOf(':');
                  const hasColon = colonIndex > 0;
                  const firstWord = hasColon ? item.substring(0, colonIndex) : '';
                  const rest = hasColon ? item.substring(colonIndex) : item;

                  return (
                    <div key={i} className="flex items-start gap-4 relative">
                      {/* Numbered circle node */}
                      <div className="w-10 h-10 rounded-full bg-lime flex items-center justify-center flex-shrink-0 z-10 shadow-lg">
                        <span className="text-sm font-bold text-cobalt">{i + 1}</span>
                      </div>
                      <div className="pt-2 text-body text-white/90">
                        {hasColon ? (
                          <><b>{firstWord}</b>{rest}</>
                        ) : (
                          item
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Card Items (chips) */}
          {cardItems && (
            <div className="flex flex-wrap gap-3 mb-6">
              {cardItems.map((item, i) => (
                <div 
                  key={i}
                  className="px-4 py-2.5 bg-white/15 backdrop-blur-sm border border-white/30 rounded-lg 
                             text-sm font-medium text-white hover:bg-white/25 hover:border-lime/60 
                             transition-all duration-200 cursor-default"
                >
                  {item}
                </div>
              ))}
            </div>
          )}

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

          {quote && (
            <div className="mb-6">
              <p className="text-body text-white/90 italic mb-3">"{quote.text}"</p>
              <p className="text-micro text-white/60">{quote.attribution}</p>
            </div>
          )}

          {/* CTA Buttons or Scroll Arrow */}
          <div className="flex flex-wrap items-center gap-4">
            {cta && !scrollArrowTarget && (
              ctaLink ? (
                (() => {
                  // Check if it's a hash link to another page (e.g., /services#get-started)
                  const hashMatch = ctaLink.match(/^(.+)#(.+)$/);
                  if (hashMatch) {
                    const [, path, hash] = hashMatch;
                    return (
                      <button 
                        onClick={() => navigate(path, { state: { scrollTo: hash } })}
                        className="btn-secondary inline-flex items-center gap-2"
                      >
                        {cta}
                        <ArrowRight size={18} />
                      </button>
                    );
                  }
                  // Regular link (starts with /)
                  if (ctaLink.startsWith('/')) {
                    return (
                      <button 
                        onClick={() => navigate(ctaLink)}
                        className="btn-secondary inline-flex items-center gap-2"
                      >
                        {cta}
                        <ArrowRight size={18} />
                      </button>
                    );
                  }
                  // External or anchor link
                  return (
                    <a href={ctaLink} className="btn-secondary inline-flex items-center gap-2">
                      {cta}
                      <ArrowRight size={18} />
                    </a>
                  );
                })()
              ) : (
                <button 
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="btn-secondary"
                >
                  {cta}
                  <ArrowRight size={18} />
                </button>
              )
            )}

            {scrollArrowTarget && (
              <button
                onClick={() => {
                  const element = document.querySelector(scrollArrowTarget);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-white/70 hover:text-white transition-colors animate-bounce cursor-pointer mt-4"
                aria-label="Scroll to next section"
              >
                <svg 
                  className="w-8 h-8" 
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
              </button>
            )}

            {downloadCta && (
              <a 
                href={downloadCta.file}
                download
                className="btn-secondary inline-flex items-center gap-2"
              >
                <Download size={18} />
                {downloadCta.label}
              </a>
            )}
          </div>
        </div>

        <div ref={photoRef} className="absolute photo-block" style={{ left: '56vw', top: '18vh', width: '38vw', height: '62vh' }}>
          <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
        </div>

        {renderAccent()}
      </div>
    </section>
  );
}