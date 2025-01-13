import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1>Some Navbar</h1>
      <Outlet />
    </>
  );
};

export default HomePage;
