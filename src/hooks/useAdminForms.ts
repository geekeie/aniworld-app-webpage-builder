
import { useState } from 'react';

export const useAdminForms = () => {
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [showBlogForm, setShowBlogForm] = useState(false);

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

  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  return {
    editingBlog,
    setEditingBlog,
    showBlogForm,
    setShowBlogForm,
    blogForm,
    setBlogForm,
    screenshotForm,
    setScreenshotForm,
    createSlug
  };
};
