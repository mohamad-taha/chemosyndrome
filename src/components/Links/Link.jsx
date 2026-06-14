// ====================
// Imports
// ====================

import { Link } from "react-router-dom";

import Cookies from "js-cookie";

// ====================
// Component: NavLink
// ====================

const NavLink = () => {
  const savedData = Cookies.get("userData") || "";

  const user =
    savedData && savedData !== "undefined"
      ? JSON.parse(savedData)
      : null;

  return (
    <ul>
      <li>
        <Link aria-label="الذهاب إلى الرئيسية" to="/">
          الصفحة الرئيسية
        </Link>
      </li>

      <li>
        <Link aria-label="عرض المنتجات" to="/products">
          المنتجات
        </Link>
      </li>

      <li>
        <Link aria-label="عرض معلومات عن الشركة" to="/about">
          حول
        </Link>
      </li>

      <li>
        <Link aria-label="اتصل بنا" to="/contact">
          تواصل معنا
        </Link>
      </li>

      {user?.isAdmin && (
        <li>
          <Link aria-label="إضافة منتجات" to="/form-products">
            إضافة منتجات
          </Link>
        </li>
      )}
    </ul>
  );
};

export default NavLink;