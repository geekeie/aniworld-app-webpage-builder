
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download as DownloadIcon, Shield, Smartphone, Zap } from 'lucide-react';

const Download = () => {
  const { t } = useLanguage();
  const [content, setContent] = useState({
    appName: 'AniWorld APK',
    appVersion: 'Version 3.2.1',
    appSize: '25 MB',
    appRequirements: 'Android 5.0+',
    downloadButtonText: 'Jetzt herunterladen',
    downloadUrl: '#download'
  });

  useEffect(() => {
    // Load content from localStorage
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      const parsedContent = JSON.parse(savedContent);
      setContent({
        appName: parsedContent.appName || content.appName,
        appVersion: parsedContent.appVersion || content.appVersion,
        appSize: parsedContent.appSize || content.appSize,
        appRequirements: parsedContent.appRequirements || content.appRequirements,
        downloadButtonText: parsedContent.downloadButtonText || content.downloadButtonText,
        downloadUrl: parsedContent.downloadUrl || content.downloadUrl
      });
    }
  }, []);

  const handleDownload = () => {
    // In a real app, this would trigger the actual download
    console.log('Download initiated');
    // You would redirect to the actual APK file
    // window.open('/aniworld-app.apk', '_blank');
  };

  return (
    <section id="download" className="py-20 bg-anime-darker">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">{t('download.title')}</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">{t('download.subtitle')}</p>
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
                      className="btn-anime w-full text-lg py-6 mb-6"
                      size="lg"
                    >
                      <DownloadIcon className="mr-2 h-5 w-5" />
                      {content.downloadButtonText}
                    </Button>

                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-400" />
                        <span>Virus-free</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-400" />
                        <span>Fast Download</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-blue-400" />
                        <span>Android Only</span>
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
                    <h4 className="text-2xl font-bold mb-2">Ready to Download</h4>
                    <p className="opacity-90">Get started in seconds</p>
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
