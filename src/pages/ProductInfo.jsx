import React from 'react'
import ProductDetails from '../components/ProductDetails/ProductDetails'
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchProduct } from '../service/api';

const ProductInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, error, refetch } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
  });

  return (
    <div>
      <ProductDetails product={product} isLoading={isLoading} error={error} refetch={refetch} />
    </div>
  )
}

export default ProductInfo
