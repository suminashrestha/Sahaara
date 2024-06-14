import SliderComponent from "../components/Slider";

const About = () => {
  return (
    <div>
      <h1 className="text-secondary  font-bold font-Oswald text-5xl p-2 m-2">
        About Us
      </h1>
      <div style={{ position: "relative" }}>
        <SliderComponent />
      </div>
    </div>
  );
};

export default About;
