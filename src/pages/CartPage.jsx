// ====================
// Imports
// ====================

import Cart from "../components/Cart/Cart";

// ====================
// Page: Cart
// ====================

const CartPage = () => {
  return (
    <div className="container mt">
      <title>ENVOKEM BEAUTY | سلة التسوق</title>
      <meta name="description" content="سلة التسوق الخاصة بمتجر ENVOKEM BEAUTY المتخصص في حلول النظافة المتكاملة وتقديم منتجات تنظيف ومستلزمات تعقيم اصلية باسعار منافسة وخدمة عملاء متميزة " />
      <Cart />
    </div>
  );
};

export default CartPage;