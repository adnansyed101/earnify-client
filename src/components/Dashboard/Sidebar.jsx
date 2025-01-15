import BuyerMenu from "./Menu/BuyerMenu";
import WorkerMenu from "./Menu/WorkerMenu";

const Sidebar = () => {
  const role = "Buyer";

  return (
    <ul className="menu px-4 pt-20">
      {role === "Buyer" && <BuyerMenu />}
      {role === "Worker" && <WorkerMenu />}
    </ul>
  );
};

export default Sidebar;
