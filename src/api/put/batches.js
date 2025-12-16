import api from "../api";

export const updateBatch = (payload) => {
  return api.put(`/batches/${payload.code}`, payload);
};
