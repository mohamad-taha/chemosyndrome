// ==========================================
// Imports
// ==========================================

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserCart, saveUserCart } from "../service/api";

// ==========================================
// 1. Context Initialization
// ==========================================

const CartContext = createContext();

// ==========================================
// 2. Provider Component
// ==========================================

export const CartProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // جلب بيانات المستخدم بأمان من الكوكيز
  const savedData = Cookies.get("userData") || "";
  const user = savedData && savedData !== "undefined" ? JSON.parse(savedData) : null;
  const userId = user?.uid || user?.id || user?.email;

  // حالة خاصة بالسلة المحلية فقط (للزوار غير المسجلين)
  const [localCart, setLocalCart] = useState(() => {
    if (!userId) {
      const data = localStorage.getItem("appCart");
      return data ? JSON.parse(data) : [];
    }
    return [];
  });

  // ==========================================
  // React Query: جلب بيانات السلة من السيرفر
  // ==========================================

  const {
    data: serverCart = [],
    isLoading: loadingCart,
    error: cartError,
    refetch: reloadCart,
    isError: isError,
    isFetching: isFetching
  } = useQuery({
    queryKey: ["cart", userId],
    queryFn: () => fetchUserCart(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });

  // تحديد أي سلة نعتمد عليها حالياً في التطبيق
  const cartItems = userId ? serverCart : localCart;

  // ==========================================
  // React Query: ميوتيشن حفظ وتحديث السلة
  // ==========================================

  const saveCartMutation = useMutation({
    mutationFn: (updatedItems) => saveUserCart(userId, updatedItems),

    // التحديث المتفائل (Optimistic Update) لجعل التطبيق فائق السرعة
    onMutate: async (updatedItems) => {
      await queryClient.cancelQueries({ queryKey: ["cart", userId] });
      const previousCart = queryClient.getQueryData(["cart", userId]);
      queryClient.setQueryData(["cart", userId], updatedItems);
      return { previousCart };
    },
    // في حال فشل الحفظ في السيرفر، يتم استعادة البيانات السابقة للسلامة
    onError: (err, updatedItems, context) => {
      console.error("خطأ في حفظ السلة بالسيرفر:", err);
      if (context?.previousCart) {
        queryClient.setQueryData(["cart", userId], context.previousCart);
      }
    },
    // تحديث الكاش بالبيانات النهائية بعد النجاح
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });

  // دالة مساعدة مركزية لتحديث السلة (سواء محلياً أو على السيرفر)
  const updateCartState = (newItems) => {
    if (userId) {
      saveCartMutation.mutate(newItems);
    } else {
      setLocalCart(newItems);
      localStorage.setItem("appCart", JSON.stringify(newItems));
    }
  };

  // ==========================================
  // Cart Actions & Methods
  // ==========================================

  const addToCart = (product) => {
    const isExist = cartItems.find((item) => item.id === product.id);
    let updated;

    if (isExist) {
      updated = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updated = [...cartItems, { ...product, quantity: 1 }];
    }
    updateCartState(updated);
  };

  const removeFromCart = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCartState(updated);
  };

  const updateQuantity = (id, amount) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + amount;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    updateCartState(updated);
  };

  const clearCart = () => {
    updateCartState([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // ميزة إضافية مفيدة: حساب إجمالي عدد القطع بالسلة

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // ==========================================
  // Render Provider
  // ==========================================

  return (
    <CartContext.Provider
      value={{
        cartItems, addToCart,
        removeFromCart, updateQuantity,
        clearCart, getCartTotal,
        getCartCount, loadingCart,
        cartError, isError,
        reloadCart, isFetching
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ==========================================
// Custom Hook
// ==========================================
export const useCart = () => useContext(CartContext);
