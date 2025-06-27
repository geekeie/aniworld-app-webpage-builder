
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/hooks/useAdminData';

const SEOHead = () => {
  const { language } = useLanguage();
  const { content } = useAdminData();

  const metaTitle = content.metaTitle || (language === 'de' 
    ? 'AniWorld App – Kostenlose Anime Streaming APK für Android'
    : 'AniWorld App – Free Anime Streaming APK for Android');

  const metaDescription = content.metaDescription || (language === 'de'
    ? 'Lade die AniWorld App kostenlos herunter und streame Anime-Serien & Filme gratis auf Android. HD, schnelle Server, kein Abo!'
    : 'Download AniWorld App for free and stream anime series & movies for free on Android. HD, fast servers, no subscription!');

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AniWorld App",
    "operatingSystem": "Android",
    "applicationCategory": "Entertainment",
    "description": metaDescription,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": content.appRating,
      "ratingCount": content.totalRatings
    },
    "author": {
      "@type": "Organization",
      "name": "AniWorld Team"
    }
  };

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
      <meta property="og:site_name" content="AniWorld App" />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={content.heroBackgroundImage || '/hero-image.png'} />
      
      {/* Language and locale */}
      <meta property="og:locale" content={language === 'de' ? 'de_DE' : 'en_US'} />
      <meta httpEquiv="content-language" content={language} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Feature snippets optimization */}
      <meta property="article:author" content="AniWorld Team" />
      <meta property="article:publisher" content="AniWorld Team" />
      <meta name="application-name" content="AniWorld App" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="AniWorld" />
    </Helmet>
  );
};

export default SEOHead;
