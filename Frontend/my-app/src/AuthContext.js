// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap around App and provide auth state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
