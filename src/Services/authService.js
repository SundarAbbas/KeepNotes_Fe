import api from "./api";

// Login
export const login = async (username, password) => {
  const response = await api.post("token/", { username, password });
  if (response.data.access) {
    localStorage.setItem("token", response.data.access);
    return true;
  }
  return false;
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

// Checking IsAuthenticated
export const IsAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};
