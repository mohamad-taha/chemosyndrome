import cleanPng from "../../assets/imgs/cleaning.svg";
import "./About.css";

const About = () => {
  return (
    <div className="container aboutMe mt">
      <div>
        <p>
          أنا <span>محمد كامل صناع</span> طالب سنة رابعة في كلية الكيمياء، أمتلك
          شغفاً كبيراً بعالم الصناعات الكيميائية، وخاصة في مجالات المنظفات،
          مستحضرات التجميل، الكوزمتيك والعطور. خلال أربع سنوات من الخبرة
          العملية، عملت على تطوير تركيبات متنوعة تجمع بين الفعالية والجودة
          والأمان، مع الالتزام الكامل بالمعايير العلمية والدولية. أسعى باستمرار
          للابتكار وتقديم منتجات تلبي حاجات السوق المحلي والعربي، مع التركيز على
          تطوير منتجات مميزة تواكب متطلبات العملاء وتحقق نتائج ملموسة وموثوقة.
        </p>
      </div>
      <img width={300} src={cleanPng} alt="cleaning" />
    </div>
  );
};

export default About;
