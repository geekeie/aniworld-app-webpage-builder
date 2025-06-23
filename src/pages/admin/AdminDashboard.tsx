
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Save, Eye, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Content state
  const [content, setContent] = useState({
    metaTitle: 'AniWorld App – Kostenlose Anime Streaming APK für Android',
    metaDescription: 'Lade die AniWorld App kostenlos herunter und streame Anime-Serien & Filme gratis auf Android. HD, schnelle Server, kein Abo!',
    heroTitle: 'Streame Anime kostenlos mit der AniWorld App',
    heroSubtitle: 'Entdecke tausende Anime-Serien und Filme in HD-Qualität. Kostenlos, ohne Registrierung und ohne Werbung.',
    downloadButtonText: 'Jetzt herunterladen',
    downloadUrl: '#download'
  });

  useEffect(() => {
    const authStatus = localStorage.getItem('isAdminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    localStorage.setItem('siteContent', JSON.stringify(content));
    toast({
      title: "Content saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-anime-darker">
      {/* Header */}
      <div className="bg-anime-dark border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
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
            <TabsTrigger value="seo">SEO Settings</TabsTrigger>
            <TabsTrigger value="media">Media Management</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <Card className="card-anime">
              <CardHeader>
                <CardTitle className="text-white">Homepage Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="heroTitle" className="text-gray-300">Hero Title</Label>
                  <Input
                    id="heroTitle"
                    value={content.heroTitle}
                    onChange={(e) => setContent({...content, heroTitle: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="heroSubtitle" className="text-gray-300">Hero Subtitle</Label>
                  <Textarea
                    id="heroSubtitle"
                    value={content.heroSubtitle}
                    onChange={(e) => setContent({...content, heroSubtitle: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="downloadButtonText" className="text-gray-300">Download Button Text</Label>
                  <Input
                    id="downloadButtonText"
                    value={content.downloadButtonText}
                    onChange={(e) => setContent({...content, downloadButtonText: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="downloadUrl" className="text-gray-300">Download URL</Label>
                  <Input
                    id="downloadUrl"
                    value={content.downloadUrl}
                    onChange={(e) => setContent({...content, downloadUrl: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo">
            <Card className="card-anime">
              <CardHeader>
                <CardTitle className="text-white">SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="metaTitle" className="text-gray-300">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={content.metaTitle}
                    onChange={(e) => setContent({...content, metaTitle: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="metaDescription" className="text-gray-300">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={content.metaDescription}
                    onChange={(e) => setContent({...content, metaDescription: e.target.value})}
                    className="bg-gray-800 border-gray-700 text-white"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media">
            <Card className="card-anime">
              <CardHeader>
                <CardTitle className="text-white">Media Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-gray-300">Logo Upload</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <Button variant="outline" className="border-gray-600">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                    <span className="text-gray-400 text-sm">Current: logo.png</span>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300">App Screenshots</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <Button variant="outline" className="border-gray-600">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Screenshots
                    </Button>
                    <span className="text-gray-400 text-sm">Current: 3 images</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <Button onClick={handleSave} className="btn-anime">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
