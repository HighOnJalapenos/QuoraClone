import axios from "axios";

export const api = axios.create({
  baseURL: "https://academics.newtonschool.co/api/v1/quora",
  headers: {
    projectID: "bf75w0rs1tml",
  },
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authApi = axios.create({
  baseURL: "https://academics.newtonschool.co/api/v1/user",
  headers: {
    projectID: "bf75w0rs1tml",
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
