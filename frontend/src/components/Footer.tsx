import { NavLink } from "react-router-dom";
import Button from "./Button";
import InputField from "./InputField";

function Footer() {
  return (
    <div className="flex flex-col items-center bg-black mt-10">
      <footer className="h-[25vh] w-[100vw] flex justify-evenly py-10">
        <div className="w-[200px]">
          <img src="/whiteLogo.png" alt="sahaara" className="h-[90%]" />
          Copyright
        </div>
        <div className="flex w-[60%] text-white gap-4 ">
          <div className="flex flex-col gap-3 w-[30%]">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <NavLink to="/homepage">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 w-[30%]">
            <h3>Programs</h3>
            <ul>
              <li>
                <NavLink to="">Campaigns</NavLink>
              </li>
              <li>
                <NavLink to="">Donations</NavLink>
              </li>
            </ul>

            <ul>
              <li>Privacy Policy</li>
              <li>Terms & conditions</li>
            </ul>
          </div>

          <div className="flex flex-col gap-6 w-[30%]">
            <h3>Newsletter</h3>
            <div className="flex gap-4">
              <InputField type="email" placeholder="Enter your email" />
              <Button>Subscribe</Button>
            </div>
            <div className=" text-white text-sm">
              &copy;2024 Sahaara. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
