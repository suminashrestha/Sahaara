import SliderComponent from "../components/Slider";
import LandingNav from "../components/LandingNav";

const About = () => {
  return (
    <div>
      <LandingNav />
      <h1 className="font-Oswald text-secondary text-center font-bold text-6xl p-2 m-2">
        About Us
      </h1>
      <div>
        <SliderComponent />
      </div>
    </div>
  );
};

export default About;
