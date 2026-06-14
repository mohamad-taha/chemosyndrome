// ====================
// Imports
// ====================
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { useCart } from "../../context/CartContext";
import { getFriendlyErrorMessage } from '../../utils/getFriendlyErrorMessage';
import { useOnlineStatus } from "../../hooks/useOnlineStatus";

import ErrorMsg from '../ErrorMsg/ErrorMsg';
import Loader from "../Loader/Loader";

import "./Cart.css";

// ====================
// Component: Cart
// ====================
const Cart = () => {
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();
  const {
    cartItems, removeFromCart, updateQuantity,
    getCartTotal, clearCart, loadingCart,
    cartError, reloadCart, isError, isFetching
  } = useCart();

  // --------------------
  // User Authentication Logic
  // --------------------
  const savedData = Cookies.get("userData") || "";
  const user = savedData && savedData !== "undefined" ? JSON.parse(savedData) : null;

  // --------------------
  // WhatsApp Checkout Logic
  // --------------------
  const handleCheckoutWhatsApp = () => {
    if (cartItems.length === 0) return;

    const phoneNumber = "963934087400";
    let message = `*طلب شراء جديد من الموقع*\n\n`;
    message += `*المشتري:* ${user ? user.name : "زائر (غير مسجل)"}\n`;

    if (user?.email) message += `*الإيميل:* ${user.email}\n`;
    message += `\n*المنتجات:*\n`;

    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (السعة: ${item.capacity || "غير محددة"})\n`;
      message += `   الكمية: ${item.quantity} × السعر: ${item.price.toLocaleString()} ل.س\n\n`;
    });

    message += `-------------------------\n`;
    message += `*الإجمالي الكلي:* ${getCartTotal().toLocaleString()} ليرة سورية`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    setTimeout(() => {
      Swal.fire({
        title: "هل قمت بإرسال الطلب عبر الواتساب بنجاح؟",
        text: "إذا أكدت النجاح، سيتم تفريغ سلة المشتريات الحالية.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#4977e5",
        cancelButtonColor: "#718096",
        confirmButtonText: "نعم، تم الإرسال وتفريغ السلة",
        cancelButtonText: "لا، أبقِ المنتجات في السلة",
      }).then((result) => {
        if (result.isConfirmed) {
          clearCart();
          Swal.fire("شكراً لك!", "تم تفريغ السلة بنجاح، نتمنى لك يوماً سعيداً.", "success");
        }
      });
    }, 1000);
  };

  // --------------------
  // Render Helper Function (لحل مشكلة الشروط المعقدة)
  // --------------------
  const renderCartContent = () => {
    // 1. حالة التحميل (سواء التحميل لأول مرة أو التحديث النشط بالـ refetch)
    if (loadingCart || isFetching) {
      return <Loader />;
    }

    // 3. حالة وجود خطأ قادم من السيرفر / فايربيز
    if (isError || !isOnline) {
      return <ErrorMsg refetch={reloadCart} msg={getFriendlyErrorMessage(cartError)} />;
    }

    // 4. حالة السلة فارغة
    if (cartItems.length === 0) {
      return (
        <div className="cartEmptyContainer">
          <FiShoppingBag className="emptyCartIcon" />
          <h2>سلة المشتريات فارغة</h2>
          <p>يبدو أنك لم تقم بإضافة أي منتجات إلى سلتك بعد.</p>
          <button onClick={() => navigate("/products")} className="btnGoShopping">
            تصفح المنتجات الآن
          </button>
        </div>
      );
    }

    // 5. الحالة الطبيعية: عرض المنتجات المضافة
    return cartItems.map((item) => (
      <div key={item.id} className="cartItemCard">
        <img src={item.src} alt={item.name} className="cartItemImg" />

        <div className="cartItemInfo">
          <h3>{item.name}</h3>
          {item.capacity && <span className="cartItemCapacity">السعة: {item.capacity}</span>}
          <p className="cartItemPrice">{(item.price * item.quantity).toLocaleString()} ل.س</p>
        </div>

        <div className="cartItemQuantityWrapper">
          <button onClick={() => updateQuantity(item.id, 1)} className="qtyBtn">
            <FiPlus />
          </button>
          <span className="qtyValue">{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, -1)} className="qtyBtn">
            <FiMinus />
          </button>
        </div>

        <button
          onClick={() => removeFromCart(item.id)}
          className="btnDeleteCartItem"
          aria-label="حذف المنتج من السلة"
        >
          <FiTrash2 />
        </button>
      </div>
    ));
  };

  // --------------------
  // Main Render (JSX النظيف والواضح جداً)
  // --------------------
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
          {renderCartContent()}
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
