import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { useQuery } from '@tanstack/react-query';

import { db } from "../../service/firebase";
import { fetchProducts } from '../../service/api';

import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import ErrorMsg from '../ErrorMsg/ErrorMsg';

import './ProductsSection.css'

const ProductsSection = () => {
  const navigate = useNavigate()

  const { data: products, isLoading, error, refetch } = useQuery({
    queryKey: ['items'], queryFn: fetchProducts
  })

  return (
    <div className='productsSection mt container'>
      <div className="sectionHeader">
        <h1>أحدث المنتجات</h1>
        <button onClick={() => navigate('/products')} className='outlineBtn'>
          مشاهدة المزيد
        </button>
      </div>
      <div className='cardsContainer mt'>
        {error ? <ErrorMsg refetch={refetch} /> : isLoading ? <Loader /> : products.length !== 0 ?
          products?.slice(0, 6).map((item) => {
            return (
              <Card
                id={item.id}
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
  )
}

export default ProductsSection
