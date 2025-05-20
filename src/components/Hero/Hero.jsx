import { Link } from "react-router-dom";
import heroBg from "../../assets/imgs/heroBg.svg";
import "./Hero.css";

const Hero = () => {
  return (
    <>
      <div className="container">
        <div className="hero">
          <div className="content">
            <div>
              <small>تعلم من اليوم</small>
              <h1>
                السعادة هي <span>تنظيف</span> المنزل حديثا
              </h1>
            </div>
            <p>
              اكتشف أفضل منتجات التنظيف ومستحضرات التجميل المصممة خصيصاً لتمنحك
              نظافة مثالية، لمعان يدوم، وجمالاً متألقاً. نحن نقدم مجموعة واسعة
              من المنظفات المنزلية والعامة عالية الجودة، بالإضافة إلى تشكيلة
              مميزة من مستحضرات التجميل التي تلبي جميع احتياجاتك اليومية. كل ذلك
              بأسعار منافسة تناسب مختلف الميزانيات. سواء كنت تبحث عن حلول فعالة
              لإزالة البقع الصعبة أو منتجات آمنة للعناية اليومية بالبشرة والجسم،
              ستجد كل ما تحتاجه في مكان واحد.
            </p>
            <div className="actions">
              <Link to={"/about"} className="primaryBtn">
                حول
              </Link>
              <a
                target="_blank"
                className="outlineBtn"
                href="https://wa.me/963934087400?text=مرحبا، أريد طلب بعض المنتجات من موقعكم
"
              >
                حجز الخدمة
              </a>
            </div>
          </div>
          <img width={600} src={heroBg} alt="hero background" />
        </div>
      </div>
    </>
  );
};

export default Hero;
