import React, { FC } from "react";
import FullScreenLoader from "../components/FullScreenLoader";
import { userApi } from "../redux/api/userApi";
import { useAppSelector } from "../redux/store";

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: FC<IAuthMiddleware> = ({ children }) => {
  const loggedIn = useAppSelector((state) => state.userState.user);

  const { isLoading } = userApi.endpoints.getMe.useQuery(null, {
    skip: !loggedIn
  });

  console.log("From middleware: ", loggedIn);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return children;
};

export default AuthMiddleware;
