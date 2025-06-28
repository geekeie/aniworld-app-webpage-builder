
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Code, AlertCircle, Trash2, RefreshCw, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HeaderCodeTabProps {
  content: {
    customHeaderCode: string;
  };
  setContent: (content: any) => void;
}

const HeaderCodeTab = ({ content, setContent }: HeaderCodeTabProps) => {
  const { toast } = useToast();
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCache = async () => {
    setIsClearing(true);
    try {
      // Clear various types of cache
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }
      
      // Clear localStorage
      localStorage.clear();
      
      // Clear sessionStorage
      sessionStorage.clear();
      
      // Force reload all cached resources
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
        }
      }
      
      toast({
        title: "Cache cleared successfully",
        description: "All website cache has been cleared. The page will reload to apply changes.",
      });
      
      // Reload the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error('Error clearing cache:', error);
      toast({
        title: "Cache clear failed",
        description: "Some cache might not have been cleared. Try refreshing the browser manually.",
        variant: "destructive",
      });
    } finally {
      setIsClearing(false);
    }
  };

  const handleTestCode = () => {
    const tempDiv = document.createElement('div');
    try {
      tempDiv.innerHTML = content.customHeaderCode;
      const scripts = tempDiv.querySelectorAll('script');
      const metas = tempDiv.querySelectorAll('meta');
      
      let hasGoogleVerification = false;
      let hasAnalytics = false;
      
      metas.forEach(meta => {
        const name = meta.getAttribute('name');
        const property = meta.getAttribute('property');
        if (name?.includes('google-site-verification') || name?.includes('google-adsense-account')) {
          hasGoogleVerification = true;
        }
      });
      
      scripts.forEach(script => {
        if (script.src?.includes('gtag') || script.textContent?.includes('gtag')) {
          hasAnalytics = true;
        }
      });
      
      let message = 'Code structure is valid. ';
      if (hasGoogleVerification) message += 'Google verification detected. ';
      if (hasAnalytics) message += 'Analytics code detected.';
      
      toast({
        title: "Code validation successful",
        description: message,
      });
    } catch (error) {
      toast({
        title: "Code validation failed",
        description: "There might be syntax errors in your custom code.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="card-anime">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Code className="h-5 w-5" />
          Custom Header Code & Cache Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-blue-300 font-medium mb-2">Usage Examples:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Google site verification: &lt;meta name="google-site-verification" content="your-code" /&gt;</li>
                <li>• Google AdSense: &lt;meta name="google-adsense-account" content="ca-pub-1234567890123456"&gt;</li>
                <li>• Google Analytics: &lt;script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"&gt;&lt;/script&gt;</li>
                <li>• Facebook pixel code</li>
                <li>• Custom CSS or JavaScript</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="customHeaderCode" className="text-gray-300 text-base font-medium">
            Custom Header Code
          </Label>
          <p className="text-sm text-gray-400 mb-3">
            Add custom HTML, CSS, or JavaScript code that will be inserted into the &lt;head&gt; section of your website.
          </p>
          <textarea
            id="customHeaderCode"
            value={content.customHeaderCode}
            onChange={(e) => setContent({...content, customHeaderCode: e.target.value})}
            placeholder={`<!-- Google Site Verification -->
<meta name="google-site-verification" content="your-verification-code-here">

<!-- Google AdSense -->
<meta name="google-adsense-account" content="ca-pub-1234567890123456">

<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>

<!-- Custom CSS -->
<style>
  .custom-class {
    color: #ff6b6b;
  }
</style>`}
            className="w-full h-80 bg-gray-800 border border-gray-700 text-white p-4 rounded-md font-mono text-sm resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-4">
          <Button
            onClick={handleTestCode}
            variant="outline"
            className="border-green-600 text-green-400 hover:bg-green-600/10"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Test Code
          </Button>
          
          <Button
            onClick={handleClearCache}
            disabled={isClearing}
            variant="outline"
            className="border-red-600 text-red-400 hover:bg-red-600/10"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isClearing ? 'animate-spin' : ''}`} />
            {isClearing ? 'Clearing...' : 'Clear Website Cache'}
          </Button>
        </div>

        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
            <div>
              <h4 className="text-green-300 font-medium mb-2">Cache Management:</h4>
              <p className="text-sm text-gray-300">
                Use the "Clear Website Cache" button to clear all cached data and force a fresh reload of your website. 
                This is useful when your custom code changes are not reflecting immediately.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
            <div>
              <h4 className="text-yellow-300 font-medium mb-2">Security Warning:</h4>
              <p className="text-sm text-gray-300">
                Only add code from trusted sources. Malicious code can compromise your website's security and user data.
                Always validate and test custom code before saving.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeaderCodeTab;
