import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import AboutMe from "../components/About/About";
import OurService from "../components/OurService/OurService";

const About = () => {
  return (
    <>
      <Breadcrumbs title={"حول"} />
      <AboutMe />
      <OurService />
    </>
  );
};

export default About;
