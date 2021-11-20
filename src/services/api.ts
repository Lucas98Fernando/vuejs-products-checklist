import { getLocalToken } from "@/helpers/storage";
import axios from "axios";

const token = getLocalToken()?.toString();

const api = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
});

api.defaults.headers.common = { Authorization: `Bearer ${token}` };

export default api;
