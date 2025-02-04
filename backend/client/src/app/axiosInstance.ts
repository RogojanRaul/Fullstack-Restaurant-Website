import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/", // https://api.demo.simplyeverything.com
});

export default axiosInstance;
