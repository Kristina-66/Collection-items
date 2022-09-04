import { createApi } from "@reduxjs/toolkit/query/react";

import { logout } from "../features/userSlise";
import { userApi } from "./userApi";
import { IGenericResponse } from "./types";
import { LoginInput } from "../../pages/login.page";
import { RegisterInput } from "../../pages/register.page";
import customFetchBase from "./customFetchBase";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    registerUser: builder.mutation<IGenericResponse, RegisterInput>({
      query(data) {
        return {
          url: "auth/register",
          method: "POST",
          body: data,
        };
      },
    }),
    loginUser: builder.mutation<
      { access_token: string; status: string },
      LoginInput
    >({
      query(data) {
        return {
          url: "auth/login",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {}
      },
    }),

    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: "auth/logout",
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
} = authApi;
