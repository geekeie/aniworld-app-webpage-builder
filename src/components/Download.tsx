
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download as DownloadIcon, Shield, Smartphone, Zap } from 'lucide-react';
import { useAdminData } from '@/hooks/useAdminData';
import { useNavigate, useLocation } from 'react-router-dom';

const Download = () => {
  const { language } = useLanguage();
  const { content } = useAdminData();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('Download component content:', content);
  console.log('Download URL:', content.downloadUrl);

  const handleDownload = () => {
    if (content.downloadUrl && content.downloadUrl.trim() !== '') {
      // Open the download URL in a new tab
      window.open(content.downloadUrl, '_blank');
      console.log('Download initiated for:', content.downloadUrl);
    } else {
      console.log('No download URL configured');
      alert(language === 'de' 
        ? 'Download-URL ist noch nicht konfiguriert. Bitte kontaktieren Sie den Administrator.'
        : 'Download URL is not configured yet. Please contact the administrator.'
      );
    }
  };

  const scrollToDownload = () => {
    // If not on homepage, navigate to homepage first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete then scroll
      setTimeout(() => {
        const element = document.querySelector('#download');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on homepage, just scroll
      const element = document.querySelector('#download');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Helper function to get text
  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        title: 'Download AniWorld App',
        subtitle: 'Get the best anime streaming experience on your Android device',
        buttonText: 'Download Now'
      },
      de: {
        title: 'AniWorld App herunterladen',
        subtitle: 'Holen Sie sich das beste Anime-Streaming-Erlebnis auf Ihr Android-Gerät',
        buttonText: 'Jetzt herunterladen'
      }
    };
    
    return translations[language]?.[key] || key;
  };

  return (
    <section id="download" className="py-20 bg-anime-darker">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">{getText('title')}</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">{getText('subtitle')}</p>
          </div>

          <Card className="card-anime overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2">
                {/* Download Info */}
                <div className="p-8 lg:p-12">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-anime-gradient rounded-lg flex items-center justify-center">
                        <DownloadIcon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{content.appName}</h3>
                        <p className="text-gray-400">{content.appVersion}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                        <div className="text-lg font-bold text-anime-purple">{content.appSize}</div>
                      </div>
                      <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                        <div className="text-lg font-bold text-anime-pink">{content.appRequirements}</div>
                      </div>
                    </div>

                    <Button 
                      onClick={handleDownload}
                      className={`w-full text-lg py-6 mb-6 ${
                        content.downloadUrl && content.downloadUrl.trim() !== '' 
                          ? 'btn-anime' 
                          : 'bg-gray-600 text-gray-300 cursor-not-allowed hover:bg-gray-600'
                      }`}
                      size="lg"
                    >
                      <DownloadIcon className="mr-2 h-5 w-5" />
                      {content.downloadButtonText || getText('buttonText')}
                    </Button>

                    {(!content.downloadUrl || content.downloadUrl.trim() === '') && (
                      <p className="text-sm text-yellow-500 text-center mb-6">
                        {language === 'de' 
                          ? 'Download-URL noch nicht konfiguriert'
                          : 'Download URL not configured yet'
                        }
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-400" />
                        <span>{language === 'de' ? 'Virenfrei' : 'Virus-free'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-400" />
                        <span>{language === 'de' ? 'Schneller Download' : 'Fast Download'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-blue-400" />
                        <span>{language === 'de' ? 'Nur Android' : 'Android Only'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Element */}
                <div className="bg-anime-gradient p-8 lg:p-12 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                      <DownloadIcon className="h-16 w-16" />
                    </div>
                    <h4 className="text-2xl font-bold mb-2">
                      {language === 'de' ? 'Bereit zum Download' : 'Ready to Download'}
                    </h4>
                    <p className="opacity-90">
                      {language === 'de' ? 'In Sekunden bereit' : 'Get started in seconds'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Download;
