import Button from "../components/Button";
import { useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router";
import API from "../../config/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ResetForm from "../components/ResetForm";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [resetPassword, setResetPassword] = useState(true);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex h-full justify-center w-full items-center">
      <div className="h-[80%] w-[80%] shadow-lg rounded flex ">
        <div className="w-[50%] h-full">
          <img src="/otpverify.jpg" className="h-full" />
        </div>
        {resetPassword ? (
          <ResetForm resetPassword={setResetPassword}/>
        ) : (
          <div className="flex h-full justify-center items-center gap-5">
            <IoArrowBackCircleSharp onClick={handleBack} size={30} />
            <input
              type="text"
              className="p-3 w-[90%]text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
              placeholder="Enter registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              onClick={async () => {
                try {
                  const { data } = await API.get("/api/v1/user/verify-code", {
                    email,
                  });
                  console.log(data);
                  setResetPassword(true);
                  toast.success();
                } catch (e: any) {
                  toast.error(e.response.data.message);
                }
              }}
            >
              Request OTP
            </Button>
          </div>
        )}
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default ResetPassword;
