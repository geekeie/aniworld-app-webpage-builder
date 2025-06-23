
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex gap-2">
        <Button
          variant={language === 'de' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setLanguage('de')}
          className={language === 'de' ? 'bg-anime-purple hover:bg-anime-purple/80' : 'border-gray-600 hover:bg-gray-800'}
        >
          🇩🇪 DE
        </Button>
        <Button
          variant={language === 'en' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setLanguage('en')}
          className={language === 'en' ? 'bg-anime-purple hover:bg-anime-purple/80' : 'border-gray-600 hover:bg-gray-800'}
        >
          🇺🇸 EN
        </Button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
