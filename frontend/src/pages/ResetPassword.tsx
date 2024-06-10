import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useState } from "react";

function ResetPassword() {

    const [verificationCode,setVerificationCode]=useState<number>()
  return (
    <div className="flex flex-col p-5 justify-center gap-6 h-full items-center">
      <InputField type="email" placeholder="enter your email address" className="w-[70%]"/>
      <Button>Send verification code</Button>
      <Button className="w-[30%]">
        <NavLink to="/join/login">Back to login</NavLink>
      </Button>
    </div>
  );
}

export default ResetPassword;
