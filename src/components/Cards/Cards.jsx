import { useEffect, useState } from "react";
import Card from "../Card/Card";
import { db } from "../../service/firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductFilter from "../ProductFilter/ProductFilter";
import "./Cards.css";

const Cards = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("");

  const filteredData = products.filter((product) => product.type === selectedType);
  const displayedProducts = selectedType ? filteredData : products;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const dataArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(dataArray);
      } catch (err) {
        setError("حدث خطأ أثناء جلب المنتجات. حاول لاحقاً.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="cardsContainer mt container">
        <p>جاري التحميل...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cardsContainer mt container">
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt container">
      <ProductFilter selectedType={selectedType} setSelectedType={setSelectedType} />
      {displayedProducts?.length === 0 ? (
        <p style={{ textAlign: 'center' }}>الموقع قيد التحديث, انتظروا منتجاتنا الجديدة</p>
      ) : (
        <div className="cardsContainer">
          {displayedProducts?.map((item) => {
            return (
              <Card
                key={item.id}
                price={item.price}
                name={item.title}
                src={item.imageUrl}
                alt={item.title}
                msg={`مرحبا, أريد شراء ${item.title}`}
                capacity={item.capacity}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Cards;
