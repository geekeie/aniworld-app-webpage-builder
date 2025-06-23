
import { useEffect } from 'react';

const AdminNoIndex = () => {
  useEffect(() => {
    // Add noindex meta tag for admin pages
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    return () => {
      // Clean up when component unmounts
      const existingMeta = document.querySelector('meta[name="robots"]');
      if (existingMeta) {
        document.head.removeChild(existingMeta);
      }
    };
  }, []);

  return null;
};

export default AdminNoIndex;
