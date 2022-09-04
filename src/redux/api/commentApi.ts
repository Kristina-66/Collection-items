import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICommentResponse } from "./types";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const commentApi = createApi({
  reducerPath: "commentApi",
  tagTypes: ["Comment"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}api/item/comment`,
  }),
  endpoints: (builder) => ({
    createComment: builder.mutation<
      ICommentResponse[],
      { id: string; data: FormData }
    >({
      query({ id, data }) {
        return {
          url: `/${id}`,
          method: "POST",
          credentials: "include",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
      transformResponse: (result: {
        data: { item: { comments: ICommentResponse[] } };
      }) => result.data.item.comments,
    }),
    deleteComment: builder.mutation<ICommentResponse, string>({
      query(id) {
        return {
          url: `/${id}`,
          method: "Delete",
          credentials: "include",
          body: [id],
        };
      },
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
    }),
  }),
});

export const { useCreateCommentMutation, useDeleteCommentMutation } =
  commentApi;
