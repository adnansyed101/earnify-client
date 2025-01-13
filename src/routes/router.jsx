import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Home from "../layout/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [{ index: true, element: <Home /> }],
  },
]);

export default router;
