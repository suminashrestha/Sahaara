import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Teams from "./pages/Teams";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import SignUp from "./components/Signup";
export default function App() {
  return (
    <>
    <div className="bg-gradient-to-r from-indigo-400 via-purple-500 to-purple-500 h-[100vh] flex justify-center items-center">
      <div className="bg-white h-[90vh] w-[95vw] rounded-lg overflow-hidden shadow-floating-deep border-none">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>}>
            < Route index element={<Login/>}/>
            < Route path="/login" element={<Login/>}/>
            < Route path="/signup" element={<SignUp/>}/>
          </Route>
          <Route path="/about" element={<About/>}/>
          <Route path="/teams" element={<Teams/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </BrowserRouter>
      </div>
    </div>
      
    </>
  );
}
