import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quoraApi = createApi({
  reducerPath: "quoraApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://academics.newtonschool.co/api/v1/quora",
    prepareHeaders: (headers) => {
      headers.set("projectID", "bf75w0rs1tml");
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzhkYmIwNzgzMWY0NTA0NDc0MDE1MyIsImlhdCI6MTY5ODIyNTA3MiwiZXhwIjoxNzI5NzYxMDcyfQ.RtCUVC2clGdfJ5plyFM2rVbGWjItX1LTrXxiwvIjJ5A"
      );
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
  }),
});

export const {
  useGetPostByIdQuery,
  useGetCommentsByIdQuery,
  useGetUserByIdQuery,
} = quoraApi;
