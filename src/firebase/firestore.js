import {
  getFirestore,
  collection,
  setDoc,
  doc,
  deleteDoc,
  getDocs,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { app } from "./firebaseConfig";
import { toast } from "react-toastify";
import { auth } from "./auth";

const db = getFirestore(app);
const usersCollectionRef = collection(db, "users");
const tempArtDatabase = collection(db, "tempArtDatabase");
const artDatabase = collection(db, "artDatabase");

const createArt = async (
  id,
  realName,
  profilePictureUrl,
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

      artUrl,
      artTitle,
      artDesc,
      artNameYear,
      artDimension,
      artMedia,
    });

    toast.success("Berhasil Upload Karya!", {
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
    alert(`error: ${error}`);
  }
};

const acceptArt = async (
  id,
  realName,
  profilePictureUrl,
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

      artUrl,
      artTitle,
      artDesc,
      artNameYear,
      artDimension,
      artMedia,
    });

    await deleteDoc(doc(tempArtDatabase, id));

    toast.success("udh di acc", {
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
    alert(
      error ==
        "FirebaseError: [code=permission-denied]: Missing or insufficient permissions."
        ? "LOGIN SEBAGAI ADMIN"
        : { error }
    );
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

export {
  db,
  createArt,
  acceptArt,
  fetchTempArtDatabase,
  fetchArtDatabase,
  tempArtDatabase,
  subscribeToArtDatabase,
  adminCheck,
};
