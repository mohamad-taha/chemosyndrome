import { useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { deleteProduct } from "../../service/api";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import "./Card.css";

const Card = ({ name, price, src, msg, alt, capacity, id }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  const phoneNumber = 963934087400;
  const encodedMessage = encodeURIComponent(msg);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const savedData = Cookies.get("userData") || "";
  const user = (savedData && savedData !== "undefined") ? JSON.parse(savedData) : null;

  return (
    <div className="productCard">
      <div className="cardImgWrapper">
        <img
          src={src}
          alt={alt}
          className="cardImg"
        />
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
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="cardBtn cardBtnPrimary"
            aria-label="اطلب الآن عبر واتساب"
          >
            اطلب الآن
          </a>

          <button
            onClick={() => navigate(`/product/${id}`)}
            className="cardBtn cardBtnViewDetails"
            title="عرض التفاصيل"
            aria-label="عرض تفاصيل المنتج"
          >
            <FaEye /> عرض التفاصيل
          </button>
        </div>

        {user?.isAdmin && (
          <div className="adminActions">
            <button
              onClick={() => navigate(`/form-products/${id}`)}
              className="cardBtnAdmin cardBtnEdit"
              title="تعديل المنتج"
              aria-label="تعديل المنتج"
            >
              <FaRegEdit /> تعديل
            </button>

            <button
              onClick={() => deleteProduct(id)}
              className="cardBtnAdmin cardBtnDelete"
              title="حذف المنتج"
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
