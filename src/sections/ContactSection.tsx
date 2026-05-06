import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, Phone, Clock, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // ← ADDED

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const navigate = useNavigate(); // ← ADDED
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(card, 
        { y: '8vh', opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 35%',
            scrub: 0.5
          }
        }
      );

      gsap.fromTo(h2Ref.current, 
        { x: '-10vw', opacity: 0 }, 
        { 
          x: 0, 
          opacity: 1, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.5
          }
        }
      );

      gsap.fromTo(formRef.current, 
        { y: 24, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 30%',
            scrub: 0.5
          }
        }
      );

      gsap.fromTo(photoRef.current, 
        { x: '10vw', scale: 0.98, opacity: 0 }, 
        { 
          x: 0, 
          scale: 1, 
          opacity: 1, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'top 35%',
            scrub: 0.5
          }
        }
      );

      gsap.fromTo(accentRef.current, 
        { scale: 0.7, opacity: 0 }, 
        { 
          scale: 1, 
          opacity: 1, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 55%',
            end: 'top 30%',
            scrub: 0.5
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your request! We will respond within one business day.');
  };

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen py-8 px-4" style={{ zIndex: 90, backgroundColor: 'white' }}>
      <div ref={cardRef} className="w-full min-h-[90vh] rounded-panel p-8 md:p-12" style={{ backgroundColor: '#1B45F4' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
          <div className="flex flex-col justify-center">
            <div ref={h2Ref} className="mb-6">
              <div className="text-h2 text-white">REQUEST</div>
              <div className="text-h2 text-white">INFO</div>
            </div>
            <p className="text-body text-white/80 mb-8">
              Tell us what you need. We will respond within one business day.
            </p>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-lime transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-lime transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Organization"
                  value={formData.organization}
                  onChange={(e) => setFormData({...formData, organization: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-lime transition-colors"
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-lime transition-colors resize-none"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                <Send size={18} />
                Send Request
              </button>
            </form>
          </div>
          <div className="flex flex-col justify-center relative">
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail size={18} />
                </div>
                <span className="text-body">info@assistantplusworks.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone size={18} />
                </div>
                <span className="text-body">(888) 652-6315</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Clock size={18} />
                </div>
                <span className="text-body">Mon-Fri, 9am-6pm ET</span>
              </div>
            </div>
            <div ref={photoRef} className="relative rounded-photo overflow-hidden" style={{ height: '40vh' }}>
              <img src="/contact_team.jpg" alt="Team collaboration" className="w-full h-full object-cover" />
            </div>
            <div ref={accentRef} className="absolute accent-lime" style={{ right: '-5vw', top: '5vh', width: '15vw', height: '15vw', borderRadius: '0 0 0 100%', zIndex: -1 }} />
            
            {/* UPDATED: Download capabilities button now navigates to capability statement page */}
            <button 
              className="btn-secondary mt-6"
              onClick={() => navigate('/capability-statement')}
            >
              <Download size={18} />
              Download Capability Statement (PDF)
            </button>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center !bg-transparent">
           
          </div>
          <div className="text-micro text-white/60">© 2026 Assistant Plus, LLC. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="text-micro text-white/60 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-micro text-white/60 hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </section>
  );
}