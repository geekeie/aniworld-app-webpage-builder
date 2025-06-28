
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/hooks/useAdminData';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const { t, language } = useLanguage();
  const { content, screenshots } = useAdminData();
  const navigate = useNavigate();
  const location = useLocation();

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '/privacy', label: language === 'de' ? 'Datenschutz' : 'Privacy Policy' },
    { href: '/dmca', label: 'DMCA' },
    { href: '/about', label: language === 'de' ? 'Über uns' : 'About Us' },
    { href: '/contact', label: language === 'de' ? 'Kontakt' : 'Contact' },
  ];

  // Check if there are valid images to show the images nav item
  const hasValidImages = screenshots && screenshots.length > 0 && screenshots.some(screenshot => {
    if (!screenshot.image_url) return false;
    const url = screenshot.image_url.trim();
    if (url === '' || url === 'undefined' || url === 'null') return false;
    return url.startsWith('http') || url.startsWith('https') || url.startsWith('data:image/');
  });

  // Helper function to get navigation text
  const getNavText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        home: 'Home',
        features: 'Features', 
        images: 'App Images',
        download: 'Download',
        faq: 'FAQ'
      },
      de: {
        home: 'Startseite',
        features: 'Features',
        images: 'App Bilder', 
        download: 'Download',
        faq: 'FAQ'
      }
    };
    
    return translations[language]?.[key] || key;
  };

  const scrollToSection = (href: string) => {
    // If not on homepage, navigate to homepage first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete then scroll
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on homepage, just scroll
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Get the logo URL with fallback handling
  const getLogoUrl = () => {
    // Check if headerLogo exists and is a valid URL
    if (content.headerLogo && 
        content.headerLogo.trim() !== '' && 
        content.headerLogo !== 'undefined' && 
        content.headerLogo !== 'null' &&
        (content.headerLogo.startsWith('http') || content.headerLogo.startsWith('data:'))) {
      return content.headerLogo;
    }
    
    return null;
  };

  const logoUrl = getLogoUrl();

  return (
    <footer className="bg-anime-darker py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="flex items-center gap-3">
                {logoUrl && (
                  <img 
                    src={logoUrl} 
                    alt="AniWorld App"
                    width="32"
                    height="32"
                    className="h-8 w-8 object-contain"
                    loading="lazy"
                  />
                )}
                <div className="text-xl font-bold text-gradient">AniWorld</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              {language === 'de' 
                ? 'Die beste kostenlose Anime-Streaming-App für Android. Tausende von Anime-Serien und Filmen in HD-Qualität.'
                : 'The best free anime streaming app for Android. Thousands of anime series and movies in HD quality.'
              }
            </p>
            <p className="text-sm text-gray-500">
              © {currentYear} AniWorld App. {language === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">
              {language === 'de' ? 'Schnelle Links' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('#home')} className="text-gray-400 hover:text-white transition-colors">{getNavText('home')}</button></li>
              <li><button onClick={() => scrollToSection('#features')} className="text-gray-400 hover:text-white transition-colors">{getNavText('features')}</button></li>
              {hasValidImages && (
                <li><button onClick={() => scrollToSection('#images')} className="text-gray-400 hover:text-white transition-colors">{getNavText('images')}</button></li>
              )}
              <li><button onClick={() => scrollToSection('#download')} className="text-gray-400 hover:text-white transition-colors">{getNavText('download')}</button></li>
              <li><button onClick={() => scrollToSection('#faq')} className="text-gray-400 hover:text-white transition-colors">{getNavText('faq')}</button></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-bold mb-4">
              {language === 'de' ? 'Rechtliches' : 'Legal'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-500 text-sm">
            {language === 'de' 
              ? 'AniWorld App ist nicht mit offiziellen Anime-Distributoren verbunden. Alle Inhalte werden von Drittanbietern bereitgestellt.'
              : 'AniWorld App is not affiliated with official anime distributors. All content is provided by third-party sources.'
            }
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
