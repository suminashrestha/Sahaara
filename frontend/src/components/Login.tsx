import { useForm } from "react-hook-form";
import Button from "./Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const {login}=useAuth(); 
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const submitData = async (data: { identifier: string, password: string }) => {
    // console.log(data);
    const { identifier, password } = data;
    try {
      login(identifier,password)

      navigate("/profile");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitData)}
      className="flex flex-col h-full px-5 gap-6 justify-center text-zinc-600"
    >
      <div>
        <h2 className="text-3xl font-semibold">Welcome back</h2>
        <p>Please enter your account details</p>
      </div>
      <input
        placeholder="Enter username/email"
        type="text"
        {...register("identifier",{required: "username/email is required"})}
        className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
      />
      {errors.identifier && <p className="text-red-600 text-sm">{errors.identifier.message}</p>}

      <input
        placeholder="Enter Password"
        type="password"
         {...register("password", { required: "Password is required" })}
          className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
      />
      {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
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
