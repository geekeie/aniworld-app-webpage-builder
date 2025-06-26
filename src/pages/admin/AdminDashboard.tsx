
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
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
import HeaderCodeTab from '@/components/admin/HeaderCodeTab';
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
    setContent,
    refreshData
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
      console.log('Saving content to database:', content);
      await updateSiteContent(content);
      toast({
        title: "Content saved",
        description: "Your changes have been saved successfully to the database.",
      });
      
      // Refresh data after save to ensure consistency
      setTimeout(() => {
        refreshData();
      }, 1000);
      
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Save failed",
        description: "Failed to save changes to database. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = async () => {
    await refreshData();
    toast({
      title: "Data refreshed",
      description: "All data has been refreshed from the database.",
    });
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <Button onClick={handleRefresh} variant="outline" className="border-gray-600">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Data
            </Button>
          </div>

          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="content">Content Management</TabsTrigger>
              <TabsTrigger value="blogs">Blog Management</TabsTrigger>
              <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
              <TabsTrigger value="rating">Star Rating</TabsTrigger>
              <TabsTrigger value="download">Download Settings</TabsTrigger>
              <TabsTrigger value="seo">SEO Settings</TabsTrigger>
              <TabsTrigger value="media">Media Management</TabsTrigger>
              <TabsTrigger value="header">Header Code</TabsTrigger>
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

            <TabsContent value="header">
              <HeaderCodeTab
                content={content}
                setContent={setContent}
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
