import Card from "../Card/Card";
import Products from "../../products.json";
import "./Cards.css";

const Cards = () => {
  return (
    <div className="cardsContainer mt container">
      {Products.map((item, id) => {
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
