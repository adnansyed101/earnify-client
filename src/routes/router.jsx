import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../layout/Dashboard";
import AddTaskForm from "../pages/Dashboard/Buyer/AddTaskForm";
import MyTasks from "../pages/Dashboard/Buyer/MyTasks";
import TaskList from "../pages/Dashboard/Worker/TaskList";
import TaskDetails from "../pages/Dashboard/Worker/TaskDetails";
import MySubmissions from "../pages/Dashboard/Worker/MySubmission";
import PrivateRoute from "./PrivateRoute";
import UpdateTaskForm from "../pages/Dashboard/Buyer/UpdateTaskForm";
import PurchaseCoin from "../pages/Dashboard/Buyer/PurchaseCoin";
import PaymentHistory from "../pages/Dashboard/Buyer/PaymentHistory";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import WithdrawalForm from "../pages/Dashboard/Worker/WithDrawalForm";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Error from "../pages/Error";
import BuyerRoute from "./BuyerRoute";
import AdminRoute from "./AdminRoute";
import WorkerRoute from "./WorkerRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { index: true, element: <Home /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      // Worker Routes
      {
        path: "tasklist",
        element: (
          <WorkerRoute>
            <TaskList />
          </WorkerRoute>
        ),
      },
      {
        path: "mysubmission",
        element: (
          <WorkerRoute>
            <MySubmissions />
          </WorkerRoute>
        ),
      },
      {
        path: "withdrawals",
        element: (
          <WorkerRoute>
            <WithdrawalForm />
          </WorkerRoute>
        ),
      },
      {
        path: "taskDetails/:id",
        element: (
          <WorkerRoute>
            <TaskDetails />
          </WorkerRoute>
        ),
      },
      // Buyer Routes
      {
        path: "addTask",
        element: (
          <BuyerRoute>
            <AddTaskForm />
          </BuyerRoute>
        ),
      },
      {
        path: "myTasks",
        element: (
          <BuyerRoute>
            <MyTasks />
          </BuyerRoute>
        ),
      },
      {
        path: "task/update/:id",
        element: (
          <BuyerRoute>
            <UpdateTaskForm />
          </BuyerRoute>
        ),
      },
      {
        path: "purchaseCoin",
        element: (
          <BuyerRoute>
            <PurchaseCoin />
          </BuyerRoute>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <BuyerRoute>
            <PaymentHistory />
          </BuyerRoute>
        ),
      },
      // Admin Routes
      {
        path: "manageusers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
