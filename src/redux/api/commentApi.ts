import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import { ICommentResponse } from "./types";

export const commentApi = createApi({
  reducerPath: "commentApi",
  tagTypes: ["Comment"],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    createComment: builder.mutation<
      ICommentResponse[],
      { id: string; data: FormData }
    >({
      query({ id, data }) {
        return {
          url: `item/comment/${id}`,
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
          url: `item/comment/${id}`,
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
