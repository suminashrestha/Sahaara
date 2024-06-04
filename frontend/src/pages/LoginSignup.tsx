import SignLoginNav from "../components/SignLoginNav"
import { Outlet } from "react-router"

function LoginSignup() {
    return (
        <div className="w-[350px] h-[500px] bg-red-600 rounded-lg shadow-lg overflow-hidden">
            <SignLoginNav/>
            <Outlet/>
        </div>
    )
}

export default LoginSignup
