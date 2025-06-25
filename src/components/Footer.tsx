
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [headerLogo, setHeaderLogo] = useState('/logo.png');

  useEffect(() => {
    // Load header logo from localStorage to sync with navbar
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      const parsedContent = JSON.parse(savedContent);
      if (parsedContent.headerLogo) {
        setHeaderLogo(parsedContent.headerLogo);
      }
    }
  }, []);

  const scrollToDownload = () => {
    // If we're not on the homepage, navigate to homepage first
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      // Use setTimeout to ensure navigation completes before scrolling
      setTimeout(() => {
        const element = document.getElementById('download');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // We're already on homepage, just scroll
      const element = document.getElementById('download');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-anime-darker border-t border-gray-800">
      {/* Final CTA Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Ready to start watching?</span>
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Join millions of anime fans worldwide
          </p>
          <Button 
            onClick={scrollToDownload}
            className="btn-anime text-lg px-8 py-4"
            size="lg"
          >
            <Download className="mr-2 h-5 w-5" />
            {t('hero.download')}
          </Button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                {headerLogo && headerLogo !== '/logo.png' ? (
                  <img src={headerLogo} alt="AniWorld Logo" className="w-full h-full object-contain" />
                ) : (
                  <div className="w-8 h-8 bg-anime-gradient rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                )}
              </div>
              <span className="text-white font-bold text-xl">AniWorld App</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">© 2025 AniWorld App. All rights reserved.</p>
              <p className="text-gray-500 text-xs mt-1">For entertainment purposes only. Updated for 2025.</p>
              <div className="mt-2 flex flex-wrap justify-center md:justify-end gap-4">
                <Link 
                  to="/privacy" 
                  className="text-gray-400 hover:text-white text-xs transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link 
                  to="/dmca" 
                  className="text-gray-400 hover:text-white text-xs transition-colors"
                >
                  DMCA Policy
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-white text-xs transition-colors"
                >
                  About Us
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-white text-xs transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
