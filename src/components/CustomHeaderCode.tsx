
import { useEffect } from 'react';

const CustomHeaderCode = () => {
  useEffect(() => {
    // Load custom header code from localStorage
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      const parsedContent = JSON.parse(savedContent);
      const customCode = parsedContent.customHeaderCode;
      
      if (customCode && customCode.trim()) {
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
      }
    }
    
    // Cleanup function
    return () => {
      const customElements = document.querySelectorAll('[data-custom-header-code]');
      customElements.forEach(element => element.remove());
    };
  }, []);

  return null;
};

export default CustomHeaderCode;
