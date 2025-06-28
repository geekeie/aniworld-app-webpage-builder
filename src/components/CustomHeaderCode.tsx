
import { useEffect } from 'react';
import { useAdminData } from '@/hooks/useAdminData';

const CustomHeaderCode = () => {
  const { content } = useAdminData();

  useEffect(() => {
    const loadAndApplyCustomCode = async () => {
      try {
        const customCode = content.customHeaderCode;
        
        if (customCode && customCode.trim()) {
          console.log('Applying custom header code...');
          
          // Remove existing custom header code if any
          const existingCustomElements = document.querySelectorAll('[data-custom-header-code]');
          existingCustomElements.forEach(element => element.remove());
          
          // Create a container div to hold the custom code
          const customContainer = document.createElement('div');
          customContainer.setAttribute('data-custom-header-code', 'true');
          customContainer.innerHTML = customCode;
          
          // Append to head
          document.head.appendChild(customContainer);
          
          // Execute any script tags in the custom code
          const scripts = customContainer.querySelectorAll('script');
          scripts.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
              newScript.src = script.src;
              newScript.async = script.async;
              newScript.defer = script.defer;
            } else {
              newScript.textContent = script.textContent;
            }
            // Copy all attributes
            Array.from(script.attributes).forEach(attr => {
              newScript.setAttribute(attr.name, attr.value);
            });
            document.head.appendChild(newScript);
          });
          
          // Special handling for Google verification meta tags
          const metaTags = customContainer.querySelectorAll('meta[name*="google"]');
          metaTags.forEach(meta => {
            const existingMeta = document.querySelector(`meta[name="${meta.getAttribute('name')}"]`);
            if (existingMeta) {
              existingMeta.remove();
            }
          });
          
          console.log('Custom header code applied successfully');
          
          // Force a refresh of Google verification if present
          if (customCode.includes('google-site-verification') || customCode.includes('google-adsense-account')) {
            console.log('Google verification code detected and applied');
          }
        }
      } catch (error) {
        console.error('Error loading custom header code:', error);
      }
    };
    
    loadAndApplyCustomCode();
    
    // Cleanup function
    return () => {
      const customElements = document.querySelectorAll('[data-custom-header-code]');
      customElements.forEach(element => element.remove());
    };
  }, [content.customHeaderCode]); // Re-run when customHeaderCode changes

  return null;
};

export default CustomHeaderCode;
