import { useForm } from "react-hook-form";
import API from "../../config/baseUrl";
import Button from "./Button";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function ResetForm({setResetPassword}) {
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      newPassword: "",
      confirmNewPassword: "",
      verifyCode: "",
    },
  });

  const onSubmit = async (data: {
    username: string;
    newPassword: string;
    confirmNewPassword: string;
    verifyCode: string;
  }) => {
    console.log(data);
    const { newPassword, username, confirmNewPassword, verifyCode } = data;
    try {
      const { data } = await API.post("/api/v1/user/reset-password", {
        newPassword,
        username,
        confirmNewPassword,
        verifyCode,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  const handleBack=()=>{
    setResetPassword(false)
  }
  return (
    <div className="flex flex-col gap-6 justify-center items-center w-[40%]">
            <IoArrowBackCircleSharp onClick={handleBack} size={30} />
      <h2 className="text-3xl font-Oswald font-bold">Reset Password</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full"
      >
        <input
          type="text"
          placeholder="Enter OTP "
          {...register("verifyCode")}
          className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Enter username "
          {...register("username")}
          className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Enter new password"
          {...register("newPassword")}
          className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Confirm new password"
          {...register("confirmNewPassword")}
          className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
        />
        <Button>Reset</Button>
      </form>
    </div>
  );
}

export default ResetForm;
