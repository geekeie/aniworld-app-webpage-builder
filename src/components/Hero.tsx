
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Download, Star } from 'lucide-react';

const Hero = () => {
  const { t, language } = useLanguage();
  const [content, setContent] = useState({
    heroTitle: language === 'de' ? 'Streame Anime kostenlos mit der AniWorld App' : 'Stream Anime for Free with AniWorld App',
    heroSubtitle: language === 'de' ? 'Entdecke tausende Anime-Serien und Filme in HD-Qualität. Kostenlos, ohne Registrierung und ohne Werbung.' : 'Discover thousands of anime series and movies in HD quality. Free, without registration and without ads.',
    downloadButtonText: language === 'de' ? 'Jetzt herunterladen' : 'Download Now',
    heroBackgroundImage: '/hero-image.png',
    heroForegroundLogo: '',
    appRating: 4.8,
    totalRatings: 12543
  });

  useEffect(() => {
    // Load admin-configured content
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      const parsedContent = JSON.parse(savedContent);
      setContent({
        heroTitle: parsedContent.heroTitle || (language === 'de' ? 'Streame Anime kostenlos mit der AniWorld App' : 'Stream Anime for Free with AniWorld App'),
        heroSubtitle: parsedContent.heroSubtitle || (language === 'de' ? 'Entdecke tausende Anime-Serien und Filme in HD-Qualität. Kostenlos, ohne Registrierung und ohne Werbung.' : 'Discover thousands of anime series and movies in HD quality. Free, without registration and without ads.'),
        downloadButtonText: parsedContent.downloadButtonText || (language === 'de' ? 'Jetzt herunterladen' : 'Download Now'),
        heroBackgroundImage: parsedContent.heroBackgroundImage || '/hero-image.png',
        heroForegroundLogo: parsedContent.heroForegroundLogo || '',
        appRating: parsedContent.appRating || 4.8,
        totalRatings: parsedContent.totalRatings || 12543
      });
    }
  }, [language]);

  const scrollToDownload = () => {
    const element = document.getElementById('download');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400 opacity-50" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-400" />);
    }

    return stars;
  };

  return (
    <section id="home" className="pt-20 pb-16 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">{content.heroTitle}</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              {content.heroSubtitle}
            </p>
            
            {/* Star Rating */}
            <div className="flex justify-center lg:justify-start items-center gap-3 mb-8">
              <div className="flex items-center gap-1">
                {renderStars(content.appRating)}
              </div>
              <span className="text-lg font-bold text-yellow-400">{content.appRating}</span>
              <span className="text-gray-400">({content.totalRatings.toLocaleString()} {language === 'de' ? 'Bewertungen' : 'ratings'})</span>
            </div>
            
            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start mb-12">
              <Button 
                onClick={scrollToDownload}
                className="btn-anime text-lg px-8 py-4"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                {content.downloadButtonText}
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
                <div className="text-2xl font-bold text-anime-blue">{content.appRating}★</div>
                <div className="text-gray-400 text-sm">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - App Preview with Background Image */}
          <div className="flex justify-center lg:justify-end animate-fade-in">
            <div className="relative">
              {/* Background Image Container */}
              <div 
                className="w-80 h-96 rounded-3xl shadow-2xl border border-gray-700 p-6 animate-float relative overflow-hidden"
                style={{
                  backgroundImage: `url(${content.heroBackgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-purple-900/50 rounded-3xl"></div>
                
                {/* Content */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="text-center text-white">
                    {content.heroForegroundLogo ? (
                      <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                        <img 
                          src={content.heroForegroundLogo} 
                          alt="AniWorld App Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl font-bold">A</span>
                      </div>
                    )}
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
