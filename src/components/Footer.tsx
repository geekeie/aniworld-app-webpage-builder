
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/hooks/useAdminData';

const Footer = () => {
  const { t, language } = useLanguage();
  const { content } = useAdminData();

  console.log('Footer received content:', content);
  console.log('Footer logo:', content.headerLogo);

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: '/privacy', label: language === 'de' ? 'Datenschutz' : 'Privacy Policy' },
    { href: '/dmca', label: 'DMCA' },
    { href: '/about', label: language === 'de' ? 'Über uns' : 'About Us' },
    { href: '/contact', label: language === 'de' ? 'Kontakt' : 'Contact' },
  ];

  return (
    <footer className="bg-anime-darker py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              {content.headerLogo ? (
                <img 
                  src={content.headerLogo} 
                  alt="AniWorld App"
                  className="h-8 w-auto object-contain mr-3"
                  onError={(e) => {
                    console.error('Footer logo failed to load:', content.headerLogo);
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log('Footer logo loaded successfully:', content.headerLogo);
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
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">{t('nav.home')}</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">{t('nav.features')}</a></li>
              <li><a href="#download" className="text-gray-400 hover:text-white transition-colors">{t('nav.download')}</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">{t('nav.faq')}</a></li>
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
