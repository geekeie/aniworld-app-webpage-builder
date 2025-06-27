
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
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [screenshots, setScreenshots] = useState<AppScreenshot[]>([]);
  const [content, setContent] = useState<SiteContent>(defaultContent);

  const loadAllData = async () => {
    try {
      setLoading(true);
      
      // Load all data in parallel for better performance
      const [siteContent, blogsData, screenshotsData, mediaFiles] = await Promise.all([
        getSiteContent().catch(err => {
          console.warn('Failed to load site content:', err);
          return null;
        }),
        getAllBlogs().catch(err => {
          console.warn('Failed to load blogs:', err);
          return [];
        }),
        getScreenshots().catch(err => {
          console.warn('Failed to load screenshots:', err);
          return [];
        }),
        getMediaFiles().catch(err => {
          console.warn('Failed to load media files:', err);
          return [];
        })
      ]);
      
      // Update site content with proper fallbacks
      if (siteContent && typeof siteContent === 'object') {
        setContent(prevContent => ({ 
          ...defaultContent, 
          ...prevContent, 
          ...siteContent 
        }));
      }

      // Update blogs
      if (Array.isArray(blogsData)) {
        setBlogs(blogsData);
      }

      // Update screenshots with validation and debugging
      if (Array.isArray(screenshotsData)) {
        console.log('Raw screenshots data from database:', screenshotsData);
        
        // Validate and process screenshots
        const validatedScreenshots = screenshotsData.map(screenshot => {
          console.log('Processing screenshot:', screenshot);
          return {
            ...screenshot,
            image_url: screenshot.image_url || ''
          };
        });
        
        console.log('Processed screenshots:', validatedScreenshots);
        setScreenshots(validatedScreenshots);
      }

      // Process media files with proper URL validation
      const mediaMap: Partial<SiteContent> = {};
      if (Array.isArray(mediaFiles)) {
        mediaFiles.forEach(file => {
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
    loading,
    blogs,
    setBlogs,
    screenshots,
    setScreenshots,
    content,
    setContent,
    loadAllData,
    refreshData
  };
};
