import "./Banner.css";
import img1 from "../../assets/imgs/bestPrice.svg";
import img2 from "../../assets/imgs/delivery.svg";
import img3 from "../../assets/imgs/protection.svg";
import img4 from "../../assets/imgs/support.svg";

const Banner = () => {
  return (
    <div className="container">
      <div className="banner">
        <div>
          <img width={50} src={img1} alt="best price" />
          أفضل الأسعار
        </div>
        <div>
          <img width={50} src={img2} alt="delivery" />
          توصيل مجاني
        </div>
        <div>
          <img width={50} src={img3} alt="protection" />
          حماية للمستهلك
        </div>
        <div>
          <img width={50} src={img4} alt="support" />
          دعم مباشر
        </div>
      </div>
    </div>
  );
};

export default Banner;
