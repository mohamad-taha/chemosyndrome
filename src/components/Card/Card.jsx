import React, { useState } from "react";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { deleteProduct } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { useCart } from "../../context/CartContext"; // 👈 استيراد الهوك الخاص بالسلة
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import "./Card.css";

const Card = ({ name, price, src, msg, alt, capacity, id }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart(); // 👈 استخراج دالة الإضافة

  const savedData = Cookies.get("userData") || "";
  const user = (savedData && savedData !== "undefined") ? JSON.parse(savedData) : null;

  const handleDeleteClick = () => {
    Swal.fire({
      title: 'هل أنت متأكد من حذف المنتج؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d00000',
      cancelButtonColor: '#718096',
      confirmButtonText: 'نعم، احذف',
      cancelButtonText: 'إلغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id); // 👈 تم تمرير الـ id بشكل صحيح هنا
        Swal.fire('تم!', 'تم حذف المنتج من قاعدة البيانات.', 'success');
      }
    });
  };

  const handleAddToCart = () => {
    // تمرير البيانات للدالة المركزية
    addToCart({ id, name, price, src, capacity });

    // إشعار ناعم وسريع للمستخدم بنجاح الإضافة
    Swal.fire({
      icon: 'success',
      title: 'تم إضافة المنتج للسلة',
      showConfirmButton: false,
      timer: 1500,
      position: 'top-end',
      toast: true
    });
  };

  return (
    <div className="productCard">
      <div className="cardImgWrapper">
        <img src={src} alt={alt} className="cardImg" />
        {capacity && <span className="cardBadge">السعة: {capacity}</span>}
      </div>

      <div className="cardContent">
        <h3 className="cardTitle">{name}</h3>
        <p className="cardPrice">
          <span>{price?.toLocaleString()}</span> ليرة سورية
        </p>
      </div>

      <div className="cardActionsWrapper">
        <div className="userActions">
          <button
            onClick={handleAddToCart} // 👈 تشغيل دالة الإضافة
            className="cardBtn cardBtnPrimary"
            aria-label="إضافة الى السلة"
          >
            إضافة الى السلة
            <BsCartPlus fontSize={16} />
          </button>

          <button
            onClick={() => navigate(`/product/${id}`)}
            className="cardBtn cardBtnViewDetails"
            aria-label="عرض تفاصيل المنتج"
          >
            <FaEye fontSize={22} /> عرض التفاصيل
          </button>
        </div>

        {user?.isAdmin && (
          <div className="adminActions">
            <button
              onClick={() => navigate(`/form-products/${id}`)}
              className="cardBtnAdmin cardBtnEdit"
              aria-label="تعديل المنتج"
            >
              <FaRegEdit /> تعديل
            </button>

            <button
              onClick={handleDeleteClick} // 👈 استدعاء الدالة المصلحة
              className="cardBtnAdmin cardBtnDelete"
              aria-label="حذف المنتج"
            >
              <MdDeleteOutline /> حذف
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
