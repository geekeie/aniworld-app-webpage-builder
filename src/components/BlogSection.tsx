
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, User } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
}

const BlogSection = () => {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Load blogs from localStorage
    const savedBlogs = localStorage.getItem('aniworld_blogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      // Default blogs
      const defaultBlogs: BlogPost[] = [
        {
          id: '1',
          title: language === 'de' ? 'Die besten Anime-Serien 2024' : 'Best Anime Series of 2024',
          content: language === 'de' 
            ? 'Entdecke die aufregendsten Anime-Serien des Jahres 2024. Von epischen Fantasy-Abenteuern bis hin zu herzerwärmenden Slice-of-Life-Geschichten...'
            : 'Discover the most exciting anime series of 2024. From epic fantasy adventures to heartwarming slice-of-life stories...',
          excerpt: language === 'de' 
            ? 'Die Top-Anime-Serien, die du dieses Jahr nicht verpassen solltest.'
            : 'The top anime series you shouldn\'t miss this year.',
          author: 'AniWorld Team',
          date: '2024-01-15'
        },
        {
          id: '2',
          title: language === 'de' ? 'Anime-Streaming Tipps für Android' : 'Anime Streaming Tips for Android',
          content: language === 'de' 
            ? 'Optimiere dein Anime-Streaming-Erlebnis auf Android-Geräten mit diesen professionellen Tipps und Tricks...'
            : 'Optimize your anime streaming experience on Android devices with these professional tips and tricks...',
          excerpt: language === 'de' 
            ? 'Verbessere deine Streaming-Qualität mit diesen einfachen Tricks.'
            : 'Improve your streaming quality with these simple tricks.',
          author: 'Tech Team',
          date: '2024-01-10'
        },
        {
          id: '3',
          title: language === 'de' ? 'Neue Features in der AniWorld App' : 'New Features in AniWorld App',
          content: language === 'de' 
            ? 'Erfahre mehr über die neuesten Updates und Features, die dein Anime-Erlebnis noch besser machen...'
            : 'Learn about the latest updates and features that make your anime experience even better...',
          excerpt: language === 'de' 
            ? 'Entdecke die neuesten Verbesserungen und Features.'
            : 'Discover the latest improvements and features.',
          author: 'Development Team',
          date: '2024-01-05'
        }
      ];
      setBlogs(defaultBlogs);
      localStorage.setItem('aniworld_blogs', JSON.stringify(defaultBlogs));
    }
  }, [language]);

  return (
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
            <Card key={blog.id} className="card-anime hover:scale-105 transition-all duration-300 group">
              <CardContent className="p-6">
                {blog.image && (
                  <div className="w-full h-48 bg-gray-800 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
