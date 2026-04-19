import api from "./api";

// Login
export const login = async (username, password) => {
  const response = await api.post("token/", { username, password });
  if (response.data.access) {
    localStorage.setItem("token", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    localStorage.setItem("user", username);
    return true;
  }
  return false;
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

// Checking IsAuthenticated
export const IsAuthenticated = () => {
  // return localStorage.getItem("token") !== null;
  return !!localStorage.getItem("token");
};
