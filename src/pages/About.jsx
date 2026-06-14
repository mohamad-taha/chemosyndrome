// ====================
// Imports
// ====================

import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import AboutMe from "../components/About/About";
import OurService from "../components/OurService/OurService";

// ====================
// Page: About
// ====================

const About = () => {
  return (
    <>
      <title>ENVOKEM BEAUTY | حول</title>

      <meta
        name="description"
        content="من نحن في ENVOKEM BEAUTY؟ متجركم الأول المتخصص في حلول النظافة المتكاملة. نهدف إلى تقديم منتجات تنظيف ومستلزمات تعقيم أصلية بأسعار منافسة وخدمة عملاء متميزة."
      />

      <Breadcrumbs title={"حول"} />

      <AboutMe />

      <OurService />
    </>
  );
};

export default About;