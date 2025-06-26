
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/hooks/useAdminData';

const SEOHead = () => {
  const { language } = useLanguage();
  const { content } = useAdminData();

  console.log('SEOHead received content:', content);

  const metaTitle = content.metaTitle || (language === 'de' 
    ? 'AniWorld App – Kostenlose Anime Streaming APK für Android'
    : 'AniWorld App – Free Anime Streaming APK for Android');

  const metaDescription = content.metaDescription || (language === 'de'
    ? 'Lade die AniWorld App kostenlos herunter und streame Anime-Serien & Filme gratis auf Android. HD, schnelle Server, kein Abo!'
    : 'Download AniWorld App for free and stream anime series & movies for free on Android. HD, fast servers, no subscription!');

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content="anime app, free anime, android app, anime streaming, anime download, aniworld" />
      <meta name="author" content="AniWorld Team" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph tags */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={content.heroBackgroundImage || '/hero-image.png'} />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={content.heroBackgroundImage || '/hero-image.png'} />
      
      {/* Language and locale */}
      <meta property="og:locale" content={language === 'de' ? 'de_DE' : 'en_US'} />
      <meta httpEquiv="content-language" content={language} />
    </Helmet>
  );
};

export default SEOHead;
