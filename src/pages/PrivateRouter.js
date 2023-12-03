import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbars/Navbar";
import SmallNavbar from "../components/Navbars/SmallNavbar";
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
