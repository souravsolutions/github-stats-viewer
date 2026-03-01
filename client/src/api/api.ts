import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});
