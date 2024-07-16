import { Navigate, useLocation } from "react-router-dom";

interface ProtectedProps {
  children: React.ReactNode;
}

const Protected = ({ children }: ProtectedProps) => {
  const token = localStorage.getItem("token");

  const location = useLocation();

  if (!token) {
    return <Navigate to="/join/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default Protected;
