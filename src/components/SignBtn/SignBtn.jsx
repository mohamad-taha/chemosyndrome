import { useState } from "react";
import { CiLogin, CiLogout } from "react-icons/ci";
import { auth, db } from "../../service/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const adminEmailsEnv = import.meta.env.VITE_ADMIN_EMAILS || "";
const adminEmailsArray = adminEmailsEnv.split(",");

const SignBtn = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const savedData = Cookies.get("userData") || "";
  const user = (savedData && savedData !== "undefined") ? JSON.parse(savedData) : null;

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
          isAdmin: checkAdmin
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
    <button
      onClick={handleClick}
      style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
      className="signBtn"
      aria-label={user ? "sign out" : "sign with google account"}
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
  )
}

export default SignBtn
