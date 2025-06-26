
import React, { useEffect, useState } from 'react';
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
import { getSiteContent } from '@/services/supabaseService';

const Homepage = () => {
  const { t, language } = useLanguage();
  const [siteContent, setSiteContent] = useState({
    heroTitle: 'Streame Anime kostenlos mit der AniWorld App',
    heroSubtitle: 'Entdecke tausende Anime-Serien und Filme in HD-Qualität. Kostenlos, ohne Registrierung und ohne Werbung.'
  });

  useEffect(() => {
    // Update document language
    document.documentElement.lang = language;
    
    // Load admin-configured content from database
    const loadContent = async () => {
      try {
        console.log('Loading site content from database...');
        const databaseContent = await getSiteContent();
        console.log('Database content loaded:', databaseContent);
        
        if (databaseContent && typeof databaseContent === 'object' && !Array.isArray(databaseContent)) {
          const contentObj = databaseContent as Record<string, any>;
          setSiteContent({
            heroTitle: contentObj.heroTitle || siteContent.heroTitle,
            heroSubtitle: contentObj.heroSubtitle || siteContent.heroSubtitle
          });
        } else {
          console.log('No database content found, falling back to localStorage');
          // Fallback to localStorage
          const savedContent = localStorage.getItem('siteContent');
          if (savedContent) {
            const parsedContent = JSON.parse(savedContent);
            setSiteContent({
              heroTitle: parsedContent.heroTitle || siteContent.heroTitle,
              heroSubtitle: parsedContent.heroSubtitle || siteContent.heroSubtitle
            });
          }
        }
      } catch (error) {
        console.error('Error loading site content:', error);
        // Fallback to localStorage
        const savedContent = localStorage.getItem('siteContent');
        if (savedContent) {
          const parsedContent = JSON.parse(savedContent);
          setSiteContent({
            heroTitle: parsedContent.heroTitle || siteContent.heroTitle,
            heroSubtitle: parsedContent.heroSubtitle || siteContent.heroSubtitle
          });
        }
      }
    };

    loadContent();
  }, [language]);

  return (
    <>
      <SEOHead />
      <CustomHeaderCode />
      <div className="min-h-screen bg-anime-darker">
        <Navbar />
        <Hero />
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
