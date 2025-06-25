
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, Save, Eye } from 'lucide-react';

interface AdminHeaderProps {
  onSave: () => void;
  onPreview: () => void;
  onLogout: () => void;
}

const AdminHeader = ({ onSave, onPreview, onLogout }: AdminHeaderProps) => {
  return (
    <div className="bg-anime-dark border-b border-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard - Database Connected</h1>
        <div className="flex gap-4">
          <Button onClick={onPreview} variant="outline" className="border-gray-600">
            <Eye className="mr-2 h-4 w-4" />
            Preview Site
          </Button>
          <Button onClick={onLogout} variant="outline" className="border-gray-600">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
