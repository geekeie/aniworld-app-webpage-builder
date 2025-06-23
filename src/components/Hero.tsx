
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const Hero = () => {
  const { t, language } = useLanguage();

  const scrollToDownload = () => {
    const element = document.getElementById('download');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-20 pb-16 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">{t('hero.title')}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start mb-12">
              <Button 
                onClick={scrollToDownload}
                className="btn-anime text-lg px-8 py-4"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                {t('hero.download')}
              </Button>
            </div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-anime-purple">1M+</div>
                <div className="text-gray-400 text-sm">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-anime-pink">10K+</div>
                <div className="text-gray-400 text-sm">Anime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-anime-blue">4.8★</div>
                <div className="text-gray-400 text-sm">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - App Preview */}
          <div className="flex justify-center lg:justify-end animate-fade-in">
            <div className="relative">
              {/* Phone Mockup */}
              <div className="w-80 h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 p-6 animate-float">
                <div className="w-full h-full bg-anime-gradient rounded-2xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold">A</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">AniWorld App</h3>
                    <p className="text-sm opacity-90">Premium Anime Experience</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-anime-purple rounded-full animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-anime-pink rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
