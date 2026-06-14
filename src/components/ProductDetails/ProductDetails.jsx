// ====================
// Imports
// ====================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiShoppingCart, FiPlus, FiMinus } from 'react-icons/fi';
import Swal from 'sweetalert2';

import { useCart } from '../../context/CartContext';

import Loader from '../Loader/Loader';
import ErrorMsg from '../ErrorMsg/ErrorMsg';

import './ProductDetails.css';


// ====================
// Component: ProductComments
// ====================

const ProductDetails = ({ isLoading, error, refetch, product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        src: product.imageUrl,
        capacity: product.capacity
      });
    }

    Swal.fire({
      icon: 'success',
      title: `تم إضافة ${quantity} من المنتج للسلة`,
      showConfirmButton: false,
      timer: 1500,
      position: 'top-end',
      toast: true
    });
  };

  if (isLoading) {
    return (
      <div className="productDetailsContainer mt" style={{ textAlign: 'center' }}>
        <Loader />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="productDetailsContainer mt">
        <ErrorMsg refetch={refetch} />
      </div>
    );
  }

  return (
    <div className="productDetailsContainer mt">
      <button onClick={() => navigate(-1)} className="backNabBtn">
        <FiArrowRight /> عودة للخلف
      </button>

      <div className="productDetailsGrid">
        <div className="detailsImageSection">
          <img src={product.imageUrl} alt={product.title} className="mainDetailsImg" />
          {product.capacity && <span className="detailsBadge">السعة: {product.capacity}</span>}
        </div>

        <div className="detailsInfoSection">
          <h1 className="detailsTitle">{product.title}</h1>

          <div className="detailsPriceTag">
            <span className="priceNum">{(product.price * quantity).toLocaleString()}</span>
            <span className="priceCurrency">ليرة سورية</span>
          </div>

          <div className="quantitySelectorWrapper">
            <span className="selectorLabel">الكمية:</span>
            <div className="quantityCounter">
              <button onClick={increaseQty} className="qtyBtn"><FiPlus /></button>
              <span className="qtyValue">{quantity}</span>
              <button onClick={decreaseQty} className="qtyBtn"><FiMinus /></button>
            </div>
          </div>

          <div className="detailsActions">
            <button
              onClick={handleAddToCart}
              aria-label='تأكيد الإضافة الى السلة'
              className="btnOrderNow"
            >
              <FiShoppingCart /> تأكيد الإضافة الى السلة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
