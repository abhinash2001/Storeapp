import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 10000,
});

// attach access token
API.interceptors.request.use((config) => {
  const access = localStorage.getItem("access");
  if (access) config.headers.Authorization = `Bearer ${access}`;
  return config;
});

// refresh once on 401
API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = localStorage.getItem("refresh");
      if (!refresh) throw error;
      const tokenRes = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh });
      localStorage.setItem("access", tokenRes.data.access);
      original.headers.Authorization = `Bearer ${tokenRes.data.access}`;
      return API(original);
    }
    throw error;
  }
);

export default API;
