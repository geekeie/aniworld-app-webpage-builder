
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Save, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminNoIndex from '@/components/AdminNoIndex';
import ContentManagementTab from '@/components/admin/ContentManagementTab';
import BlogManagementTab from '@/components/admin/BlogManagementTab';
import ScreenshotsTab from '@/components/admin/ScreenshotsTab';
import StarRatingTab from '@/components/admin/StarRatingTab';
import DownloadSettingsTab from '@/components/admin/DownloadSettingsTab';
import SEOSettingsTab from '@/components/admin/SEOSettingsTab';
import HeaderCodeTab from '@/components/admin/HeaderCodeTab';
import MediaManagementTab from '@/components/admin/MediaManagementTab';
import { 
  getSiteContent, 
  updateSiteContent, 
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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [screenshots, setScreenshots] = useState<AppScreenshot[]>([]);
  const [loading, setLoading] = useState(true);

  // Content state
  const [content, setContent] = useState({
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

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: 'Admin',
    image: '',
    imageAlt: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    keywords: ''
  });

  // Screenshot form state
  const [screenshotForm, setScreenshotForm] = useState({
    image: '',
    alt: '',
    title: ''
  });

  useEffect(() => {
    const authStatus = localStorage.getItem('isAdminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadAllData();
    } else {
      navigate('/admin');
    }
  }, [navigate]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      
      // Load site content
      const siteContent = await getSiteContent();
      if (siteContent) {
        setContent(prevContent => ({ ...prevContent, ...siteContent }));
      }

      // Load blogs
      const blogsData = await getAllBlogs();
      setBlogs(blogsData);

      // Load screenshots
      const screenshotsData = await getScreenshots();
      setScreenshots(screenshotsData.map(s => ({
        id: s.id,
        image: s.image_url,
        alt: s.alt_text,
        title: s.title
      })));

      // Load media files
      const mediaFiles = await getMediaFiles();
      const mediaMap: any = {};
      mediaFiles.forEach(file => {
        if (file.file_type === 'header_logo') {
          mediaMap.headerLogo = file.file_url;
        } else if (file.file_type === 'hero_background') {
          mediaMap.heroBackgroundImage = file.file_url;
        } else if (file.file_type === 'hero_foreground') {
          mediaMap.heroForegroundLogo = file.file_url;
        }
      });
      
      setContent(prevContent => ({ ...prevContent, ...mediaMap }));
      
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

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  const handleSave = async () => {
    try {
      await updateSiteContent(content);
      toast({
        title: "Content saved",
        description: "Your changes have been saved successfully to the database.",
      });
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Save failed",
        description: "Failed to save changes to database. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'blog' | 'headerLogo' | 'heroBackground' | 'heroLogo' | 'screenshot') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        
        if (type === 'blog') {
          setBlogForm({ ...blogForm, image: imageUrl });
        } else if (type === 'headerLogo') {
          setContent({ ...content, headerLogo: imageUrl });
        } else if (type === 'heroBackground') {
          setContent({ ...content, heroBackgroundImage: imageUrl });
        } else if (type === 'heroLogo') {
          setContent({ ...content, heroForegroundLogo: imageUrl });
        } else if (type === 'screenshot') {
          setScreenshotForm({ ...screenshotForm, image: imageUrl });
        }
        
        toast({
          title: "Image uploaded",
          description: "Image has been uploaded successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-anime-darker flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <>
      <AdminNoIndex />
      <div className="min-h-screen bg-anime-darker">
        {/* Header */}
        <div className="bg-anime-dark border-b border-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard - Database Connected</h1>
            <div className="flex gap-4">
              <Button onClick={handlePreview} variant="outline" className="border-gray-600">
                <Eye className="mr-2 h-4 w-4" />
                Preview Site
              </Button>
              <Button onClick={handleLogout} variant="outline" className="border-gray-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto p-6">
          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="content">Content Management</TabsTrigger>
              <TabsTrigger value="blogs">Blog Management</TabsTrigger>
              <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
              <TabsTrigger value="rating">Star Rating</TabsTrigger>
              <TabsTrigger value="download">Download Settings</TabsTrigger>
              <TabsTrigger value="seo">SEO Settings</TabsTrigger>
              <TabsTrigger value="media">Media Management</TabsTrigger>
            </TabsList>

            <TabsContent value="content">
              <ContentManagementTab content={content} setContent={setContent} />
            </TabsContent>

            <TabsContent value="blogs">
              <BlogManagementTab
                blogs={blogs}
                setBlogs={setBlogs}
                editingBlog={editingBlog}
                setEditingBlog={setEditingBlog}
                showBlogForm={showBlogForm}
                setShowBlogForm={setShowBlogForm}
                blogForm={blogForm}
                setBlogForm={setBlogForm}
                handleImageUpload={handleImageUpload}
                createSlug={createSlug}
              />
            </TabsContent>

            <TabsContent value="screenshots">
              <ScreenshotsTab
                screenshots={screenshots}
                setScreenshots={setScreenshots}
                screenshotForm={screenshotForm}
                setScreenshotForm={setScreenshotForm}
                handleImageUpload={handleImageUpload}
              />
            </TabsContent>

            <TabsContent value="rating">
              <StarRatingTab content={content} setContent={setContent} />
            </TabsContent>

            <TabsContent value="download">
              <DownloadSettingsTab content={content} setContent={setContent} />
            </TabsContent>

            <TabsContent value="seo">
              <SEOSettingsTab content={content} setContent={setContent} />
            </TabsContent>

            <TabsContent value="media">
              <MediaManagementTab
                content={content}
                setContent={setContent}
                handleImageUpload={handleImageUpload}
              />
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <Button onClick={handleSave} className="btn-anime">
              <Save className="mr-2 h-4 w-4" />
              Save Changes to Database
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
