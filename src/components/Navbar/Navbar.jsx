import logo from "../../assets/imgs/logo.webp";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { TbListTree } from "react-icons/tb";
import NavLinks from "../Links/Link";
import { useContext } from "react";
import { Context } from "../../context/Context";
import "./Navbar.css";

const Navbar = ({ scroll, headerHeight }) => {
  const { setShowSidebar } = useContext(Context);

  return (
    <nav
      style={{
        top: scroll ? 0 : `${headerHeight}px`,
        boxShadow: "0 3px 10px #666",
      }}
    >
      <Link aria-label="go home" to={"/"} style={{ fontFamily: "logo" }}>
        <img src={logo} alt="" />
      </Link>
      <NavLinks />
      <button aria-label="menu btn">
        <CiSearch />
      </button>
      <button
        aria-label="menu btn"
        onClick={() => setShowSidebar(true)}
        className="menuBtn"
      >
        <TbListTree />
      </button>
    </nav>
  );
};

export default Navbar;
