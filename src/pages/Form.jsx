import { useEffect, useState } from 'react'
import ProductsForm from "../components/ProductsForm/ProductsForm";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const navigate = useNavigate()
  const savedData = Cookies.get("userData") || "";
  const user = (savedData && savedData !== "undefined") ? JSON.parse(savedData) : null;

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [])

  return (
    <div>
      <ProductsForm />
    </div>
  )
}

export default ProductForm
