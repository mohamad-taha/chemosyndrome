import { useState } from "react";
import "./Card.css";

const Card = ({ name, price, src, msg }) => {
  const [active, setActive] = useState(false);
  const phoneNumber = 963934087400;
  const encodedMessage = encodeURIComponent(msg);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

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
        alt="product img"
        style={{ objectFit: "cover" }}
      />
      <span className="title">{name}</span>
      <span className="price">{price} ليرة سورية</span>
      <a
        href={url}
        target="_blank"
        className="outlineBtn"
        style={{ opacity: active ? "1" : "0" }}
      >
        اطلب الآن
      </a>
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
