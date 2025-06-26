
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
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

export const useAdminData = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [screenshots, setScreenshots] = useState<AppScreenshot[]>([]);
  
  const [content, setContent] = useState<SiteContent>({
    metaTitle: 'AniWorld App – Kostenlose Anime Streaming APK für Android',
    metaDescription: 'Lade die AniWorld App kostenlos herunter und streame Anime-Serien & Filme gratis auf Android. HD, schnelle Server, kein Abo!',
    heroTitle: 'Streame Anime kostenlos mit der AniWorld App',
    heroSubtitle: 'Entdecke tausende Anime-Serien und Filme in HD-Qualität. Kostenlos, ohne Registrierung und ohne Werbung.',
    downloadButtonText: 'Jetzt herunterladen',
    downloadUrl: '',
    headerLogo: '/logo.png',
    heroBackgroundImage: '/hero-image.png',
    heroForegroundLogo: '',
    appName: 'AniWorld APK',
    appVersion: 'Version 3.2.1',
    appSize: '25 MB',
    appRequirements: 'Android 5.0+',
    appRating: 4.8,
    totalRatings: 12543,
    customHeaderCode: ''
  });

  const loadAllData = async () => {
    try {
      setLoading(true);
      console.log('Loading all data from database...');
      
      // Load site content first
      const siteContent = await getSiteContent();
      console.log('Site content from database:', siteContent);
      if (siteContent && typeof siteContent === 'object') {
        setContent(prevContent => ({ ...prevContent, ...siteContent }));
        console.log('Site content updated in state');
      }

      // Load blogs
      const blogsData = await getAllBlogs();
      console.log('Blogs from database:', blogsData);
      setBlogs(blogsData);

      // Load screenshots
      const screenshotsData = await getScreenshots();
      console.log('Screenshots from database:', screenshotsData);
      setScreenshots(screenshotsData);

      // Load media files and merge with content
      const mediaFiles = await getMediaFiles();
      console.log('Media files from database:', mediaFiles);
      
      const mediaMap: Partial<SiteContent> = {};
      mediaFiles.forEach(file => {
        console.log('Processing media file:', file.file_type, file.file_url);
        if (file.file_type === 'header_logo' && file.file_url) {
          mediaMap.headerLogo = file.file_url;
        } else if (file.file_type === 'hero_background' && file.file_url) {
          mediaMap.heroBackgroundImage = file.file_url;
        } else if (file.file_type === 'hero_foreground' && file.file_url) {
          mediaMap.heroForegroundLogo = file.file_url;
        }
      });
      
      console.log('Media map to apply:', mediaMap);
      if (Object.keys(mediaMap).length > 0) {
        setContent(prevContent => {
          const updatedContent = { ...prevContent, ...mediaMap };
          console.log('Updated content with media files:', updatedContent);
          return updatedContent;
        });
      }
      
      toast({
        title: "Data loaded",
        description: "All data has been loaded from the database successfully.",
      });
      
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error loading data",
        description: "Failed to load data from database. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    console.log('Refreshing data...');
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
