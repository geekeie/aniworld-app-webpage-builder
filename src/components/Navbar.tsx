
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Download, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerLogo, setHeaderLogo] = useState('/logo.png');
  const location = useLocation();

  useEffect(() => {
    // Load header logo from localStorage
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      const parsedContent = JSON.parse(savedContent);
      if (parsedContent.headerLogo) {
        setHeaderLogo(parsedContent.headerLogo);
      }
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const isHomePage = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-anime-darker/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
              {headerLogo && headerLogo !== '/logo.png' ? (
                <img src={headerLogo} alt="AniWorld Logo" className="w-full h-full object-contain" />
              ) : (
                <div className="w-8 h-8 bg-anime-gradient rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
              )}
            </div>
            <span className="text-white font-bold text-xl">AniWorld</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {isHomePage ? (
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {t('nav.home')}
              </button>
            ) : (
              <Link 
                to="/"
                className="text-gray-300 hover:text-white transition-colors"
              >
                {t('nav.home')}
              </Link>
            )}
            <Link 
              to="/blog"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Blog
            </Link>
            {isHomePage ? (
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {t('nav.faq')}
              </button>
            ) : (
              <Link 
                to="/#faq"
                className="text-gray-300 hover:text-white transition-colors"
              >
                {t('nav.faq')}
              </Link>
            )}
            <Button 
              onClick={() => scrollToSection('download')}
              className="btn-anime"
            >
              <Download className="mr-2 h-4 w-4" />
              {t('nav.download')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              {isHomePage ? (
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  {t('nav.home')}
                </button>
              ) : (
                <Link 
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.home')}
                </Link>
              )}
              <Link 
                to="/blog"
                className="text-gray-300 hover:text-white transition-colors text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              {isHomePage ? (
                <button 
                  onClick={() => scrollToSection('faq')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  {t('nav.faq')}
                </button>
              ) : (
                <Link 
                  to="/#faq"
                  className="text-gray-300 hover:text-white transition-colors text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.faq')}
                </Link>
              )}
              <Button 
                onClick={() => scrollToSection('download')}
                className="btn-anime w-full justify-center"
              >
                <Download className="mr-2 h-4 w-4" />
                {t('nav.download')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
