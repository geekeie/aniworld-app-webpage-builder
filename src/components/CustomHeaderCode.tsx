
import { useEffect } from 'react';
import { getSiteContent } from '@/services/supabaseService';

const CustomHeaderCode = () => {
  useEffect(() => {
    const loadAndApplyCustomCode = async () => {
      try {
        // Load custom header code from database first
        console.log('Loading custom header code from database...');
        const siteContent = await getSiteContent();
        let customCode = '';
        
        if (siteContent && siteContent.customHeaderCode) {
          customCode = siteContent.customHeaderCode;
          console.log('Custom header code loaded from database');
        } else {
          // Fallback to localStorage
          console.log('No database content, falling back to localStorage');
          const savedContent = localStorage.getItem('siteContent');
          if (savedContent) {
            const parsedContent = JSON.parse(savedContent);
            customCode = parsedContent.customHeaderCode || '';
          }
        }
        
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
          
          console.log('Custom header code applied successfully');
        }
      } catch (error) {
        console.error('Error loading custom header code:', error);
        // Fallback to localStorage
        const savedContent = localStorage.getItem('siteContent');
        if (savedContent) {
          const parsedContent = JSON.parse(savedContent);
          const customCode = parsedContent.customHeaderCode;
          
          if (customCode && customCode.trim()) {
            const existingCustomElements = document.querySelectorAll('[data-custom-header-code]');
            existingCustomElements.forEach(element => element.remove());
            
            const customContainer = document.createElement('div');
            customContainer.setAttribute('data-custom-header-code', 'true');
            customContainer.innerHTML = customCode;
            document.head.appendChild(customContainer);
            
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
              Array.from(script.attributes).forEach(attr => {
                newScript.setAttribute(attr.name, attr.value);
              });
              document.head.appendChild(newScript);
            });
          }
        }
      }
    };
    
    loadAndApplyCustomCode();
    
    // Cleanup function
    return () => {
      const customElements = document.querySelectorAll('[data-custom-header-code]');
      customElements.forEach(element => element.remove());
    };
  }, []);

  return null;
};

export default CustomHeaderCode;
