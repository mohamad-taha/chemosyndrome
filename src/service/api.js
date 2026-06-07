import { db } from "../service/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";


// جلب جميع المنتجات
export const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));

  const dataArray = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return dataArray;
};

// الاشتراك في تحديثات المنتجات
export const subscribeProducts = (callback) =>
  onSnapshot(collection(db, "products"), (snap) => {
    const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });

  // حذف منتج
export const deleteProduct = async (id) => {
  const productRef = doc(db, "products", id);
  await deleteDoc(productRef);
  fetchProducts();
};

// جلب منتج واحد
export const fetchProduct = async (id) => {
  const docRef = doc(db, "products", id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) throw new Error("Product not found");
  return { id: snap.id, ...snap.data() };
};

// تحديث منتج
export const updateProduct = async (id, updates) => {
  const ref = doc(db, "products", id);
  await updateDoc(ref, updates);
  return { id, ...updates };
};
