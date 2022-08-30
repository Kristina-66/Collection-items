import { Cookie } from "@mui/icons-material";
import { useCookies } from "react-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { userApi } from "../redux/api/userApi";
import { useAppSelector } from "../redux/store";

import FullScreenLoader from "./FullScreenLoader";

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const user = useAppSelector((state) => state.userState.user);

  const { data: loggedUser } = userApi.endpoints.getMe.useQuery(null, {
    skip: !user,
  });

  const location = useLocation();

  if (user && !loggedUser) {
    return <FullScreenLoader />;
  }

  return user && allowedRoles.includes(user?.role as string) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireUser;
