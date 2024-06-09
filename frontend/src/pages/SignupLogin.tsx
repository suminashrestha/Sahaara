import { useState } from "react";
import LandingNav from "../components/LandingNav";
import SignLoginNav from "../components/SignLoginNav";
import { Outlet } from "react-router";
import SignupLoginSidebar from "../components/SignupLoginSidebar";

function LoginSignup() {
  const [status, setStatus] = useState("login");

  return (
    <div>
      <LandingNav />
      <div className="flex justify-center">
        <div className="flex px-10 w-[85vw] h-[80vh] justify-center items-center">
          <SignupLoginSidebar status={status}/>
          <div className="w-[40%] h-[80%] shadow-lg overflow-hidden">
            <SignLoginNav status={status} setStatus={setStatus} />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
