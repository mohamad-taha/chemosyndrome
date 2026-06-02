import { useEffect, useState } from "react";
import Card from "../Card/Card";
import { db } from "../../service/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./Cards.css";

const Cards = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.error("خطأ في جلب البيانات:", err);
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
    <div className="cardsContainer mt container">
      {products?.length === 0 ? (
        <p>الموقع قيد التحديث, انتظروا منتجاتنا الجديدة</p>
      ) : (
        products?.map((item) => {
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
        })
      )}
    </div>
  );
};

export default Cards;
