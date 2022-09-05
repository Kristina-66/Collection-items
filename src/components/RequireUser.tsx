import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userApi } from "../redux/api/userApi";
import { useAppSelector } from "../redux/store";
import FullScreenLoader from "./FullScreenLoader";

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const loggedIn = useAppSelector((state) => state.userState.user);
  const location = useLocation();

  const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const loading = isLoading || isFetching;

  const user = userApi.endpoints.getMe.useQueryState(null).data;

  if (loading) {
    return <FullScreenLoader />;
  }

  return (loggedIn || user) &&
    allowedRoles.includes(user?.role as string) ? (
    <Outlet />
  ) : loggedIn && user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireUser;
