import Loading from "../../components/Loading";
import useGetUser from "../../hooks/useGetUser";
import AdminHome from "../Dashboard/Admin/AdminHome";
import BuyerHome from "../Dashboard/Buyer/BuyerHome";
import WorkerHome from "../Dashboard/Worker/WorkerHome";

const DashboardHome = () => {
  const { userDB, isLoading } = useGetUser();
  const role = userDB?.role;

  if (isLoading) return <Loading />;

  return (
    <>
      {role === "Buyer" && <BuyerHome />}
      {role === "Worker" && <WorkerHome />}
      {role === "Admin" && <AdminHome />}
    </>
  );
};

export default DashboardHome;