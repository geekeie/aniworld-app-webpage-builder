
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContentSection from '@/components/ContentSection';
import AnimeLibrarySection from '@/components/AnimeLibrarySection';
import SystemRequirementsSection from '@/components/SystemRequirementsSection';
import { Download as DownloadIcon, Users, Star, Shield, Smartphone, Award } from 'lucide-react';

const ArticleContentSection = () => {
  const { language } = useLanguage();

  return (
    <div id="article" className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Article Title - Using h2 since Hero already has h1 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">
              {language === 'de' ? 'AniWorld App: Kostenlose APK für Android herunterladen & Animes schauen' : 'AniWorld App: Free APK for Android Download & Watch Anime'}
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {language === 'de' 
              ? 'Die AniWorld App ist die ultimative kostenlose Anime-Streaming-Lösung für Android-Nutzer. Wenn du Schwierigkeiten hast, einen zuverlässigen Ort zum Ansehen deiner Lieblings-Anime-Serien zu finden, löst diese App das Problem sofort.'
              : 'The AniWorld App is the ultimate free anime streaming solution for Android users. If you have trouble finding a reliable place to watch your favorite anime series, this app solves the problem instantly.'
            }
          </p>
        </div>
        
        {/* Introduction */}
        <ContentSection
          title={language === 'de' ? 'Warum AniWorld App wählen?' : 'Why Choose AniWorld App?'}
          content={language === 'de' 
            ? 'Hast du genug von monatlichen Abogebühren für Anime-Streaming? Genug von Apps, die abstürzen oder nur begrenzte Inhalte bieten? Die AniWorld-App gibt dir Zugang zu tausenden Anime-Episoden – ganz ohne einen Cent auszugeben. Unsere App bietet eine nahtlose Streaming-Erfahrung mit kristallklarer HD-Qualität und blitzschnellen Servern.'
            : 'Are you tired of monthly subscription fees for anime streaming? Tired of apps that crash or offer only limited content? The AniWorld app gives you access to thousands of anime episodes – without spending a cent. Our app provides a seamless streaming experience with crystal-clear HD quality and lightning-fast servers.'
          }
          icon={<Users className="h-8 w-8 text-anime-purple" />}
        />

        <ContentSection
          title={language === 'de' ? 'Was macht die AniWorld App besonders?' : 'What Makes AniWorld App Special?'}
          content={language === 'de' 
            ? 'Die AniWorld Anime App hebt sich in vielerlei Hinsicht von anderen Streaming-Apps ab. Erstens ist sie komplett kostenlos nutzbar. Du musst kein Konto erstellen und keine Kreditkartendaten angeben. Zweitens enthält unsere Anime-Streaming-App jede Art von Anime-Inhalten, die du dir vorstellen kannst. Von klassischen Serien bis hin zu den neuesten Releases – alles ist verfügbar.'
            : 'The AniWorld Anime App stands out from other streaming apps in many ways. First, it is completely free to use. You don\'t need to create an account or provide credit card details. Second, our anime streaming app contains every type of anime content you can imagine. From classic series to the latest releases – everything is available.'
          }
          icon={<Star className="h-8 w-8 text-anime-pink" />}
        />

        {/* Key Features Section */}
        <AnimeLibrarySection />

        <ContentSection
          title={language === 'de' ? 'So lädst du die AniWorld APK auf Android herunter' : 'How to Download AniWorld APK on Android'}
          content={language === 'de' 
            ? 'Das Herunterladen der AniWorld APK ist einfach und sicher. Da der Google Play Store diese Art von Anime-Apps nicht erlaubt, musst du sie direkt von unserer offiziellen Website herunterladen. Folge diesen einfachen Schritten: 1. Gehe zu den Einstellungen deines Android-Geräts. 2. Aktiviere "Unbekannte Quellen" in den Sicherheitseinstellungen. 3. Lade die APK-Datei von unserer Website herunter. 4. Installiere die App und genieße kostenloses Anime-Streaming.'
            : 'Downloading the AniWorld APK is simple and safe. Since the Google Play Store doesn\'t allow this type of anime app, you need to download it directly from our official website. Follow these simple steps: 1. Go to your Android device settings. 2. Enable "Unknown Sources" in security settings. 3. Download the APK file from our website. 4. Install the app and enjoy free anime streaming.'
          }
          icon={<DownloadIcon className="h-8 w-8 text-green-400" />}
        />

        <ContentSection
          title={language === 'de' ? 'Ist die AniWorld App sicher?' : 'Is the AniWorld App Safe?'}
          content={language === 'de' 
            ? 'Ja, unsere Anime-Streaming-App ist absolut sicher und vertrauenswürdig. Wir sind die offiziellen Entwickler von aniworld.de. Die APK-Datei ist frei von Viren, Malware oder Spyware. Wir sammeln keine persönlichen Daten und respektieren deine Privatsphäre. Alle Downloads werden regelmäßig von Sicherheitsexperten überprüft.'
            : 'Yes, our anime streaming app is absolutely safe and trustworthy. We are the official developers of aniworld.de. The APK file is free from viruses, malware or spyware. We do not collect personal data and respect your privacy. All downloads are regularly checked by security experts.'
          }
          icon={<Shield className="h-8 w-8 text-green-500" />}
        />

        <ContentSection
          title={language === 'de' ? 'Leistung und Kompatibilität' : 'Performance and Compatibility'}
          content={language === 'de' 
            ? 'Die AniWorld App wurde für optimale Leistung auf allen Android-Geräten entwickelt. Sie läuft flüssig auf älteren Geräten ab Android 5.0 und nutzt moderne Technologien für bessere Streaming-Qualität. Die App ist nur 25 MB groß und benötigt minimal Speicherplatz. Automatische Qualitätsanpassung sorgt für störungsfreies Streaming auch bei langsameren Internetverbindungen.'
            : 'The AniWorld App is designed for optimal performance on all Android devices. It runs smoothly on older devices from Android 5.0 and uses modern technologies for better streaming quality. The app is only 25 MB in size and requires minimal storage space. Automatic quality adjustment ensures smooth streaming even with slower internet connections.'
          }
          icon={<Smartphone className="h-8 w-8 text-anime-blue" />}
        />

        {/* System Requirements */}
        <SystemRequirementsSection />

        <ContentSection
          title={language === 'de' ? 'Benutzerfreundliche Oberfläche' : 'User-Friendly Interface'}
          content={language === 'de' 
            ? 'Die AniWorld App verfügt über eine moderne, intuitive Benutzeroberfläche, die speziell für Anime-Fans entwickelt wurde. Einfache Navigation, erweiterte Suchfilter nach Genre, Jahr und Beliebtheit. Dark Mode für angenehmes Schauen in dunklen Umgebungen. Personalisierte Empfehlungen basierend auf deinem Viewing-Verlauf.'
            : 'The AniWorld App features a modern, intuitive user interface designed specifically for anime fans. Easy navigation, advanced search filters by genre, year and popularity. Dark mode for comfortable viewing in dark environments. Personalized recommendations based on your viewing history.'
          }
          icon={<Award className="h-8 w-8 text-anime-purple" />}
        />
      </div>
    </div>
  );
};

export default ArticleContentSection;
