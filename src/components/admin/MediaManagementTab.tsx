
import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

interface MediaManagementTabProps {
  content: {
    headerLogo: string;
    heroBackgroundImage: string;
    heroForegroundLogo: string;
  };
  setContent: (content: any) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>, type: string) => void;
}

const MediaManagementTab = ({ content, setContent, handleImageUpload }: MediaManagementTabProps) => {
  const headerLogoInputRef = useRef<HTMLInputElement>(null);
  const heroImageInputRef = useRef<HTMLInputElement>(null);
  const heroLogoInputRef = useRef<HTMLInputElement>(null);

  return (
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
        <div>
          <Label className="text-gray-300">Hero Section Foreground Logo</Label>
          <div className="flex gap-4 items-center">
            <input
              type="file"
              ref={heroLogoInputRef}
              onChange={(e) => handleImageUpload(e, 'heroLogo')}
              accept="image/*"
              className="hidden"
            />
            <Button
              onClick={() => heroLogoInputRef.current?.click()}
              variant="outline"
              className="border-gray-600"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Hero Logo
            </Button>
            {content.heroForegroundLogo && (
              <div className="relative">
                <img 
                  src={content.heroForegroundLogo} 
                  alt="Hero Foreground Logo"
                  className="w-20 h-20 object-contain rounded border border-gray-600"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -top-2 -right-2 border-red-600 text-red-400 w-6 h-6 p-0"
                  onClick={() => setContent({...content, heroForegroundLogo: ''})}
                >
                  ×
                </Button>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-400 mt-2">This logo will appear as foreground overlay in the hero section</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaManagementTab;
