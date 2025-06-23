
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Image, Search, Youtube } from 'lucide-react';

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Download className="h-12 w-12 text-anime-purple" />,
      title: t('features.free.title'),
      description: t('features.free.desc'),
      gradient: 'from-anime-purple to-purple-600'
    },
    {
      icon: <Image className="h-12 w-12 text-anime-pink" />,
      title: t('features.hd.title'),
      description: t('features.hd.desc'),
      gradient: 'from-anime-pink to-pink-600'
    },
    {
      icon: <Youtube className="h-12 w-12 text-anime-blue" />,
      title: t('features.offline.title'),
      description: t('features.offline.desc'),
      gradient: 'from-anime-blue to-blue-600'
    },
    {
      icon: <Search className="h-12 w-12 text-green-400" />,
      title: t('features.noads.title'),
      description: t('features.noads.desc'),
      gradient: 'from-green-400 to-green-600'
    }
  ];

  return (
    <section id="features" className="py-20 bg-anime-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">{t('features.title')}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="card-anime hover:scale-105 transition-all duration-300 group"
            >
              <CardContent className="p-8 text-center">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${feature.gradient} mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
