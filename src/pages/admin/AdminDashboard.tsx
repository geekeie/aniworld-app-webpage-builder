import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LogOut, Save, Eye, Upload, Plus, Edit, Trash2, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AdminNoIndex from '@/components/AdminNoIndex';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [showBlogForm, setShowBlogForm] = useState(false);

  // Content state
  const [content, setContent] = useState({
    metaTitle: 'AniWorld App – Kostenlose Anime Streaming APK für Android',
    metaDescription: 'Lade die AniWorld App kostenlos herunter und streame Anime-Serien & Filme gratis auf Android. HD, schnelle Server, kein Abo!',
    heroTitle: 'Streame Anime kostenlos mit der AniWorld App',
    heroSubtitle: 'Entdecke tausende Anime-Serien und Filme in HD-Qualität. Kostenlos, ohne Registrierung und ohne Werbung.',
    downloadButtonText: 'Jetzt herunterladen',
    downloadUrl: '#download',
    logoUrl: '/logo.png',
    appScreenshots: [] as string[]
  });

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: 'Admin',
    image: ''
  });

  useEffect(() => {
    const authStatus = localStorage.getItem('isAdminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadBlogs();
      loadContent();
    } else {
      navigate('/admin');
    }
  }, [navigate]);

  const loadBlogs = () => {
    const savedBlogs = localStorage.getItem('aniworld_blogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    }
  };

  const loadContent = () => {
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      setContent({ ...content, ...JSON.parse(savedContent) });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  const handleSave = () => {
    localStorage.setItem('siteContent', JSON.stringify(content));
    toast({
      title: "Content saved",
      description: "Your changes have been saved successfully.",
    });
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  const handleSaveBlog = () => {
    if (!blogForm.title || !blogForm.content || !blogForm.excerpt) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newBlog: BlogPost = {
      id: editingBlog ? editingBlog.id : Date.now().toString(),
      title: blogForm.title,
      content: blogForm.content,
      excerpt: blogForm.excerpt,
      author: blogForm.author,
      date: editingBlog ? editingBlog.date : new Date().toISOString().split('T')[0],
      image: blogForm.image
    };

    let updatedBlogs;
    if (editingBlog) {
      updatedBlogs = blogs.map(blog => blog.id === editingBlog.id ? newBlog : blog);
    } else {
      updatedBlogs = [newBlog, ...blogs];
    }

    setBlogs(updatedBlogs);
    localStorage.setItem('aniworld_blogs', JSON.stringify(updatedBlogs));
    
    setBlogForm({ title: '', content: '', excerpt: '', author: 'Admin', image: '' });
    setEditingBlog(null);
    setShowBlogForm(false);
    
    toast({
      title: editingBlog ? "Blog updated" : "Blog created",
      description: "Blog post has been saved successfully.",
    });
  };

  const handleEditBlog = (blog: BlogPost) => {
    setBlogForm({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      author: blog.author,
      image: blog.image || ''
    });
    setEditingBlog(blog);
    setShowBlogForm(true);
  };

  const handleDeleteBlog = (blogId: string) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== blogId);
    setBlogs(updatedBlogs);
    localStorage.setItem('aniworld_blogs', JSON.stringify(updatedBlogs));
    
    toast({
      title: "Blog deleted",
      description: "Blog post has been deleted successfully.",
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <AdminNoIndex />
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
              <TabsTrigger value="blogs">Blog Management</TabsTrigger>
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

            <TabsContent value="blogs">
              <Card className="card-anime">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">Blog Management</CardTitle>
                  <Button 
                    onClick={() => {
                      setBlogForm({ title: '', content: '', excerpt: '', author: 'Admin', image: '' });
                      setEditingBlog(null);
                      setShowBlogForm(true);
                    }}
                    className="btn-anime"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Blog
                  </Button>
                </CardHeader>
                <CardContent>
                  {showBlogForm && (
                    <div className="mb-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
                      <h3 className="text-lg font-bold text-white mb-4">
                        {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="blogTitle" className="text-gray-300">Title</Label>
                          <Input
                            id="blogTitle"
                            value={blogForm.title}
                            onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                            className="bg-gray-900 border-gray-600 text-white"
                            placeholder="Enter blog title"
                          />
                        </div>
                        <div>
                          <Label htmlFor="blogExcerpt" className="text-gray-300">Excerpt</Label>
                          <Textarea
                            id="blogExcerpt"
                            value={blogForm.excerpt}
                            onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
                            className="bg-gray-900 border-gray-600 text-white"
                            rows={2}
                            placeholder="Brief description of the blog post"
                          />
                        </div>
                        <div>
                          <Label htmlFor="blogContent" className="text-gray-300">Content</Label>
                          <Textarea
                            id="blogContent"
                            value={blogForm.content}
                            onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                            className="bg-gray-900 border-gray-600 text-white"
                            rows={6}
                            placeholder="Full blog content"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="blogAuthor" className="text-gray-300">Author</Label>
                            <Input
                              id="blogAuthor"
                              value={blogForm.author}
                              onChange={(e) => setBlogForm({...blogForm, author: e.target.value})}
                              className="bg-gray-900 border-gray-600 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="blogImage" className="text-gray-300">Image URL</Label>
                            <Input
                              id="blogImage"
                              value={blogForm.image}
                              onChange={(e) => setBlogForm({...blogForm, image: e.target.value})}
                              className="bg-gray-900 border-gray-600 text-white"
                              placeholder="Optional image URL"
                            />
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Button onClick={handleSaveBlog} className="btn-anime">
                            <Save className="mr-2 h-4 w-4" />
                            {editingBlog ? 'Update Blog' : 'Create Blog'}
                          </Button>
                          <Button 
                            onClick={() => {
                              setShowBlogForm(false);
                              setEditingBlog(null);
                              setBlogForm({ title: '', content: '', excerpt: '', author: 'Admin', image: '' });
                            }}
                            variant="outline" 
                            className="border-gray-600"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Existing Blog Posts</h3>
                    {blogs.length === 0 ? (
                      <p className="text-gray-400">No blog posts found. Create your first blog post!</p>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-gray-300">Title</TableHead>
                            <TableHead className="text-gray-300">Author</TableHead>
                            <TableHead className="text-gray-300">Date</TableHead>
                            <TableHead className="text-gray-300">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {blogs.map((blog) => (
                            <TableRow key={blog.id}>
                              <TableCell className="text-white">{blog.title}</TableCell>
                              <TableCell className="text-gray-300">{blog.author}</TableCell>
                              <TableCell className="text-gray-300">{new Date(blog.date).toLocaleDateString()}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleEditBlog(blog)}
                                    size="sm"
                                    variant="outline"
                                    className="border-gray-600"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    onClick={() => handleDeleteBlog(blog.id)}
                                    size="sm"
                                    variant="outline"
                                    className="border-red-600 text-red-400 hover:bg-red-600"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
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
                    <Label htmlFor="logoUrl" className="text-gray-300">Logo URL</Label>
                    <div className="flex gap-4">
                      <Input
                        id="logoUrl"
                        value={content.logoUrl}
                        onChange={(e) => setContent({...content, logoUrl: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="Enter logo URL"
                      />
                      <Button variant="outline" className="border-gray-600">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300">App Screenshots</Label>
                    <div className="mt-2 space-y-4">
                      <Button variant="outline" className="border-gray-600">
                        <Image className="mr-2 h-4 w-4" />
                        Upload Screenshots
                      </Button>
                      <div className="grid grid-cols-3 gap-4">
                        {content.appScreenshots.map((screenshot, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={screenshot} 
                              alt={`Screenshot ${index + 1}`}
                              className="w-full h-32 object-cover rounded border border-gray-600"
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              className="absolute top-2 right-2 border-red-600 text-red-400"
                              onClick={() => {
                                const updated = content.appScreenshots.filter((_, i) => i !== index);
                                setContent({...content, appScreenshots: updated});
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
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
    </>
  );
};

export default AdminDashboard;
