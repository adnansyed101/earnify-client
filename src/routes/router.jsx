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
      { path: "tasklist", element: <TaskList /> },
      { path: "mysubmission", element: <MySubmissions /> },
      { path: "withdrawals", element: <WithdrawalForm /> },
      { path: "taskDetails/:id", element: <TaskDetails /> },
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
      // Admin Routes
      {
        path: "paymentHistory",
        element: (
          <AdminRoute>
            <PaymentHistory />
          </AdminRoute>
        ),
      },
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
