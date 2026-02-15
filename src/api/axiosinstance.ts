import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 1500,
});

export default api;
