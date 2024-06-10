import { useEffect, useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { formSchema } from "../validators/signupValidators";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userMode, setUserMode] = useState("");

  function handleBack() {
    setUserMode("");
  }

  return (
    <>
      {userMode === "" && (
        <div className="flex flex-col items-center justify-center gap-20 h-full p-9">
          <p className="text-xl text-center">
            Before continuing, please specify a role according to the service
            you will be providing.
          </p>
          <div className="flex items-center justify-center gap-11">
            <Button
              onClick={() => setUserMode("individual")}
              className="h-[50px] w-[150px] px-3 py-2 shadow-md"
            >
              Individual
            </Button>
            <Button
              onClick={() => setUserMode("organization")}
              className="h-[50px] w-[150px] px-3 py-2 shadow-md"
            >
              Organization
            </Button>
          </div>
        </div>
      )}

      {userMode && (
        <form className="flex flex-col h-[100%] p-5 gap-5 justify-center">
          <button onClick={handleBack}>
            <IoArrowBackCircleSharp size={30} />
          </button>
          <InputField
            placeholder={
              userMode === "organization"
                ? "Enter Organization name"
                : "Enter username"
            }
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <InputField
            placeholder="Enter email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button>Signup</Button>
        </form>
      )}
    </>
  );
}

export default Signup;
