import React, { useState, useEffect } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
} from "../Services/taskService";
import Sidebar from "../Components/Sidebar";
import UpdateStatusModal from "../Components/UpdateStatusModal";
import { Trash, Edit2 } from "lucide-react";
import { NavLink } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this task?")) {
      await deleteTask(id);
      loadTasks();
    }
  };

  const handleUpdateStatus = (task) => {
    setSelectedTask(task);
    setShowStatusModal(true);
  };

  const handleStatusUpdate = async () => {
    await loadTasks(); // Refresh the task list
  };

  if (loading) return <div className="text-center mt-10">Loading tasks...</div>;

  return (
    <>
      <Sidebar>
        <div className="dashboard">
          <div className="header flex items-center justify-center">
            <h1 className="text-4xl text-black font-extrabold text-center mb-10 flex items-center ">
              All Tasks
              <NavLink to="/addTasks" className="text-sm bg-blue-600 text-white ms-4 px-3 py-2 rounded-xl">Add New Task</NavLink>
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-10">
            {tasks.length === 0 && <p>No tasks yet. Create your first task!</p>}
            {tasks.map((task) => (
              <div
                key={task.id}
                className="task-card border rounded-lg lg:w-[20vw] w-[100%] p-5 shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl mb-2 font-semibold">{task.title}</h3>
                <p className="text-gray-600 mb-2">{task.description}</p>
                <div className="mb-2">
                  <span className="font-semibold">Status: </span>
                  <span
                    className={`px-2 py-1 rounded ${
                      task.status_name === "Completed"
                        ? "bg-green-100 text-green-800"
                        : task.status_name === "In Progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {task.status_name || task.status}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Priority: </span>
                  <span>{task.priority_name || task.priority}</span>
                </div>
                <small className="block text-gray-500 mb-4">
                  Due: {task.date}
                </small>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(task)}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50"
                    title="Update Status"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50"
                    title="Delete Task"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Sidebar>

      {showStatusModal && (
        <UpdateStatusModal
          task={selectedTask}
          onClose={() => setShowStatusModal(false)}
          onUpdate={handleStatusUpdate}
        />
      )}
    </>
  );
}

export default Dashboard;
