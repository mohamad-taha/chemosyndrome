// ====================
// Imports
// ====================

import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CiLogin, CiLogout, CiShoppingCart } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import Cookies from "js-cookie";

import { auth, db } from "../../service/firebase";

import "./SignBtn.css";

// ====================
// Environment Variables Configuration
// ====================

const adminEmailsEnv = import.meta.env.VITE_ADMIN_EMAILS || "";
const adminEmailsArray = adminEmailsEnv.split(",");

// ====================
// Component: SignBtn
// ====================

const SignBtn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const provider = new GoogleAuthProvider();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Parse Cookie User Data Safely

  const savedData = Cookies.get("userData") || "";
  const user = savedData && savedData !== "undefined" ? JSON.parse(savedData) : null;

  // 1. Close menu when route changes

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // 2. Close menu when clicking outside

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ====================
  // Firebase Authentication Handler
  // ====================

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;

      const userDocRef = doc(db, "users", googleUser.uid);
      const userDoc = await getDoc(userDocRef);

      const checkAdmin = adminEmailsArray.includes(googleUser.email);
      let finalUserData;

      if (!userDoc.exists()) {
        finalUserData = {
          name: googleUser.displayName,
          email: googleUser.email,
          photoURL: googleUser.photoURL,
          isAdmin: checkAdmin,
          createdAt: new Date()
        };
        await setDoc(userDocRef, finalUserData);
      } else {
        finalUserData = userDoc.data();
      }

      Cookies.set("userData", JSON.stringify(finalUserData), { expires: 30 });
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "فشل تسجيل الدخول",
        text: "حدث خطأ أثناء الاتصال بحساب جوجل، يرجى المحاولة مرة أخرى.",
        confirmButtonColor: "#d00000",
        confirmButtonText: "حسناً",
      });
    }
  };

  const handleAuthAction = (e) => {
    e.stopPropagation();
    if (user) {
      Cookies.remove("userData");
      window.location.reload();
    } else {
      signInWithGoogle();
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="signBtnContainer"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      {user && user.photoURL ? (
        <img
          style={{ border: isMenuOpen ? "2px solid var(--primary)" : "2px solid transparent" }}
          referrerPolicy="no-referrer"
          src={user.photoURL}
          alt="Profile photo"
        />
      ) : (
        <FaRegUser />
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className={`dropdownMenu ${isMenuOpen ? "showMenu" : ""}`}
      >
        <Link to="/cart">
          عرض سلتي <CiShoppingCart fontSize={22} />
        </Link>

        <button
          onClick={handleAuthAction}
          className="actionBtn"
          aria-label={user ? "تسجيل الخروج" : "تسجيل دخول"}
        >
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
    </div>
  );
};

export default SignBtn;
