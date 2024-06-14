import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import ResetPassword from "./pages/ResetPassword";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import LoginSignup from "./pages/SignupLogin";
import LandingNav from "./components/LandingNav";
import PageNotFound from "./pages/PageNotFound";


export default function App() {
  return (
    <>
      <div className="bg-primary h-[100vh] flex justify-center items-center">
        <div className="bg-white h-[90vh] w-[95vw] rounded-lg overflow-hidden shadow-floating-deep border-none">
          <BrowserRouter>
            <LandingNav />
            <Routes>
              <Route path="/" element={<Homepage />}/>
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="join" element={<LoginSignup />}>
                <Route index element={<Navigate replace to="login" />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="reset" element={<ResetPassword />} />
              </Route>
              <Route path="*" element={<PageNotFound/>}/>
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}
