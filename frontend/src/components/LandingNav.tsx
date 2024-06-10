import { NavLink } from "react-router-dom";
import Button from "./Button";
export default function LandingNav() {
  return (
    <nav>
      <ul className="flex justify-between h-[10%] items-center p-5 w-[100%]">
        <div className="w-[20%] flex items-center justify-center">
          <li className="transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-110 hover:text-btnColor duration-300">
            <NavLink to="/">Sahaara</NavLink>
          </li>
        </div>

        <div className="flex justify-evenly w-[30%] items-center">
          <li className="transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-110 hover:text-btnColor duration-300">
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li className="transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-110 hover:text-btnColor duration-300">
            <NavLink to="/teams">Teams</NavLink>
          </li>
          <li className="transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-110 hover:text-btnColor duration-300">
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li className="transition ease-in-out delay-60 hover:-translate-y-1 hover:scale-110 hover:text-btnColor duration-300">
            <NavLink to="/join">
              <Button>Get started</Button>
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}
