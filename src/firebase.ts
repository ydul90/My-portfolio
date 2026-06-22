import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJ3IUQTooCRovI6JY6RBsv00ShBecXzqQ",
  authDomain: "my-portfolio-7e3bd.firebaseapp.com",
  projectId: "my-portfolio-7e3bd",
  storageBucket: "my-portfolio-7e3bd.firebasestorage.app",
  messagingSenderId: "467194965272",
  appId: "1:467194965272:web:0a547f7fe69134a9a8826d",
  measurementId: "G-TR0SJS10QJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

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
