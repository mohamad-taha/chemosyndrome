// ====================
// Imports
// ====================

import { useRef } from "react";

import emailjs from "@emailjs/browser";

import Swal from "sweetalert2";

import "./Contact.css";

// ====================
// Component: Contact
// ====================

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8buhdh9",
        "template_yiujdt9",
        form.current,
        "12k_qbWt4OCrv-0ZY"
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "تم إرسال الرسالة",
          confirmButtonColor: "#4977e5",
          confirmButtonText: "حسناً",
        });

        form.current.reset();
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "حدث خطأ أثناء إرسال الرسالة",
          confirmButtonColor: "#d00000",
          confirmButtonText: "حسناً",
        });
      });
  };

  return (
    <div className="contact container mt">
      <h2>نحن هنا لمساعدتك</h2>

      <small>
        أرسل لنا رسالة إذا كان لديك أي سؤال، فنحن هنا للمساعدة!
      </small>

      <form ref={form} onSubmit={sendEmail}>
        <label htmlFor="name">
          الاسم

          <input
            required
            type="text"
            name="name"
            id="name"
            placeholder="اكتب اسمك الكامل"
          />
        </label>

        <label htmlFor="email">
          البريد

          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="البريد الالكتروني"
          />
        </label>

        <label htmlFor="subject">
          مانوع الخدمة التي تبحث عنها؟

          <input
            required
            type="text"
            name="subject"
            id="subject"
            placeholder="اختر موضوع"
          />
        </label>

        <label htmlFor="message">
          الرسالة

          <textarea
            required
            name="message"
            id="message"
            placeholder="اكتب الرسالة هنا"
          />
        </label>

        <button
          type="submit"
          className="outlineBtn"
          aria-label="إرسال الرسالة"
        >
          ارسال
        </button>
      </form>
    </div>
  );
};

export default Contact;