import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const NavLink = () => {
  const savedData = Cookies.get("userData") || "";
  const user = (savedData && savedData !== "undefined") ? JSON.parse(savedData) : null;

  return (
    <ul>
      <li>
        <Link to={"/"}>الصفحة الرئيسية</Link>
      </li>
      <li>
        <Link to={"/products"}>المنتجات</Link>
      </li>
      <li>
        <Link to={"/about"}>حول</Link>
      </li>
      <li>
        <Link to={"/contact"}>تواصل معنا</Link>
      </li>
      {
        user?.isAdmin &&
        <li>
          <Link to={"/form-products"}>إضافة منتجات</Link>
        </li>
      }
    </ul>
  );
};

export default NavLink;
