
import { useState, useEffect } from 'react';
import { 
  getSiteContent, 
  getAllBlogs, 
  getScreenshots,
  getMediaFiles 
} from '@/services/supabaseService';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  created_at: string;
  image?: string;
  image_alt?: string;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  keywords?: string;
}

interface AppScreenshot {
  id: string;
  image_url: string;
  alt_text: string;
  title?: string;
}

interface SiteContent {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  downloadButtonText: string;
  downloadUrl: string;
  headerLogo: string;
  heroBackgroundImage: string;
  heroForegroundLogo: string;
  appName: string;
  appVersion: string;
  appSize: string;
  appRequirements: string;
  appRating: number;
  totalRatings: number;
  customHeaderCode: string;
}

const defaultContent: SiteContent = {
  metaTitle: 'AniWorld App – Kostenlose Anime Streaming APK für Android',
  metaDescription: 'Lade die AniWorld App kostenlos herunter und streame Anime-Serien & Filme gratis auf Android. HD, schnelle Server, kein Abo!',
  heroTitle: 'Streame Anime kostenlos mit der AniWorld App',
  heroSubtitle: 'Entdecke tausende Anime-Serien und Filme in HD-Qualität. Kostenlos, ohne Registrierung und ohne Werbung.',
  downloadButtonText: 'Jetzt herunterladen',
  downloadUrl: '',
  headerLogo: '',
  heroBackgroundImage: '/hero-image.png',
  heroForegroundLogo: '',
  appName: 'AniWorld APK',
  appVersion: 'Version 3.2.1',
  appSize: '25 MB',
  appRequirements: 'Android 5.0+',
  appRating: 4.8,
  totalRatings: 12543,
  customHeaderCode: ''
};

export const useAdminData = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [screenshots, setScreenshots] = useState<AppScreenshot[]>([]);
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  const loadAllData = async () => {
    try {
      setLoading(true);
      
      // Use Promise.allSettled for better error handling and performance
      const results = await Promise.allSettled([
        getSiteContent(),
        getAllBlogs(),
        getScreenshots(),
        getMediaFiles()
      ]);
      
      // Process site content
      if (results[0].status === 'fulfilled' && results[0].value) {
        setContent(prevContent => ({ 
          ...defaultContent, 
          ...prevContent, 
          ...results[0].value 
        }));
      }

      // Process blogs
      if (results[1].status === 'fulfilled' && Array.isArray(results[1].value)) {
        setBlogs(results[1].value);
      }

      // Process screenshots with validation
      if (results[2].status === 'fulfilled' && Array.isArray(results[2].value)) {
        const validatedScreenshots = results[2].value
          .filter(screenshot => screenshot.image_url && screenshot.image_url.trim() !== '')
          .map(screenshot => ({
            ...screenshot,
            image_url: screenshot.image_url || ''
          }));
        
        setScreenshots(validatedScreenshots);
      }

      // Process media files with proper URL validation
      if (results[3].status === 'fulfilled' && Array.isArray(results[3].value)) {
        const mediaMap: Partial<SiteContent> = {};
        results[3].value.forEach(file => {
          // Only process files with valid URLs
          if (file.file_url && 
              file.file_url.trim() !== '' && 
              file.file_url !== 'undefined' && 
              file.file_url !== 'null' &&
              (file.file_url.startsWith('http') || file.file_url.startsWith('https') || file.file_url.startsWith('data:'))) {
            
            if (file.file_type === 'header_logo') {
              mediaMap.headerLogo = file.file_url;
            } else if (file.file_type === 'hero_background') {
              mediaMap.heroBackgroundImage = file.file_url;
            } else if (file.file_type === 'hero_foreground') {
              mediaMap.heroForegroundLogo = file.file_url;
            }
          }
        });
        
        if (Object.keys(mediaMap).length > 0) {
          setContent(prevContent => ({ ...prevContent, ...mediaMap }));
        }
      }
      
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    await loadAllData();
  };

  useEffect(() => {
    loadAllData();
  }, []);

  return {
    blogs,
    setBlogs,
    screenshots,
    setScreenshots,
    content,
    setContent,
    loading,
    loadAllData,
    refreshData
  };
};
