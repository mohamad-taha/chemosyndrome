import { FaWhatsapp } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import Navbar from "../Navbar/Navbar";
import { useEffect, useRef, useState } from "react";
import "./Header.css";

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.getBoundingClientRect().height);
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 0);
    });

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  return (
    <>
      <header ref={headerRef}>
        <div className="info">
          <div className="container">
            <div className="links">
              <a
                aria-label="kamel instagram"
                target="_blank"
                href="https://www.instagram.com/chemosyndrom?igsh=a2dic28ydHRidjNh"
              >
                <FaInstagram />
              </a>
              <a
                aria-label="kamel facebook"
                target="_blank"
                href="https://www.facebook.com/share/18jtTTbAru/"
              >
                <FaFacebookF />
              </a>
              <a
                aria-label="kamel whatsapp"
                target="_blank"
                href="https://whatsapp.com/channel/0029Vb5ZXav5Ejy5bXWsfu3G"
              >
                <FaWhatsapp />
              </a>
            </div>
            <div className="about">
              <p>
                <FaPhone />
                <span>934087400 963+</span>
              </p>
              <p>
                <IoMdMail />
                <span>mohamadtahakasir@gmail.com</span>
              </p>
              <p>
                <FaLocationDot />
                <span>المارتيني, حلب, سورية</span>
              </p>
              <p>
                <IoTime />
                <span>السبت - الجمعة 10:00 صباحاً - 4:00 مساءاً</span>
              </p>
            </div>
          </div>
        </div>
        <Navbar headerHeight={headerHeight} scroll={scroll} />
      </header>
    </>
  );
};

export default Header;
