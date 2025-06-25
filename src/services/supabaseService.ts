
import { supabase } from '@/integrations/supabase/client';

// Site Content Management
export const getSiteContent = async () => {
  const { data, error } = await supabase
    .from('site_content')
    .select('content_value')
    .eq('content_key', 'main_settings')
    .single();
  
  if (error) {
    console.error('Error fetching site content:', error);
    return null;
  }
  
  return data?.content_value;
};

export const updateSiteContent = async (content: any) => {
  const { error } = await supabase
    .from('site_content')
    .update({ 
      content_value: content,
      updated_at: new Date().toISOString()
    })
    .eq('content_key', 'main_settings');
  
  if (error) {
    console.error('Error updating site content:', error);
    throw error;
  }
};

// Blog Management
export const getBlogs = async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
  
  return data || [];
};

export const getAllBlogs = async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching all blogs:', error);
    return [];
  }
  
  return data || [];
};

export const getBlogBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  
  if (error) {
    console.error('Error fetching blog by slug:', error);
    return null;
  }
  
  return data;
};

export const createBlog = async (blog: any) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      author: blog.author,
      slug: blog.slug,
      image: blog.image,
      image_alt: blog.imageAlt,
      meta_title: blog.metaTitle,
      meta_description: blog.metaDescription,
      keywords: blog.keywords,
      published: true
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
  
  return data;
};

export const updateBlog = async (id: string, blog: any) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      author: blog.author,
      slug: blog.slug,
      image: blog.image,
      image_alt: blog.imageAlt,
      meta_title: blog.metaTitle,
      meta_description: blog.metaDescription,
      keywords: blog.keywords,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
  
  return data;
};

export const deleteBlog = async (id: string) => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
};

// Screenshots Management
export const getScreenshots = async () => {
  const { data, error } = await supabase
    .from('app_screenshots')
    .select('*')
    .order('sort_order', { ascending: true });
  
  if (error) {
    console.error('Error fetching screenshots:', error);
    return [];
  }
  
  return data || [];
};

export const createScreenshot = async (screenshot: any) => {
  const { data, error } = await supabase
    .from('app_screenshots')
    .insert({
      image_url: screenshot.image,
      alt_text: screenshot.alt,
      title: screenshot.title,
      sort_order: 0
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating screenshot:', error);
    throw error;
  }
  
  return data;
};

export const deleteScreenshot = async (id: string) => {
  const { error } = await supabase
    .from('app_screenshots')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting screenshot:', error);
    throw error;
  }
};

// Media Files Management
export const getMediaFiles = async () => {
  const { data, error } = await supabase
    .from('media_files')
    .select('*');
  
  if (error) {
    console.error('Error fetching media files:', error);
    return [];
  }
  
  return data || [];
};

export const updateMediaFile = async (fileType: string, fileUrl: string, fileName?: string) => {
  const { error } = await supabase
    .from('media_files')
    .update({ 
      file_url: fileUrl,
      file_name: fileName,
      updated_at: new Date().toISOString()
    })
    .eq('file_type', fileType);
  
  if (error) {
    console.error('Error updating media file:', error);
    throw error;
  }
};
