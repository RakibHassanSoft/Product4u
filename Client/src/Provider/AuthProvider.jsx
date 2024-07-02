import React, { createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider ,signOut, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, updateProfile, signInWithPopup
} from 'firebase/auth';
import { app } from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAxiosSecure from '../hooks/useAxiosSecure';

const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  // const axiosSecure = useAxiosSecure();
  

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const subscription = 100;

  // Create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false));
  };

  // Sign in user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false));
  };

  // Update user
  const updateUser = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    }).finally(() => setLoading(false));
  };

  // Logout user
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };
  //sign in by google
  const provider = new GoogleAuthProvider();
  const signInByGoolge =()=>{
   setLoading(true);
    return signInWithPopup(auth,provider)
  }
  // Monitor user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      console.log('current user in', currentUser);

      if (currentUser) {
        try {
          const userInfo = { email: currentUser.email };
          const res = await axiosPublic.post('/jwt', userInfo);
          if (res.data.token) {
            localStorage.setItem('access-token', res.data.token);
          }
        } catch (error) {
          console.error('Error fetching token:', error);
        } finally {
          setLoading(false);
        }
      } else {
        localStorage.removeItem('access-token');
        setLoading(false);
      }
    });

    return () => {
      setUser(null);
      unSubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    logoutUser,
    updateUser,
    subscription,
    signInByGoolge,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;





























/*
import React, { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { app } from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();

  //creating an user
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Initialize loading to true
  const subscription = 100;

  //create user
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  //sign in user
  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  //update user
  const updateUser = async (name, photo) => {
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    } finally {
      setLoading(false);
    }
  };

  //logout
  const logoutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  // Monitor user
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      console.log('current user in', currentUser);

      if (currentUser) {
        try {
          const userInfo = { email: currentUser.email };
          const res = await axiosPublic.post('/jwt', userInfo);
          if (res.data.token) {
            localStorage.setItem('access-token', res.data.token);
          }
        } catch (error) {
          console.error('Error fetching token:', error);
        } finally {
          setLoading(false);
        }
      } else {
        localStorage.removeItem('access-token');
        setLoading(false);
      }
    });

    return () => {
      setUser(null);
      unSubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    logoutUser,
    updateUser,
    subscription,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

*/