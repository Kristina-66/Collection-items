import React from "react";

import FullScreenLoader from "../components/FullScreenLoader";
import { userApi } from "../redux/api/userApi";
import { useAppSelector } from "../redux/store";

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const user = useAppSelector((state) => state.userState.user);

  const { isLoading } = userApi.endpoints.getMe.useQuery(null, {
    skip: !user,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return children;
};

export default AuthMiddleware;
