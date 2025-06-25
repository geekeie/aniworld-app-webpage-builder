
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Code, AlertCircle } from 'lucide-react';

interface HeaderCodeTabProps {
  content: {
    customHeaderCode: string;
  };
  setContent: (content: any) => void;
}

const HeaderCodeTab = ({ content, setContent }: HeaderCodeTabProps) => {
  return (
    <Card className="card-anime">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Code className="h-5 w-5" />
          Custom Header Code
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-blue-300 font-medium mb-2">Usage Examples:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Google AdSense verification meta tags</li>
                <li>• Google Analytics tracking code</li>
                <li>• Facebook pixel code</li>
                <li>• Custom CSS or JavaScript</li>
                <li>• Third-party verification codes</li>
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
            placeholder={`<!-- Example: Google AdSense verification -->
<meta name="google-adsense-account" content="ca-pub-1234567890123456">

<!-- Example: Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>

<!-- Example: Custom CSS -->
<style>
  .custom-class {
    color: #ff6b6b;
  }
</style>`}
            className="w-full h-80 bg-gray-800 border border-gray-700 text-white p-4 rounded-md font-mono text-sm resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
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
