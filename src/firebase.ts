import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHvk7JpIvRkkIwgGmrqushNrjeHIYRFhQ",
  authDomain: "my-portfolio-b9913.firebaseapp.com",
  projectId: "my-portfolio-b9913",
  storageBucket: "my-portfolio-b9913.firebasestorage.app",
  messagingSenderId: "33992329175",
  appId: "1:33992329175:web:d9dbb187f923bd1efcad92",
  measurementId: "G-488EE4MKQ2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
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
