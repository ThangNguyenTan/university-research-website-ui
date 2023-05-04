import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(!!localStorage.getItem('x-auth-token'));

  useEffect(() => {
    if (auth) {
      localStorage.setItem('x-auth-token', localStorage.getItem('x-auth-token'));
    }
  }, [auth]);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
