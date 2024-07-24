import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { logout, toggleVolunteerMode } from "../redux/actions/authActions";
import { TbLogout2 } from "react-icons/tb";
import API from "../config/baseUrl";
import { toast } from "react-toastify";
import useUser from "../hooks/useUser";

function UserNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [_, setIsDropdownVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const { username } = useUser();
  const dispatch = useAppDispatch();
  const { isLoginSuccessful, user } = useAppSelector(
    (state) => state.authentication
  );

  const handleToggle = async (isVolunteer: boolean) => {
    try {
      const { data } = await API.put("/api/v1/user/toggle-volunteer-mode", {
        isVolunteer,
      });
      dispatch(toggleVolunteerMode(isVolunteer));
      toast.success(data.message);
      const updatedUser = { ...user, isVolunteer };
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
    } catch (error: any) {
      console.log("Error:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (!isLoginSuccessful) {
      navigate("/");
    }
  }, [isLoginSuccessful]);

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
  // function toggleDropdown() {
  //   setIsDropdownVisible((isDropdownVisible) => !isDropdownVisible);
  //   setIsVisible(false);
  // }
  function handleVisiblity() {
    setIsVisible((isVisible) => !isVisible);
    setIsDropdownVisible(false);
  }

  return (
    <div
      className={`fixed top-0 h-20 w-full z-50 ${
        isScrolled ? "bg-white bg-opacity-90" : "bg-transparent"
      }`}
    >
      <nav className="flex justify-center backdrop-blur-xl">
        <ul className=" h-20 flex justify-between items-center w-full shadow-md px-2 ">
          <li className="font-Oswald font-thin text-2xl h-[100%] flex items-center">
            <img
              src="/logo.png"
              alt="sahaara"
              className="h-[90%] cursor-pointer"
              onClick={() => navigate("/profile/rescue")}
            />
          </li>

          <div className="flex items-center justify-end w-[40%] gap-6">
            {user && user.type === "organization" ? (
              <NavLink
                to={"/createvolunteer"}
                className={`bg-btnColor px-5 py-2 text-white rounded-lg hover:bg-slate-600`}
              >
                create an event{" "}
              </NavLink>
            ) : user &&
              user.type === "individual" &&
              user.isVolunteer === true ? (
              <NavLink
                to={"/viewvolunteer"}
                className={`bg-btnColor px-5 py-2 text-white rounded-lg hover:bg-slate-600`}
              >
                check recent events{" "}
              </NavLink>
            ) : null}
            <li>
              <Button onClick={() => navigate("/adoption")}>
                Adoption Portal
              </Button>
            </li>
            <li onClick={handleVisiblity}>
              <div className="rounded-[50%] bg-black w-[50px] h-[50px] text-white flex justify-center items-center">
                {username.charAt(0).toUpperCase()}
              </div>
            </li>
          </div>
        </ul>
      </nav>

      {isVisible ? (
        <div className="fixed right-10 flex px-12 py-6 bg-btnHover text-white rounded-lg flex-col shadow-md z-30 gap-2">
          <div
            onClick={() => {
              navigate(`/userprofile/${user?._id}`);
            }}
          >
            <div className="flex gap-2 items-center hover:bg-gray-100 hover:text-black px-2 py-2 rounded-md border-b-2 cursor-pointer">
              <div className="rounded-[50%] bg-gray-300 w-[40px] h-[40px] text-black flex justify-center items-center">
                {username.charAt(0).toUpperCase()}
              </div>
              <h3 className="font-semibold">{user?.username}</h3>
            </div>
          </div>
          {user && user.type === "individual" ? (
            <div className="flex min-w-32 gap-2 items-center px-2 py-3 rounded border-b cursor-pointer">
              Volunteer{" "}
              {user && user.isVolunteer ? (
                <>
                  <span className="bg-green-500 text-center px-2 w-1/2 rounded-full text-white text-sm font-semibold">
                    ON
                  </span>
                  <span
                    className="px-2 w-1/2 rounded-full text-center text-white text-sm font-semibold"
                    onClick={() => handleToggle(false)}
                  >
                    OFF
                  </span>
                </>
              ) : (
                <>
                  <span
                    className="text-center px-2 w-1/2 rounded-full text-white text-sm font-semibold"
                    onClick={() => handleToggle(true)}
                  >
                    ON
                  </span>
                  <span className="bg-red-500 px-2 w-1/2 rounded-full text-center text-white text-sm font-semibold">
                    OFF
                  </span>
                </>
              )}
            </div>
          ) : null}
          <DropDownItem
            icon={<TbLogout2 />}
            text="Logout"
            onClick={() => dispatch(logout())}
          />
        </div>
      ) : null}
    </div>
  );
}

function DropDownItem({
  icon,
  text,
  onClick,
}: {
  icon?: React.ReactNode;
  text: string;
  onClick?: () => void;
}) {
  return (
    <li
      className="flex min-w-32  gap-2 items-center hover:text-black hover:bg-gray-100 px-2 py-2 rounded border-b cursor-pointer"
      onClick={onClick}
    >
      {icon}
      <h3>{text}</h3>
    </li>
  );
}
export default UserNav;
