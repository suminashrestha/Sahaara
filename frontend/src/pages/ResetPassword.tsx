import Button from "../components/Button";
import { useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router";
import API from "../config/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ResetForm from "../components/ResetForm";
import Footer from "../components/Footer";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [resetPassword, setResetPassword] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex h-screen justify-center w-full items-center">
      <div className="h-[80%] w-[80%] shadow-lg rounded flex ">
        <div className="w-[50%] h-full">
          <img src="/otpverify.jpg" className="h-full" />
        </div>
        {resetPassword ? (
          <ResetForm setResetPassword={setResetPassword} />
        ) : (
          <div className="flex h-full w-[50%] p-10 justify-center items-center gap-5">
            <IoArrowBackCircleSharp onClick={handleBack} size={40} />
            <div className="flex flex-col gap-5">
              <div className=" text-zinc-600">
                <h1 className="text-3xl font-semibold">Forgot you password?</h1>
                <p>
                  Please provide us with the email you used while registering
                  and receive a OTP.
                </p>
              </div>
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
                    const { data } = await API.post(
                      "/api/v1/user/get-verification-code",
                      {
                        email,
                      }
                    );
                    setResetPassword(true);
                    toast.success(data.message);
                  } catch (e: any) {
                    toast.error(e.response.data.message);
                  }
                }}
              >
                Request OTP
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
