import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decoded = JSON.parse(atob(storedToken.split('.')[1]));
      setUser({ id: decoded.user.id, role: decoded.user.role });
      setToken(storedToken);
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    const decoded = JSON.parse(atob(newToken.split('.')[1]));
    setUser({ id: decoded.user.id, role: decoded.user.role });
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return { user, token, login, logout };
};