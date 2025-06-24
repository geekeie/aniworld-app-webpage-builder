
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = language === 'de' ? 'Datenschutzerklärung - AniWorld App' : 'Privacy Policy - AniWorld App';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', language === 'de' 
        ? 'Datenschutzerklärung der AniWorld App. Erfahren Sie, wie wir Ihre Daten schützen und verwenden.'
        : 'Privacy Policy of AniWorld App. Learn how we protect and use your data.'
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
              {language === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none text-gray-300">
              {language === 'de' ? (
                <>
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Datenschutz auf einen Blick</h2>
                  <p>Die AniWorld App respektiert Ihre Privatsphäre und schützt Ihre persönlichen Daten. Wir sammeln keine persönlichen Informationen und verwenden keine Tracking-Cookies.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Datenerfassung</h2>
                  <p>Unsere App funktioniert vollständig ohne Registrierung oder Anmeldung. Wir sammeln keine persönlichen Daten wie Namen, E-Mail-Adressen oder Telefonnummern.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Technische Daten</h2>
                  <p>Zur Optimierung der App-Performance können anonyme technische Daten wie Gerätetyp und App-Version erfasst werden. Diese Daten sind nicht mit Ihrer Person verknüpfbar.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Cookies und Tracking</h2>
                  <p>Die AniWorld App verwendet keine Cookies oder Tracking-Technologien. Ihre Nutzung der App wird nicht verfolgt oder analysiert.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Datensicherheit</h2>
                  <p>Alle Datenübertragungen sind verschlüsselt. Wir verwenden moderne Sicherheitsstandards, um Ihre Daten zu schützen.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Ihre Rechte</h2>
                  <p>Sie haben das Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten. Da wir jedoch keine persönlichen Daten sammeln, sind diese Rechte nicht anwendbar.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Kontakt</h2>
                  <p>Bei Fragen zum Datenschutz kontaktieren Sie uns über unsere Kontaktseite.</p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Privacy at a Glance</h2>
                  <p>AniWorld App respects your privacy and protects your personal data. We do not collect personal information and do not use tracking cookies.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Data Collection</h2>
                  <p>Our app works completely without registration or login. We do not collect personal data such as names, email addresses, or phone numbers.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Technical Data</h2>
                  <p>To optimize app performance, anonymous technical data such as device type and app version may be collected. This data cannot be linked to your person.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Cookies and Tracking</h2>
                  <p>AniWorld App does not use cookies or tracking technologies. Your use of the app is not tracked or analyzed.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Data Security</h2>
                  <p>All data transmissions are encrypted. We use modern security standards to protect your data.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Your Rights</h2>
                  <p>You have the right to information, correction, and deletion of your data. However, since we do not collect personal data, these rights are not applicable.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Contact</h2>
                  <p>For privacy questions, contact us through our contact page.</p>
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

export default PrivacyPolicy;
