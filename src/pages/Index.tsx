import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import { AlarmSection, TintingSection, ArmorSection, ExtrasSection } from '@/components/ServicesSection';
import ContactsSection from '@/components/ContactsSection';
import Footer from '@/components/Footer';
import LeadModal from '@/components/LeadModal';

const SECTIONS = ['hero', 'alarms', 'tinting', 'armor', 'extras', 'contacts'];

export default function Index() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (section: string) => {
    const el = document.getElementById(section);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050a14]">
      <Header activeSection={activeSection} onNavigate={navigateTo} />
      <HeroSection onNavigate={navigateTo} />

      <div className="section-divider w-full max-w-4xl mx-auto" />
      <AlarmSection />

      <div className="section-divider w-full max-w-4xl mx-auto" />
      <TintingSection />

      <div className="section-divider w-full max-w-4xl mx-auto" />
      <ArmorSection />

      <div className="section-divider w-full max-w-4xl mx-auto" />
      <ExtrasSection />

      <div className="section-divider w-full max-w-4xl mx-auto" />
      <ContactsSection />

      <Footer onNavigate={navigateTo} />
      <LeadModal />
    </div>
  );
}
