import SliderComponent from "../components/Slider";

const About = () => {
  return (
    <div>
      <h1 className="text-secondary text-center text-3xl p-2 m-2">About Us</h1>
      <div style={{ position: "relative" }}>
        <SliderComponent />
      </div>
    </div>
  );
};

export default About;
