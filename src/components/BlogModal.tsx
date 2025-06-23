
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Clock, User } from 'lucide-react';

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
  if (!blog) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-anime-dark border-gray-700">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-white pr-8">
            {blog.title}
          </DialogTitle>
          <Button
            onClick={onClose}
            variant="outline"
            size="icon"
            className="border-gray-600 text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{new Date(blog.date).toLocaleDateString()}</span>
            </div>
          </div>

          {blog.image && (
            <div className="w-full">
              <img 
                src={blog.image} 
                alt={blog.imageAlt || blog.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
              {blog.content}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogModal;
