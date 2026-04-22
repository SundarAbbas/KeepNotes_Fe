import api from "./api";

export const getStatuses = () => api.get("statuses/");
export const createStatus = (statusData) => api.post("statuses/", statusData);
export const updateStatus = (id, statusData) =>
  api.put(`statuses/${id}/`, statusData);
export const deleteStatus = (id) => api.delete(`statuses/${id}/`);
