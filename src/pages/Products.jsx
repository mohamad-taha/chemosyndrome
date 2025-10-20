import Cards from "../components/Cards/Cards";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import Form from "../components/ProductsForm/Form";

const Products = () => {
  return (
    <div>
      <Breadcrumbs title={"المنتجات"} />
      {/* <Form /> */}
      <Cards />
    </div>
  );
};

export default Products;
