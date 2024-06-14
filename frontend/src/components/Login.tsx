import { useForm } from "react-hook-form";
import Button from "./Button";
import { Link } from "react-router-dom";
import API from "../../config/baseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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

  const submitData = async (data: { identifier: string, password: string }) => {
    console.log(data);
    const { identifier, password } = data;
    try {
      const {data} = await API.post("/api/v1/user/sign-in", { identifier, password });
      console.log(data.data.user.username)
      localStorage.setItem("userInfo", JSON.stringify(data.data.user));
      toast.success("Login successful!");
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
      className="flex flex-col h-full px-5 gap-6 justify-center"
    >
      <input
        placeholder="Enter username/email"
        type="text"
        {...register("identifier")}
        className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
      />
      <input
        placeholder="Enter Password"
        type="password"
        {...register("password")}
        className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
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
