
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getScreenshots } from '@/services/supabaseService';

interface AppScreenshot {
  id: string;
  image_url: string;
  alt_text: string;
  title?: string;
}

const ScreenshotsSection = () => {
  const { language } = useLanguage();
  const [screenshots, setScreenshots] = useState<AppScreenshot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScreenshots = async () => {
      try {
        setLoading(true);
        console.log('Loading screenshots from database...');
        const screenshotsData = await getScreenshots();
        console.log('Loaded screenshots from database:', screenshotsData);
        
        if (screenshotsData && screenshotsData.length > 0) {
          setScreenshots(screenshotsData);
        } else {
          console.log('No screenshots found in database');
        }
      } catch (error) {
        console.error('Error loading screenshots from database:', error);
        // Fallback to localStorage for backwards compatibility
        try {
          const savedScreenshots = localStorage.getItem('aniworld_screenshots');
          console.log('Falling back to localStorage screenshots:', savedScreenshots);
          
          if (savedScreenshots) {
            const parsedScreenshots = JSON.parse(savedScreenshots);
            // Transform legacy format to new format
            const transformedScreenshots = parsedScreenshots.map((screenshot: any) => ({
              id: screenshot.id,
              image_url: screenshot.image || screenshot.image_url,
              alt_text: screenshot.alt || screenshot.alt_text,
              title: screenshot.title
            }));
            setScreenshots(transformedScreenshots);
          }
        } catch (localStorageError) {
          console.error('Error loading screenshots from localStorage:', localStorageError);
        }
      } finally {
        setLoading(false);
      }
    };

    loadScreenshots();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-anime-dark">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-white text-xl">Loading screenshots...</div>
          </div>
        </div>
      </section>
    );
  }

  if (screenshots.length === 0) {
    console.log('No screenshots to display, hiding section');
    return null;
  }

  console.log('Rendering screenshots section with', screenshots.length, 'screenshots');

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
          {screenshots.map((screenshot) => {
            console.log('Rendering screenshot:', screenshot.id, screenshot.image_url);
            return (
              <div key={screenshot.id} className="group relative overflow-hidden rounded-xl border border-gray-700 bg-anime-darker">
                <div className="aspect-[9/16] overflow-hidden">
                  <img
                    src={screenshot.image_url}
                    alt={screenshot.alt_text}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      console.error('Image failed to load:', screenshot.image_url);
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      // Show error message
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="flex items-center justify-center h-full text-red-400 text-sm">Image failed to load</div>';
                      }
                    }}
                    onLoad={() => {
                      console.log('Image loaded successfully:', screenshot.image_url);
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ScreenshotsSection;
