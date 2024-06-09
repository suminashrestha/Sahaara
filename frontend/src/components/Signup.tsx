import { useEffect, useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { formSchema } from "../validators/signupValidators";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userMode, setUserMode] = useState("");

  return (
    <>
      {userMode === "" && (
        <div className="flex h-[100%] w-[100%] items-center justify-center gap-11">
            <Button
              onClick={() => setUserMode("individual")}
              className="h-[50px] w-[150px] px-3 py-2"
            >
              Individual
            </Button>
            <Button
              onClick={() => setUserMode("organization")}
              className="h-[50px] w-[150px] px-3 py-2"
            >
              Organization
            </Button>
        </div>
      )}

      {userMode && (
        <form className="flex flex-col h-[100%] p-5 gap-5 justify-center">
          <InputField
            placeholder="Enter username"
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

          <Button className="bg-green-500">Signup</Button>
        </form>
      )}
    </>
  );
}

export default Signup;
