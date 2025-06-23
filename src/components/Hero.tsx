
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Download, Youtube, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const scrollToDownload = () => {
    const element = document.getElementById('download');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToArticle = () => {
    navigate(language === 'en' ? '/en/article' : '/artikel');
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
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            {/* Article Teaser */}
            <div className="bg-anime-dark p-6 rounded-xl border border-gray-700 mb-8">
              <p className="text-gray-300 mb-4 leading-relaxed">
                {language === 'de' 
                  ? 'Hast du genug von monatlichen Abogebühren für Anime-Streaming? Die AniWorld-App gibt dir Zugang zu tausenden Anime-Episoden – ganz ohne einen Cent auszugeben.'
                  : 'Are you tired of monthly subscription fees for anime streaming? The AniWorld app gives you access to thousands of anime episodes – without spending a cent.'
                }
              </p>
              <Button
                onClick={goToArticle}
                variant="outline"
                className="border-anime-purple text-anime-purple hover:bg-anime-purple hover:text-white"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                {language === 'de' ? 'Vollständigen Artikel lesen' : 'Read Full Article'}
              </Button>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={scrollToDownload}
                className="btn-anime text-lg px-8 py-4"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                {t('hero.download')}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 text-lg px-8 py-4"
              >
                <Youtube className="mr-2 h-5 w-5" />
                {t('hero.watchNow')}
              </Button>
            </div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-8 mt-12">
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
