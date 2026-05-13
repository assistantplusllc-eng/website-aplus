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
              "Assistant Plus was built around the understanding that responsive support and operational consistency directly impact the customer experience.",
              "",
              "Our team-oriented approach emphasizes adaptability, communication, and dependable support across customer-facing and administrative functions."
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
            subheader="Customer Support & Operational Coordination"
            body="We provide contact center, administrative, and workflow support services that help organizations maintain responsive operations and efficient service coordination."
            cta="Explore Our Services"
            ctaLink="/services"
            imageSrc="/what-we-do.png"
            imageAlt="Professional on a call"
            accentType="ring-bottom-left"
            listItems={[
              'Inbound & Outbound Customer Support',
              'Administrative Coordination & Workflow Support',
              'Documentation, Data Entry, & Service Coordination'
            ]}
          />
        </div>

        {/* Section 4: How We Work */}
        <div id="process">
          <ContentSection
            zIndex={40}
            headline={['HOW', 'WE WORK']}
            body=""
            cta="Start a Conversation"
            imageSrc="/collaboration_desk.jpg"
            imageAlt="Professionals collaborating"
            accentType="ring-bottom-left"
            boldListItems={true}
            listItems={[
              'Discovery: We assess your operational needs, support volume, and service goals to build the right operational support model.',
              'Alignment: We align trained professionals to your service goals, ensuring responsive, dependable support across day-to-day functions.',
              'Launch: We implement quickly with structured onboarding, ongoing support, and performance oversight.'
            ]}
          />
        </div>

        {/* Section 5: Industries */}
        <div id="industries">
          <ContentSection
            zIndex={50}
            headline={['INDUSTRIES', 'WE SERVE']}
            body="Our support model is designed to adapt across industries, providing responsive customer support and operational coordination aligned with a wide range of organizational needs."
            cta="See How We Support Your Industry"
            imageSrc="/desk_work.png"
            imageAlt="Professional at desk"
            accentType="quarter-top-right"
            listItems={[
              'Government & Public Sector',
              'Private Sector & Operations',
              'Healthcare Support Services',
              'Financial Services Support'
            ]}
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
        <Route path="/capability-statement" element={<CapabilityStatement />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;