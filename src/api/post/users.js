import api from "../api";

export const createUser = (payload) => {
  return api.post("/users", payload);
};

export const bulkUploadUsers = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/users/bulk-upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
