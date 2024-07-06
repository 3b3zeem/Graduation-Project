import axios from "axios";

const Register = (
  firstName,
  lastName,
  userName,
  country,
  city,
  address,
  password,
  email
) => {
  return axios
    .post(
      "https://localhost:7120/api/User/register",
      {
        userName,
        firstName,
        lastName,
        country,
        city,
        address,
        password,
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      if (response.data.token) {
        sessionStorage.setItem("User", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const Login = (email, password) => {
  return axios
    .post(
      "https://localhost:7120/api/User/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      if (response.data.token) {
        sessionStorage.setItem("User", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const Logout = () => {
  sessionStorage.removeItem("User");
  localStorage.removeItem("clickedAds");
};

const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem("User"));
};

const authService = {
  Register,
  Login,
  Logout,
  getCurrentUser,
};

export default authService;
