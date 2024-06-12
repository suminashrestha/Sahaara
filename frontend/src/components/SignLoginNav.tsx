import { NavLink } from "react-router-dom";

function SignLoginNav({ status, setStatus }) {
  return (
    <nav>
      <ul className="flex w-full justify-between h-[40px] items-center p-5">
        <li
          className="flex-1 flex justify-center"
          onClick={() => setStatus("login")}
        >
          <NavLink
            to="login"
            className={({ isActive }) =>
              isActive
                ? "text-btnHover font-bold border-b-2 border-primary"
                : "text-gray-500 hover:text-btnColor"
            }
          >
            Login
          </NavLink>
        </li>
        <li
          className="flex-1 flex justify-center"
          onClick={() => setStatus("signup")}
        >
          <NavLink
            to="signup"
            className={({ isActive }) =>
              isActive
                ? "text-btnHover font-bold border-b-2 border-primary"
                : "text-gray-500 hover:text-btnColor"
            }
          >
            Signup
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SignLoginNav;
