
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
  imageAlt?: string;
  slug: string;
}

const BlogSectionEnhanced = () => {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const savedBlogs = localStorage.getItem('aniworld_blogs');
    if (savedBlogs) {
      const allBlogs = JSON.parse(savedBlogs);
      // Show only the first 3 blogs on homepage
      setBlogs(allBlogs.slice(0, 3));
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section id="blogs" className="py-16 bg-anime-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">
              {language === 'de' ? 'Neueste Blog-Posts' : 'Latest Blog Posts'}
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            {language === 'de' 
              ? 'Bleiben Sie auf dem Laufenden mit Anime-News und App-Updates'
              : 'Stay updated with anime news and app updates'
            }
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog) => (
            <article key={blog.id} className="group">
              <Link to={`/blog/${blog.slug}`} className="block">
                <div className="bg-anime-darker rounded-xl border border-gray-700 overflow-hidden hover:border-anime-purple transition-all duration-300 h-full">
                  {blog.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.imageAlt || blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(blog.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{blog.author}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-anime-purple transition-colors">
                      {blog.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center text-anime-purple font-medium group-hover:text-anime-pink transition-colors">
                      <span className="mr-2">
                        {language === 'de' ? 'Weiterlesen' : 'Read More'}
                      </span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* More Blogs Link */}
        <div className="text-center">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 btn-anime text-lg px-8 py-4"
          >
            {language === 'de' ? 'Alle Blogs anzeigen' : 'View All Blogs'}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSectionEnhanced;
