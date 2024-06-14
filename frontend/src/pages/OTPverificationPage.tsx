import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";

function OTPverificationPage() {
  const [otp, setOtp] = useState("");
  return (
    <div className="flex h-full justify-center w-full items-center">
      <div className="h-[80%] w-[80%] shadow-lg rounded flex ">
        <div className="w-[50%] h-full">
          <img src="/otpverify.jpg" className="h-full " />
        </div>
        <div className="w-[50%] h-full flex justify-center items-center">
            <InputField type="text" placeholder="Enter otp" value={otp}/>
            <Button>Continue</Button>
        </div>
      </div>
    </div>
  );
}

export default OTPverificationPage;
