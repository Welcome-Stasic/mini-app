import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { RouteName } from "./routes";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedUser = ({ children }: ProtectedRouteProps) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to={RouteName.LOGIN} replace />;
  }

  return <>{children}</>;
};
