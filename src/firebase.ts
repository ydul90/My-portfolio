import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC42DUocq4pYNdRRZMDN8hWfbrI2EwvEUY",
  authDomain: "my-portfolio-new-c1387.firebaseapp.com",
  projectId: "my-portfolio-new-c1387",
  storageBucket: "my-portfolio-new-c1387.firebasestorage.app",
  messagingSenderId: "668219328941",
  appId: "1:668219328941:web:c8cc2951682fd6ec377924",
  measurementId: "G-98J580STG1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logout = () => signOut(auth);
