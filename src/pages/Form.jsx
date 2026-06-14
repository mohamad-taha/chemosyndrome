// ====================
// Imports
// ====================

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import ProductsForm from "../components/ProductsForm/ProductsForm";

// ====================
// Page: Product Form
// ====================

const ProductForm = () => {
  const navigate = useNavigate();

  const savedData = Cookies.get("userData") || "";

  const user =
    savedData && savedData !== "undefined"
      ? JSON.parse(savedData)
      : null;

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <meta name="robots" content="noindex, nofollow" />

      <ProductsForm />
    </div>
  );
};

export default ProductForm;