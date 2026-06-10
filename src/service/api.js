import { db } from "../service/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  addDoc, // تم إضافة استيراد إضافة المستندات
  onSnapshot,
  query, // تم إضافة استيراد الاستعلامات للتعليقات
  orderBy, // تم إضافة استيراد ترتيب التعليقات
} from "firebase/firestore";

// جلب جميع المنتجات
export const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// الاشتراك في تحديثات المنتجات الفورية
export const subscribeProducts = (callback) =>
  onSnapshot(collection(db, "products"), (snap) => {
    const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });

// حذف منتج
export const deleteProduct = async (id) => {
  const productRef = doc(db, "products", id);
  await deleteDoc(productRef);
};

// جلب منتج واحد
export const fetchProduct = async (id) => {
  if (!id) return null;
  const docRef = doc(db, "products", id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
};

// دالة جديدة: إضافة منتج جديد
export const addProduct = async (productData) => {
  const docRef = await addDoc(collection(db, "products"), {
    ...productData,
    createdAt: new Date(),
  });
  return { id: docRef.id, ...productData };
};

// دالة جديدة: تحديث منتج موجود
export const updateProduct = async (id, updates) => {
  const ref = doc(db, "products", id);
  await updateDoc(ref, {
    ...updates,
    updatedAt: new Date(),
  });
  return { id, ...updates };
};

// جلب جميع التعليقات الخاصة بمنتج معين مرتبة من الأحدث للأقدم
export const fetchComments = async (productId) => {
  if (!productId) return [];
  const commentsRef = collection(db, "products", productId, "comments");
  const q = query(commentsRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// إضافة تعليق جديد لمنتج معين
export const addComment = async ({ productId, username, text, email }) => {
  if (!productId || !text.trim()) return;
  const commentsRef = collection(db, "products", productId, "comments");

  const docRef = await addDoc(commentsRef, {
    username: username || "مستخدم مجهول",
    text: text,
    createdAt: new Date(),
    email: email,
  });
  return { id: docRef.id, productId, username, text, email };
};

// حذف تعليق
export const deleteComment = async ({ productId, commentId }) => {
  if (!productId || !commentId) return;
  const commentRef = doc(db, "products", productId, "comments", commentId);
  await deleteDoc(commentRef);
};

// تعديل تعليق
export const updateComment = async ({ productId, commentId, newText }) => {
  if (!productId || !commentId || !newText.trim()) return;
  const commentRef = doc(db, "products", productId, "comments", commentId);
  await updateDoc(commentRef, {
    text: newText,
    updatedAt: new Date(),
  });
};
