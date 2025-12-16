import api from "../api";

export const updateUser = (payload) => {
  return api.put(`/users/${payload.id}`, payload);
};
