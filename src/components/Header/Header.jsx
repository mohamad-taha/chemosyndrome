// ====================
// Imports
// ====================

import { useEffect, useRef, useState } from "react";

import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoTime } from "react-icons/io5";

import Navbar from "../Navbar/Navbar";

import "./Header.css";

// ====================
// Component: Header
// ====================

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const headerRef = useRef(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(
          headerRef.current.getBoundingClientRect().height
        );
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
    <header ref={headerRef}>
      <div className="info">
        <div className="container">
          <div className="links">
            <a
              aria-label="kamel instagram"
              target="_blank"
              href="https://www.instagram.com/envokem_beauty/"
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
              href="https://chat.whatsapp.com/KfCq9zDgakn9m9ntweUyiq"
            >
              <FaWhatsapp />
            </a>
          </div>

          <div className="about">
            <p>
              <FaPhone />
              <a href="tel:+963934087400">934087400 963+</a>
            </p>

            <p>
              <IoMdMail />
              <a href="mailto:smuhammadkamel@gmail.com">
                smuhammadkamel@gmail.com
              </a>
            </p>

            <p>
              <FaLocationDot />
              <span>المارتيني, حلب, سورية</span>
            </p>

            <p>
              <IoTime />
              <span>
                السبت - الجمعة 10:00 صباحاً - 4:00 مساءاً
              </span>
            </p>
          </div>
        </div>
      </div>

      <Navbar headerHeight={headerHeight} scroll={scroll} />
    </header>
  );
};

export default Header;