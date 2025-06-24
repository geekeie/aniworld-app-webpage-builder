
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

const BlogListing = () => {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    document.title = language === 'de' ? 'Blog - AniWorld App' : 'Blog - AniWorld App';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', language === 'de' 
        ? 'Entdecken Sie die neuesten Anime-News, App-Updates und Streaming-Tipps in unserem AniWorld Blog.'
        : 'Discover the latest anime news, app updates and streaming tips in our AniWorld blog.'
      );
    }

    // Load blogs
    const savedBlogs = localStorage.getItem('aniworld_blogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    }
  }, [language]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-anime-darker">
      <Navbar />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === 'de' ? 'AniWorld Blog' : 'AniWorld Blog'}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {language === 'de' 
                ? 'Bleiben Sie auf dem Laufenden mit den neuesten Anime-News, App-Updates und Streaming-Tipps.'
                : 'Stay updated with the latest anime news, app updates and streaming tips.'
              }
            </p>
          </div>

          {/* Blog Grid */}
          {blogs.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-white mb-4">
                {language === 'de' ? 'Keine Blog-Posts gefunden' : 'No blog posts found'}
              </h2>
              <p className="text-gray-400">
                {language === 'de' 
                  ? 'Schauen Sie später vorbei für neue Inhalte.'
                  : 'Check back later for new content.'
                }
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <article key={blog.id} className="group">
                  <Link to={`/blog/${blog.slug}`} className="block">
                    <div className="bg-anime-dark rounded-xl border border-gray-700 overflow-hidden hover:border-anime-purple transition-all duration-300 h-full">
                      {/* Blog Image */}
                      {blog.image && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={blog.image}
                            alt={blog.imageAlt || blog.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      
                      {/* Blog Content */}
                      <div className="p-6">
                        {/* Meta Info */}
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
                        
                        {/* Title */}
                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-anime-purple transition-colors">
                          {blog.title}
                        </h2>
                        
                        {/* Excerpt */}
                        <p className="text-gray-300 mb-4 line-clamp-3">
                          {blog.excerpt}
                        </p>
                        
                        {/* Read More */}
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
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogListing;
