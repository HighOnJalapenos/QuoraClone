import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SmallNavbar from "../components/SmallNavbar";
import { useSelector } from "react-redux";

export default function PrivateRouter() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
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
