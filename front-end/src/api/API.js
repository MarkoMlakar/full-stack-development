import axios from "axios";

// Create an axios instance for auth
export const PublicAxios = axios.create({
  baseURL: "http://localhost:8000",
});

// Create an axios instance for user
export const PrivateAxios = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

// Create an axios instance for unsplash
export const UnsplashAxios = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: process.env.REACT_APP_UNSPLASH_API,
  },
});
