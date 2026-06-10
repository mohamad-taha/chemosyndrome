import { useEffect, useRef, useState } from "react";
import { CiLogin, CiLogout } from "react-icons/ci";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaRegUser } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";

import { auth, db } from "../../service/firebase";

import './SignBtn.css'

const adminEmailsEnv = import.meta.env.VITE_ADMIN_EMAILS || "";
const adminEmailsArray = adminEmailsEnv.split(",");

const SignBtn = () => {
  const location = useLocation()
  const dropdownRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const savedData = Cookies.get("userData") || "";
  const user = (savedData && savedData !== "undefined") ? JSON.parse(savedData) : null;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);


      let checkAdmin = false;
      if (adminEmailsArray.includes(user.email)) {
        checkAdmin = true
      }

      let finalUserData;

      if (!userDoc.exists()) {
        finalUserData = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          isAdmin: checkAdmin,
          createdAt: new Date()
        };

        await setDoc(userDocRef, finalUserData);
      } else {
        finalUserData = userDoc.data();
      }

      Cookies.set("userData", JSON.stringify(finalUserData), { expires: 7 });
      window.location.reload();
    } catch (error) {
      console.error("خطأ أثناء تسجيل الدخول بجوجل:", error.message);
    }
  };

  const handleClick = () => {
    if (user) {
      Cookies.remove("userData");
      window.location.reload();
    } else {
      signInWithGoogle();
    }
  };

  return (
    <div ref={dropdownRef} className={"signBtnContainer"} onClick={() => setIsMenuOpen(!isMenuOpen)}>
      {user && user.photoURL ? (
        <img style={{ border: isMenuOpen && "2px solid var(--primary)" }} referrerPolicy="no-referrer" src={user.photoURL} alt="Profile photo" />
      ) : (
        <FaRegUser />
      )}

      <div onClick={(e) => e.stopPropagation()} className={`dropdownMenu ${isMenuOpen ? "showMenu" : ""}`}>

        <Link to={'/cart'}>عرض سلتي <CiShoppingCart fontSize={22} /></Link>

        <button
          onClick={handleClick}
          className="actionBtn"
          aria-label={user ? "تسجيل الخروج" : "تسجيل دخول"}>
          {user ? (
            <>
              <span>تسجيل الخروج</span>
              <CiLogout fontSize={22} />
            </>
          ) : (
            <>
              <span>تسجيل دخول</span>
              <CiLogin fontSize={22} />
            </>
          )}
        </button>
      </div>

    </div >
  )
}

export default SignBtn
