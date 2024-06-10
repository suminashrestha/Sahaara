import { NavLink} from "react-router-dom";
export default function LandingNav() {
  return (
    <nav>
      <ul className="flex justify-between h-[10%] items-center p-5 w-[100%]">
        <div className="w-[20%] flex items-center justify-center">
          <li>
            <NavLink to="/">Sahaara</NavLink>
          </li>
        </div>
        <div className="flex justify-evenly w-[30%] items-center">
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li>
            <NavLink  to="/teams">Teams</NavLink>
          </li>
          <li>
            <NavLink  to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink  to="/join">Get started</NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}
