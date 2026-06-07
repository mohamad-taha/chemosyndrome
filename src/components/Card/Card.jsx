import { useState } from "react";
import { FaEdit } from "react-icons/fa";
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
    <div
      onMouseOver={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="card"
    >
      <img
        width={200}
        height={230}
        src={src}
        alt={alt}
        style={{ objectFit: "cover" }}
      />
      <span className="title">{name}</span>
      <span className="title">السعة: {capacity}</span>
      <span className="price">السعر: {price} ليرة سورية</span>

      <div className="cardsLinks" style={{ opacity: active ? "1" : "0" }}>
        <a
          href={url}
          target="_blank"
          className="outlineBtn"
        >
          اطلب الآن
        </a>

        {user?.isAdmin &&
          <div className="adminCardBtns">
            <button onClick={() => navigate(`/form-products/${id}`)} className="secondaryBtn">
              <FaRegEdit />
              تعديل
            </button>

            <button onClick={() => deleteProduct(id)} className="errorBtn">
              <MdDeleteOutline />
              حذف
            </button>
          </div>
        }
      </div>

      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          width: "100%",
          position: "absolute",
          height: "100%",
          opacity: active ? "1" : "0",
          transition: "300ms",
        }}
      ></div>
    </div>
  );
};

export default Card;
