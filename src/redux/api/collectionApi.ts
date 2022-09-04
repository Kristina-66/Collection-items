import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import { ICollectionResponse } from "./types";

export const collectionApi = createApi({
  reducerPath: "collectionApi",
  tagTypes: ["Collection"],
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    createCollection: builder.mutation<ICollectionResponse, FormData>({
      query(collection) {
        return {
          url: "collection",
          method: "POST",
          credentials: "include",
          body: collection,
        };
      },
      invalidatesTags: [{ type: "Collection", id: "LIST" }],
      transformResponse: (result: {
        data: { collection: ICollectionResponse };
      }) => result.data.collection,
    }),
    updateCollection: builder.mutation<
      ICollectionResponse,
      { id: string; collection: FormData }
    >({
      query({ id, collection }) {
        return {
          url: `collection/update`,
          method: "PATCH",
          credentials: "include",
          body: collection,
        };
      },
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Collection", id },
              { type: "Collection", id: "LIST" },
            ]
          : [{ type: "Collection", id: "LIST" }],
      transformResponse: (response: {
        data: { collection: ICollectionResponse };
      }) => response.data.collection,
    }),
    getCollection: builder.query<ICollectionResponse, string>({
      query(id) {
        return {
          url: `collection/${id}`,
          credentials: "include",
        };
      },
      providesTags: (result, error, id) => [{ type: "Collection", id }],
    }),
    getAllCollectionsForUser: builder.query<ICollectionResponse[], void>({
      query() {
        return {
          url: `collection`,
          credentials: "include",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Collection" as const,
                _id,
              })),
              { type: "Collection", id: "LIST" },
            ]
          : [{ type: "Collection", id: "LIST" }],
      transformResponse: (results: {
        data: { collections: ICollectionResponse[] };
      }) => results.data.collections,
    }),
    getAllCollections: builder.query<ICollectionResponse[], void>({
      query() {
        return {
          url: `collection/all`,
          credentials: "include",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: "Collection" as const,
                _id,
              })),
              { type: "Collection", id: "LIST" },
            ]
          : [{ type: "Collection", id: "LIST" }],
      transformResponse: (results: {
        data: { collections: ICollectionResponse[] };
      }) => results.data.collections,
    }),
    deleteCollection: builder.mutation<ICollectionResponse, string>({
      query(id) {
        return {
          url: `collection`,
          method: "Delete",
          credentials: "include",
          body: [id],
        };
      },
      invalidatesTags: [{ type: "Collection", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateCollectionMutation,
  useDeleteCollectionMutation,
  useUpdateCollectionMutation,
  useGetAllCollectionsForUserQuery,
  useGetAllCollectionsQuery,
} = collectionApi;
