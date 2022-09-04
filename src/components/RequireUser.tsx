import { useCookies } from "react-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { Cookie } from "@mui/icons-material";
import { userApi } from "../redux/api/userApi";
import { useAppSelector } from "../redux/store";

import FullScreenLoader from "./FullScreenLoader";

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const loggedUser = useAppSelector((state) => state.userState.user);
  const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const loading = isLoading || isFetching;

  const user = userApi.endpoints.getMe.useQueryState(null);
  console.log(user);

  const location = useLocation();

  if (loading) {
    return <FullScreenLoader />;
  }

  return user.isSuccess &&
    (loggedUser || user.data) &&
    allowedRoles.includes(loggedUser?.role as string) ? (
    <Outlet />
  ) : loggedUser && user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireUser;
