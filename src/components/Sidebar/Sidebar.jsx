import { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

import SignBtn from "../SignBtn/SignBtn";
import NavLink from "../Links/Link";

import { Context } from "../../context/Context";

import "./Sidebar.css";

const Sidebar = () => {
  const sidebarRef = useRef(null);
  const location = useLocation();
  const { showSidebar, setShowSidebar } = useContext(Context);

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
  }, [])

  useEffect(() => {
    setShowSidebar(false);
  }, [location.pathname]);

  useEffect(() => {
    window.onresize = () => {
      if (window.innerWidth > 1023) {
        setShowSidebar(false);
      }
    };
  });

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
