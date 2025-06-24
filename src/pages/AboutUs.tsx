
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutUs = () => {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = language === 'de' ? 'Über uns - AniWorld App' : 'About Us - AniWorld App';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', language === 'de' 
        ? 'Erfahren Sie mehr über das AniWorld App Team und unsere Mission, Anime-Fans die beste Streaming-Erfahrung zu bieten.'
        : 'Learn more about the AniWorld App team and our mission to provide anime fans with the best streaming experience.'
      );
    }
  }, [language]);

  return (
    <div className="min-h-screen bg-anime-darker">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              {language === 'de' ? 'Über uns' : 'About Us'}
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none text-gray-300">
              {language === 'de' ? (
                <>
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Unsere Mission</h2>
                  <p>AniWorld App wurde entwickelt, um Anime-Fans weltweit die beste kostenlose Streaming-Erfahrung zu bieten. Wir glauben, dass jeder Zugang zu hochwertigen Anime-Inhalten haben sollte.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Unser Team</h2>
                  <p>Unser engagiertes Team besteht aus leidenschaftlichen Anime-Fans und erfahrenen Entwicklern, die kontinuierlich daran arbeiten, die App zu verbessern und neue Features hinzuzufügen.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Unsere Werte</h2>
                  <ul>
                    <li><strong>Qualität:</strong> Wir bieten nur hochwertige Inhalte in bester Qualität</li>
                    <li><strong>Zugänglichkeit:</strong> Kostenloser Zugang für alle Anime-Fans</li>
                    <li><strong>Privatsphäre:</strong> Schutz der Nutzerdaten hat oberste Priorität</li>
                    <li><strong>Innovation:</strong> Kontinuierliche Verbesserung der Benutzererfahrung</li>
                  </ul>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Unsere Geschichte</h2>
                  <p>AniWorld App startete als kleines Projekt von Anime-Enthusiasten und hat sich zu einer der beliebtesten kostenlosen Anime-Streaming-Plattformen entwickelt.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Kontakt</h2>
                  <p>Haben Sie Fragen oder Anregungen? Kontaktieren Sie uns gerne über unsere Kontaktseite.</p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Our Mission</h2>
                  <p>AniWorld App was developed to provide anime fans worldwide with the best free streaming experience. We believe everyone should have access to high-quality anime content.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Our Team</h2>
                  <p>Our dedicated team consists of passionate anime fans and experienced developers who continuously work to improve the app and add new features.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Our Values</h2>
                  <ul>
                    <li><strong>Quality:</strong> We provide only high-quality content in the best quality</li>
                    <li><strong>Accessibility:</strong> Free access for all anime fans</li>
                    <li><strong>Privacy:</strong> Protecting user data is our top priority</li>
                    <li><strong>Innovation:</strong> Continuous improvement of user experience</li>
                  </ul>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Our Story</h2>
                  <p>AniWorld App started as a small project by anime enthusiasts and has grown into one of the most popular free anime streaming platforms.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Contact</h2>
                  <p>Have questions or suggestions? Feel free to contact us through our contact page.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
