// ====================
// Imports
// ====================

import Cards from "../components/Cards/Cards";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

// ====================
// Page: Products
// ====================

const Products = () => {
  return (
    <div>
      <title>ENVOKEM BEAUTY | المنتجات</title>

      <meta
        name="description"
        content="اكتشف تشكيلتنا الشاملة من أجود مواد التنظيف المنزلية ومستحضرات التجميل والعناية الشخصية. منتجات أصلية، أسعار منافسة، وكل ما تحتاجينه لنظافتك وجمالك في مكان واحد."
      />

      <Breadcrumbs title={"المنتجات"} />

      <Cards />
    </div>
  );
};

export default Products;