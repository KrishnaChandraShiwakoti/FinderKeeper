import axios from "axios";
export const auth = axios.create({
  baseURL: "http://localhost:3000/api/auth",
});

export const items = axios.create({
  baseURL: "http://localhost:3000/api/item",
});
export const userApi = axios.create({
  baseURL: "http://localhost:3000/api/user",
});
