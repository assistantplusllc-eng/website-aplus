import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import ContentSection from './sections/ContentSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Global snap configuration
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (allow small buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
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
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Who We Are */}
        <div id="about">
          <ContentSection
            zIndex={20}
            headline={['WHO', 'WE ARE']}
            body="We're a U.S.-based operations partner that helps government agencies and growing companies build reliable support teams—without the overhead of traditional hiring."
            cta="Meet the team"
            imageSrc="/team_office.jpg"
            imageAlt="Team working in modern office"
            accentType="quarter-top-right"
          />
        </div>

        {/* Section 3: What We Do */}
        <div id="services">
          <ContentSection
            zIndex={30}
            headline={['WHAT', 'WE DO']}
            body=""
            cta="See all services"
            imageSrc="/professional_call.jpg"
            imageAlt="Professional on a call"
            accentType="ring-bottom-left"
            listItems={[
              'Contact Center Operations',
              'Back-Office & Data Entry',
              'Executive & Virtual Assistance'
            ]}
          />
        </div>

        {/* Section 4: Why Clients Choose Us */}
        <div id="why-us">
          <ContentSection
            zIndex={40}
            headline={['WHY CLIENTS', 'CHOOSE US']}
            body="Fast onboarding, clear communication, and people who actually show up ready to work. We handle compliance, scheduling, and quality—so you don't have to."
            cta="How we ensure quality"
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
            cta="Start a project"
            imageSrc="/collaboration_desk.jpg"
            imageAlt="Professionals collaborating"
            accentType="ring-bottom-left"
            listItems={[
              'Discovery — understand your volume and goals.',
              'Staffing — match trained candidates to your needs.',
              'Launch — onboard quickly with ongoing oversight.'
            ]}
          />
        </div>

        {/* Section 6: Industries */}
        <div id="industries">
          <ContentSection
            zIndex={60}
            headline={['INDUSTRIES', 'WE SERVE']}
            body=""
            cta="Request sector details"
            imageSrc="/desk_work.jpg"
            imageAlt="Professional at desk"
            accentType="quarter-top-right"
            listItems={[
              'Government & Public Sector',
              'Healthcare Administration',
              'Legal & Professional Services',
              'Logistics & Operations'
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

export default App;
