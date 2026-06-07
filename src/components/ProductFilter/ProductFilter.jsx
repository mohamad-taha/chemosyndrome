import React, { useState } from 'react'
import "./ProductFilter.css"

const ProductFilter = ({ selectedType, setSelectedType }) => {


  const handleTypeChange = (e) => {
    const value = e.target.value;
    setSelectedType(value);
  };

  return (
    <div>
      <select name="productType" id="productCategory" onChange={handleTypeChange} value={selectedType}>
        <option value="">الكل</option>
        <option value="مستحضرات تجميل">مستحضرات تجميل</option>
        <option value="مواد تنظيف">مواد تنظيف</option>
      </select>
    </div >
  )
}

export default ProductFilter

