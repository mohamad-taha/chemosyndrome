import { db } from "../service/firebase";
import { collection, getDocs } from "firebase/firestore";

export const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));

  const dataArray = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return dataArray;
};
