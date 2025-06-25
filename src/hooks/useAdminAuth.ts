
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAdminAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAdminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  return {
    isAuthenticated,
    handleLogout
  };
};
