import React, { useEffect, useState } from 'react'
import ProductsForm from "../components/ProductsForm/ProductsForm";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const ProductForm = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);


  useEffect(() => {
    Swal.fire({
      title: "الرجاء إدخال البريد الالكتروني للأدمن",
      input: "text",
      inputAttributes: { autocapitalize: "off" },
      showCancelButton: true,
      cancelButtonText: "إلغاء",
      confirmButtonText: "تحقق",
      confirmButtonColor: "#4977e5",
      cancelButtonColor: 'red',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      preConfirm: async (inputValue) => {
        if (!inputValue || !inputValue.trim()) {
          Swal.showValidationMessage("الرجاء كتابة البريد الإلكتروني أولاً!");
          return false;
        }

        if (inputValue.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
          setIsAdmin(true);
          setChecking(false);
          return true;
        } else {
          Swal.showValidationMessage("عذراً، البريد الإلكتروني خاطئ وغير مصرح لك!");
          return false;
        }
      },
    }).then((result) => {
      // التحقق فوراً إذا كان سبب إغلاق النافذة هو الضغط على زر "إلغاء"
      if (result.dismiss === Swal.DismissReason.cancel) {
        setIsAdmin(false);
        setChecking(false);
        navigate("/");
      }
    });
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
