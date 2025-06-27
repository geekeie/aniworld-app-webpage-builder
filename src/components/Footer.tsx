
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/hooks/useAdminData';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const { t, language } = useLanguage();
  const { content } = useAdminData();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('Footer received content:', content);
  console.log('Footer logo:', content.headerLogo);

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '/privacy', label: language === 'de' ? 'Datenschutz' : 'Privacy Policy' },
    { href: '/dmca', label: 'DMCA' },
    { href: '/about', label: language === 'de' ? 'Über uns' : 'About Us' },
    { href: '/contact', label: language === 'de' ? 'Kontakt' : 'Contact' },
  ];

  // Helper function to get navigation text
  const getNavText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        home: 'Home',
        features: 'Features', 
        screenshots: 'Screenshots',
        download: 'Download',
        faq: 'FAQ'
      },
      de: {
        home: 'Startseite',
        features: 'Features',
        screenshots: 'Screenshots', 
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

  return (
    <footer className="bg-anime-darker py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              {content.headerLogo && content.headerLogo.trim() !== '' ? (
                <img 
                  src={content.headerLogo} 
                  alt="AniWorld App"
                  className="h-8 w-auto object-contain mr-3"
                  onError={(e) => {
                    console.error('Footer logo failed to load:', content.headerLogo);
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    // Show fallback text
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.fallback-logo')) {
                      const fallback = document.createElement('div');
                      fallback.className = 'text-xl font-bold text-gradient mr-3 fallback-logo';
                      fallback.textContent = 'AniWorld';
                      parent.appendChild(fallback);
                    }
                  }}
                  onLoad={() => {
                    console.log('Footer logo loaded successfully:', content.headerLogo);
                    // Remove any fallback text if image loads successfully
                    const parent = (e.target as HTMLImageElement).parentElement;
                    const fallback = parent?.querySelector('.fallback-logo');
                    if (fallback) {
                      fallback.remove();
                    }
                  }}
                />
              ) : (
                <div className="text-xl font-bold text-gradient mr-3">AniWorld</div>
              )}
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
