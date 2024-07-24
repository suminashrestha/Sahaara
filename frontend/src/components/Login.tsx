import { useForm } from "react-hook-form";
import Button from "./Button";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { login } from "../redux/actions/authActions";
import { useEffect } from "react";
import { CgSpinner } from "react-icons/cg";

const Login = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading, isLoginSuccessful } = useAppSelector(
    (state) => state.authentication
  );
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

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (isLoginSuccessful) {
      navigate("/profile");
    }
  }, [isLoginSuccessful]);

  const submitData = async (data: { identifier: string; password: string }) => {
    const { identifier, password } = data;
    dispatch(login(identifier, password));
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
        {...register("identifier", { required: "username/email is required" })}
        className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
      />
      {errors.identifier && (
        <p className="text-red-600 text-sm">{errors.identifier.message}</p>
      )}

      <input
        placeholder="Enter Password"
        type="password"
        {...register("password", { required: "Password is required" })}
        className="p-3 text-sm text-black rounded-xl bg-gray-100 focus:outline-none"
      />
      {errors.password && (
        <p className="text-red-600 text-sm">{errors.password.message}</p>
      )}
      <ul className="flex ">
        <li className="flex w-[50%] gap-2 items-center">
          <input type="checkbox" className="rounded-lg h-5 w-5" />
          <span>Remember me?</span>
        </li>
        <li className="w-[50%] flex justify-end">
          <Link to="/reset">Forgot password?</Link>
        </li>
      </ul>
      <Button type="submit">
        {isLoading && <CgSpinner className="inline mr-1" size={24} />}
        Login
      </Button>
    </form>
  );
};

export default Login;
