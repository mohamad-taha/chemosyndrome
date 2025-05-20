import "./OurService.css";
import Girl from "../../assets/imgs/girlCleaning.svg";
import clock from "../../assets/imgs/clock.svg";

const OurService = () => {
  return (
    <div className="ourService container mt">
      <div className="content">
        <h2>نحن نقدم منتجات تنظيف ومستحضرات تجميل عالية الجودة.</h2>

        <div>
          <p>
            <img src={clock} alt="clock" />
            أفضل المنتجات مع أرخص الأسعار
          </p>
          <p>
            <img src={clock} alt="clock" />
            نوصيل مجاني لجميع مناطق حلب
          </p>
        </div>
        <a
          href="https://wa.me/963934087400?text=مرحبا، أريد طلب بعض المنتجات من موقعكم
        "
          className="primaryBtn"
        >
          اطلب الآن
        </a>
      </div>
      <img width={300} src={Girl} alt="girl cleaning" />
    </div>
  );
};

export default OurService;
