
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '@/hooks/useAdminData';

const AppImagesSection = () => {
  const { language } = useLanguage();
  const { screenshots } = useAdminData();

  // Filter out screenshots with invalid URLs - more permissive validation
  const validImages = screenshots.filter(screenshot => {
    if (!screenshot.image_url) return false;
    
    const url = screenshot.image_url.trim();
    if (url === '' || url === 'undefined' || url === 'null') return false;
    
    // Allow both HTTP URLs and base64 data URLs
    return url.startsWith('http') || url.startsWith('https') || url.startsWith('data:image/');
  });

  // Don't render the section if there are no valid images
  if (validImages.length === 0) {
    return null;
  }

  return (
    <section id="images" className="py-16 bg-anime-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">
              {language === 'de' ? 'App Bilder' : 'App Images'}
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            {language === 'de' 
              ? 'Sehen Sie sich die AniWorld App in Aktion an'
              : 'See the AniWorld App in action'
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {validImages.map((image) => (
            <div key={image.id} className="group relative overflow-hidden rounded-xl border border-gray-700 bg-anime-darker transform transition-all duration-300 hover:scale-105 hover:border-purple-500/50">
              <div className="aspect-[9/16] overflow-hidden relative">
                <img
                  src={image.image_url}
                  alt={image.alt_text || (language === 'de' ? 'App Bild' : 'App Image')}
                  width="300"
                  height="533"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Title overlay */}
                {image.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-medium text-center text-lg drop-shadow-lg">
                      {image.title}
                    </h3>
                  </div>
                )}
              </div>
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppImagesSection;
