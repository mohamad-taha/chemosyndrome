// ====================
// Imports
// ====================

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

  const handleDeleteClick = async () => {
    // 1. إظهار رسالة التأكيد للمستخدم وانتظار الإجابة
    const result = await Swal.fire({
      title: "هل أنت متأكد من حذف المنتج؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d00000",
      cancelButtonColor: "#718096",
      confirmButtonText: "نعم، احذف",
      cancelButtonText: "إلغاء"
    });

    // 2. التحقق مما إذا كان المستخدم قد ضغط على زر التأكيد
    if (result.isConfirmed) {
      try {
        // تنفيذ عملية الحذف من السيرفر
        await deleteProduct(id);

        // تحديث البيانات في واجهة المستخدم (تأكد من كتابتها بشكل صحيح refetch)
        await refetch();

        // إظهار رسالة النجاح
        Swal.fire({
          title: "تم!",
          text: "تم حذف المنتج من قاعدة البيانات.",
          icon: "success"
        });

      } catch (error) {
        // طباعة الخطأ في الكونسول لتتبعه إذا استمرت المشكلة
        console.error("Error deleting product:", error);

        // إظهار رسالة الخطأ للمستخدم
        Swal.fire({
          title: "خطأ!",
          text: "حدث خطأ أثناء محاولة حذف المنتج.",
          icon: "error"
        });
      }
    }
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