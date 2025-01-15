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
import axios from "axios";

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const [theme, setTheme] = useState("acid");

  console.log(user);

  const toggleTheme = () => {
    setTheme(theme === "acid" ? "synthwave" : "acid");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);

        await axios.post(
          `${import.meta.env.VITE_API_URL}/user/${currentUser?.email}`,
          {
            name: currentUser?.displayName,
            image: currentUser?.photoURL,
            role: "worker",
            email: currentUser?.email,
          }
        );

        setLoading(false);
      } else {
        setUser({});
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

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
