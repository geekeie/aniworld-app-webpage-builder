
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/hooks/useAdminData';

const ScreenshotsSection = () => {
  const { language } = useLanguage();
  const { screenshots, loading } = useAdminData();

  if (loading) {
    return (
      <section id="screenshots" className="py-16 bg-anime-dark">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-white text-xl">
              {language === 'de' ? 'Screenshots werden geladen...' : 'Loading screenshots...'}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Filter out screenshots with invalid URLs
  const validScreenshots = screenshots.filter(screenshot => 
    screenshot.image_url && 
    screenshot.image_url.trim() !== '' &&
    screenshot.image_url !== 'undefined' &&
    screenshot.image_url !== 'null'
  );

  if (validScreenshots.length === 0) {
    return (
      <section id="screenshots" className="py-16 bg-anime-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">
                {language === 'de' ? 'App Screenshots' : 'App Screenshots'}
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {language === 'de' 
                ? 'Screenshots werden bald hinzugefügt'
                : 'Screenshots will be added soon'
              }
            </p>
            <div className="bg-gray-800/50 rounded-lg p-8 max-w-md mx-auto">
              <div className="text-gray-400 text-center">
                <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <p>
                  {language === 'de'
                    ? 'Keine Screenshots verfügbar'
                    : 'No screenshots available'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="screenshots" className="py-16 bg-anime-dark">
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
          {validScreenshots.map((screenshot) => (
            <div key={screenshot.id} className="group relative overflow-hidden rounded-xl border border-gray-700 bg-anime-darker">
              <div className="aspect-[9/16] overflow-hidden">
                <img
                  src={screenshot.image_url}
                  alt={screenshot.alt_text}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div class="flex flex-col items-center justify-center h-full text-red-400 text-sm bg-gray-800">
                          <div class="text-4xl mb-2">⚠️</div>
                          <div>${language === 'de' ? 'Bild konnte nicht geladen werden' : 'Image failed to load'}</div>
                        </div>
                      `;
                    }
                  }}
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
