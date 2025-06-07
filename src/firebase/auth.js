import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "./firebaseConfig";
import { toast } from "react-toastify";

const auth = getAuth(app);

const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    toast.success("Login berhasil!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    return user;
  } catch (error) {
    let errorMessage = "Terjadi kesalahan saat login";

    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "Email tidak valid";
        break;
      case "auth/user-disabled":
        errorMessage = "Akun telah dinonaktifkan";
        break;
      case "auth/user-not-found":
        errorMessage = "Email tidak terdaftar";
        break;
      case "auth/wrong-password":
        errorMessage = "Password salah";
        break;
      default:
        errorMessage = error.message;
    }

    toast.error(errorMessage, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    throw error;
  }
};

const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    toast.success("Registrasi berhasil!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    return user;
  } catch (error) {
    let errorMessage = "Terjadi kesalahan saat registrasi";

    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "Email sudah terdaftar";
        break;
      case "auth/invalid-email":
        errorMessage = "Email tidak valid";
        break;
      case "auth/operation-not-allowed":
        errorMessage = "Registrasi dengan email tidak diizinkan";
        break;
      case "auth/weak-password":
        errorMessage = "Password terlalu lemah";
        break;
      default:
        errorMessage = error.message;
    }

    toast.error(errorMessage, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    throw error;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logout berhasil!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  } catch (error) {
    toast.error("Terjadi kesalahan saat logout", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    throw error;
  }
};

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

export { signInWithEmail, signUpWithEmail, logout, getCurrentUser, auth };
