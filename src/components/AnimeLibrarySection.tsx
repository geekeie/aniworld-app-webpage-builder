
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, Heart, Shield, Zap, Clock, Globe } from 'lucide-react';

const AnimeLibrarySection = () => {
  const { language } = useLanguage();

  return (
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
  );
};

export default AnimeLibrarySection;
