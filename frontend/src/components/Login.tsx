import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  return (
    <form className="flex flex-col h-[100%] p-5 gap-6 justify-center">
      <p>Welcome to Sahaara! </p>
      <InputField placeholder="Enter username/email" type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
      <InputField placeholder="Enter Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <ul className="flex ">
        <li className="flex w-[50%] gap-2 items-center">
          <input type="checkbox" className="rounded-lg h-5 w-5" />
          <span>Remember me?</span>
        </li>
        <li className="w-[50%] flex justify-end">
          <Link to="/reset">Forgot password?</Link>
        </li>
      </ul>
      <Button className="bg-green-500">Login</Button>
    </form>
  );
}

export default Login;
