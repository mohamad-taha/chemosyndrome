import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Products from "./pages/Products";
import Form from "./pages/Form";
import Sidebar from "./components/Sidebar/Sidebar";
import ProductInfo from "./pages/ProductInfo";
import NotFound from "./components/NotFound/NotFound";
import CartPage from './pages/CartPage'
import "./App.css";

const App = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<About />} path="/about" />
        <Route element={<Products />} path="/products" />
        <Route element={<Form />} path="/form-products/:id?" />
        <Route element={<ProductInfo />} path="/product/:id?" />
        <Route path="/cart" element={<CartPage />} />
        <Route element={<NotFound />} path="*" />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
