import { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/Firebase.config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // cleanup
  }, []);

  const logOut = () => signOut(auth);

  const authData = { user, setUser, logOut, loading };

  // if (loading) return null;  

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;