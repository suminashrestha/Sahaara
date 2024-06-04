import LandingNav from "../components/LandingNav";
import LoginSignup from "./LoginSignup";

export default function Homepage() {
  return (
    <>
      
      <LandingNav />
      <div className="w-[85vw] flex justify-end items-center h-[80vh]">
      <LoginSignup />

      </div>

    </>
  );
}
