
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface StarRatingTabProps {
  content: {
    appRating: number;
    totalRatings: number;
  };
  setContent: (content: any) => void;
}

const StarRatingTab = ({ content, setContent }: StarRatingTabProps) => {
  return (
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
  );
};

export default StarRatingTab;
