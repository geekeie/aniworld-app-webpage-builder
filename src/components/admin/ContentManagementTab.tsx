
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ContentManagementTabProps {
  content: {
    heroTitle: string;
    heroSubtitle: string;
    downloadButtonText: string;
    downloadUrl: string;
    [key: string]: any; // Allow additional properties
  };
  setContent: (content: any) => void;
}

const ContentManagementTab = ({ content, setContent }: ContentManagementTabProps) => {
  return (
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
  );
};

export default ContentManagementTab;
