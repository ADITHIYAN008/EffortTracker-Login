import api from "../api";

export const createBatch = (payload) => {
  return api.post("/batches", payload);
};
