'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { firebase } from '@/utils/client';

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        setUser(fbUser);
      } else {
        setUser(false);
      }
    });
    return () => unsubscribe(); // Cleanup listener
  }, []);

  // ✅ Add updateUser function to manually update user state
  const updateUser = (newUserData) => {
    console.log('Updating user:', newUserData);
    setUser((prevUser) => ({ ...prevUser, ...newUserData }));
  };

  const value = useMemo(
    () => ({
      user,
      userLoading: user === null,
      updateUser, // ✅ Make sure updateUser is included in the context
    }),
    [user],
  );

  return <AuthContext.Provider value={value} {...props} />;
}

const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };
