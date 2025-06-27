
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminData } from '@/hooks/useAdminData';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const { content, loading } = useAdminData();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'features', href: '#features' },
    { key: 'images', href: '#images' },
    { key: 'download', href: '#download' },
    { key: 'faq', href: '#faq' }
  ];

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
    setIsOpen(false);
  };

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

  // Get the logo URL with fallback handling
  const getLogoUrl = () => {
    if (loading) return null;
    
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-anime-darker/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              {logoUrl && (
                <img 
                  src={logoUrl} 
                  alt="AniWorld App"
                  className="h-8 w-auto object-contain"
                  onError={(e) => {
                    console.error('Header logo failed to load:', logoUrl);
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              )}
              <div className="text-xl font-bold text-gradient">AniWorld</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {getNavText(item.key)}
              </button>
            ))}
            <Button
              onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:text-white"
            >
              {language === 'de' ? 'EN' : 'DE'}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-anime-darker border-t border-gray-800">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="block px-3 py-2 text-gray-300 hover:text-white transition-colors w-full text-left"
                >
                  {getNavText(item.key)}
                </button>
              ))}
              <Button
                onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:text-white ml-3 mt-2"
              >
                {language === 'de' ? 'EN' : 'DE'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
