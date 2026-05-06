import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services', isExternal: false }, // ← CHANGED: Now scrolls to #services section
    { label: 'Industries', href: '#industries', isExternal: false },
    { label: 'How We Work', href: '#process', isExternal: false },
    { label: 'Results', href: '#results', isExternal: false },
    { label: 'Contact', href: '#contact', isExternal: false },
  ];

  const handleNavClick = (href: string, isExternal: boolean) => {
    setIsOpen(false);

    if (isExternal) {
      // Navigate to different page and scroll to top
      window.scrollTo(0, 0);
      navigate(href);
    } else {
      // Scroll to section
      if (!isHomePage) {
        // If not on homepage, navigate home first then scroll
        navigate('/', { state: { scrollTo: href.replace('#', '') } });
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const goHome = () => {
    if (isHomePage) {
      // If already on homepage, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If on another page, navigate to homepage
      navigate('/');
    }
  };

  return (
    <>
      {/* Fixed Logo - Now navigates to homepage */}
      <button 
        onClick={goHome}
        className="fixed top-4 left-4 z-[200] cursor-pointer"
      >
        <div className="bg-white rounded-md hover:bg-white transition-colors shadow-md overflow-hidden leading-none">
          <img 
            src="/logo-horizontal.png" 
            alt="Assistant Plus" 
            className="h-8 w-auto object-contain" 
          />
        </div>
      </button>

      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-6 right-6 z-[200] flex items-center gap-2 transition-all duration-300 ${
          isScrolled || !isHomePage
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
                  onClick={() => handleNavClick(link.href, link.isExternal)}
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
              onClick={() => handleNavClick('#contact', false)}
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