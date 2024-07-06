import { useState } from "react";
import SignLoginNav from "../components/SignLoginNav";
import { Outlet } from "react-router";
import LandingNav from "../components/LandingNav";
import Footer from "../components/Footer";
import BottomContact from "../components/BottomContact";

function LoginSignup() {
  const [status, setStatus] = useState("login");

  return (
    <div>
      <LandingNav />
      <div className="flex justify-center mt-20 h-[90vh] items-center">
        <div className="flex px-10 w-[85vw] h-[90vh] justify-center items-center">
          <img src="/dog.avif" alt="" className="h-[80%] w-[40%] shadow-md" />
          <div className="w-[40%] h-[80%] shadow-lg overflow-hidden">
            <SignLoginNav status={status} setStatus={setStatus} />
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
      <BottomContact />
    </div>
  );
}

export default LoginSignup;
