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
import Categories from "./Pages/Categories";
import AddTask from "./Pages/AddTask";
import SignUp from "./Pages/SignUp";
import Tasks from "./Pages/Tasks";

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
              <Categories />
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
        <Route
          path="/tasks"
          element={
            <PrivateRoutes>
              <Tasks />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
