
import React, { useEffect } from 'react';
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
import { Button } from '@/components/ui/button';
import { Download as DownloadIcon, Play, Shield, Smartphone, Star, Users } from 'lucide-react';

const Homepage = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    // Update document language
    document.documentElement.lang = language;
  }, [language]);

  const scrollToDownload = () => {
    const element = document.getElementById('download');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-anime-darker">
        <Navbar />
        <Hero />

        {/* Article Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            
            {/* Article Title */}
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
                ? 'Hast du genug von monatlichen Abogebühren für Anime-Streaming? Genug von Apps, die abstürzen oder nur begrenzte Inhalte bieten? Die AniWorld-App gibt dir Zugang zu tausenden Anime-Episoden – ganz ohne einen Cent auszugeben.'
                : 'Are you tired of monthly subscription fees for anime streaming? Tired of apps that crash or offer only limited content? The AniWorld app gives you access to thousands of anime episodes – without spending a cent.'
              }
              icon={<Users className="h-8 w-8 text-anime-purple" />}
            />

            {/* What Makes Special */}
            <ContentSection
              title={language === 'de' ? 'Was macht die AniWorld App besonders?' : 'What Makes AniWorld App Special?'}
              content={language === 'de' 
                ? 'Die AniWorld Anime App hebt sich in vielerlei Hinsicht von anderen Streaming-Apps ab. Erstens ist sie komplett kostenlos nutzbar. Du musst kein Konto erstellen und keine Kreditkartendaten angeben. Zweitens enthält unsere Anime-Streaming-App jede Art von Anime-Inhalten, die du dir vorstellen kannst.'
                : 'The AniWorld Anime App stands out from other streaming apps in many ways. First, it is completely free to use. You don\'t need to create an account or provide credit card details. Second, our anime streaming app contains every type of anime content you can imagine.'
              }
              icon={<Star className="h-8 w-8 text-anime-pink" />}
            />

            {/* Key Features */}
            <ContentSection
              title={language === 'de' ? 'Wichtige Funktionen der AniWorld Android App' : 'Key Features of AniWorld Android App'}
              content={language === 'de' 
                ? 'Unsere kostenlose Anime-App enthält jede Art von Anime-Serie, die du dir vorstellen kannst. Beliebte Shounen-Serien wie Dragon Ball Z, One Piece und Bleach. Romantische Animes wie Your Name, A Silent Voice und Toradora. Horror- und Thriller-Animes wie Another und Parasyte.'
                : 'Our free anime app contains every type of anime series you can imagine. Popular Shounen series like Dragon Ball Z, One Piece and Bleach. Romantic anime like Your Name, A Silent Voice and Toradora. Horror and thriller anime like Another and Parasyte.'
              }
              icon={<Smartphone className="h-8 w-8 text-anime-blue" />}
            />

            {/* Download Instructions */}
            <ContentSection
              title={language === 'de' ? 'So lädst du die AniWorld APK auf Android herunter' : 'How to Download AniWorld APK on Android'}
              content={language === 'de' 
                ? 'Das Herunterladen der AniWorld APK ist einfach. Da der Google Play Store diese Art von Anime-Apps nicht erlaubt, musst du sie direkt von unserer offiziellen Website herunterladen.'
                : 'Downloading the AniWorld APK is simple. Since the Google Play Store doesn\'t allow this type of anime app, you need to download it directly from our official website.'
              }
              icon={<DownloadIcon className="h-8 w-8 text-green-400" />}
            />

            {/* Safety */}
            <ContentSection
              title={language === 'de' ? 'Ist die AniWorld App sicher?' : 'Is the AniWorld App Safe?'}
              content={language === 'de' 
                ? 'Ja, unsere Anime-Streaming-App ist absolut sicher. Wir sind die offiziellen Entwickler von aniworld.de. Die APK-Datei ist frei von Viren oder Malware. Wir sammeln keine persönlichen Daten.'
                : 'Yes, our anime streaming app is absolutely safe. We are the official developers of aniworld.de. The APK file is free from viruses or malware. We do not collect personal data.'
              }
              icon={<Shield className="h-8 w-8 text-green-500" />}
            />

            {/* System Requirements */}
            <div className="bg-anime-dark p-8 rounded-xl border border-gray-700 mb-12">
              <h2 className="text-3xl font-bold mb-6 text-gradient">
                {language === 'de' ? 'Systemanforderungen' : 'System Requirements'}
              </h2>
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
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-anime-blue rounded-full"></div>
                    <span className="text-gray-300">{language === 'de' ? '100 MB freier Speicherplatz' : '100 MB free storage'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">{language === 'de' ? 'Internetverbindung' : 'Internet connection'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center bg-anime-gradient p-12 rounded-xl mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                {language === 'de' ? 'Starte dein Anime-Abenteuer noch heute' : 'Start Your Anime Adventure Today'}
              </h2>
              <p className="text-xl text-white/90 mb-8">
                {language === 'de' 
                  ? 'Deine Lieblings-Animes sind nur einen Download entfernt.'
                  : 'Your favorite anime is just one download away.'
                }
              </p>
              <Button 
                onClick={scrollToDownload}
                className="bg-white text-anime-purple hover:bg-gray-100 text-lg px-8 py-4 font-bold"
                size="lg"
              >
                <DownloadIcon className="mr-2 h-5 w-5" />
                {t('hero.download')}
              </Button>
            </div>
          </div>
        </div>

        <Features />
        <Download />
        <FAQ />
        <Footer />
        <LanguageSwitcher />
      </div>
    </>
  );
};

export default Homepage;
