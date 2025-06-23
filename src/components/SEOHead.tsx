
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';

const SEOHead = () => {
  const { language, t } = useLanguage();

  useEffect(() => {
    // Update title and meta description
    document.title = t('site.title');
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('site.description'));
    }

    // Add structured data for SoftwareApplication
    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "AniWorld App",
      "applicationCategory": "Entertainment",
      "operatingSystem": "Android",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      },
      "downloadUrl": "https://aniworldapp.de/download",
      "description": t('site.description'),
      "softwareVersion": "2.1.0",
      "fileSize": "25MB",
      "requiresMemory": "Android 5.0+",
      "screenshot": "https://aniworldapp.de/screenshot.jpg"
    };

    // Add FAQ structured data
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": t('faq.q1'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('faq.a1')
          }
        },
        {
          "@type": "Question",
          "name": t('faq.q2'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('faq.a2')
          }
        },
        {
          "@type": "Question",
          "name": t('faq.q3'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('faq.a3')
          }
        },
        {
          "@type": "Question",
          "name": t('faq.q4'),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t('faq.a4')
          }
        }
      ]
    };

    // Remove existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Add new structured data
    const softwareScript = document.createElement('script');
    softwareScript.type = 'application/ld+json';
    softwareScript.text = JSON.stringify(softwareSchema);
    document.head.appendChild(softwareScript);

    const faqScript = document.createElement('script');
    faqScript.type = 'application/ld+json';
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    // Update alternate language links
    const existingAlternates = document.querySelectorAll('link[rel="alternate"]');
    existingAlternates.forEach(link => link.remove());

    const deLink = document.createElement('link');
    deLink.rel = 'alternate';
    deLink.hreflang = 'de';
    deLink.href = 'https://aniworldapp.de/';
    document.head.appendChild(deLink);

    const enLink = document.createElement('link');
    enLink.rel = 'alternate';
    enLink.hreflang = 'en';
    enLink.href = 'https://aniworldapp.de/en/';
    document.head.appendChild(enLink);

    const xDefaultLink = document.createElement('link');
    xDefaultLink.rel = 'alternate';
    xDefaultLink.hreflang = 'x-default';
    xDefaultLink.href = 'https://aniworldapp.de/';
    document.head.appendChild(xDefaultLink);

  }, [language, t]);

  return null;
};

export default SEOHead;
