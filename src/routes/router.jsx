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
      { path: "addTask", element: <AddTaskForm /> },
      { path: "myTasks", element: <MyTasks /> },
      { path: "tasklist", element: <TaskList /> },
      { path: "task/update/:id", element: <UpdateTaskForm /> },
      { path: "taskDetails/:id", element: <TaskDetails /> },
      { path: "mysubmission", element: <MySubmissions /> },
      { path: "purchaseCoin", element: <PurchaseCoin /> },
      { path: "paymentHistory", element: <PaymentHistory /> },
    ],
  },
]);

export default router;
