
import React, { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createScreenshot, deleteScreenshot, getScreenshots } from '@/services/supabaseService';

interface AppImage {
  id: string;
  image_url: string;
  alt_text: string;
  title?: string;
}

interface AppImagesTabProps {
  screenshots: AppImage[];
  setScreenshots: (screenshots: AppImage[]) => void;
  screenshotForm: any;
  setScreenshotForm: (form: any) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>, type: string) => void;
}

const AppImagesTab = ({
  screenshots,
  setScreenshots,
  screenshotForm,
  setScreenshotForm,
  handleImageUpload
}: AppImagesTabProps) => {
  const { toast } = useToast();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSaveImage = async () => {
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

      // Reload images from database
      const updatedImages = await getScreenshots();
      setScreenshots(updatedImages);
      
      setScreenshotForm({ image: '', alt: '', title: '' });
      
      toast({
        title: "App image added",
        description: "App image has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving app image:', error);
      toast({
        title: "Save error",
        description: "Failed to save app image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    try {
      await deleteScreenshot(imageId);
      
      // Reload images from database
      const updatedImages = await getScreenshots();
      setScreenshots(updatedImages);
      
      toast({
        title: "App image deleted",
        description: "App image has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting app image:', error);
      toast({
        title: "Delete error",
        description: "Failed to delete app image. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="card-anime">
      <CardHeader>
        <CardTitle className="text-white">App Images Management</CardTitle>
        <p className="text-gray-400">Manage app images that will be displayed on the homepage</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-lg font-bold text-white mb-4">Add New App Image</h3>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-300">App Image</Label>
              <div className="flex gap-4 items-center">
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={(e) => handleImageUpload(e, 'screenshot')}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  variant="outline"
                  className="border-gray-600"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload App Image
                </Button>
                {screenshotForm.image && (
                  <div className="relative">
                    <img 
                      src={screenshotForm.image} 
                      alt="App image preview"
                      className="w-20 h-20 object-cover rounded border border-gray-600"
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
                <Label htmlFor="imageAlt" className="text-gray-300">Alt Text (Required)</Label>
                <Input
                  id="imageAlt"
                  value={screenshotForm.alt}
                  onChange={(e) => setScreenshotForm({...screenshotForm, alt: e.target.value})}
                  className="bg-gray-900 border-gray-600 text-white"
                  placeholder="Describe the image"
                />
              </div>
              <div>
                <Label htmlFor="imageTitle" className="text-gray-300">Title (Optional)</Label>
                <Input
                  id="imageTitle"
                  value={screenshotForm.title}
                  onChange={(e) => setScreenshotForm({...screenshotForm, title: e.target.value})}
                  className="bg-gray-900 border-gray-600 text-white"
                  placeholder="Image title"
                />
              </div>
            </div>
            <Button onClick={handleSaveImage} className="btn-anime">
              <Save className="mr-2 h-4 w-4" />
              Add App Image
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Current App Images</h3>
          {screenshots.length === 0 ? (
            <div className="text-center py-8 bg-gray-800/50 rounded-lg">
              <div className="text-gray-400">
                <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🖼️</span>
                </div>
                <p>No app images uploaded yet.</p>
                <p className="text-sm mt-2">Add images to display them on the homepage.</p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {screenshots.map((image) => (
                <div key={image.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <img 
                    src={image.image_url} 
                    alt={image.alt_text}
                    className="w-full h-40 object-cover rounded mb-3"
                    onError={(e) => {
                      console.error('Admin app image failed to load:', image.image_url);
                      const target = e.target as HTMLImageElement;
                      target.style.opacity = '0.5';
                    }}
                  />
                  <p className="text-white font-medium mb-1">{image.title || 'Untitled'}</p>
                  <p className="text-gray-400 text-sm mb-3">{image.alt_text}</p>
                  <Button
                    onClick={() => handleDeleteImage(image.id)}
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

export default AppImagesTab;
