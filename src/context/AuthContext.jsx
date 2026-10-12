import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Auth init error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData) => {
    const userObj = typeof userData === 'object' ? {
      id: Date.now().toString(),
      name: userData.name || userData.email?.split('@')[0] || 'User',
      email: userData.email || '',
      role: userData.role || (userData.email?.includes('admin') ? 'organizer' : 'student')
    } : {
      id: Date.now().toString(),
      name: String(userData).split('@')[0],
      email: String(userData),
      role: String(userData).includes('admin') ? 'organizer' : 'student'
    };

    setUser(userObj);
    localStorage.setItem('user', JSON.stringify(userObj));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be within AuthProvider");
  return context;
};
