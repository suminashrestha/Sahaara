import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Teams from "./pages/Teams";
import ResetPassword from "./pages/ResetPassword";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import LoginSignup from "./pages/SignupLogin";
import LandingNav from "./components/LandingNav";


export default function App() {
  return (
    <>
      <div className="bg-primary h-[100vh] flex justify-center items-center">
        <div className="bg-white h-[90vh] w-[95vw] rounded-lg overflow-hidden shadow-floating-deep border-none">
          <BrowserRouter>
            <LandingNav />
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="about" element={<About />} />
              <Route path="teams" element={<Teams />} />
              <Route path="contact" element={<Contact />} />
              <Route path="join" element={<LoginSignup />}>
                <Route index element={<Navigate replace to="login" />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="reset" element={<ResetPassword />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}
