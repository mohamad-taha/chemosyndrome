import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    setLoading(true);
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8buhdh9",
        "template_yiujdt9",
        form.current,
        "12k_qbWt4OCrv-0ZY"
      )
      .then(() => {
        alert("تم إرسال الرسالة بنجاح!");
        form.current.reset();
      })
      .catch((error) => {
        alert("حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.");
        console.error(error);
      });

    setLoading(false);
  };

  return (
    <div className="contact container mt">
      <h2>نحن هنا لمساعدتك</h2>
      <small>أرسل لنا رسالة إذا كان لديك أي سؤال، فنحن هنا للمساعدة!</small>
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
            type="text"
            name="message"
            id="message"
            placeholder="اكتب الرسالة هنا"
          />
        </label>
        <button className="outlineBtn">ارسال</button>
      </form>
    </div>
  );
};

export default Contact;
