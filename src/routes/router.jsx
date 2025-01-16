import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import BuyerHome from "../pages/Dashboard/Buyer/BuyerHome";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../layout/Dashboard";
import AddTaskForm from "../pages/Dashboard/Buyer/AddTaskForm";
import MyTasks from "../pages/Dashboard/Buyer/MyTasks";
import TaskList from "../pages/Dashboard/Worker/TaskList";
import TaskDetails from "../pages/Dashboard/Worker/TaskDetails";
import MySubmissions from "../pages/Dashboard/Worker/MySubmission";

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
    element: <Dashboard />,
    children: [
      { index: true, element: <BuyerHome /> },
      { path: "addTask", element: <AddTaskForm /> },
      { path: "myTasks", element: <MyTasks /> },
      { path: "taskList", element: <TaskList /> },
      { path: "taskDetails/:id", element: <TaskDetails /> },
      { path: "mysubmission", element: <MySubmissions /> },
    ],
  },
]);

export default router;
