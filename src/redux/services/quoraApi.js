import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quoraApi = createApi({
  reducerPath: "quoraApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://academics.newtonschool.co/api/v1/quora",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user.token;
      headers.set("projectID", "bf75w0rs1tml");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPostById: builder.query({
      query: (postId) => `/post/${postId}`,
    }),
    getCommentsById: builder.query({
      query: (postId) => `/post/${postId}/comments`,
    }),
    getUserById: builder.query({
      query: (userId) => `/user/${userId}`,
    }),
    getSpaces: builder.query({
      query: () => `/channel?limit=10&page=1`,
    }),
    getSpacesById: builder.query({
      query: (spaceId) => `/channel/${spaceId}`,
    }),
    getSpacesPostById: builder.query({
      query: (spaceId) => `/channel/${spaceId}/posts`,
    }),
    getUserPost: builder.query({
      query: (userId) => `/user/${userId}/posts`,
    }),
    getSearchPost: builder.query({
      query: (term) =>
        `/post?search=${encodeURIComponent(JSON.stringify({ title: term }))}`,
    }),
  }),
});

export const {
  useGetPostByIdQuery,
  useGetCommentsByIdQuery,
  useGetUserByIdQuery,
  useGetSpacesQuery,
  useGetSpacesByIdQuery,
  useGetSpacesPostByIdQuery,
  useGetUserPostQuery,
  useGetSearchPostQuery,
} = quoraApi;
