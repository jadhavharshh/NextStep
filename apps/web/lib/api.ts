import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
});

export const healthCheck = async () => {
  const response = await api.get("/health");
  return response.data;
};

export default api;
