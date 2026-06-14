// ====================
// Imports
// ====================

import './ProductFilter.css'

// ====================
// Component: ProductComments
// ====================

const ProductFilter = ({ selectedType, setSelectedType }) => {

  const handleTypeChange = (e) => {
    const value = e.target.value
    setSelectedType(value)
  }

  return (
    <div>
      <select
        name="productType"
        id="productCategory"
        value={selectedType}
        onChange={handleTypeChange}
      >
        <option value="">الكل</option>
        <option value="مستحضرات تجميل">مستحضرات تجميل</option>
        <option value="مواد تنظيف">مواد تنظيف</option>
      </select>
    </div>
  )
}

export default ProductFilter