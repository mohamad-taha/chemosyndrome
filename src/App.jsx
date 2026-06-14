// ====================
// Imports
// ====================

import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Products from "./pages/Products";
import Form from "./pages/Form";
import ProductInfo from "./pages/ProductInfo";
import CartPage from "./pages/CartPage";
import NotFound from "./components/NotFound/NotFound";

import "./App.css";

const App = () => {
  return (
    <>
      <Header />
      <Sidebar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/form-products/:id?" element={<Form />} />
        <Route path="/product/:id?" element={<ProductInfo />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;