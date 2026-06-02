import React, { useEffect, useState } from 'react'
import ProductsForm from "../components/ProductsForm/ProductsForm";
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const ProductForm = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true); // حالة لمنع ظهور الفورم قبل إدخال الإيميل


  useEffect(() => {
    // تظهر نافذة تطلب الإيميل بمجرد فتح الصفحة
    const userEmail = prompt("الرجاء إدخال بريد الأدمن الإلكتروني لرؤية الفورم:");

    // التحقق إن كان الإيميل المدخل مطابقاً للأدمن
    if (userEmail && userEmail.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      setIsAdmin(true);
    } else {
      alert("عذراً، البريد الإلكتروني خاطئ وغير مصرح لك!");
      navigate("/"); // إعادة التوجيه إلى الصفحة الرئيسية أو أي صفحة أخرى
      setIsAdmin(false);
    }
    setChecking(false); // انتهاء عملية الفحص
  }, []);

  return (
    <div>
      {checking ? (
        <p>جارٍ التحقق من صلاحياتك...</p>
      ) : isAdmin ? (
        <ProductsForm />
      ) : (
        <p>ليس لديك صلاحية لرؤية هذا المحتوى.</p>
      )}
    </div>
  )
}

export default ProductForm
