
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AppScreenshot {
  id: string;
  image: string;
  alt: string;
  title?: string;
}

const ScreenshotsSection = () => {
  const { language } = useLanguage();
  const [screenshots, setScreenshots] = useState<AppScreenshot[]>([]);

  useEffect(() => {
    const savedScreenshots = localStorage.getItem('aniworld_screenshots');
    if (savedScreenshots) {
      setScreenshots(JSON.parse(savedScreenshots));
    }
  }, []);

  if (screenshots.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-anime-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">
              {language === 'de' ? 'App Screenshots' : 'App Screenshots'}
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            {language === 'de' 
              ? 'Sehen Sie sich die AniWorld App in Aktion an'
              : 'See the AniWorld App in action'
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {screenshots.map((screenshot) => (
            <div key={screenshot.id} className="group relative overflow-hidden rounded-xl border border-gray-700 bg-anime-darker">
              <div className="aspect-[9/16] overflow-hidden">
                <img
                  src={screenshot.image}
                  alt={screenshot.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              {screenshot.title && (
                <div className="p-4">
                  <h3 className="text-white font-medium text-center">{screenshot.title}</h3>
                </div>
              )}
              {/* Overlay for hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScreenshotsSection;
