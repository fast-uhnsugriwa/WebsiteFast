import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FacultyProfile } from './components/FacultyProfile';
import { ProgramStudies } from './components/ProgramStudies';
import { InstagramSection } from './components/InstagramSection';
import { SainsInformasiPage } from './components/SainsInformasiPage';
import { AcademicModal } from './components/AcademicModal';
import { Footer } from './components/Footer';
import { CinematicLightBackground } from './components/CinematicLightBackground';
import { NavDropdownItem } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'sains-informasi'>('home');
  const [selectedDetailItem, setSelectedDetailItem] = useState<NavDropdownItem | null>(null);

  // Sync with browser hash for bookmarking and back button
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#sains-informasi' || hash === '#prodi-sains-informasi') {
        setCurrentPage('sains-informasi');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateHome = () => {
    setCurrentPage('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSainsInformasi = () => {
    setCurrentPage('sains-informasi');
    window.location.hash = 'sains-informasi';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExplorePrograms = () => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      window.location.hash = '';
      setTimeout(() => {
        const el = document.getElementById('program-studi');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('program-studi');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectNavItem = (item: NavDropdownItem) => {
    setSelectedDetailItem(item);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-800 selection:bg-amber-500 selection:text-white relative">
      {/* Global Cinematic Subtle Background Lights */}
      <CinematicLightBackground variant="ambient" />

      {/* Primary Institutional Header */}
      <Header
        currentPage={currentPage}
        onNavigateHome={handleNavigateHome}
        onNavigateSainsInformasi={handleNavigateSainsInformasi}
        onSelectNavItem={handleSelectNavItem}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentPage === 'home' ? (
          <>
            <Hero
              onExplorePrograms={handleExplorePrograms}
              onNavigateSainsInformasi={handleNavigateSainsInformasi}
            />
            <FacultyProfile />
            <ProgramStudies
              onNavigateSainsInformasi={handleNavigateSainsInformasi}
            />
            <InstagramSection />
          </>
        ) : (
          <SainsInformasiPage onBackToHome={handleNavigateHome} />
        )}
      </main>

      {/* Academic Service / Information Modal */}
      <AcademicModal
        item={selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
      />

      {/* Institutional Footer */}
      <Footer
        onSelectNavItem={handleSelectNavItem}
        onNavigateHome={handleNavigateHome}
        onNavigateSainsInformasi={handleNavigateSainsInformasi}
      />
    </div>
  );
}
