
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const token= localStorage.getItem("token")
    if (!token) {
        return <Navigate
        to={"/join"}
        state={{ from: location.pathname }}
        replace
      />

    }

    return <>{children}</>;
}

export default ProtectedRoute;
