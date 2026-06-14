// ====================
// Imports
// ====================

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { fetchProducts } from "../../service/api";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";

import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import SectionHeader from "../sectoinHeader/SectionHeader";
import { getFriendlyErrorMessage } from "../../utils/getFriendlyErrorMessage";

// ====================
// Component: ProductsSection
// ====================

const ProductsSection = () => {
  const isOnline = useOnlineStatus()

  const {
    data: products,
    isLoading,
    error,
    refetch,
    isError, isFetching
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const sortedProducts = products ? [...products].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  ) : [];

  return (
    <div className="productsSection mt container">
      <SectionHeader title="أحدث المنتجات" label="مشاهدة المزيد من المنتجات" />

      <div className="cardsContainer mt">
        {isLoading || isFetching ? <Loader /> :
          isError || !isOnline ? <ErrorMsg refetch={refetch} msg={getFriendlyErrorMessage(error)} /> :
            products.length !== 0 ? sortedProducts.slice(0, 5).map((item) => (
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

export default ProductsSection;
