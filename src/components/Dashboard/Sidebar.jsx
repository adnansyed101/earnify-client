import useGetUser from "../../hooks/useGetUser";
import AdminMenu from "./Menu/AdminMenu";
import BuyerMenu from "./Menu/BuyerMenu";
import WorkerMenu from "./Menu/WorkerMenu";

const Sidebar = () => {
  const { userDB } = useGetUser();
  const role = userDB?.role;

  return (
    <ul className="menu">
      {role === "Buyer" && <BuyerMenu />}
      {role === "Worker" && <WorkerMenu />}
      {role === "Admin" && <AdminMenu />}
    </ul>
  );
};

export default Sidebar;
