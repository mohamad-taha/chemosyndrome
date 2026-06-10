import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserCart, saveUserCart } from '../service/api'
import Cookies from 'js-cookie';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);

  // جلب بيانات المستخدم الحالي من الكوكيز التي تستخدمها في تطبيقك
  const savedData = Cookies.get("userData") || "";
  const user = (savedData && savedData !== "undefined") ? JSON.parse(savedData) : null;
  const userId = user?.uid || user?.id || user?.email; // استخدم المعرف المتاح لديك

  // 1. تأثير لجلب السلة من Firestore بمجرد التعرف على المستخدم
  useEffect(() => {
    const loadCart = async () => {
      if (userId) {
        setLoadingCart(true);
        try {
          const items = await fetchUserCart(userId);
          setCartItems(items);
        } catch (error) {
          console.error("خطأ في جلب السلة:", error);
        } finally {
          setLoadingCart(false);
        }
      } else {
        // إذا لم يكن مسجلاً، نعتمد على الـ LocalStorage كخيار احتياطي للزوار
        const localData = localStorage.getItem('appCart');
        setCartItems(localData ? JSON.parse(localData) : []);
        setLoadingCart(false);
      }
    };
    loadCart();
  }, [userId]);

  // 2. تأثير لحفظ أي تغيير يحدث في السلة مباشرة في Firestore أو LocalStorage
  useEffect(() => {
    if (loadingCart) return; // منع الحفظ العشوائي أثناء التحميل الابتدائي

    if (userId) {
      saveUserCart(userId, cartItems).catch(err => console.error("خطأ في حفظ السلة:", err));
    } else {
      localStorage.setItem('appCart', JSON.stringify(cartItems));
    }
  }, [cartItems, userId, loadingCart]);

  // دالة إضافة منتج للسلة
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const isExist = prevItems.find((item) => item.id === product.id);
      if (isExist) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // دالة حذف منتج من السلة
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // دالة لتعديل الكمية (زيادة/نقصان)
  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  // تفريغ السلة
  const clearCart = () => setCartItems([]);

  // حساب إجمالي السعر
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, loadingCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
