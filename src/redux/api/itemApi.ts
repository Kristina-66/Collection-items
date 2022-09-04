import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IItemResponse, ILike } from "./types";

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string;

export const itemApi = createApi({
  reducerPath: "itemApi",
  tagTypes: ["Item"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}api/item`,
  }),
  endpoints: (builder) => ({
    createItem: builder.mutation<IItemResponse, FormData>({
      query(item) {
        return {
          url: "",
          method: "POST",
          credentials: "include",
          body: item,
        };
      },
      invalidatesTags: [{ type: "Item", id: "LIST" }],
      transformResponse: (result: { data: { item: IItemResponse } }) =>
        result.data.item,
    }),
    updateItem: builder.mutation<IItemResponse, { id: string; item: FormData }>(
      {
        query({ id, item }) {
          return {
            url: `/${id}`,
            method: "PATCH",
            credentials: "include",
            body: item,
          };
        },
        invalidatesTags: (result, error, { id }) =>
          result
            ? [
                { type: "Item", id },
                { type: "Item", id: "LIST" },
              ]
            : [{ type: "Item", id: "LIST" }],
        transformResponse: (response: { data: { item: IItemResponse } }) =>
          response.data.item,
      }
    ),
    getItem: builder.query<IItemResponse, string>({
      query(id) {
        return {
          url: `/${id}`,
          credentials: "include",
        };
      },
      providesTags: (result, error, id) => [{ type: "Item", id }],
    }),
    getAllItemsInCollection: builder.query<IItemResponse[], string>({
      query(id) {
        return {
          url: `/${id}`,
          credentials: "include",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Item" as const,
                _id,
              })),
              { type: "Item", id: "LIST" },
            ]
          : [{ type: "Item", id: "LIST" }],
      transformResponse: (results: { data: { items: IItemResponse[] } }) =>
        results.data.items,
    }),
    getAllItems: builder.query<IItemResponse[], void>({
      query() {
        return {
          url: `/all`,
          credentials: "include",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Item" as const,
                _id,
              })),
              { type: "Item", id: "LIST" },
            ]
          : [{ type: "Item", id: "LIST" }],
      transformResponse: (results: { data: { items: IItemResponse[] } }) =>
        results.data.items,
    }),

    deleteItem: builder.mutation<IItemResponse, string>({
      query(id) {
        return {
          url: ``,
          method: "Delete",
          credentials: "include",
          body: [id],
        };
      },
      invalidatesTags: [{ type: "Item", id: "LIST" }],
    }),
    likeItem: builder.mutation<ILike[], string>({
      query(id) {
        return {
          url: `/${id}/like`,
          method: "PUT",
          credentials: "include",
        };
      },
      transformResponse: (result: { data: { like: ILike[] } }) =>
        result.data.like,
    }),
  }),
});

export const {
  useCreateItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
  useGetAllItemsInCollectionQuery,
  useGetAllItemsQuery,
  useLikeItemMutation,
} = itemApi;
