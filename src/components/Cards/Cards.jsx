// ====================
// Imports
// ====================

import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchProducts } from "../../service/api";
import { getFriendlyErrorMessage } from "../../utils/getFriendlyErrorMessage";

import ProductFilter from "../ProductFilter/ProductFilter";
import Card from "../Card/Card";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import Loader from "../Loader/Loader";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";

// ====================
// Component: Cards
// ====================

const Cards = () => {
  const [selectedType, setSelectedType] = useState("");

  const isOnline = useOnlineStatus()

  const {
    data: products,
    isLoading,
    error,
    refetch,
    isError,
    isFetching
  } = useQuery({
    queryKey: ["items"],
    queryFn: fetchProducts,
  });

  const filteredData = products?.filter(
    (product) => product.type === selectedType
  );

  const displayedProducts = selectedType
    ? filteredData
    : products;

  return (
    <div className="mt container">
      <ProductFilter
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <div className="cardsContainer">
        {isLoading || isFetching ? <Loader /> :
          isError || !isOnline ? <ErrorMsg refetch={refetch} msg={getFriendlyErrorMessage(error)} /> :
            products.length !== 0 ? displayedProducts?.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                price={item.price}
                name={item.title}
                src={item.imageUrl}
                alt={item.title}
                capacity={item.capacity}
                refetch={refetch}
              />
            )) : 'الموقع قيد التحديث, انتظروا منتجاتنا الجديدة'}
      </div>
    </div>
  );
};

export default Cards;