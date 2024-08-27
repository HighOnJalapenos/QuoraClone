import axios from "axios";

const register = (name, email, password, appType) => {
  return axios
    .post(
      "https://academics.newtonschool.co/api/v1/user/signup",
      {
        name,
        email,
        password,
        appType,
      },
      {
        headers: {
          projectID: "bf75w0rs1tml",
        },
      }
    )
    .then((response) => {
      console.log(response);
      if (response.data.token) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            userId: response.data.data.user._id,
            token: response.data.token,
            name: response.data.data.user.name,
          })
        );
      }

      return response.data;
    });
};

const login = (email, password, appType) => {
  return axios
    .post(
      "https://academics.newtonschool.co/api/v1/user/login",
      {
        email,
        password,
        appType,
      },
      {
        headers: {
          projectID: "bf75w0rs1tml",
        },
      }
    )
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            userId: response.data.user.data._id,
            token: response.data.token,
            name: response.data.data.user.name,
          })
        );
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
