import {
  getFirestore,
  collection,
  setDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { app } from "./firebaseConfig";
import { toast } from "react-toastify";

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
  artDimension
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
  artDimension
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
    alert(`error: ${error}`);
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

export {
  createArt,
  acceptArt,
  fetchTempArtDatabase,
  fetchArtDatabase,
  tempArtDatabase,
};
