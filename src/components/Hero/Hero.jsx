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
              اكتشف أفضل منتجات التنظيف المصممة خصيصاً لتمنحك نظافة مثالية
              ولمعان يدوم. نحن نقدم مجموعة واسعة من المنظفات المنزلية والعامة
              بجودة عالية وأسعار منافسة تناسب كل الميزانيات. سواء كنت تبحث عن
              حلول فعالة لإزالة البقع الصعبة، أو منتجات آمنة للاستخدام اليومي،
              ستجد كل ما تحتاجه في مكان واحد.
            </p>
            <div className="actions">
              <button className="primaryBtn">حول</button>
              <button className="outlineBtn">حجز الخدمة</button>
            </div>
          </div>
          <img width={600} src={heroBg} alt="hero background" />
        </div>
      </div>
    </>
  );
};

export default Hero;
