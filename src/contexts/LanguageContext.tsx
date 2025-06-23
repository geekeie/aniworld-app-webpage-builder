import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LanguageContextType {
  language: 'de' | 'en';
  setLanguage: (lang: 'de' | 'en') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  de: {
    'site.title': 'AniWorld App – Kostenlose Anime Streaming APK für Android',
    'site.description': 'Lade die AniWorld App kostenlos herunter und streame Anime-Serien & Filme gratis auf Android. HD, schnelle Server, kein Abo!',
    'nav.home': 'Startseite',
    'nav.download': 'Download',
    'nav.features': 'Features',
    'nav.faq': 'FAQ',
    'hero.title': 'Streame Anime kostenlos mit der AniWorld App',
    'hero.subtitle': 'Entdecke tausende Anime-Serien und Filme in HD-Qualität. Kostenlos, ohne Registrierung und ohne Werbung.',
    'hero.download': 'Jetzt herunterladen',
    'hero.watchNow': 'Jetzt ansehen',
    'features.title': 'Warum AniWorld App?',
    'features.free.title': 'Komplett kostenlos',
    'features.free.desc': 'Keine versteckten Kosten oder Abonnements',
    'features.hd.title': 'HD-Qualität',
    'features.hd.desc': 'Streame in bester Bild- und Tonqualität',
    'features.offline.title': 'Offline verfügbar',
    'features.offline.desc': 'Lade Episoden herunter und schaue offline',
    'features.noads.title': 'Werbefrei',
    'features.noads.desc': 'Genieße Anime ohne störende Werbung',
    'download.title': 'AniWorld App herunterladen',
    'download.subtitle': 'Verfügbar für Android-Geräte',
    'download.button': 'APK herunterladen',
    'download.version': 'Version 2.1.0',
    'download.size': 'Größe: 25 MB',
    'download.requirements': 'Android 5.0+',
    'faq.title': 'Häufig gestellte Fragen',
    'faq.q1': 'Ist die AniWorld App wirklich kostenlos?',
    'faq.a1': 'Ja, die AniWorld App ist komplett kostenlos. Es gibt keine versteckten Kosten oder Abonnements.',
    'faq.q2': 'Ist die App sicher zu verwenden?',
    'faq.a2': 'Ja, die App ist sicher und enthält keine Malware oder Viren. Wir empfehlen, die App nur von unserer offiziellen Website herunterzuladen.',
    'faq.q3': 'Welche Anime sind verfügbar?',
    'faq.a3': 'Wir bieten eine große Auswahl an Anime-Serien und Filmen, von aktuellen Releases bis hin zu Klassikern.',
    'faq.q4': 'Funktioniert die App offline?',
    'faq.a4': 'Ja, du kannst Episoden herunterladen und offline ansehen, wenn du keine Internetverbindung hast.',
    'footer.copyright': '© 2024 AniWorld App. Alle Rechte vorbehalten.',
    'footer.disclaimer': 'Diese App ist für Bildungszwecke entwickelt.',
  },
  en: {
    'site.title': 'AniWorld App – Free Anime Streaming APK for Android',
    'site.description': 'Download the AniWorld App for free and stream anime series & movies on Android. HD, fast servers, no subscription!',
    'nav.home': 'Home',
    'nav.download': 'Download',
    'nav.features': 'Features',
    'nav.faq': 'FAQ',
    'hero.title': 'Stream Anime for Free with AniWorld App',
    'hero.subtitle': 'Discover thousands of anime series and movies in HD quality. Free, no registration, and ad-free.',
    'hero.download': 'Download Now',
    'hero.watchNow': 'Watch Now',
    'features.title': 'Why AniWorld App?',
    'features.free.title': 'Completely Free',
    'features.free.desc': 'No hidden costs or subscriptions',
    'features.hd.title': 'HD Quality',
    'features.hd.desc': 'Stream in the best video and audio quality',
    'features.offline.title': 'Offline Available',
    'features.offline.desc': 'Download episodes and watch offline',
    'features.noads.title': 'Ad-Free',
    'features.noads.desc': 'Enjoy anime without annoying ads',
    'download.title': 'Download AniWorld App',
    'download.subtitle': 'Available for Android devices',
    'download.button': 'Download APK',
    'download.version': 'Version 2.1.0',
    'download.size': 'Size: 25 MB',
    'download.requirements': 'Android 5.0+',
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'Is the AniWorld App really free?',
    'faq.a1': 'Yes, the AniWorld App is completely free. There are no hidden costs or subscriptions.',
    'faq.q2': 'Is the app safe to use?',
    'faq.a2': 'Yes, the app is safe and contains no malware or viruses. We recommend downloading the app only from our official website.',
    'faq.q3': 'What anime are available?',
    'faq.a3': 'We offer a large selection of anime series and movies, from current releases to classics.',
    'faq.q4': 'Does the app work offline?',
    'faq.a4': 'Yes, you can download episodes and watch them offline when you don\'t have an internet connection.',
    'footer.copyright': '© 2024 AniWorld App. All rights reserved.',
    'footer.disclaimer': 'This app is developed for educational purposes.',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguageState] = useState<'de' | 'en'>('de');

  useEffect(() => {
    const currentLang = location.pathname.startsWith('/en') ? 'en' : 'de';
    setLanguageState(currentLang);
  }, [location.pathname]);

  const setLanguage = (lang: 'de' | 'en') => {
    setLanguageState(lang);
    if (lang === 'en') {
      navigate('/en');
    } else {
      navigate('/');
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
