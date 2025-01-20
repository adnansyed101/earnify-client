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
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const [theme, setTheme] = useState("acid");
  const axiosPublic = useAxiosPublic();

  const toggleTheme = () => {
    setTheme(theme === "acid" ? "synthwave" : "acid");
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
        axiosPublic.get("/jwt/logout", {
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
    toast.warn("Logged out.");
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
