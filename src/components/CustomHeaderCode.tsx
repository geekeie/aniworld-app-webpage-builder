
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
          
          // Create a temporary container to parse the HTML
          const tempContainer = document.createElement('div');
          tempContainer.innerHTML = customCode;
          
          // Process meta tags first (for Google verification)
          const metaTags = tempContainer.querySelectorAll('meta');
          metaTags.forEach(meta => {
            const existingMeta = document.querySelector(`meta[name="${meta.getAttribute('name')}"]`);
            if (existingMeta) {
              existingMeta.remove();
            }
            
            const newMeta = document.createElement('meta');
            Array.from(meta.attributes).forEach(attr => {
              newMeta.setAttribute(attr.name, attr.value);
            });
            newMeta.setAttribute('data-custom-header-code', 'true');
            document.head.appendChild(newMeta);
          });
          
          // Process style tags
          const styleTags = tempContainer.querySelectorAll('style');
          styleTags.forEach(style => {
            const newStyle = document.createElement('style');
            newStyle.textContent = style.textContent;
            newStyle.setAttribute('data-custom-header-code', 'true');
            document.head.appendChild(newStyle);
          });
          
          // Process script tags
          const scriptTags = tempContainer.querySelectorAll('script');
          scriptTags.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
              newScript.src = script.src;
              newScript.async = script.async;
              newScript.defer = script.defer;
            } else {
              newScript.textContent = script.textContent;
            }
            Array.from(script.attributes).forEach(attr => {
              if (!['src', 'async', 'defer'].includes(attr.name)) {
                newScript.setAttribute(attr.name, attr.value);
              }
            });
            newScript.setAttribute('data-custom-header-code', 'true');
            document.head.appendChild(newScript);
          });
          
          // Force DOM update and verification
          setTimeout(() => {
            const verificationMeta = document.querySelector('meta[name="google-site-verification"]');
            if (verificationMeta) {
              console.log('Google verification meta tag successfully added:', verificationMeta.getAttribute('content'));
            }
          }, 100);
          
          console.log('Custom header code applied successfully');
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
  }, [content.customHeaderCode]);

  return null;
};

export default CustomHeaderCode;
