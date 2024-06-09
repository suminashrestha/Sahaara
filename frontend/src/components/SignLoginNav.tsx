import { NavLink } from "react-router-dom";
function SignLoginNav({status, setStatus}) {
  return (
    <nav>
      <ul className="flex w-[fit] justify-between h-[40px] items-center p-5">
        <li className="w-[50%] flex justify-center" onClick={()=>setStatus("login")}>
          <NavLink
            to="login"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold " : "text-gray-500"
            }
          >
            Login
          </NavLink>
        </li>
        <li className="flex justify-center w-[50%]"  onClick={()=>setStatus("signup")}>
          <NavLink
            to="signup"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-black"
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
