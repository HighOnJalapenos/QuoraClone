import axios from "axios";

export const api = axios.create({
  baseURL: "https://academics.newtonschool.co/api/v1/quora",
  headers: {
    projectID: "bf75w0rs1tml",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzhkYmIwNzgzMWY0NTA0NDc0MDE1MyIsImlhdCI6MTY5ODIyNTA3MiwiZXhwIjoxNzI5NzYxMDcyfQ.RtCUVC2clGdfJ5plyFM2rVbGWjItX1LTrXxiwvIjJ5A",
  },
});

export const getPostsPage = async (pageParam = 1, options = {}) => {
  const response = await api.get(`/post?page=${pageParam}&limit=10`, options);
  return response.data.data;
};

export const getSpacePostsPage = async (
  pageParam = 1,
  channelId,
  options = {}
) => {
  const response = await api.get(
    `/channel/${channelId}/posts?page=${pageParam}&limit=10`,
    options
  );
  return response.data.data;
};

export const setLike = async (postId, notify) => {
  try {
    await api.post(`/like/${postId}`);
    notify("Post liked!!");
    return true;
  } catch (error) {
    console.log(error);
    notify(`${error.response.data.message}`);
    return false;
  }
};

export const setDislike = async (postId, notify) => {
  try {
    await api.delete(`/like/${postId}`);
    notify("Post disliked.");
  } catch (error) {
    console.log(error);
    notify(`${error.response.data.message}`);
    return false;
  }
};
