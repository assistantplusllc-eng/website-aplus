import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './App.css';

import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import ContentSection from './sections/ContentSection';
import ContactSection from './sections/ContactSection';
import Services from './pages/Services';
import About from './pages/About';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Main page component with all sections
function MainPage() {
  const location = useLocation();
  const hasScrolled = useRef(false);

  // Handle scroll to section from navigation state
  useEffect(() => {
    if (!location.state?.scrollTo || hasScrolled.current) return;

    const targetId = location.state.scrollTo;

    // Wait for page to fully render and GSAP to initialize
    const timer = setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        hasScrolled.current = true;
        // Clear the state so refresh doesn't scroll again
        window.history.replaceState({}, document.title);
      }
    }, 1200); // Longer delay to ensure everything renders

    return () => clearTimeout(timer);
  }, [location]);

  // Reset scroll flag when location changes
  useEffect(() => {
    hasScrolled.current = false;
  }, [location.pathname]);

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
              "Assistant Plus delivers responsive support and operational consistency — because both directly shape the customer experience.",
              "",
              "We prioritize adaptability, clear communication, and dependable execution across every customer-facing and administrative function."
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
            body="Contact center, administrative, and workflow support that keeps operations responsive and service coordination efficient."
            cta="Explore Our Services"
            ctaLink="/services"
            imageSrc="/what-we-do.png"
            imageAlt="Professional on a call"
            accentType="ring-bottom-left"
            listItems={[
              'Omnichannel Customer Support',
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
            ctaLink="/services#get-started"
            imageSrc="/collaboration_desk.jpg"
            imageAlt="Professionals collaborating"
            accentType="ring-bottom-left"
            timelineItems={[
              'Discovery: We map your operational needs, support volume, and service goals — then design the support structure that fits.',
              'Alignment: We match trained professionals to your environment, ensuring responsive coverage across day-to-day operations.',
              'Launch: Fast, structured onboarding with ongoing oversight from day one.'
            ]}
          />
        </div>

        {/* Section 5: Industries */}
        <div id="industries">
          <ContentSection
            zIndex={50}
            headline={['INDUSTRIES', 'WE SERVE']}
            body="Support that adapts to industry requirements — from public sector compliance to private-sector pace."
            imageSrc="/desk_work.png"
            imageAlt="Professional at desk"
            accentType="quarter-top-right"
            cardItems={[
              'Government Agencies',
              'Professional Services',
              'Utilities & Consumer Services',
              'Financial Services & Insurance',
              'Travel & Hospitality',
              'Healthcare & Wellness',
              'E-Commerce'
            ]}
            downloadCta={{
              label: 'Download Capability Statement',
              file: '/capability-statement.pdf'
            }}
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

const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },
  { path: '/services', element: <Services /> },
  { path: '/about', element: <About /> },
  { path: '/terms-of-service', element: <TermsOfService /> },
  { path: '/privacy-policy', element: <PrivacyPolicy /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;