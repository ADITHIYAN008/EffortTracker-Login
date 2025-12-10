import api from "../api";

export const validateToken = () => {
  return api.get("/auth/validate");
};
