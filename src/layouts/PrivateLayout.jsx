import { Outlet } from "react-router-dom";
import AppNavbar from "../components/common/AppNavbar";

const PrivateLayout = () => {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
};

export default PrivateLayout;