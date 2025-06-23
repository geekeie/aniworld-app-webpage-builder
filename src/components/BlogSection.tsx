
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, User } from 'lucide-react';
import BlogModal from './BlogModal';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
  imageAlt?: string;
}

const BlogSection = () => {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load blogs from localStorage
    const savedBlogs = localStorage.getItem('aniworld_blogs');
    if (savedBlogs) {
      const allBlogs = JSON.parse(savedBlogs);
      // Sort by date (newest first) and take only the latest 3
      const latestBlogs = allBlogs
        .sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);
      setBlogs(latestBlogs);
    } else {
      // Default blogs
      const defaultBlogs: BlogPost[] = [
        {
          id: '1',
          title: language === 'de' ? 'Die besten Anime-Serien 2025' : 'Best Anime Series of 2025',
          content: language === 'de' 
            ? 'Entdecke die aufregendsten Anime-Serien des Jahres 2025. Von epischen Fantasy-Abenteuern bis hin zu herzerwärmenden Slice-of-Life-Geschichten bietet dieses Jahr eine unglaubliche Vielfalt an hochwertigen Anime-Produktionen.\n\nBesonders hervorzuheben sind die neuen Staffeln beliebter Serien wie Attack on Titan, Demon Slayer und My Hero Academia. Diese Fortsetzungen versprechen spektakuläre Action-Sequenzen und emotionale Höhepunkte.\n\nNeu hinzugekommen sind auch innovative Originalserien, die mit frischen Konzepten und atemberaubender Animation begeistern. Studios wie MAPPA, Wit Studio und Bones haben wieder einmal bewiesen, warum sie zu den besten der Branche gehören.\n\nFür Romantik-Fans gibt es ebenfalls großartige Neuigkeiten: Mehrere hochkarätige Romance-Animes starten in diesem Jahr und versprechen herzerwärmende Geschichten voller Emotionen.'
            : 'Discover the most exciting anime series of 2025. From epic fantasy adventures to heartwarming slice-of-life stories, this year offers an incredible variety of high-quality anime productions.\n\nParticularly noteworthy are the new seasons of popular series like Attack on Titan, Demon Slayer, and My Hero Academia. These continuations promise spectacular action sequences and emotional highs.\n\nNew original series have also been added, captivating audiences with fresh concepts and breathtaking animation. Studios like MAPPA, Wit Studio, and Bones have once again proven why they are among the best in the industry.\n\nThere\'s also great news for romance fans: Several high-profile romance anime are starting this year, promising heartwarming stories full of emotions.',
          excerpt: language === 'de' 
            ? 'Die Top-Anime-Serien, die du 2025 nicht verpassen solltest.'
            : 'The top anime series you shouldn\'t miss in 2025.',
          author: 'AniWorld Team',
          date: '2025-01-15'
        },
        {
          id: '2',
          title: language === 'de' ? 'Anime-Streaming Tipps für Android' : 'Anime Streaming Tips for Android',
          content: language === 'de' 
            ? 'Optimiere dein Anime-Streaming-Erlebnis auf Android-Geräten mit diesen professionellen Tipps und Tricks. Eine stabile Internetverbindung ist der Grundstein für unterbrechungsfreies Streaming.\n\nStelle sicher, dass dein Gerät über ausreichend freien Speicherplatz verfügt. Mindestens 2 GB RAM werden für flüssiges Streaming empfohlen. Schließe andere Apps im Hintergrund, um die Performance zu verbessern.\n\nNutze Wi-Fi wann immer möglich, um Datenverbrauch zu reduzieren. Bei mobilen Daten empfehlen wir, die Videoqualität anzupassen, um ein Überschreiten des Datenlimits zu vermeiden.\n\nRegelmäßige Updates der Streaming-App sorgen für bessere Performance und neue Features. Aktiviere automatische Updates in den Einstellungen.\n\nBei Verbindungsproblemen hilft oft ein Neustart der App oder des Geräts. Cache-Daten regelmäßig zu löschen kann ebenfalls die Performance verbessern.'
            : 'Optimize your anime streaming experience on Android devices with these professional tips and tricks. A stable internet connection is the foundation for uninterrupted streaming.\n\nEnsure your device has sufficient free storage space. At least 2 GB RAM is recommended for smooth streaming. Close other background apps to improve performance.\n\nUse Wi-Fi whenever possible to reduce data usage. With mobile data, we recommend adjusting video quality to avoid exceeding data limits.\n\nRegular updates of the streaming app ensure better performance and new features. Enable automatic updates in settings.\n\nFor connection issues, restarting the app or device often helps. Regularly clearing cache data can also improve performance.',
          excerpt: language === 'de' 
            ? 'Verbessere deine Streaming-Qualität mit diesen einfachen Tricks.'
            : 'Improve your streaming quality with these simple tricks.',
          author: 'Tech Team',
          date: '2025-01-10'
        },
        {
          id: '3',
          title: language === 'de' ? 'Neue Features in der AniWorld App' : 'New Features in AniWorld App',
          content: language === 'de' 
            ? 'Erfahre mehr über die neuesten Updates und Features, die dein Anime-Erlebnis noch besser machen. Die neue Version bringt zahlreiche Verbesserungen und innovative Funktionen mit sich.\n\nDie überarbeitete Benutzeroberfläche ist noch intuitiver geworden. Navigation zwischen verschiedenen Serien ist jetzt schneller und flüssiger. Die Suchfunktion wurde komplett überarbeitet und findet relevante Inhalte präziser.\n\nNeu hinzugekommen ist die Download-Funktion für Offline-Viewing. Du kannst jetzt deine Lieblings-Episoden herunterladen und auch ohne Internetverbindung anschauen.\n\nDie Qualitätsoptionen wurden erweitert. Neben HD sind jetzt auch 4K-Streams für ausgewählte Titel verfügbar. Die automatische Qualitätsanpassung sorgt für optimales Streaming je nach Internetgeschwindigkeit.\n\nPersonalisierte Empfehlungen basieren jetzt auf erweiterten Algorithmen und berücksichtigen deine Viewing-Geschichte noch besser.'
            : 'Learn about the latest updates and features that make your anime experience even better. The new version brings numerous improvements and innovative features.\n\nThe redesigned user interface has become even more intuitive. Navigation between different series is now faster and smoother. The search function has been completely overhauled and finds relevant content more precisely.\n\nThe download function for offline viewing has been added. You can now download your favorite episodes and watch them even without an internet connection.\n\nQuality options have been expanded. In addition to HD, 4K streams are now available for selected titles. Automatic quality adjustment ensures optimal streaming depending on internet speed.\n\nPersonalized recommendations now based on advanced algorithms and take your viewing history into account even better.',
          excerpt: language === 'de' 
            ? 'Entdecke die neuesten Verbesserungen und Features.'
            : 'Discover the latest improvements and features.',
          author: 'Development Team',
          date: '2025-01-05'
        }
      ];
      setBlogs(defaultBlogs);
      localStorage.setItem('aniworld_blogs', JSON.stringify(defaultBlogs));
    }
  }, [language]);

  const openBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeBlog = () => {
    setSelectedBlog(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <section id="blogs" className="py-20 bg-anime-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">
                {language === 'de' ? 'Neueste Blog-Beiträge' : 'Latest Blog Posts'}
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              {language === 'de' 
                ? 'Bleib auf dem Laufenden mit den neuesten Anime-News und Updates'
                : 'Stay updated with the latest anime news and updates'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Card 
                key={blog.id} 
                className="card-anime hover:scale-105 transition-all duration-300 group cursor-pointer"
                onClick={() => openBlog(blog)}
              >
                <CardContent className="p-6">
                  {blog.image && (
                    <div className="w-full h-48 bg-gray-800 rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={blog.image} 
                        alt={blog.imageAlt || blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-anime-purple transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {blog.excerpt}
                  </p>
                  <div className="mt-4 text-anime-purple text-sm font-medium">
                    {language === 'de' ? 'Weiterlesen →' : 'Read More →'}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <BlogModal 
        blog={selectedBlog}
        isOpen={isModalOpen}
        onClose={closeBlog}
      />
    </>
  );
};

export default BlogSection;
