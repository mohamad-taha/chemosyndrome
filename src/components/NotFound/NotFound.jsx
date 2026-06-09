import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiHome, FiAlertCircle } from 'react-icons/fi';
import './NotFound.css'

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notFoundContainer">
      <div className="notFoundContent">

        <div className="errorCodeWrapper">
          <h1 className="errorCode">404</h1>
          <FiAlertCircle className="errorIcon" />
        </div>

        <h2 className="notFoundTitle">العنوان غير موجود!</h2>
        <p className="notFoundText">
          عذراً، الصفحة التي تحاول الوصول إليها قد تكون حُذفت، تغيّر اسمها، أو أنها غير متاحة مؤقتاً.
        </p>

        <div className="notFoundActions">
          <button aria-label='العودة الى الرئيسية' onClick={() => navigate('/')} className="btnGoHome">
            <FiHome />
            العودة للرئيسية
          </button>

          <button aria-label='العودة للخلف' onClick={() => navigate(-1)} className="btnGoBack">
            رجوع للخلف
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
