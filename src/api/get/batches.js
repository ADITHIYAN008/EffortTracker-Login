import api from "../api";

export const getBatches = () => {
  return api.get("/batches");
};
