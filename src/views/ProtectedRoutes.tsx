import { Navigate, Outlet } from "react-router-dom";
import { useFirebaseContext } from "@/hooks";

export const ProtectedRoutes = () => {
  const { user } = useFirebaseContext();

  return user ? <Outlet /> : <Navigate to="/sign-in" />;
};
