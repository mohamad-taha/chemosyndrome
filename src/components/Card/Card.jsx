// ====================
// Imports
// ====================

import React from "react";

import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { BsCartPlus } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import { deleteProduct } from "../../service/api";

import Swal from "sweetalert2";
import Cookies from "js-cookie";

import "./Card.css";

// ====================
// Component: Card
// ====================

const Card = ({ name, price, src, alt, capacity, id, refetch }) => {
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const savedData = Cookies.get("userData") || "";

  const user =
    savedData && savedData !== "undefined"
      ? JSON.parse(savedData)
      : null;

  const handleDeleteClick = () => {
    Swal.fire({
      title: "هل أنت متأكد من حذف المنتج؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d00000",
      cancelButtonColor: "#718096",
      confirmButtonText: "نعم، احذف",
      cancelButtonText: "إلغاء",
    }).then(async (result) => { // أضفنا async هنا
      if (result.isConfirmed) {
        try {
          // 1. انتظر حتى تكتمل عملية الحذف تماماً في السيرفر
          await deleteProduct(id);

          // 2. الآن قم بتحديث البيانات بعد التأكد من الحذف
          await refetch();

          // 3. أظهر رسالة النجاح للمستخدم
          Swal.fire(
            "تم!",
            "تم حذف المنتج من قاعدة البيانات.",
            "success"
          );
        } catch (error) {
          // إدارة الأخطاء في حال فشل الحذف من السيرفر
          Swal.fire(
            "خطأ!",
            "حدث خطأ أثناء محاولة حذف المنتج.",
            "error"
          );
        }
      }
    });
  };


  const handleAddToCart = () => {
    addToCart({ id, name, price, src, capacity });

    Swal.fire({
      icon: "success",
      title: "تم إضافة المنتج للسلة",
      showConfirmButton: false,
      timer: 1500,
      position: "top-end",
      toast: true,
    });
  };

  return (
    <div className="productCard">
      <div className="cardImgWrapper">
        <img src={src} alt={alt} className="cardImg" />

        {capacity && (
          <span className="cardBadge">
            السعة: {capacity}
          </span>
        )}
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
            onClick={handleAddToCart}
            className="cardBtn cardBtnPrimary"
            aria-label="إضافة الى السلة"
          >
            إضافة الى السلة
            <BsCartPlus fontSize={16} />
          </button>

          <button
            onClick={() =>
              navigate(`/product/${id}`)
            }
            className="cardBtn cardBtnViewDetails"
            aria-label="عرض تفاصيل المنتج"
          >
            <FaEye fontSize={22} /> عرض التفاصيل
          </button>
        </div>

        {user?.isAdmin && (
          <div className="adminActions">
            <button
              onClick={() =>
                navigate(`/form-products/${id}`)
              }
              className="cardBtnAdmin cardBtnEdit"
              aria-label="تعديل المنتج"
            >
              <FaRegEdit /> تعديل
            </button>

            <button
              onClick={handleDeleteClick}
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