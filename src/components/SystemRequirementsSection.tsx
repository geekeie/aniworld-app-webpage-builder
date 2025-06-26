
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const SystemRequirementsSection = () => {
  const { language } = useLanguage();

  return (
    <div className="bg-anime-dark p-8 rounded-xl border border-gray-700 mb-12">
      <h3 className="text-3xl font-bold mb-6 text-gradient">
        {language === 'de' ? 'Systemanforderungen' : 'System Requirements'}
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-anime-purple rounded-full"></div>
            <span className="text-gray-300">Android 5.0+</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-anime-pink rounded-full"></div>
            <span className="text-gray-300">{language === 'de' ? 'Mindestens 2 GB RAM' : 'Minimum 2 GB RAM'}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-anime-blue rounded-full"></div>
            <span className="text-gray-300">{language === 'de' ? '25 MB freier Speicherplatz' : '25 MB free storage'}</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-gray-300">{language === 'de' ? 'Internetverbindung' : 'Internet connection'}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-gray-300">{language === 'de' ? 'GPU-Beschleunigung empfohlen' : 'GPU acceleration recommended'}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span className="text-gray-300">{language === 'de' ? 'Android 10+ für beste Leistung' : 'Android 10+ for best performance'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemRequirementsSection;
