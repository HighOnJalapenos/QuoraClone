import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SmallNavbar from "../components/SmallNavbar";

export default function PrivateRouter() {
  let isAuthenticated = true;
  if (isAuthenticated) {
    return (
      <>
        <Navbar />
        <SmallNavbar />
        <Outlet />
      </>
    );
  } else {
    return <Navigate to={`/login`} />;
  }
}
