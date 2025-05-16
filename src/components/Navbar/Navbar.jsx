import logo from "../../assets/imgs/logo.svg";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { TbListTree } from "react-icons/tb";
import "./Navbar.css";

const Navbar = ({ scroll, headerHeight }) => {
  return (
    <nav style={{ top: scroll ? 0 : `${headerHeight}px` }}>
      <a href="">
        <img width={120} src={logo} alt="logo" />
      </a>
      <ul>
        <li>
          <Link>الصفحة الرئيسية</Link>
        </li>
        <li>
          <Link>الخدمات</Link>
        </li>
        <li>
          <Link>حول</Link>
        </li>
        <li>
          <Link>تواصل معنا</Link>
        </li>
      </ul>
      <button>
        <CiSearch />
      </button>
      <button className="menuBtn">
        <TbListTree />
      </button>
    </nav>
  );
};

export default Navbar;
