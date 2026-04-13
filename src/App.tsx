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
        
        <div id="about">
          <ContentSection
            zIndex={20}
            headline={['WHO', 'WE ARE']}
            body="We are a U.S.-based service provider specializing in contact center and administrative support solutions for government agencies and growing organizations.
                  Our approach is built on real-world experience in customer service operations, allowing us to deliver structured, reliable support without the complexity and overhead of traditional hiring models."
            cta="View Our Capabilities"
            imageSrc="/team_meeting.jpg"
            imageAlt="Team working in modern office"
            accentType="quarter-top-right"
          />
        </div>

        <div id="services">
          <ContentSection
            zIndex={30}
            headline={['WHAT', 'WE DO']}
            subheader="Reliable Contact Center and Back-Office Support"
            body="We provide dependable contact center, administrative, and back-office support services designed to help organizations improve operations, serve customers effectively, and stay focused on growth."
            cta="Explore Our Services"
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

        <div id="why-us">
          <ContentSection
            zIndex={40}
            headline={['WHY CLIENTS', 'CHOOSE US']}
            body="We deliver structured, dependable support with a focus on consistency, communication, and performance."
            cta="Learn About Our Approach"
            imageSrc="/team_meeting.jpg"
            imageAlt="Team meeting around table"
            accentType="quarter-top-right"
          />
        </div>

        <div id="process">
          <ContentSection
            zIndex={50}
            headline={['HOW', 'WE WORK']}
            body=""
            cta="Start a Conversation"
            imageSrc="/collaboration_desk.jpg"
            imageAlt="Professionals collaborating"
            accentType="ring-bottom-left"
            listItems={[
              'Discovery — We assess your operational needs, volume, and service goals to build the right support structure.',
              'Staffing — We align trained professionals to your requirements, ensuring the right fit for your operations.',
              'Launch — We implement quickly with structured onboarding, ongoing support, and performance oversight.'
            ]}
          />
        </div>

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

        <div id="contact">
          <ContactSection />
        </div>
      </main>
    </div>
  );
}

export default App;