
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LogOut, Save, Eye, Upload, Plus, Edit, Trash2, Image, Bold, Italic, Link, Type } from 'lucide-react';
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
  imageAlt?: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const headerLogoInputRef = useRef<HTMLInputElement>(null);
  const heroImageInputRef = useRef<HTMLInputElement>(null);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Content state
  const [content, setContent] = useState({
    metaTitle: 'AniWorld App – Kostenlose Anime Streaming APK für Android',
    metaDescription: 'Lade die AniWorld App kostenlos herunter und streame Anime-Serien & Filme gratis auf Android. HD, schnelle Server, kein Abo!',
    heroTitle: 'Streame Anime kostenlos mit der AniWorld App',
    heroSubtitle: 'Entdecke tausende Anime-Serien und Filme in HD-Qualität. Kostenlos, ohne Registrierung und ohne Werbung.',
    downloadButtonText: 'Jetzt herunterladen',
    downloadUrl: '#download',
    headerLogo: '/logo.png',
    heroBackgroundImage: '/hero-image.png',
    appName: 'AniWorld APK',
    appVersion: 'Version 3.2.1',
    appSize: '25 MB',
    appRequirements: 'Android 5.0+',
    appRating: 4.8,
    totalRatings: 12543
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'blog' | 'headerLogo' | 'heroBackground') => {
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

  const handleSaveBlog = () => {
    if (!blogForm.title || !blogForm.content || !blogForm.excerpt) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const slug = blogForm.slug || createSlug(blogForm.title);

    const newBlog: BlogPost = {
      id: editingBlog ? editingBlog.id : Date.now().toString(),
      title: blogForm.title,
      content: blogForm.content,
      excerpt: blogForm.excerpt,
      author: blogForm.author,
      date: editingBlog ? editingBlog.date : new Date().toISOString().split('T')[0],
      image: blogForm.image,
      imageAlt: blogForm.imageAlt,
      slug: slug,
      metaTitle: blogForm.metaTitle || blogForm.title,
      metaDescription: blogForm.metaDescription || blogForm.excerpt,
      keywords: blogForm.keywords
    };

    let updatedBlogs;
    if (editingBlog) {
      updatedBlogs = blogs.map(blog => blog.id === editingBlog.id ? newBlog : blog);
    } else {
      updatedBlogs = [newBlog, ...blogs];
    }

    setBlogs(updatedBlogs);
    localStorage.setItem('aniworld_blogs', JSON.stringify(updatedBlogs));
    
    setBlogForm({ title: '', content: '', excerpt: '', author: 'Admin', image: '', imageAlt: '', slug: '', metaTitle: '', metaDescription: '', keywords: '' });
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
      image: blog.image || '',
      imageAlt: blog.imageAlt || '',
      slug: blog.slug || '',
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || '',
      keywords: blog.keywords || ''
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

  // Text editor functions
  const insertTextAtCursor = (text: string) => {
    const textarea = contentTextareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = blogForm.content.substring(0, start) + text + blogForm.content.substring(end);
      setBlogForm({ ...blogForm, content: newContent });
      
      // Set cursor position after inserted text
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + text.length;
        textarea.focus();
      }, 0);
    }
  };

  const wrapSelectedText = (prefix: string, suffix: string = '') => {
    const textarea = contentTextareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = blogForm.content.substring(start, end);
      const replacement = prefix + selectedText + (suffix || prefix);
      const newContent = blogForm.content.substring(0, start) + replacement + blogForm.content.substring(end);
      setBlogForm({ ...blogForm, content: newContent });
      
      setTimeout(() => {
        textarea.selectionStart = start + prefix.length;
        textarea.selectionEnd = end + prefix.length;
        textarea.focus();
      }, 0);
    }
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
              <TabsTrigger value="rating">Star Rating</TabsTrigger>
              <TabsTrigger value="download">Download Settings</TabsTrigger>
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
                    <Label htmlFor="heroTitle" className="text-gray-300">Hero Title (H1)</Label>
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

            <TabsContent value="rating">
              <Card className="card-anime">
                <CardHeader>
                  <CardTitle className="text-white">Star Rating Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="appRating" className="text-gray-300">App Rating (1-5)</Label>
                      <Input
                        id="appRating"
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={content.appRating}
                        onChange={(e) => setContent({...content, appRating: parseFloat(e.target.value)})}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="totalRatings" className="text-gray-300">Total Ratings Count</Label>
                      <Input
                        id="totalRatings"
                        type="number"
                        value={content.totalRatings}
                        onChange={(e) => setContent({...content, totalRatings: parseInt(e.target.value)})}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
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
                      setBlogForm({ title: '', content: '', excerpt: '', author: 'Admin', image: '', imageAlt: '', slug: '', metaTitle: '', metaDescription: '', keywords: '' });
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
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="blogTitle" className="text-gray-300">Title</Label>
                            <Input
                              id="blogTitle"
                              value={blogForm.title}
                              onChange={(e) => setBlogForm({...blogForm, title: e.target.value, slug: createSlug(e.target.value)})}
                              className="bg-gray-900 border-gray-600 text-white"
                              placeholder="Enter blog title"
                            />
                          </div>
                          <div>
                            <Label htmlFor="blogSlug" className="text-gray-300">URL Slug</Label>
                            <Input
                              id="blogSlug"
                              value={blogForm.slug}
                              onChange={(e) => setBlogForm({...blogForm, slug: e.target.value})}
                              className="bg-gray-900 border-gray-600 text-white"
                              placeholder="url-friendly-slug"
                            />
                          </div>
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
                          <Label className="text-gray-300">Content Editor</Label>
                          <div className="border border-gray-600 rounded-lg overflow-hidden">
                            {/* Editor Toolbar */}
                            <div className="bg-gray-700 px-3 py-2 border-b border-gray-600 flex gap-2">
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="border-gray-500 h-8 px-2"
                                onClick={() => wrapSelectedText('**')}
                              >
                                <Bold className="h-3 w-3" />
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="border-gray-500 h-8 px-2"
                                onClick={() => wrapSelectedText('*')}
                              >
                                <Italic className="h-3 w-3" />
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="border-gray-500 h-8 px-2"
                                onClick={() => insertTextAtCursor('\n## ')}
                              >
                                <Type className="h-3 w-3" />
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="border-gray-500 h-8 px-2"
                                onClick={() => wrapSelectedText('[', '](URL)')}
                              >
                                <Link className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <Textarea
                              ref={contentTextareaRef}
                              id="blogContent"
                              value={blogForm.content}
                              onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                              className="bg-gray-900 border-0 text-white resize-none rounded-none"
                              rows={12}
                              placeholder="Write your full blog content here... Use ** for bold, * for italic, ## for headings"
                            />
                          </div>
                        </div>

                        {/* SEO Fields */}
                        <div className="grid grid-cols-1 gap-4 p-4 bg-gray-700 rounded">
                          <h4 className="text-white font-bold">SEO Settings</h4>
                          <div>
                            <Label htmlFor="metaTitle" className="text-gray-300">Meta Title</Label>
                            <Input
                              id="metaTitle"
                              value={blogForm.metaTitle}
                              onChange={(e) => setBlogForm({...blogForm, metaTitle: e.target.value})}
                              className="bg-gray-900 border-gray-600 text-white"
                              placeholder="SEO title for search engines"
                            />
                          </div>
                          <div>
                            <Label htmlFor="metaDescription" className="text-gray-300">Meta Description</Label>
                            <Textarea
                              id="metaDescription"
                              value={blogForm.metaDescription}
                              onChange={(e) => setBlogForm({...blogForm, metaDescription: e.target.value})}
                              className="bg-gray-900 border-gray-600 text-white"
                              rows={2}
                              placeholder="SEO description for search engines"
                            />
                          </div>
                          <div>
                            <Label htmlFor="keywords" className="text-gray-300">Keywords</Label>
                            <Input
                              id="keywords"
                              value={blogForm.keywords}
                              onChange={(e) => setBlogForm({...blogForm, keywords: e.target.value})}
                              className="bg-gray-900 border-gray-600 text-white"
                              placeholder="keyword1, keyword2, keyword3"
                            />
                          </div>
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
                            <Label htmlFor="blogImageAlt" className="text-gray-300">Image Alt Text (SEO)</Label>
                            <Input
                              id="blogImageAlt"
                              value={blogForm.imageAlt}
                              onChange={(e) => setBlogForm({...blogForm, imageAlt: e.target.value})}
                              className="bg-gray-900 border-gray-600 text-white"
                              placeholder="Alt text for SEO"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-gray-300">Blog Thumbnail</Label>
                          <div className="flex gap-4 items-center">
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={(e) => handleImageUpload(e, 'blog')}
                              accept="image/*"
                              className="hidden"
                            />
                            <Button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              variant="outline"
                              className="border-gray-600"
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Upload Image
                            </Button>
                            {blogForm.image && (
                              <div className="relative">
                                <img 
                                  src={blogForm.image} 
                                  alt="Blog thumbnail"
                                  className="w-20 h-20 object-cover rounded border border-gray-600"
                                />
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="absolute -top-2 -right-2 border-red-600 text-red-400 w-6 h-6 p-0"
                                  onClick={() => setBlogForm({...blogForm, image: ''})}
                                >
                                  ×
                                </Button>
                              </div>
                            )}
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
                              setBlogForm({ title: '', content: '', excerpt: '', author: 'Admin', image: '', imageAlt: '', slug: '', metaTitle: '', metaDescription: '', keywords: '' });
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

            <TabsContent value="download">
              <Card className="card-anime">
                <CardHeader>
                  <CardTitle className="text-white">Download Section Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="appName" className="text-gray-300">App Name</Label>
                    <Input
                      id="appName"
                      value={content.appName}
                      onChange={(e) => setContent({...content, appName: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="appVersion" className="text-gray-300">Version</Label>
                      <Input
                        id="appVersion"
                        value={content.appVersion}
                        onChange={(e) => setContent({...content, appVersion: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="appSize" className="text-gray-300">Size</Label>
                      <Input
                        id="appSize"
                        value={content.appSize}
                        onChange={(e) => setContent({...content, appSize: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="appRequirements" className="text-gray-300">Requirements</Label>
                      <Input
                        id="appRequirements"
                        value={content.appRequirements}
                        onChange={(e) => setContent({...content, appRequirements: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
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
                    <Label className="text-gray-300">Header & Footer Logo</Label>
                    <div className="flex gap-4 items-center">
                      <input
                        type="file"
                        ref={headerLogoInputRef}
                        onChange={(e) => handleImageUpload(e, 'headerLogo')}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button
                        onClick={() => headerLogoInputRef.current?.click()}
                        variant="outline"
                        className="border-gray-600"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Header Logo
                      </Button>
                      {content.headerLogo && (
                        <img 
                          src={content.headerLogo} 
                          alt="Header Logo"
                          className="w-16 h-16 object-contain rounded border border-gray-600"
                        />
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-2">This logo will appear in both header and footer</p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Hero Section Background Image</Label>
                    <div className="flex gap-4 items-center">
                      <input
                        type="file"
                        ref={heroImageInputRef}
                        onChange={(e) => handleImageUpload(e, 'heroBackground')}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button
                        onClick={() => heroImageInputRef.current?.click()}
                        variant="outline"
                        className="border-gray-600"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Hero Background
                      </Button>
                      {content.heroBackgroundImage && (
                        <img 
                          src={content.heroBackgroundImage} 
                          alt="Hero Background"
                          className="w-32 h-20 object-cover rounded border border-gray-600"
                        />
                      )}
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
