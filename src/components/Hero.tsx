
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Download, Star } from 'lucide-react';

interface HeroProps {
  content: {
    heroTitle: string;
    heroSubtitle: string;
    downloadButtonText: string;
    heroBackgroundImage: string;
    heroForegroundLogo: string;
    appRating: number;
    totalRatings: number;
  };
}

const Hero = ({ content }: HeroProps) => {
  const { language } = useLanguage();

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
        <div className="text-center max-w-4xl mx-auto">
          {/* Centered Content - Removed title and subtitle as requested */}
          
          {/* Star Rating */}
          <div className="flex justify-center items-center gap-3 mb-8">
            <div className="flex items-center gap-1">
              {renderStars(content.appRating)}
            </div>
            <span className="text-lg font-bold text-yellow-400">{content.appRating}</span>
            <span className="text-gray-400">({content.totalRatings.toLocaleString()} {language === 'de' ? 'Bewertungen' : 'ratings'})</span>
          </div>
          
          {/* CTA Button */}
          <div className="flex justify-center mb-12">
            <Button 
              onClick={scrollToDownload}
              className="btn-anime text-lg px-8 py-4"
              size="lg"
            >
              <Download className="mr-2 h-5 w-5" />
              {content.downloadButtonText}
            </Button>
          </div>

          {/* Stats - Simplified layout */}
          <div className="flex justify-center gap-8 flex-wrap">
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
      </div>
    </section>
  );
};

export default Hero;
