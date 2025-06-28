
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
import AppImagesSection from '@/components/AppImagesSection';
import CustomHeaderCode from '@/components/CustomHeaderCode';
import ArticleContentSection from '@/components/ArticleContentSection';
import { useAdminData } from '@/hooks/useAdminData';

const Homepage = () => {
  const { language } = useLanguage();
  const { content, initialLoadComplete } = useAdminData();

  useEffect(() => {
    // Update document language
    document.documentElement.lang = language;
  }, [language]);

  // Show loading state until initial data load is complete
  if (!initialLoadComplete) {
    return (
      <div className="min-h-screen bg-anime-darker flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
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
        <AppImagesSection />
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
