import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import useGetUser from "../hooks/useGetUser";

const WorkerRoute = (props = {}) => {
  const { userDB, isLoading } = useGetUser();

  const { children } = props || {};

  if (isLoading) {
    return <Loading />;
  }

  if (userDB.role === "Worker") {
    return children;
  }

  return <Navigate to="/dashboard" />;
};

export default WorkerRoute;
