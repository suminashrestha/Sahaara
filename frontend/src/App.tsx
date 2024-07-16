import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import ResetPassword from "./pages/ResetPassword";
import Contact from "./pages/Contact";
import LoginSignup from "./pages/SignupLogin";
import OTPverificationPage from "./pages/OTPverificationPage";
import Landing from "./pages/Landing";

import Login from "./components/Login";
import SignUp from "./components/Signup";
import PageNotFound from "./pages/PageNotFound";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Landing";
import CreateAdoptionPost from "./pages/CreateAdoptionPost";
import Donation from "./pages/Donation";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import RescueForm from "./components/RescuePost/RescueForm";
import ViewRescuePost from "./components/RescuePost/ViewRescuePost";

export default function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer position="top-right" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
            <Route path="donate" element={<Donation />} />
            <Route
              path="otpverify/:username"
              element={<OTPverificationPage />}
            />
            <Route path="reset" element={<ResetPassword />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Landing />
                </ProtectedRoute>
              }
            >
                <Route index element={<Navigate to="rescue"/>}/>
                <Route path="rescue" element={<ViewRescuePost/>}/>
                <Route path="createrescue" element={<RescueForm/>}/>
            </Route>
            <Route path="join" element={<LoginSignup />}>
              <Route index element={<Navigate replace to="login" />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
