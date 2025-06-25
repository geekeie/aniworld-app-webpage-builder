
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import AdminNoIndex from '@/components/AdminNoIndex';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSaveButton from '@/components/admin/AdminSaveButton';
import ContentManagementTab from '@/components/admin/ContentManagementTab';
import BlogManagementTab from '@/components/admin/BlogManagementTab';
import ScreenshotsTab from '@/components/admin/ScreenshotsTab';
import StarRatingTab from '@/components/admin/StarRatingTab';
import DownloadSettingsTab from '@/components/admin/DownloadSettingsTab';
import SEOSettingsTab from '@/components/admin/SEOSettingsTab';
import MediaManagementTab from '@/components/admin/MediaManagementTab';
import { updateSiteContent } from '@/services/supabaseService';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAdminData } from '@/hooks/useAdminData';
import { useAdminForms } from '@/hooks/useAdminForms';
import { useImageUpload } from '@/utils/adminImageUpload';

const AdminDashboard = () => {
  const { toast } = useToast();
  const { isAuthenticated, handleLogout } = useAdminAuth();
  const { 
    loading, 
    blogs, 
    setBlogs, 
    screenshots, 
    setScreenshots, 
    content, 
    setContent 
  } = useAdminData();
  
  const {
    editingBlog,
    setEditingBlog,
    showBlogForm,
    setShowBlogForm,
    blogForm,
    setBlogForm,
    screenshotForm,
    setScreenshotForm,
    createSlug
  } = useAdminForms();

  const { handleImageUpload } = useImageUpload(
    setBlogForm,
    setContent,
    setScreenshotForm,
    blogForm,
    content,
    screenshotForm
  );

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
        <AdminHeader 
          onSave={handleSave}
          onPreview={handlePreview}
          onLogout={handleLogout}
        />

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

          <AdminSaveButton onSave={handleSave} />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
