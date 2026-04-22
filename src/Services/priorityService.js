import api from "./api";

export const getPriorities = () => api.get("priorities/");
export const createPriority = (priorityData) =>
  api.post("priorities/", priorityData);
export const updatePriority = (id, priorityData) =>
  api.put(`priorities/${id}/`, priorityData);
export const deletePriority = (id) => api.delete(`priorities/${id}/`);
