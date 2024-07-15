import LandingNav from "../components/LandingNav";
import Footer from "../components/Footer";
import BottomContact from "../components/BottomContact";

const About = () => {
  return (
    <>
      <LandingNav />
      <div className="flex items-center flex-col justify-around">
        <div className="mt-20 h-[90vh] w-[90%] flex items-center p-10 justify-center ">
          <div className="w-[50%] h-[80%] p-10 text-zinc-600 flex flex-col gap-6">
            <h2 className="text-6xl font-bold text-btnColor">WHO WE ARE</h2>
            <p className="text-md">
              Welcome to <span className="text-3xl">Sahaara</span>, your trusted
              online community dedicated to the rescue and adoption of animals.
              Our platform bridges the gap between animal rescuers,
              organizations, and potential adopters. We provide a space where
              users can easily find and adopt pets looking for loving homes. We
              connect various animal rescue organizations, providing them with
              tools to manage their operations, promote animals in need, and
              engage with a broader audience. Whether you’re a seasoned rescuer
              or a first-time adopter, you’ll find a supportive community here —
              we believe we can transform their quality of life through kindness
              and compassion.{" "}
            </p>
          </div>
          <div className="w-[50%] h-[80%] flex">
            <img src="/aboutus2.jpg" alt="img" className="rounded-xl" />
          </div>
        </div>
        <div className="h-[30vh] flex justify-center items-center text-zinc-600 w-[90%] shadow-md rounded-lg bg-yellow-300">
          <h3 className="text-2xl font-medium font-Oswald">
            Our vision is to ensure every stray animal is rescued,
            rehabilitated, and rehomed by dedicated advocates.
          </h3>
        </div>
      </div>

      <div className="h-[90vh] w-[90%] flex items-center p-10 justify-center ">
        <div className="w-[60%] h-[80%] flex">
          <img src="/aboutus3.jpg" alt="img" className="rounded-xl" />
        </div>
        <div className="w-[50%] h-[80%] p-10 text-zinc-600 flex flex-col justify-around">
          <h2 className="text-6xl font-bold text-btnColor">JOIN US</h2>
          <p className="text-md">
            There are many ways to get involved with 'Sahaara'. Whether you
            choose to adopt, volunteer, or donate, your support is crucial to
            our mission. Together, we can create a community where every animal
            is treated with the love and respect they deserve. Thank you for
            visiting Sahaara. We invite you to explore our website, learn more
            about our work, and join us in our mission to give every animal a
            chance at a better life.
          </p>
        </div>
      </div>
      <Footer />
      <BottomContact />
    </>
  );
};

export default About;
