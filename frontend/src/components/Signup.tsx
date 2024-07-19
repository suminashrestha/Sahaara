import  { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { signupSchema, Schema } from "../validators/signupValidators";
import Button from "./Button";
import ErrorText from "./ErrorText";
import API from "../config/baseUrl"
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Signup() {
  const navigate= useNavigate();
  const [userMode, setUserMode] = useState<string>("");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(signupSchema),
    mode: "all",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      type: "",
    },
  });

  function handleBack() {
    reset(); // Reset form to default values
    setUserMode(""); // Clear userMode
  }

  const submitData = async(data: FieldValues) => {
    data.type = userMode;
    const { username, email, password, type }=data;
   try {
     const {data}= await API.post("/api/v1/user/sign-up", { username, email, password, type })
     navigate(`/otpverify/${username}`)
     toast.success(data.message)
   } catch (error:any){
     toast.error(error.response.data.message)
   }
    reset(); // Reset form after submission
  };

  return (
    <>
      {userMode === "" && (
        <div className="flex flex-col items-center justify-center gap-20 h-full p-9">
          <p className="text-xl text-center text-zinc-600">
            Before continuing, please specify a role according to the service
            you will be providing.
          </p>
          <div className="flex items-center justify-center gap-11">
            <Button
              onClick={() => setUserMode(() => "individual")}
              className="h-[100px] w-[160px] px-3 py-2 shadow-md font-Oswald uppercase transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-110 hover:text-white duration-300"
            >
              Individual
            </Button>
            <Button
              onClick={() => setUserMode(() => "organization")}
              className="h-[100px] w-[160px] px-3 py-2 shadow-md font-Oswald uppercase transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-110 hover:text-white duration-300"
            >
              Organization
            </Button>
          </div>
        </div>
      )}

      {userMode !== "" && (
        <form
          onSubmit={handleSubmit(submitData)}
          className="flex flex-col h-[100%] p-5 gap-5 justify-center overflow-y-scroll max-h-screen"
        >
          <IoArrowBackCircleSharp onClick={handleBack} size={30} />

          <input
            {...register("username")}
            placeholder={
              userMode === "organization"
                ? "Enter Organization's username"
                : "Enter Individual's username"
            }
            type="text"
            className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
          />
          {errors.username && (
            <ErrorText message={errors.username.message as string} />
          )}

          <input
            {...register("email")}
            type="email"
            placeholder="Enter email"
            className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
          />
          {errors.email && (
            <ErrorText message={errors.email.message as string} />
          )}

          <input
            {...register("password")}
            placeholder="Enter Password"
            type="password"
            className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
          />
          {errors.password && (
            <ErrorText message={errors.password.message as string} />
          )}

          <input
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
            type="password"
          />
          {errors.confirmPassword && (
            <ErrorText message={errors.confirmPassword.message as string} />
          )}

          <button
            type="submit"
            className={`bg-btnColor px-5 py-2 text-white rounded-lg hover:bg-btnHover`}
          >
            Signup
          </button>
        </form>
      )}
    </>
  );
}

export default Signup;
