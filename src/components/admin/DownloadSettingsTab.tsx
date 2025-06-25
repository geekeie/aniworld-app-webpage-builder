
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DownloadSettingsTabProps {
  content: {
    appName: string;
    appVersion: string;
    appSize: string;
    appRequirements: string;
    downloadUrl: string;
  };
  setContent: (content: any) => void;
}

const DownloadSettingsTab = ({ content, setContent }: DownloadSettingsTabProps) => {
  return (
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
        <div>
          <Label htmlFor="downloadUrl" className="text-gray-300">Download APK URL</Label>
          <Input
            id="downloadUrl"
            value={content.downloadUrl}
            onChange={(e) => setContent({...content, downloadUrl: e.target.value})}
            placeholder="https://example.com/aniworld-app.apk"
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
  );
};

export default DownloadSettingsTab;
