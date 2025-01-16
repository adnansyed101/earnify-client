import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";

const PrivateRoute = (props = {}) => {
  const { user, loading } = useAuth();
  const { children } = props || {};

  if (loading) {
    return <Loading />;
  }

  if (user && user?.email) {
    return children;
  }

  return <Navigate to="/signin" />;
};

export default PrivateRoute;
