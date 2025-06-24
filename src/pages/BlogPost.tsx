
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, User, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

const BlogPost = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load blog from localStorage
    const savedBlogs = localStorage.getItem('aniworld_blogs');
    if (savedBlogs) {
      const allBlogs: BlogPost[] = JSON.parse(savedBlogs);
      const foundBlog = allBlogs.find(b => b.slug === slug);
      setBlog(foundBlog || null);
    }
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    // Update SEO meta tags
    if (blog) {
      document.title = blog.metaTitle || blog.title;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', blog.metaDescription || blog.excerpt);
      }

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords && blog.keywords) {
        metaKeywords.setAttribute('content', blog.keywords);
      }

      // Add Open Graph meta tags
      const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      ogTitle.setAttribute('content', blog.title);
      if (!document.querySelector('meta[property="og:title"]')) {
        document.head.appendChild(ogTitle);
      }

      const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      ogDescription.setAttribute('content', blog.excerpt);
      if (!document.querySelector('meta[property="og:description"]')) {
        document.head.appendChild(ogDescription);
      }

      if (blog.image) {
        const ogImage = document.querySelector('meta[property="og:image"]') || document.createElement('meta');
        ogImage.setAttribute('property', 'og:image');
        ogImage.setAttribute('content', blog.image);
        if (!document.querySelector('meta[property="og:image"]')) {
          document.head.appendChild(ogImage);
        }
      }

      // Add JSON-LD structured data
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": blog.excerpt,
        "author": {
          "@type": "Person",
          "name": blog.author
        },
        "datePublished": blog.date,
        "dateModified": blog.date,
        "image": blog.image,
        "publisher": {
          "@type": "Organization",
          "name": "AniWorld App",
          "logo": {
            "@type": "ImageObject",
            "url": "https://aniworldapp.de/logo.png"
          }
        }
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [blog]);

  if (loading) {
    return (
      <div className="min-h-screen bg-anime-darker flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-anime-darker">
        <Navbar />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
            <p className="text-gray-300 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link to="/">
              <Button className="btn-anime">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-anime-darker">
      <Navbar />
      <article className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link to="/#blogs">
              <Button variant="outline" className="mb-8 border-gray-600 text-gray-300">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === 'de' ? 'Zurück zu Blogs' : 'Back to Blogs'}
              </Button>
            </Link>

            {/* Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{blog.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
                </div>
              </div>

              {blog.image && (
                <div className="w-full mb-8">
                  <img 
                    src={blog.image} 
                    alt={blog.imageAlt || blog.title}
                    className="w-full h-64 md:h-96 object-cover rounded-xl"
                  />
                </div>
              )}
            </header>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
                {blog.content}
              </div>
            </div>

            {/* Back to Blogs */}
            <div className="mt-12 pt-8 border-t border-gray-700">
              <Link to="/#blogs">
                <Button className="btn-anime">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {language === 'de' ? 'Weitere Blogs lesen' : 'Read More Blogs'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default BlogPost;
