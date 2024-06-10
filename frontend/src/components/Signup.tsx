import { useEffect, useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { signupSchema, Schema } from "../validators/signupValidators";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoArrowBackCircleSharp } from "react-icons/io5";

function Signup() {
  const {
    register,
    formState: { errors },
  } = useForm<Schema>({ mode: "all", resolver: zodResolver(signupSchema) });

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    userMode: "",
  });
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [userMode, setUserMode] = useState("");

  function handleBack() {
    setUser({ ...user, userMode: "" });
  }

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
        <form className="flex flex-col h-[100%] p-5 gap-5 justify-center">
          <button onClick={handleBack}>
            <IoArrowBackCircleSharp size={30} />
          </button>
          <InputField
            placeholder={
              user.userMode === "organization"
                ? "Enter Organization name"
                : "Enter username"
            }
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />

          <input
            {...register("email")}
            type="email"
            placeholder="enter email"
            className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
            value={user.email}
            onChange={(e)=>setUser({ ...user, email: e.target.value })}
          />
          <p>{errors.email?.message}</p>

          <InputField
            placeholder="Enter Password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <InputField placeholder="Confirm Password" type="password" />

          <Button>Signup</Button>
        </form>
      )}
    </>
  );
}

export default Signup;
