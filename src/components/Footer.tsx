
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  const scrollToDownload = () => {
    const element = document.getElementById('download');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
              <div className="w-8 h-8 bg-anime-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-white font-bold text-xl">AniWorld App</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">{t('footer.copyright')}</p>
              <p className="text-gray-500 text-xs mt-1">{t('footer.disclaimer')}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
