import { useForm } from "react-hook-form";
import Button from "./Button";
import InputField from "./InputField";
import { Link } from "react-router-dom";
import API from "../../config/baseUrl";
import { useNavigate } from "react-router-dom";
// import { useDebounceValue } from "usehooks-ts";


const Login = () => {
  const {
    register,
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const submitData = async (data : {identifier: string, password: string}) => {
    console.log(data)
    const {identifier,password}= data
    try {
      const {data} = await API.post("/api/v1/user/sign-in", {identifier,password});
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    reset()

  };

  // const debouncedUsername = useDebounceValue(username,300)

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className="flex flex-col h-full px-5 gap-6 justify-center"
    >
      <input
        placeholder="Enter username/email"
        type="text"
        {...register("identifier")}
        className="${className} p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
      />
      <input
        placeholder="Enter Password"
        type="password"
        {...register("password")}
        className="${className} p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
      />
      <ul className="flex ">
        <li className="flex w-[50%] gap-2 items-center">
          <input type="checkbox" className="rounded-lg h-5 w-5" />
          <span>Remember me?</span>
        </li>
        <li className="w-[50%] flex justify-end">
          <Link to="/reset">Forgot password?</Link>
        </li>
      </ul>
      <Button>Login</Button>
    </form>
  );
};

export default Login;
