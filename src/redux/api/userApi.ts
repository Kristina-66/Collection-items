import { createApi } from "@reduxjs/toolkit/query/react";

import { setUser, setUsers, logout } from "../features/userSlise";
import { RootState } from "../store";
import customFetchBase from "./customFetchBase";
import { IUser } from "./types";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["Users"],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getMe: builder.query<IUser, null>({
      query() {
        return {
          url: "users/me",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: { user: IUser } }) =>
        result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    getAllUsers: builder.query<IUser[], []>({
      query() {
        return {
          url: "users",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: { users: IUser[] } }) =>
        result.data.users,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Users", _id } as const)),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUsers(data));
        } catch (error: any) {
          if (error.error.status === 401) {
            dispatch(logout());
          }
        }
      },
    }),

    deleteUser: builder.mutation<
      { acknowledged: boolean; deletedCount: number },
      { id: string[] }
    >({
      query(data) {
        return {
          url: "users",
          method: "DELETE",
          body: data,
          credentials: "include",
        };
      },
      transformResponse: (result: {
        data: { users: { acknowledged: boolean; deletedCount: number } };
      }) => result.data.users,
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          const id = (getState() as RootState).userState?.user?._id;
          const { data } = await queryFulfilled;
          if (
            args.id.some((deletedId) => deletedId === id) &&
            data.deletedCount >= 1
          ) {
            dispatch(logout());
          }
        } catch (error) {}
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    updateStatus: builder.mutation<
      {
        acknowledged: boolean;
        modifiedCount: number;
        upsertedId: null;
        upsertedCount: number;
        matchedCount: number;
      },
      { id: string[]; status: string }
    >({
      query(data) {
        return {
          url: "users/status",
          method: "PATCH",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    updateRole: builder.mutation<
      {
        acknowledged: boolean;
        modifiedCount: number;
        upsertedId: null;
        upsertedCount: number;
        matchedCount: number;
      },
      { id: string[]; role: string }
    >({
      query(data) {
        return {
          url: "users/role",
          method: "PATCH",
          body: data,
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetMeQuery,
  useDeleteUserMutation,
  useUpdateStatusMutation,
  useUpdateRoleMutation,
} = userApi;
