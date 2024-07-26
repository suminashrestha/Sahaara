import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import API from "../config/baseUrl";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

function OTPverificationPage() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [otp, setOtp] = useState("");

  function handleOtpChange(e: any) {
    setOtp(e.target.value);
  }
  async function handleotp() {
    try {
      const { data } = await API.post("/api/v1/user/verify-code", {
        username,
        verifyCode: otp,
      });
      navigate("/join/login");
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="flex h-screen justify-center w-full items-center">
      <div className="h-[80%] w-[80%] shadow-lg rounded flex ">
        <div className="w-[50%] h-full">
          <img src="/otpverify.jpg" className="h-full " />
        </div>
        <div className="w-[50%] h-full flex flex-col justify-center gap-9 items-center">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-3xl font-Oswald ">OTP Verification</h2>
            <p>
              Enter the verification code sent to your registered email to
              complete the authentication process. If you did not request this
              code, please disregard this message or{" "}
              {
                <Link to="/contact" className="text-purple-700">
                  contact
                </Link>
              }{" "}
              our support team for assistance.
            </p>
          </div>
          <div className="flex gap-4">
            <InputField
              type="text"
              placeholder="Enter otp"
              value={otp}
              onChange={handleOtpChange}
            />
            <Button onClick={handleotp}>Continue</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OTPverificationPage;
