// ====================
// Imports
// ====================

import { useContext } from "react";

import { SidebarContext } from "../../context/SidebarContext";

import { Link } from "react-router-dom";

import { TbListTree } from "react-icons/tb";

import NavLinks from "../Links/Link";

import SignBtn from "../SignBtn/SignBtn";

import logo from "../../assets/imgs/logo.png";

import "./Navbar.css";

// ====================
// Component: Navbar
// ====================

const Navbar = ({ scroll, headerHeight }) => {
  const { setShowSidebar } = useContext(SidebarContext);

  return (
    <nav style={{ top: scroll ? 0 : `${headerHeight}px` }}>
      <Link className="logoLink" aria-label="الذهاب إلى الرئيسية" to="/">
        <img src={logo} alt="logo" />

        <p>
          <span>ENVOKEM</span>
          <span>BEAUTY</span>
        </p>
      </Link>

      <NavLinks />

      <button
        aria-label="فتح الشريط الجانبي"
        onClick={() => setShowSidebar(true)}
        className="actionBtn"
      >
        <TbListTree fontSize={26} />
      </button>

      <SignBtn />
    </nav>
  );
};

export default Navbar;