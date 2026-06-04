import { useContext } from "react";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { TbListTree } from "react-icons/tb";
import NavLinks from "../Links/Link";
import logo from "../../assets/imgs/logo.png";
import SignBtn from "../SignBtn/SignBtn";
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
      <Link className="logoLink" aria-label="go home" to={"/"} style={{ fontFamily: "logo" }}>
        <img src={logo} alt="logo" />
        <span>
          ENVOKEM BEAUTY
        </span>
      </Link>

      <NavLinks />

      <button
        aria-label="menu btn"
        onClick={() => setShowSidebar(true)}
        className="menuBtn"
      >
        <TbListTree />
      </button>

      <SignBtn />
    </nav>
  );
};

export default Navbar;
