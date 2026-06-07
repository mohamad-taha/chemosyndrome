import Banner from "../components/Banner/Banner";
import Hero from "../components/Hero/Hero";
import ProductsSection from "../components/ProductsSection/ProductsSection";

const Home = () => {
  return (
    <div>
      <link rel="canonical" href="https://envokem-beauty.web.app/" />
      <meta name="description" content="اكتشف أفضل مواد التنظيف والمعقمات عالية الجودة للمنازل والشركات في ENVOKEM BEAUTY. تشكيلة واسعة، أسعار توفيرية، وتوصيل سريع حتى باب بيتك. تسوق نظافة تدوم الآن!" />
      <Hero />
      <Banner />
      <ProductsSection />
    </div>
  );
};

export default Home;
