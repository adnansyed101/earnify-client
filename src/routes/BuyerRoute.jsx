import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import useGetUser from "../hooks/useGetUser";

const BuyerRoute = (props = {}) => {
  const { userDB, isLoading } = useGetUser();
  const { children } = props || {};

  if (isLoading) {
    return <Loading />;
  }

  if (userDB.role === "Buyer") {
    return children;
  }

  return <Navigate to="/dashboard" />;
};

export default BuyerRoute;
