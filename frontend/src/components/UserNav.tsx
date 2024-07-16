import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useEffect, useState } from "react";
import { PiMessengerLogoLight } from "react-icons/pi";
import { IoSettings } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";

function LandingNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const { logout, user } = useAuth();
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
  function toggleDropdown() {
    setIsDropdownVisible((isDropdownVisible) => !isDropdownVisible);
  }
  function handleVisiblity() {
    setIsVisible((isVisible) => !isVisible);
  }

  return (
    <div
      className={`fixed top-0 h-20 w-full z-50 ${
        isScrolled ? "bg-white bg-opacity-90" : "bg-transparent"
      }`}
    >
      <nav className="flex justify-center">
        <ul className=" h-20 flex justify-between items-center w-full shadow-md px-2">
          <li className="font-Oswald font-thin text-2xl h-[100%] flex items-center">
            <img src="/logo.png" alt="sahaara" className="h-[90%]" />
          </li>
          <div className="flex items-center justify-end w-[30%] gap-6">
            <li>
              <Button onClick={toggleDropdown}>Adoption Portal</Button>
              {isDropdownVisible && (
                <div className="absolute bg-white shadow-lg p-4 mt-2 w-48 rounded-lg">
                  <ul className="space-y-2">
                    <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer rounded-md">
                      Create Adoption Posts
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer rounded-md">
                      View Adoption Posts
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <PiMessengerLogoLight size={30} />
            </li>
            <li onClick={handleVisiblity}>
              <img
                src="https://i.pravatar.cc/100?u=zz"
                className="rounded-[50%] w-[40px]"
              />
            </li>
          </div>
        </ul>
      </nav>

      {isVisible ? (
        <div className="fixed right-10 w-[250px] h-[120px] flex p-5  flex-col shadow-md">
          <NavLink to="">
            <div className="flex gap-2 items-center hover:bg-gray-100 px-2 py-2 rounded-md border-b-2">
              <img
                src="https://i.pravatar.cc/100?u=zz"
                alt="user"
                className="rounded-[50%] w-[30px]"
              />
              <h3 className="font-semibold">{user.username}</h3>
            </div>
          </NavLink>
          <ul className="px-2">
            <DropDownItem
              icon={<IoLogOut size={30} />}
              text="Log Out"
              onClick={() => {
                logout();
                navigate("/");
              }}
            />
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function DropDownItem({
  icon,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}) {
  return (
    <li
      className="flex gap-2 items-center hover:text-gray-500 py-2 hover:cursor-pointer rounded-md"
      onClick={onClick}
    >
      {icon}
      <h3>{text}</h3>
    </li>
  );
}
export default LandingNav;
