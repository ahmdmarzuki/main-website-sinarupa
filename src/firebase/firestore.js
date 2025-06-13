import {
  getFirestore,
  collection,
  setDoc,
  doc,
  deleteDoc,
  getDocs,
  onSnapshot,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "./firebaseConfig";
import { toast } from "react-toastify";
import { auth } from "./auth";

const db = getFirestore(app);
const usersCollectionRef = collection(db, "users");
const tempArtDatabase = collection(db, "tempArtDatabase");
const artDatabase = collection(db, "artDatabase");

export const createArt = async (
  id,
  realName,
  profilePictureUrl,
  major,
  dimensionType,
  artTitle,
  artUrl,
  artNameYear,
  artDesc,
  artDimension,
  artMedia
) => {
  try {
    await setDoc(doc(tempArtDatabase, id), {
      id,
      realName,
      profilePictureUrl,
      major,
      dimensionType,
      artTitle,
      artUrl,
      artNameYear,
      artDesc,
      artDimension,
      artMedia,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    toast.error("Gagal mengunggah karya: " + error.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};

const acceptArt = async (
  id,
  realName,
  profilePictureUrl,
  major,
  dimensionType,
  artTitle,
  artUrl,
  artNameYear,
  artDesc,
  artDimension,
  artMedia
) => {
  try {
    await setDoc(doc(artDatabase, id), {
      id,
      realName,
      profilePictureUrl,
      major,
      dimensionType,
      artTitle,
      artUrl,
      artNameYear,
      artDesc,
      artDimension,
      artMedia,
      timestamp: serverTimestamp(),
    });
    await deleteDoc(doc(tempArtDatabase, id));
    toast.success("Karya berhasil masuk ke database!", {
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
    toast.error("Gagal menerima karya: " + error.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};

const fetchTempArtDatabase = async () => {
  try {
    const querySnapshot = await getDocs(tempArtDatabase);
    const tempArtList = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return tempArtList;
  } catch (error) {
    console.error("Error fetching temp art data:", error);
    throw error;
  }
};

const fetchArtDatabase = async () => {
  try {
    const querySnapshot = await getDocs(artDatabase);
    const artList = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return artList;
  } catch (error) {
    console.error("Error fetching art data:", error);
    throw error;
  }
};

const subscribeToArtDatabase = (callback) => {
  const unsubscribe = onSnapshot(
    artDatabase,
    (snapshot) => {
      const artList = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      callback(artList);
    },
    (error) => {
      console.error("Error listening to art database:", error);
    }
  );

  return unsubscribe;
};

const adminCheck = async (setEmail, setRole, setIsAdmin) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userDoc = await getDoc(doc(usersCollectionRef, user.uid));
      if (userDoc.data()?.role === "admin") {
        setIsAdmin(true);
        setEmail(userDoc.data().email);
        setRole(userDoc.data().role);
      } else {
        setIsAdmin(false);
        setEmail(userDoc.data().email);
        setRole(userDoc.data().role);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const editArt = async (
  id,
  realName,
  profilePictureUrl,
  major,
  artTitle,
  artUrl,
  artNameYear,
  artDesc,
  artDimension,
  artMedia
) => {
  try {
    await setDoc(
      doc(artDatabase, id),
      {
        id,
        realName,
        profilePictureUrl,
        major,
        artUrl,
        artTitle,
        artDesc,
        artNameYear,
        artDimension,
        artMedia,
      },
      { merge: true }
    );

    toast.success("Karya berhasil diperbarui!", {
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
    toast.error("Gagal memperbarui karya: " + error.message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};

const deleteArt = async (id) => {
  try {
    await deleteDoc(doc(artDatabase, id));
    toast.success("Karya berhasil dihapus!", {
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
    toast.error("Gagal menghapus karya: " + error.message, {
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

export {
  db,
  fetchTempArtDatabase,
  fetchArtDatabase,
  tempArtDatabase,
  artDatabase,
  subscribeToArtDatabase,
  adminCheck,
  editArt,
  deleteArt,
  acceptArt,
};
