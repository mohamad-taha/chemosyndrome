import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Products from "./pages/Products";
import Sidebar from "./components/Sidebar/Sidebar";
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
      </Routes>
      <Footer />
    </>
  );
};

export default App;
