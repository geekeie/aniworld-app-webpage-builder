
import { useToast } from '@/hooks/use-toast';
import { updateMediaFile } from '@/services/supabaseService';

export const useImageUpload = (
  setBlogForm: (form: any) => void,
  setContent: (content: any) => void,
  setScreenshotForm: (form: any) => void,
  blogForm: any,
  content: any,
  screenshotForm: any
) => {
  const { toast } = useToast();

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>, 
    type: 'blog' | 'headerLogo' | 'heroBackground' | 'heroLogo' | 'screenshot'
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const imageUrl = e.target?.result as string;
          
          if (type === 'blog') {
            setBlogForm({ ...blogForm, image: imageUrl });
          } else if (type === 'headerLogo') {
            setContent({ ...content, headerLogo: imageUrl });
            // Update media file in database
            try {
              await updateMediaFile('header_logo', imageUrl, file.name);
              console.log('Header logo updated in database');
            } catch (error) {
              console.error('Failed to update header logo in database:', error);
            }
          } else if (type === 'heroBackground') {
            setContent({ ...content, heroBackgroundImage: imageUrl });
            // Update media file in database
            try {
              await updateMediaFile('hero_background', imageUrl, file.name);
              console.log('Hero background updated in database');
            } catch (error) {
              console.error('Failed to update hero background in database:', error);
            }
          } else if (type === 'heroLogo') {
            setContent({ ...content, heroForegroundLogo: imageUrl });
            // Update media file in database
            try {
              await updateMediaFile('hero_foreground', imageUrl, file.name);
              console.log('Hero foreground logo updated in database');
            } catch (error) {
              console.error('Failed to update hero foreground logo in database:', error);
            }
          } else if (type === 'screenshot') {
            setScreenshotForm({ ...screenshotForm, image: imageUrl });
          }
          
          toast({
            title: "Image uploaded",
            description: "Image has been uploaded and saved successfully.",
          });
        };
        
        reader.onerror = () => {
          toast({
            title: "Upload failed",
            description: "Failed to read the image file. Please try again.",
            variant: "destructive",
          });
        };
        
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error during image upload:', error);
        toast({
          title: "Upload failed",
          description: "Failed to upload image. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return { handleImageUpload };
};
