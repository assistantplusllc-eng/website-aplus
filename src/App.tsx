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
              "We are a U.S.-based service provider specializing in contact center and administrative support solutions for government agencies and growing organizations.",
              "Our approach is built on real-world experience in customer service operations, allowing us to deliver structured, reliable support without the complexity and overhead of traditional hiring models."
            ]}
            cta="View Our Capabilities"
            ctaLink="/capability-statement"
            imageSrc="/team_meeting.jpg"
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
            body="We provide dependable contact center, administrative, and back-office support services designed to help organizations improve operations, serve customers effectively, and stay focused on growth."
            cta="Explore Our Services"
            ctaLink="/services"
            imageSrc="/professional_call.jpg"
            imageAlt="Professional on a call"
            accentType="ring-bottom-left"
            listItems={[
              'Inbound and Outbound Customer Support',
              'Administrative and Back-Office Support',
              'Data Entry, Documentation, and Coordination'
            ]}
          />
        </div>

        {/* Section 4: Why Clients Choose Us */}
        <div id="why-us">
          <ContentSection
            zIndex={40}
            headline={['WHY CLIENTS', 'CHOOSE US']}
            body="Fast onboarding, clear communication, and people who actually show up ready to work. We handle compliance, scheduling, and quality—so you don't have to."
            cta="Learn About Our Approach"
            imageSrc="/team_meeting.jpg"
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
              'Discovery: We assess your operational needs, volume, and service goals to build the right support structure.',
              'Staffing: We align trained professionals to your requirements, ensuring the right fit for your operations.',
              'Launch: We implement quickly with structured onboarding, ongoing support, and performance oversight.'
            ]}
          />
        </div>

        {/* Section 6: Industries */}
        <div id="industries">
          <ContentSection
            zIndex={60}
            headline={['INDUSTRIES', 'WE SERVE']}
            body="We support a range of industries by providing structured contact center and administrative services tailored to each organization's needs."
            cta="See How We Support Your Industry"
            imageSrc="/desk_work.jpg"
            imageAlt="Professional at desk"
            accentType="quarter-top-right"
            listItems={[
              'Government & Public Sector',
              'Small Business & Growing Organizations',
              'Healthcare & Medical Administrative Support',
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
              { value: '2x', label: 'Faster onboarding' }
            ]}
          />
        </div>

        {/* Section 8: Client Story */}
        <div id="testimonial">
          <ContentSection
            zIndex={80}
            headline={['CLIENT', 'STORY']}
            body=""
            cta="Read more stories"
            imageSrc="/document_review.jpg"
            imageAlt="Colleagues reviewing documents"
            accentType="quarter-top-right"
            quote={{
              text: "Assistant Plus scaled our intake team in 3 days. Quality stayed high, and our managers finally got time back.",
              attribution: "— Operations Lead, Public Sector Agency"
            }}
          />
        </div>

        {/* Section 9: Flexible Packages */}
        <div id="packages">
          <ContentSection
            zIndex={90}
            headline={['FLEXIBLE', 'PACKAGES']}
            body=""
            cta="Get a custom quote"
            imageSrc="/professional_call.jpg"
            imageAlt="Professional consultation"
            accentType="quarter-behind"
            listItems={[
              'On-Demand Support',
              'Dedicated Teams',
              'Full Program Management'
            ]}
          />
        </div>

        {/* Section 10: Contact */}
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
      </Routes>
    </Router>
  );
}

export default App;