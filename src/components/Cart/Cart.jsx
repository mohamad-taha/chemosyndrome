import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

import { useCart } from '../../context/CartContext';

import Loader from '../Loader/Loader'

import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart, loadingCart } = useCart();
  const navigate = useNavigate();

  // جلب بيانات المستخدم (إن وجدت)
  const savedData = Cookies.get("userData") || "";
  const user = (savedData && savedData !== "undefined") ? JSON.parse(savedData) : null;

  const handleDeleteItem = (id) => {
    removeFromCart(id);
  };

  const handleCheckoutWhatsApp = () => {
    if (cartItems.length === 0) return;

    const phoneNumber = "963934087400";

    let message = `*طلب شراء جديد من الموقع*\n\n`;
    message += `*المشتري:* ${user ? user.name : 'زائر (غير مسجل)'}\n`;
    if (user?.email) message += `*الإيميل:* ${user.email}\n`;
    message += `\n*المنتجات:*\n`;

    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (السعة: ${item.capacity || 'غير محددة'})\n`;
      message += `   الكمية: ${item.quantity} × السعر: ${item.price.toLocaleString()} ل.س\n\n`;
    });
    message += `-------------------------\n`;
    message += `*الإجمالي الكلي:* ${getCartTotal().toLocaleString()} ليرة سورية`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // 1. فتح الواتساب في تبويب جديد بدلاً من تغيير الصفحة الحالية (لكي يظل موقعك مفتوحاً في الخلفية)
    window.open(whatsappUrl, '_blank');

    // 2. إظهار نافذة تأكيد للمستخدم تسأله إن كان الطلب قد تم أم لا
    setTimeout(() => {
      Swal.fire({
        title: 'هل قمت بإرسال الطلب عبر الواتساب بنجاح؟',
        text: "إذا أكدت النجاح، سيتم تفريغ سلة المشتريات الحالية.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#4977e5',
        cancelButtonColor: '#718096',
        confirmButtonText: 'نعم، تم الإرسال وتفريغ السلة',
        cancelButtonText: 'لا، أبقِ المنتجات في السلة'
      }).then((result) => {
        if (result.isConfirmed) {
          clearCart(); // 👈 لا يتم التفريغ إلا إذا ضغط المستخدم على تأكيد الإرسال
          Swal.fire('شكراً لك!', 'تم تفريغ السلة بنجاح، نتمنى لك يوماً سعيداً.', 'success');
        }
      });
    }, 1000); // تأخير التنبيه لثانية واحدة ليظهر بعد انتقال المستخدم للواتساب
  };





  // عرض شاشة تحميل خفيفة أثناء فحص الفايرستور (للمسجلين)
  if (loadingCart) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Loader />
      </div>
    );
  }

  // إذا كانت السلة فارغة (تظهر للمسجل وللزبون العادي)
  if (cartItems.length === 0) {
    return (
      <div className="cartEmptyContainer">
        <FiShoppingBag className="emptyCartIcon" />
        <h2>سلة المشتريات فارغة</h2>
        <p>يبدو أنك لم تقم بإضافة أي منتجات إلى سلتك بعد.</p>
        <button onClick={() => navigate('/')} className="btnGoShopping">
          تصفح المنتجات الآن
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="cartHeader">
        <button onClick={() => navigate(-1)} className="backNabBtn">
          <FiArrowRight /> العودة للتسوق
        </button>
        <h1>سلة المشتريات ({cartItems.length})</h1>
      </div>

      <div className="cartGrid">
        <div className="cartItemsList">
          {cartItems.map((item) => (
            <div key={item.id} className="cartItemCard">
              <img src={item.src} alt={item.name} className="cartItemImg" />

              <div className="cartItemInfo">
                <h3>{item.name}</h3>
                {item.capacity && <span className="cartItemCapacity">السعة: {item.capacity}</span>}
                <p className="cartItemPrice">{(item.price * item.quantity).toLocaleString()} ل.س</p>
              </div>

              <div className="cartItemQuantityWrapper">
                <button onClick={() => updateQuantity(item.id, 1)} className="qtyBtn"><FiPlus /></button>
                <span className="qtyValue">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, -1)} className="qtyBtn"><FiMinus /></button>
              </div>

              <button
                onClick={() => handleDeleteItem(item.id)}
                className="btnDeleteCartItem"
                aria-label="حذف المنتج من السلة"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>

        <div className="cartSummaryCard">
          <h3>ملخص الطلب</h3>
          <div className="summaryRow">
            <span>عدد الأصناف:</span>
            <span>{cartItems.length} أصناف</span>
          </div>
          <div className="summaryRow totalRow">
            <span>الإجمالي الكلي:</span>
            <span className="totalPrice">{getCartTotal().toLocaleString()} ل.س</span>
          </div>

          <button onClick={handleCheckoutWhatsApp} className="btnCheckout">
            تأكيد الطلب عبر واتساب
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
