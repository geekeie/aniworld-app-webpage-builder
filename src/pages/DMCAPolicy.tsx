
import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const DMCAPolicy = () => {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = language === 'de' ? 'DMCA-Richtlinie - AniWorld App' : 'DMCA Policy - AniWorld App';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', language === 'de' 
        ? 'DMCA-Richtlinie der AniWorld App. Informationen zu Urheberrechten und Meldeverfahren.'
        : 'DMCA Policy of AniWorld App. Information about copyrights and reporting procedures.'
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
              {language === 'de' ? 'DMCA-Richtlinie' : 'DMCA Policy'}
            </h1>
            
            <div className="prose prose-invert prose-lg max-w-none text-gray-300">
              {language === 'de' ? (
                <>
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Digital Millennium Copyright Act (DMCA)</h2>
                  <p>AniWorld App respektiert die Rechte von Urheberrechtsinhabern und hält sich an die Bestimmungen des Digital Millennium Copyright Act (DMCA).</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Meldung von Urheberrechtsverletzungen</h2>
                  <p>Wenn Sie glauben, dass Ihr urheberrechtlich geschütztes Material ohne Ihre Erlaubnis verwendet wird, können Sie eine DMCA-Meldung einreichen.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Erforderliche Informationen für DMCA-Meldungen</h2>
                  <ul>
                    <li>Eine physische oder elektronische Unterschrift des Urheberrechtsinhabers</li>
                    <li>Identifikation des urheberrechtlich geschützten Werks</li>
                    <li>Identifikation des beanstandeten Materials</li>
                    <li>Kontaktinformationen des Meldenden</li>
                    <li>Eine eidesstattliche Erklärung über die Richtigkeit der Angaben</li>
                  </ul>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Gegendarstellung</h2>
                  <p>Wenn Sie glauben, dass Ihr Material fälschlicherweise entfernt wurde, können Sie eine Gegendarstellung einreichen.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Kontakt</h2>
                  <p>Für DMCA-Meldungen kontaktieren Sie uns über unsere Kontaktseite.</p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Digital Millennium Copyright Act (DMCA)</h2>
                  <p>AniWorld App respects the rights of copyright holders and complies with the provisions of the Digital Millennium Copyright Act (DMCA).</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Reporting Copyright Infringement</h2>
                  <p>If you believe that your copyrighted material is being used without your permission, you can file a DMCA notice.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Required Information for DMCA Notices</h2>
                  <ul>
                    <li>A physical or electronic signature of the copyright owner</li>
                    <li>Identification of the copyrighted work</li>
                    <li>Identification of the infringing material</li>
                    <li>Contact information of the complainant</li>
                    <li>A sworn statement about the accuracy of the information</li>
                  </ul>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Counter-Notification</h2>
                  <p>If you believe that your material was wrongfully removed, you can file a counter-notification.</p>
                  
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4">Contact</h2>
                  <p>For DMCA notices, contact us through our contact page.</p>
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

export default DMCAPolicy;
