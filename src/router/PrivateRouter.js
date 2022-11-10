import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export const PrivateRouter = ({ children }) => {
  const isAu = useSelector((state) => state.account.isAuthention);
  return isAu ? children : <Navigate to="/sign-in"></Navigate>;
};
