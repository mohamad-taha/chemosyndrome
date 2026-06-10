import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiShoppingCart, FiPlus, FiMinus, FiInfo } from 'react-icons/fi';
import Loader from '../Loader/Loader';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import './ProductDetails.css';

const ProductDetails = ({ isLoading, error, refetch, product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const msg = `مرحبا, أريد شراء ${product?.title}عدد ${quantity}`
  const phoneNumber = 963934087400;
  const encodedMessage = encodeURIComponent(msg);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;


  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="productDetailsContainer mt" style={{ textAlign: 'center' }}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (<div className="productDetailsContainer mt">
      <ErrorMsg refetch={refetch} />
    </div>)
  }

  return (
    <div className="productDetailsContainer mt">
      <button onClick={() => navigate(-1)} className="backNabBtn">
        <FiArrowRight /> عودة للخلف
      </button>

      <div className="productDetailsGrid">
        <div className="detailsImageSection">
          <img src={product?.imageUrl} alt={product?.title} className="mainDetailsImg" />
          {product?.capacity && <span className="detailsDadge">السعة: {product?.capacity}</span>}
        </div>

        <div className="detailsInfoSection">
          <h1 className="detailsTitle">{product?.title}</h1>

          <div className="detailsPriceTag">
            <span className="priceNum">{(product?.price * quantity).toLocaleString()}</span>
            <span className="priceCurrency">ليرة سورية</span>
          </div>

          <div className="quantitySelectorWrapper">
            <span className="selector-label">الكمية:</span>
            <div className="quantityCounter">
              <button onClick={increaseQty} className="qtyBtn"><FiPlus /></button>
              <span className="qty-value">{quantity}</span>
              <button onClick={decreaseQty} className="qtyBtn"><FiMinus /></button>
            </div>
          </div>

          <div className="detailsActions">
            <a
              target='_blank'
              aria-label='تأكيد الشراء'
              href={url}
              className="btnOrderNow">
              <FiShoppingCart /> تأكيد الطلب الآن
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
