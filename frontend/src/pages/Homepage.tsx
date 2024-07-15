import BottomContact from "../components/BottomContact";
import Button from "../components/Button";
import LandingNav from "../components/LandingNav";
import { Link, useNavigate } from "react-router-dom";
import { GoOrganization } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import Footer from "../components/Footer";
import FlipCard from "../components/FlipCard";

export default function Homepage() {
  const navigate = useNavigate();
  return (
    <>
      <LandingNav />
      <div className="h-[100%] mt-20">
        <div className="h-[60vh] w-full bg-[url('/homepageBg.jpg')] bg-no-repeat bg-cover overflow-hidden flex items-center px-10">
          <div className="h-[50%] bg-zinc-200 w-[40%] shadow-md rounded-lg p-10 flex flex-col justify-between">
            <p className="text-3xl font-Oswald font-normal text-zinc-600">
              Your donation reaches organizations and campaigns through us.
            </p>
            <Button
              className="w-[50%] self-end"
              onClick={() => navigate("/donate")}
            >
              Donate
            </Button>
          </div>
        </div>

        <div className="h-[50vh] w-full flex justify-end items-center px-5">
          <div className="h-[80%] w-[70vw] shadow-md flex p-5 gap-5">
            <div className="self-center">
              <p className="text-md font-sans text-zinc-600">
                At{" "}
                <span className="text-4xl font-Oswald font-semibold">
                  SAHAARA,{" "}
                </span>
                we believe every animal deserves a second chance at happiness.
                Our mission is to rescue, rehabilitate, and rehome pets in need,
                providing them with the care and compassion they deserve.
                Whether you're looking to adopt a furry friend, volunteer your
                time, or support our cause, you'll find a community of
                passionate individuals dedicated to making a difference. Join us
                in our journey to transform lives—both theirs and yours.
                Discover the joy of adoption and give a loving home to an animal
                waiting for a fresh start. Together, we can create a world where
                every animal feels safe, cherished, and loved.
              </p>
            </div>
            <Link to="/about">
              <Button className="h-[100%]">...</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="h-[50vh] w-full flex justify-start p-10 ">
        <FlipCard
          back="Sahaara offers a platform for INDIVIDUALS to quickly and easily report sightings, request help, and ensure that stray animals receive the care they need by connecting their requests to nearby individual helpers or organizations. "
          front={
            <>
              <CiUser size={100} />
              <span className="font-Oswald text-xl">50 resistered</span>
              <h3 className="text-2xl font-Oswald">INDIVIDUALS</h3>
            </>
          }
        />
        {/* <CiUser size={100} />
          50
          <h3 className="text-2xl font-Oswald">INDIVIDUALS</h3> */}
        <div className="w-[40%] h-[100%] flex justify-center items-center">
          <h2 className="text-3xl font-Oswald text-zinc-600">OUR COMMUNITY</h2>
        </div>
        <FlipCard
          back="For organizations involved in animal rescue and welfare, Sahaara provides tools to manage and respond to reports of stray dogs efficiently. It facilitates the coordination of rescue efforts, streamlines the process of providing aid, and supports the adoption process by connecting potential adopters with dogs in need of homes."
          front={
            <>
              <GoOrganization size={100} />
              50 registered
              <h3 className="text-2xl font-Oswald">Organizations</h3>
            </>
          }
        />
      </div>
      <Footer />
      <BottomContact />
    </>
  );
}
