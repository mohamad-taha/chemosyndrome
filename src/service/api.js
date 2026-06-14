// ====================
// Imports
// ====================

import { db } from "../service/firebase";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  addDoc,
  query,
  orderBy,
  setDoc,
} from "firebase/firestore";

// ====================
// Products
// ====================

// جلب جميع المنتجات
export const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

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

// إضافة منتج جديد
export const addProduct = async (productData) => {
  const docRef = await addDoc(collection(db, "products"), {
    ...productData,
    createdAt: new Date(),
  });

  return { id: docRef.id, ...productData };
};

// تحديث منتج موجود
export const updateProduct = async (id, updates) => {
  const ref = doc(db, "products", id);

  await updateDoc(ref, {
    ...updates,
    updatedAt: new Date(),
  });

  return { id, ...updates };
};

// ====================
// Comments
// ====================

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
    username: username || "مستخدم زائر",
    text,
    createdAt: new Date(),
    email,
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

// ====================
// Cart
// ====================

// جلب سلة المستخدم من الفايرستور
export const fetchUserCart = async (userId) => {
  if (!userId) return [];

  const cartRef = doc(db, "carts", userId);

  const snap = await getDoc(cartRef);

  if (snap.exists()) {
    return snap.data().items || [];
  }

  return [];
};

// حفظ السلة بالكامل في الفايرستور (تحديث دائم)
export const saveUserCart = async (userId, items) => {
  if (!userId) return;

  const cartRef = doc(db, "carts", userId);

  await setDoc(cartRef, { items, updatedAt: new Date() }, { merge: true });
};
