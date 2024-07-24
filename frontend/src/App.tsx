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
import CreateAdoptionPost from "./pages/CreateAdoptionPost";
import Donation from "./pages/Donation";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import ProtectedRoute from "./pages/ProtectedRoute";
import RescueForm from "./components/RescuePost/RescueForm";
import ViewRescuePost from "./components/RescuePost/ViewRescuePost";

import ViewAdoptionPost from "./pages/ViewAdoptionPost";
import { Provider } from "react-redux";
import store from "./redux/store";
import SingleAdoptionPost from "./components/AdoptionPost/SingleAdoptionPost";
import AdoptionLanding from "./pages/AdoptionLanding";
import SingleRescuePost from "./components/RescuePost/SingleRescuePost";

import CreateVolunteer from "./pages/CreateVolunteer";
import ViewVolunteer from "./pages/ViewVolunteer";
import Profile from "./pages/Profile/Profile";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <ToastContainer
          autoClose={700}
          position="top-right"
          stacked
          limit={3}
          draggable
          hideProgressBar
          theme="dark"
        />
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
            <Route path="profile" element={<Landing />}>
              <Route index element={<Navigate to="rescue" />} />
              <Route path="rescue" element={<ViewRescuePost />} />
              <Route path="createrescue" element={<RescueForm />} />
              <Route path=":id" element={<SingleRescuePost />} />
            </Route>

            <Route
              path="createadoption"
              element={
                <ProtectedRoute>
                  <CreateAdoptionPost />
                </ProtectedRoute>
              }
            />
            <Route
              path="viewadoption"
              element={
                <ProtectedRoute>
                  <ViewAdoptionPost />
                </ProtectedRoute>
              }
            />
            <Route
              path="userprofile/:userId"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route />

            <Route
              path="viewadoption/:id"
              element={
                <ProtectedRoute>
                  <SingleAdoptionPost />
                </ProtectedRoute>
              }
            />

            <Route
              path="createvolunteer"
              element={
                <ProtectedRoute>
                  <CreateVolunteer />
                </ProtectedRoute>
              }
            />

            <Route
              path="viewvolunteer"
              element={
                <ProtectedRoute>
                  <ViewVolunteer />
                </ProtectedRoute>
              }
            />

            <Route
              path="adoption"
              element={
                <ProtectedRoute>
                  <AdoptionLanding />
                </ProtectedRoute>
              }
            />

            <Route path="join" element={<LoginSignup />}>
              <Route index element={<Navigate replace to="login" />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}
