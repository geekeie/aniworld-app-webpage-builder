
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
import BlogSectionEnhanced from '@/components/BlogSectionEnhanced';
import ScreenshotsSection from '@/components/ScreenshotsSection';
import CustomHeaderCode from '@/components/CustomHeaderCode';
import ArticleContentSection from '@/components/ArticleContentSection';
import { useAdminData } from '@/hooks/useAdminData';

const Homepage = () => {
  const { language } = useLanguage();
  const { content, loading } = useAdminData();

  useEffect(() => {
    // Update document language
    document.documentElement.lang = language;
  }, [language]);

  if (loading) {
    return (
      <div className="min-h-screen bg-anime-darker flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <SEOHead />
      <CustomHeaderCode />
      <div className="min-h-screen bg-anime-darker">
        <Navbar />
        <Hero content={content} />
        <ArticleContentSection />
        <Features />
        <ScreenshotsSection />
        <BlogSectionEnhanced />
        <Download />
        <FAQ />
        <Footer />
        <LanguageSwitcher />
      </div>
    </>
  );
};

export default Homepage;
