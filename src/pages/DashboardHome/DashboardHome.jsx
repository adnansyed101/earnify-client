import Loading from "../../components/Loading";
import useGetUser from "../../hooks/useGetUser";
import BuyerHome from "../Dashboard/Buyer/BuyerHome";
import WorkerHome from "../Dashboard/Worker/WorkerHome";

const DashboardHome = () => {
  const { userDB, isLoading } = useGetUser();

  if (isLoading) return <Loading />;

  return (
    <>
      {userDB?.role === "Buyer" && <BuyerHome />}
      {userDB?.role === "Worker" && <WorkerHome />}
    </>
  );
};

export default DashboardHome;
