
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface SEOSettingsTabProps {
  content: {
    metaTitle: string;
    metaDescription: string;
  };
  setContent: (content: any) => void;
}

const SEOSettingsTab = ({ content, setContent }: SEOSettingsTabProps) => {
  return (
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
  );
};

export default SEOSettingsTab;
