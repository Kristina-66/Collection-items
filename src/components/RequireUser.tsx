import { Cookie } from "@mui/icons-material";
import { useCookies } from "react-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { userApi } from "../redux/api/userApi";
import { useAppSelector } from "../redux/store";

import FullScreenLoader from "./FullScreenLoader";

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["logged_in"]);
  console.log(cookies);
  const logged_in = cookies.logged_in;

  // const { data: user } = userApi.endpoints.getMe.useQuery(null, {
  //   skip: !logged_in,
  // });
  const user = useAppSelector((state) => state.userState.user);

  const location = useLocation();

  if (logged_in && !user) {
    return <FullScreenLoader />;
  }

  return logged_in && allowedRoles.includes(user?.role as string) ? (
    <Outlet />
  ) : logged_in && user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireUser;
