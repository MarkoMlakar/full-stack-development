import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = localStorage.getItem("token");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const UserData = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/users/${id}`);
    return response;
  } catch (err) {
    return err.response;
  }
};
