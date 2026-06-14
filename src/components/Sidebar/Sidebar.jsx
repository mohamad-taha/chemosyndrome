// ====================
// Imports
// ====================

import { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

import { SidebarContext } from "../../context/SidebarContext";

import SignBtn from "../SignBtn/SignBtn";
import NavLink from "../Links/Link";

import "./Sidebar.css";

// ====================
// Component: Sidebar
// ====================

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const location = useLocation();
  const { showSidebar, setShowSidebar } = useContext(SidebarContext);

  // 1. Close sidebar when clicking outside

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowSidebar]);

  // 2. Close sidebar when route changes

  useEffect(() => {
    setShowSidebar(false);
  }, [location.pathname, setShowSidebar]);

  // 3. Close sidebar on desktop screen resize safely

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023 && showSidebar) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showSidebar, setShowSidebar]);

  return (
    <div>
      <div
        ref={sidebarRef}
        className="sidebar"
        style={{ transform: showSidebar ? "translate(0)" : "translate(-120%)" }}
      >
        <button
          className="actionBtn"
          aria-label="إغلاق الشريط الجانبي"
          onClick={() => setShowSidebar(false)}
        >
          <IoMdClose fontSize={25} />
        </button>

        <SignBtn />
        <NavLink />
      </div>
    </div>
  );
};

export default Sidebar;
