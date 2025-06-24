import React from 'react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  image?: string;
  imageAlt?: string;
}

interface BlogModalProps {
  blog: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const BlogModal = ({ blog, isOpen, onClose }: BlogModalProps) => {
  // Component deprecated - blogs now open in individual pages
  return null;
};

export default BlogModal;
