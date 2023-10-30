import axios from "axios";

export const api = axios.create({
  baseURL: "https://academics.newtonschool.co/api/v1/quora",
  headers: {
    projectID: "bf75w0rs1tml",
  },
});

export const getPostsPage = async (pageParam = 1, options = {}) => {
  const response = await api.get(`/post?page=${pageParam}&limit=10`, options);
  return response.data.data;
};
