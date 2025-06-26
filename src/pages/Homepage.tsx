
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Download from '@/components/Download';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import SEOHead from '@/components/SEOHead';
import ContentSection from '@/components/ContentSection';
import BlogSectionEnhanced from '@/components/BlogSectionEnhanced';
import ScreenshotsSection from '@/components/ScreenshotsSection';
import CustomHeaderCode from '@/components/CustomHeaderCode';
import { getSiteContent } from '@/services/supabaseService';
import { Download as DownloadIcon, Play, Shield, Smartphone, Star, Users, Clock, Globe, Zap, Heart, Award, CheckCircle } from 'lucide-react';

const Homepage = () => {
  const { t, language } = useLanguage();
  const [siteContent, setSiteContent] = useState({
    heroTitle: 'Streame Anime kostenlos mit der AniWorld App',
    heroSubtitle: 'Entdecke tausende Anime-Serien und Filme in HD-Qualität. Kostenlos, ohne Registrierung und ohne Werbung.'
  });

  useEffect(() => {
    // Update document language
    document.documentElement.lang = language;
    
    // Load admin-configured content from database
    const loadContent = async () => {
      try {
        console.log('Loading site content from database...');
        const databaseContent = await getSiteContent();
        console.log('Database content loaded:', databaseContent);
        
        if (databaseContent && typeof databaseContent === 'object') {
          setSiteContent({
            heroTitle: databaseContent.heroTitle || siteContent.heroTitle,
            heroSubtitle: databaseContent.heroSubtitle || siteContent.heroSubtitle
          });
        } else {
          console.log('No database content found, falling back to localStorage');
          // Fallback to localStorage
          const savedContent = localStorage.getItem('siteContent');
          if (savedContent) {
            const parsedContent = JSON.parse(savedContent);
            setSiteContent({
              heroTitle: parsedContent.heroTitle || siteContent.heroTitle,
              heroSubtitle: parsedContent.heroSubtitle || siteContent.heroSubtitle
            });
          }
        }
      } catch (error) {
        console.error('Error loading site content:', error);
        // Fallback to localStorage
        const savedContent = localStorage.getItem('siteContent');
        if (savedContent) {
          const parsedContent = JSON.parse(savedContent);
          setSiteContent({
            heroTitle: parsedContent.heroTitle || siteContent.heroTitle,
            heroSubtitle: parsedContent.heroSubtitle || siteContent.heroSubtitle
          });
        }
      }
    };

    loadContent();
  }, [language]);

  return (
    <>
      <SEOHead />
      <CustomHeaderCode />
      <div className="min-h-screen bg-anime-darker">
        <Navbar />
        <Hero />

        {/* Article Content Section */}
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
            <div id="key-features" className="mb-12">
              <h3 className="text-3xl font-bold mb-8 text-center">
                <span className="text-gradient">
                  {language === 'de' ? 'Wichtige Funktionen der AniWorld Android App' : 'Key Features of AniWorld Android App'}
                </span>
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-anime-dark p-6 rounded-xl border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                    <h4 className="text-lg font-bold text-white">
                      {language === 'de' ? 'Riesige Anime-Bibliothek' : 'Massive Anime Library'}
                    </h4>
                  </div>
                  <p className="text-gray-300">
                    {language === 'de' 
                      ? 'Über 10.000 Anime-Serien und Filme verfügbar. Beliebte Shounen-Serien wie Dragon Ball Z, One Piece, Naruto und Bleach.'
                      : 'Over 10,000 anime series and movies available. Popular Shounen series like Dragon Ball Z, One Piece, Naruto and Bleach.'
                    }
                  </p>
                </div>

                <div className="bg-anime-dark p-6 rounded-xl border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="h-6 w-6 text-anime-pink" />
                    <h4 className="text-lg font-bold text-white">
                      {language === 'de' ? 'Romantische Animes' : 'Romance Anime'}
                    </h4>
                  </div>
                  <p className="text-gray-300">
                    {language === 'de' 
                      ? 'Romantische Animes wie Your Name, A Silent Voice, Toradora und viele weitere emotionale Geschichten.'
                      : 'Romantic anime like Your Name, A Silent Voice, Toradora and many more emotional stories.'
                    }
                  </p>
                </div>

                <div className="bg-anime-dark p-6 rounded-xl border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-6 w-6 text-red-400" />
                    <h4 className="text-lg font-bold text-white">
                      {language === 'de' ? 'Horror & Thriller' : 'Horror & Thriller'}
                    </h4>
                  </div>
                  <p className="text-gray-300">
                    {language === 'de' 
                      ? 'Spannende Horror- und Thriller-Animes wie Another, Parasyte, Tokyo Ghoul und Death Note.'
                      : 'Exciting horror and thriller anime like Another, Parasyte, Tokyo Ghoul and Death Note.'
                    }
                  </p>
                </div>

                <div className="bg-anime-dark p-6 rounded-xl border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="h-6 w-6 text-yellow-400" />
                    <h4 className="text-lg font-bold text-white">
                      {language === 'de' ? 'HD-Qualität' : 'HD Quality'}
                    </h4>
                  </div>
                  <p className="text-gray-300">
                    {language === 'de' 
                      ? 'Streame alle Inhalte in kristallklarer HD-Qualität mit adaptiver Bitrate für beste Qualität.'
                      : 'Stream all content in crystal-clear HD quality with adaptive bitrate for the best quality.'
                    }
                  </p>
                </div>

                <div className="bg-anime-dark p-6 rounded-xl border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="h-6 w-6 text-anime-blue" />
                    <h4 className="text-lg font-bold text-white">
                      {language === 'de' ? 'Schnelle Server' : 'Fast Servers'}
                    </h4>
                  </div>
                  <p className="text-gray-300">
                    {language === 'de' 
                      ? 'Blitzschnelle Ladezeiten und störungsfreies Streaming dank optimierter Server-Infrastruktur.'
                      : 'Lightning-fast loading times and seamless streaming thanks to optimized server infrastructure.'
                    }
                  </p>
                </div>

                <div className="bg-anime-dark p-6 rounded-xl border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="h-6 w-6 text-green-400" />
                    <h4 className="text-lg font-bold text-white">
                      {language === 'de' ? 'Mehrere Sprachen' : 'Multiple Languages'}
                    </h4>
                  </div>
                  <p className="text-gray-300">
                    {language === 'de' 
                      ? 'Verfügbar mit deutschen Untertiteln und Synchronisation für das beste Anime-Erlebnis.'
                      : 'Available with English subtitles and dubbing for the best anime experience.'
                    }
                  </p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                {language === 'de' 
                  ? 'Unsere kostenlose Anime-App enthält jede Art von Anime-Serie, die du dir vorstellen kannst. Von Action-geladenen Abenteuern bis hin zu herzerwärmenden Slice-of-Life-Geschichten. Die App bietet auch eine intuitive Suchfunktion, personalisierte Empfehlungen und die Möglichkeit, deine Lieblings-Animes zu bookmarken.'
                  : 'Our free anime app contains every type of anime series you can imagine. From action-packed adventures to heartwarming slice-of-life stories. The app also offers an intuitive search function, personalized recommendations and the ability to bookmark your favorite anime.'
                }
              </p>
            </div>

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

        <Features />
        <ScreenshotsSection />
        <BlogSectionEnhanced />
        <Download />
        <FAQ />
        <Footer />
        <LanguageSwitcher />
      </div>
    </>
  );
};

export default Homepage;
