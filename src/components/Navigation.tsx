import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Industries', href: '#industries' },
    { label: 'How We Work', href: '#process' },
    { label: 'Results', href: '#results' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Fixed Logo */}
<div 
  className={`fixed top-6 left-6 z-[200] transition-all duration-300 ${
    isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`}
>
  <div className="bg-white/90 backdrop-blur-sm px-1 py-0.5 rounded-md">
  <img 
    src="/logo-horizontal.png" 
    alt="Assistant Plus" 
    className="h-8 w-auto object-contain" 
  />
</div>
</div>

      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-6 right-6 z-[200] flex items-center gap-2 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white text-cobalt px-4 py-2 rounded-full shadow-lg' 
            : 'text-white'
        }`}
      >
        <span className="text-sm font-medium">Menu</span>
        <Menu size={20} />
      </button>

      {/* Full Screen Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-white transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col p-8 md:p-16">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-text-primary hover:text-cobalt transition-colors"
            >
              <span className="text-sm font-medium">Close</span>
              <X size={24} />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex-1 flex flex-col justify-center">
            <nav className="space-y-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-h2 text-text-primary hover:text-cobalt transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* CTA */}
          <div className="pt-8 border-t border-gray-200">
            <button 
              onClick={() => scrollToSection('#contact')}
              className="btn-primary bg-cobalt text-white"
            >
              Request Staffing
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
