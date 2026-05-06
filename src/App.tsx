import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './App.css';

import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import ContentSection from './sections/ContentSection';
import ContactSection from './sections/ContactSection';
import CapabilityStatement from './pages/CapabilityStatement';
import Services from './pages/Services';
import About from './pages/About';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
        // Use GSAP for smoother scrolling with pinned sections
        gsap.to(window, {
          scrollTo: { y: element, offsetY: 0 },
          duration: 1,
          ease: 'power2.inOut'
        });
        scrollTarget.current = null;
      } else {
        // Retry if element not ready
        setTimeout(attemptScroll, 200);
      }
    };

    // Wait for everything to mount
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

        {/* Section 2: Who We Are */}
        <div id="about">
          <ContentSection
            zIndex={20}
            headline={['WHO', 'WE ARE']}
            body={[
              "We specialize in contact center and administrative support solutions for government agencies and growing organizations.",
              "",
              "Our approach is built on real-world customer service experience, allowing us to deliver structured, reliable support without the complexity and overhead of traditional hiring models."
            ]}
            cta="Learn How We Work"
            ctaLink="/about"
            imageSrc="/team_meeting.png"
            imageAlt="Team working in modern office"
            accentType="quarter-top-right"
          />
        </div>

        {/* Section 3: What We Do */}
        <div id="services">
          <ContentSection
            zIndex={30}
            headline={['WHAT', 'WE DO']}
            subheader="Reliable Contact Center and Back-Office Support"
            body="We provide dependable contact center, administrative, and back-office support that helps organizations improve operations, enhance customer service, and stay focused on growth."
            cta="Explore Our Services"
            ctaLink="/services"
            imageSrc="/what-we-do.png"
            imageAlt="Professional on a call"
            accentType="ring-bottom-left"
            listItems={[
              'Inbound & Outbound Customer Support',
              'Administrative & Back-Office Support',
              'Data Entry, Documentation, and Coordination'
            ]}
          />
        </div>

        {/* Section 4: Why Clients Choose Us */}
        <div id="why-us">
          <ContentSection
            zIndex={40}
            headline={['WHY CLIENTS', 'CHOOSE US']}
            body="Clients choose Assistant Plus for responsive communication, dependable support teams, and a streamlined onboarding process that makes integration simple and efficient."
            cta="Learn About Our Approach"
            ctaLink="/about#how-we-work"
            imageSrc="/team_meetings.png"
            imageAlt="Team meeting around table"
            accentType="quarter-top-right"
          />
        </div>

        {/* Section 5: How We Work */}
        <div id="process">
          <ContentSection
            zIndex={50}
            headline={['HOW', 'WE WORK']}
            body=""
            cta="Start a Conversation"
            imageSrc="/collaboration_desk.jpg"
            imageAlt="Professionals collaborating"
            accentType="ring-bottom-left"
            boldListItems={true}
            listItems={[
              'Discovery: We assess your operational needs, support volume, and service goals to build the right support structure.',
              'Staffing: We align trained professionals to your operational needs, ensuring the right fit for your operations.',
              'Launch: We implement quickly with structured onboarding, ongoing support, and performance oversight.'
            ]}
          />
        </div>

        {/* Section 6: Industries */}
        <div id="industries">
          <ContentSection
            zIndex={60}
            headline={['INDUSTRIES', 'WE SERVE']}
            body="We provide structured contact center and administrative support solutions tailored to the operational needs of organizations across multiple industries."
            cta="See How We Support Your Industry"
            imageSrc="/desk_work.png"
            imageAlt="Professional at desk"
            accentType="quarter-top-right"
            listItems={[
              'Government & Public Sector',
              'Private Sector & Growing Organizations',
              'Healthcare & Administrative Support',
              'Financial Services & Customer Support'
            ]}
          />
        </div>

        {/* Section 7: Results */}
        <div id="results">
          <ContentSection
            zIndex={70}
            headline={['RESULTS', 'THAT MATTER']}
            body=""
            cta="Talk to our team"
            imageSrc="/agent_smile.jpg"
            imageAlt="Smiling support agent"
            accentType="ring-bottom-left"
            stats={[
              { value: '48-72h', label: 'Average time-to-fill' },
              { value: '95%+', label: 'Attendance reliability' },
              { value: '24/7', label: 'Support Availability' }
            ]}
          />
        </div>

{/* Section 8: Contact */}
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
        <Route path="/capability-statement" element={<CapabilityStatement />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;