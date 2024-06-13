import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { Link } from "react-router-dom";
import { useDebounceValue } from "usehooks-ts";


const Login=()=>{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameMessage,setusernameMessage] = useState("");
  const [isCheckingUsername,setCheckingUsername]=useState(false);
  const [isSubmitting,setIsSubmitting]=useState(false)

  // const debouncedUsername = useDebounceValue(username,300)

  return (
    <form className="flex flex-col h-full px-5 gap-6 justify-center">
      <InputField
        placeholder="Enter username/email"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        placeholder="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ul className="flex ">
        <li className="flex w-[50%] gap-2 items-center">
          <input type="checkbox" className="rounded-lg h-5 w-5" />
          <span>Remember me?</span>
        </li>
        <li className="w-[50%] flex justify-end">
          <Link to="/join/reset">Forgot password?</Link>
        </li>
      </ul>
      <Button>Login</Button>
    </form>
  );
}

export default Login;
