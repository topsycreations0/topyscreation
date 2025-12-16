import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { auth } from "./firebase";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach ID token if user is signed in
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

