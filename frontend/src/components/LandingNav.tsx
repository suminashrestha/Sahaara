import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useEffect, useState } from "react";
function LandingNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate= useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 h-20 w-full z-50 ${
        isScrolled ? "bg-white bg-opacity-90" : "bg-transparent"
      }`}
    >
      <nav>
        <ul className="flex justify-between items-center px-5 h-20">
          <li className="font-Oswald font-thin text-2xl h-[100%] flex items-center">
            <img src="/logo.png" alt="sahaara" className="h-[90%]" onClick={()=>navigate("/")}/>
          </li>
          <div className=" w-[50%] h-[100%] flex justify-evenly items-center ">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-slate-400"
                    : "text-black hover:text-slate-400"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-slate-400"
                    : "text-black hover:text-slate-400"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-slate-400"
                    : "text-black hover:text-slate-400"
                }
              >
                Contact
              </NavLink>
            </li>
          </div>
          <li>
            <NavLink to="/join">
              <Button className="w-50 flex items-center">Get started</Button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default LandingNav;
