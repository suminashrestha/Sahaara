import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { signupSchema, Schema } from "../validators/signupValidators";
import Button from "./Button";
import ErrorText from "./ErrorText";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(signupSchema),
  });

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userMode: "",
  });

  function handleBack() {
    setUser({ ...user, userMode: "" });
  }

  const onSubmit = (data: Schema) => {
    console.log(data);
  };

  return (
    <>
      {user.userMode === "" && (
        <div className="flex flex-col items-center justify-center gap-20 h-full p-9">
          <p className="text-xl text-center">
            Before continuing, please specify a role according to the service
            you will be providing.
          </p>
          <div className="flex items-center justify-center gap-11">
            <Button
              onClick={() => setUser({ ...user, userMode: "individual" })}
              className="h-[100px] w-[160px] px-3 py-2 shadow-md font-Oswald uppercase transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-110 hover:text-white duration-300"
            >
              Individual
            </Button>
            <Button
              onClick={() => setUser({ ...user, userMode: "organization" })}
              className="h-[100px] w-[160px] px-3 py-2 shadow-md font-Oswald uppercase transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-110 hover:text-white duration-300"
            >
              Organization
            </Button>
          </div>
        </div>
      )}

      {user.userMode && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-[100%] p-5 gap-5 justify-center"
        >
          <button type="button" onClick={handleBack}>
            <IoArrowBackCircleSharp size={30} />
          </button>

          <input
            {...register("username")}
            placeholder={
              user.userMode === "organization"
                ? "Enter Organization's username"
                : "Enter Individual's username"
            }
            type="text"
            className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          {errors.username && (
            <ErrorText message={errors.username.message as string} />
          )}

          <input
            {...register("email")}
            type="email"
            placeholder="enter email"
            className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          {errors.email && (
            <ErrorText message={errors.email.message as string} />
          )}

          <input
            {...register("password")}
            placeholder="Enter Password"
            type="password"
            className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          {errors.password && (
            <ErrorText message={errors.password.message as string} />
          )}

          <input
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            value={user.confirmPassword}
            className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
            type="password"
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
          />
          {errors.confirmPassword && (
            <ErrorText message={errors.confirmPassword.message as string} />
          )}

          <Button>Signup</Button>
        </form>
      )}
    </>
  );
}

export default Signup;