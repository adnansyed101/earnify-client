import Stats from "../../../components/Dashboard/Buyer/Stats";
import TasksToReviewTable from "../../../components/Dashboard/Buyer/TasksToReviewTable";

const BuyerHome = () => {
  return (
    <div className="mt-12">
      <h1 className="text-2xl font-bold mb-2">Overview</h1>
      <Stats />
      <h1 className="text-2xl font-bold mb-2">Task to Review</h1>
      <TasksToReviewTable />
    </div>
  );
};

export default BuyerHome;
