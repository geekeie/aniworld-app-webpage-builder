
import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createScreenshot, deleteScreenshot, getScreenshots } from '@/services/supabaseService';

interface AppScreenshot {
  id: string;
  image_url: string;
  alt_text: string;
  title?: string;
}

interface ScreenshotsTabProps {
  screenshots: AppScreenshot[];
  setScreenshots: (screenshots: AppScreenshot[]) => void;
  screenshotForm: any;
  setScreenshotForm: (form: any) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>, type: string) => void;
}

const ScreenshotsTab = ({
  screenshots,
  setScreenshots,
  screenshotForm,
  setScreenshotForm,
  handleImageUpload
}: ScreenshotsTabProps) => {
  const { toast } = useToast();
  const screenshotInputRef = useRef<HTMLInputElement>(null);

  const handleSaveScreenshot = async () => {
    if (!screenshotForm.image || !screenshotForm.alt) {
      toast({
        title: "Missing fields",
        description: "Please provide image and alt text.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createScreenshot({
        image: screenshotForm.image,
        alt: screenshotForm.alt,
        title: screenshotForm.title
      });

      // Reload screenshots from database
      const updatedScreenshots = await getScreenshots();
      setScreenshots(updatedScreenshots);
      
      setScreenshotForm({ image: '', alt: '', title: '' });
      
      toast({
        title: "Screenshot added",
        description: "Screenshot has been saved to the database successfully.",
      });
    } catch (error) {
      console.error('Error saving screenshot:', error);
      toast({
        title: "Save error",
        description: "Failed to save screenshot to database. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteScreenshot = async (screenshotId: string) => {
    try {
      await deleteScreenshot(screenshotId);
      
      // Reload screenshots from database
      const updatedScreenshots = await getScreenshots();
      setScreenshots(updatedScreenshots);
      
      toast({
        title: "Screenshot deleted",
        description: "Screenshot has been deleted from the database successfully.",
      });
    } catch (error) {
      console.error('Error deleting screenshot:', error);
      toast({
        title: "Delete error",
        description: "Failed to delete screenshot from database. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="card-anime">
      <CardHeader>
        <CardTitle className="text-white">App Screenshots Management (Database Connected)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">Add New Screenshot</h3>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">Screenshot Image</Label>
              <div className="flex gap-4 items-center">
                <input
                  type="file"
                  ref={screenshotInputRef}
                  onChange={(e) => handleImageUpload(e, 'screenshot')}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => screenshotInputRef.current?.click()}
                  variant="outline"
                  className="border-gray-600"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Screenshot
                </Button>
                {screenshotForm.image && (
                  <div className="relative">
                    <img 
                      src={screenshotForm.image} 
                      alt="Screenshot preview"
                      className="w-20 h-20 object-cover rounded border border-gray-600"
                      onError={(e) => {
                        console.error('Preview image failed to load:', screenshotForm.image);
                      }}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -top-2 -right-2 border-red-600 text-red-400 w-6 h-6 p-0"
                      onClick={() => setScreenshotForm({...screenshotForm, image: ''})}
                    >
                      ×
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="screenshotAlt" className="text-gray-300">Alt Text (Required for SEO)</Label>
                <Input
                  id="screenshotAlt"
                  value={screenshotForm.alt}
                  onChange={(e) => setScreenshotForm({...screenshotForm, alt: e.target.value})}
                  className="bg-gray-900 border-gray-600 text-white"
                  placeholder="Describe the screenshot"
                />
              </div>
              <div>
                <Label htmlFor="screenshotTitle" className="text-gray-300">Title (Optional)</Label>
                <Input
                  id="screenshotTitle"
                  value={screenshotForm.title}
                  onChange={(e) => setScreenshotForm({...screenshotForm, title: e.target.value})}
                  className="bg-gray-900 border-gray-600 text-white"
                  placeholder="Screenshot title"
                />
              </div>
            </div>
            <Button onClick={handleSaveScreenshot} className="btn-anime">
              <Save className="mr-2 h-4 w-4" />
              Add Screenshot
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Current Screenshots</h3>
          {screenshots.length === 0 ? (
            <p className="text-gray-400">No screenshots uploaded yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {screenshots.map((screenshot) => (
                <div key={screenshot.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <img 
                    src={screenshot.image_url} 
                    alt={screenshot.alt_text}
                    className="w-full h-40 object-cover rounded mb-3"
                    onError={(e) => {
                      console.error('Admin screenshot failed to load:', screenshot.image_url);
                      const target = e.target as HTMLImageElement;
                      target.style.opacity = '0.5';
                    }}
                  />
                  <p className="text-white font-medium mb-1">{screenshot.title || 'Untitled'}</p>
                  <p className="text-gray-400 text-sm mb-3">{screenshot.alt_text}</p>
                  <Button
                    onClick={() => handleDeleteScreenshot(screenshot.id)}
                    size="sm"
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600 w-full"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScreenshotsTab;
