import { useContext, useEffect } from "react";
import NavLink from "../Links/Link";
import { Context } from "../../context/Context";
import { useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const { showSidebar, setShowSidebar } = useContext(Context);

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
        onClick={() => {
          setShowSidebar(false);
        }}
        className="overlay"
        style={{ display: showSidebar ? "block" : "none" }}
      ></div>
      <div
        className="sidebar"
        style={{ transform: showSidebar ? "translate(0)" : "translate(-100%)" }}
      >
        <button onClick={() => setShowSidebar(false)}>
          <IoMdClose fontSize={25} />
        </button>
        <NavLink />
      </div>
    </div>
  );
};

export default Sidebar;
