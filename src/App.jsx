import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Router,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import { IsAuthenticated } from "./Services/authService";
import Status from "./Pages/Status";
import AddStatus from "./Pages/AddStatus";
import Priority from "./Pages/Priority";
import AddPriority from "./Pages/AddPriority";
import AddTask from "./Pages/AddTask";
import SignUp from "./Pages/SignUp";

function PrivateRoutes({ children }) {
  const authenticated = IsAuthenticated();
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />
        <Route
          path="/statuses"
          element={
            <PrivateRoutes>
              <Status />
            </PrivateRoutes>
          }
        />
        <Route
          path="/addStatus"
          element={
            <PrivateRoutes>
              <AddStatus />
            </PrivateRoutes>
          }
        />
        <Route
          path="/priorities"
          element={
            <PrivateRoutes>
              <Priority />
            </PrivateRoutes>
          }
        />
        <Route
          path="/addPriority"
          element={
            <PrivateRoutes>
              <AddPriority />
            </PrivateRoutes>
          }
        />
        <Route
          path="/addTasks"
          element={
            <PrivateRoutes>
              <AddTask />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
