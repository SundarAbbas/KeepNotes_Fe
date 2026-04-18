import api from "./api";

export const getTasks = () => api.get("tasks/");
export const createTask = (taskData) => api.post("tasks/", taskData);
export const updateTasks = (id, taskData) => api.put(`tasks/${id}`, taskData);
export const deleteTask = (id) => api.delete(`tasks/${id}/`);
