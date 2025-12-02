import api from "./api";

export const login = (username, password) => {
  return api.post("/auth/login", { username, password });
};
