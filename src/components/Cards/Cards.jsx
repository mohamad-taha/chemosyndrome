import Card from "../Card/Card";
import Products from "../../Products.json";
import "./Cards.css";

const Cards = () => {
  return (
    <div className="cardsContainer mt container">
      <p>
        {Products?.length == 0 &&
          "الموقع قيد التحديث, انتظروا منتجاتنا الجديدة"}
      </p>
      {Products?.map((item, id) => {
        return (
          <Card
            key={id}
            price={item.price}
            name={item.name}
            src={item.img}
            msg={`مرحبا, أريد شراء ${item.name}`}
          />
        );
      })}
    </div>
  );
};

export default Cards;
