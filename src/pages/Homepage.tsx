
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Download from '@/components/Download';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import SEOHead from '@/components/SEOHead';

const Homepage = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Update document language
    document.documentElement.lang = language;
  }, [language]);

  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-anime-darker">
        <Navbar />
        <Hero />
        <Features />
        <Download />
        <FAQ />
        <Footer />
        <LanguageSwitcher />
      </div>
    </>
  );
};

export default Homepage;
