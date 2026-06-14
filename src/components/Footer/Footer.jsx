import "./Footer.css";

import { FaGithub, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContainer container">
        <div className="footerLeft">
          <h3>ENVOKEM BEAUTY</h3>
          <p>متجرك المفضل لمواد التنظيف والجمال</p>
        </div>

        <div className="footerCenter">
          <p>
            © {new Date().getFullYear()} جميع الحقوق محفوظة
          </p>

          <p className="madeWith">
            Made with <FaHeart /> by
          </p>

          <a
            href="https://github.com/mohamad-taha"
            target="_blank"
            rel="noreferrer"
            className="footerLink"
          >
            Mohamad Taha Kasir
          </a>
        </div>

        <div className="footerRight">
          <a
            href="https://github.com/mohamad-taha"
            target="_blank"
            rel="noreferrer"
            className="iconLink"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;