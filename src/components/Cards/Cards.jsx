import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../service/firebase";
import ProductFilter from "../ProductFilter/ProductFilter";
import { fetchProducts } from "../../service/api";

import Card from "../Card/Card";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import Loader from "../Loader/Loader";

import "./Cards.css";

const Cards = () => {
  const [selectedType, setSelectedType] = useState("");

  const { data: products, isLoading, error, refetch } = useQuery({
    queryKey: ['items'], queryFn: fetchProducts
  })

  const filteredData = products?.filter((product) => product.type === selectedType);
  const displayedProducts = selectedType ? filteredData : products;

  return (
    <div className="mt container">
      <ProductFilter selectedType={selectedType} setSelectedType={setSelectedType} />
      <div className="cardsContainer">
        {error ? <ErrorMsg refetch={refetch} /> : isLoading ? <Loader /> : displayedProducts.length !== 0 ?
          displayedProducts?.map((item) => {
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
            )
          }) : 'الموقع قيد التحديث, انتظروا منتجاتنا الجديدة'}
      </div>
    </div>
  );
};

export default Cards;
