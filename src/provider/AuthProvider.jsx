import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import app from "../config/firebase";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import AuthContext from "./AuthContext";
import useAxiosPublic from "../hooks/useAxiosPublic";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  const axiosPublic = useAxiosPublic();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);
        await axiosPublic.post(
          "/jwt",
          { email: currentUser?.email },
          { withCredentials: true }
        );
      } else {
        setUser(currentUser);
        await axiosPublic.get("/jwt/logout", {
          withCredentials: true,
        });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [axiosPublic]);

  const createUserWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const changePassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = () => {
    setLoading(true);
    toast.warn("Logged out.", {
      toastId: "logout",
    });
    return signOut(auth);
  };

  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const authInfo = {
    user,
    loading,
    theme,
    setUser,
    setLoading,
    createNewUser,
    logOut,
    login,
    updateUserProfile,
    createUserWithGoogle,
    changePassword,
    toggleTheme,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.array,
};

export default AuthProvider;
