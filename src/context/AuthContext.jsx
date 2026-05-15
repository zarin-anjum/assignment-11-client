import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase.config";

const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const saveUserAndGetToken = async (firebaseUser) => {
  await axiosPublic.post("/users", {
    name: firebaseUser.displayName,
    email: firebaseUser.email,
    photo: firebaseUser.photoURL,
  });
 
  const { data } = await axiosPublic.post("/users/jwt", {
    email: firebaseUser.email,
  });
 
  localStorage.setItem("token", data.token);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //Login user
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //Google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //Update profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //Logout
  const logoutUser = () => {
    localStorage.removeItem("token");
    setLoading(true);
    return signOut(auth);
  };

  //Keep user logged in after refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          await saveUserAndGetToken(currentUser);
        } catch (err) {
          console.error("Failed to sync user with backend:", err.message);
        }
      } else {
        localStorage.removeItem("token");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    googleLogin,
    logoutUser,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

//Custom hook(clean usage)
export const useAuth = () => {
  return useContext(AuthContext);
};
