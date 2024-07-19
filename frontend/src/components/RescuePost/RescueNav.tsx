import { NavLink } from "react-router-dom";

function RescueNav() {
  return (
    <nav className="mt-7 mb-9 w-[50%] h-7 bg-white flex justify-between self-center shadow-md">
      <NavLink
        to="rescue"
        className={({ isActive }) =>
          isActive ? "bg-btnColor w-[50%] text-white text-center" : "bg-white hover:text-slate-400 w-[50%] text-center"
        }
      >
        View
      </NavLink>
      <NavLink
        to="createrescue"
        className={({ isActive }) =>
          isActive ? "bg-btnColor w-[50%] text-white text-center" : "bg-white hover:text-slate-400 w-[50%] text-center"
        }
      >
        Create
      </NavLink>
    </nav>
  );
}

export default RescueNav;
