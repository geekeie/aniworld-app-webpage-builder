
import { useToast } from '@/hooks/use-toast';

export const useImageUpload = (
  setBlogForm: (form: any) => void,
  setContent: (content: any) => void,
  setScreenshotForm: (form: any) => void,
  blogForm: any,
  content: any,
  screenshotForm: any
) => {
  const { toast } = useToast();

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>, 
    type: 'blog' | 'headerLogo' | 'heroBackground' | 'heroLogo' | 'screenshot'
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        
        if (type === 'blog') {
          setBlogForm({ ...blogForm, image: imageUrl });
        } else if (type === 'headerLogo') {
          setContent({ ...content, headerLogo: imageUrl });
        } else if (type === 'heroBackground') {
          setContent({ ...content, heroBackgroundImage: imageUrl });
        } else if (type === 'heroLogo') {
          setContent({ ...content, heroForegroundLogo: imageUrl });
        } else if (type === 'screenshot') {
          setScreenshotForm({ ...screenshotForm, image: imageUrl });
        }
        
        toast({
          title: "Image uploaded",
          description: "Image has been uploaded successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return { handleImageUpload };
};
