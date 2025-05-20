import { Link } from "react-router-dom";

const NavLink = () => {
  return (
    <ul>
      <li>
        <Link to={"/"}>الصفحة الرئيسية</Link>
      </li>
      <li>
        <Link to={"/products"}>الخدمات</Link>
      </li>
      <li>
        <Link to={"/about"}>حول</Link>
      </li>
      <li>
        <Link to={"/contact"}>تواصل معنا</Link>
      </li>
    </ul>
  );
};

export default NavLink;
