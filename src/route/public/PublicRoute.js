import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.accessToken;
  return !token ? <Outlet /> : <Navigate to={{ pathname: "/home" }} />;
}

export default PublicRoute;
