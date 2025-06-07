import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import { app } from "./firebaseConfig";
import { toast } from "react-toastify";

const db = getFirestore(app);
const usersCollectionRef = collection(db, "users");
const tempArtDatabase = collection(db, "tempArtDatabase");
const artDatabase = collection(db, "artDatabase");

const createArt = async (id, url, name, artTitle, artDesc) => {
  try {
    await setDoc(doc(tempArtDatabase, id), {
      id,
      url,
      name,
      artTitle,
      artDesc,
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

export { createArt };
