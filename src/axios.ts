import axios from "axios";

const http = axios.create({
  baseURL: "/api",
  headers: {
    token: localStorage.getItem("token"),
  },
});

http.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    console.log(err);
  }
);

export default http;
