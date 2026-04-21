import React, { useState, useEffect } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
} from "../Services/taskService";
import Sidebar from "../Components/Sidebar";
import UpdateStatusModal from "../Components/UpdateStatusModal";
import { Trash, Edit2, Eye, X, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [detailedTask, setDetailedTask] = useState(null);
  const [showDetailedModalMobile, setShowDetailedModalMobile] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await getTasks();
      const fetchedTasks = response.data;
      setTasks(fetchedTasks);
      if (fetchedTasks.length > 0) {
        setDetailedTask(fetchedTasks[0]);
      }
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

  // if (loading) return <div className="text-center mt-10">Loading tasks...</div>;

  return (
    <>
      <Sidebar>
        <div className="dashboard">
          <div className="flex flex-wrap items-start justify-start gap-10">
            <div className="flex flex-wrap items-center border-1 rounded-xl border-gray-400 p-10 justify-center gap-5 w-[100%] lg:w-[50%]">
              <div className="w-full flex items-center justify-between">
                <h1 className="border-b-2  border-blue-500 text-lg text-black font-extrabold text-center  flex items-center ">
                  My Tasks
                </h1>

                <NavLink
                  to="/addTasks"
                  className="font-extrabold text-sm  text-blue-600  rounded-xl"
                >
                  <Plus />
                </NavLink>
              </div>
              {tasks.length === 0 && (
                <p>No tasks yet. Create your first task!</p>
              )}
              {tasks
                // .filter((task) => task.priority_name === "Extreme")
                .map((task) => (
                  <div
                    key={task.id}
                    className={`task-card border rounded-lg  border-gray-400 lg:w-[100%]  w-[100%] p-5 shadow-md hover:shadow-lg transition-shadow ${detailedTask?.id === task.id ? "bg-gray-100  " : ""}`}
                    onClick={() => setDetailedTask(task)}
                  >
                    <h3 className="text-2xl mb-2 font-semibold">
                      {task.title.slice(0, 30)}
                    </h3>
                    {/* <p className="text-gray-600 mb-2">{task.description}</p> */}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateStatus(task);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50"
                        title="Update Status"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(task.id);
                        }}
                        className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50"
                        title="Delete Task"
                      >
                        <Trash size={18} />
                      </button>
                      <button
                        className="text-green block lg:hidden bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
                        type="button"
                        onClick={(e) => {
                          setShowDetailedModalMobile(true);
                          e.stopPropagation();
                          setDetailedTask(task);
                        }}
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            {detailedTask && (
              <div className="w-[40%]  hidden lg:block p-6 border rounded-xl bg-white shadow-lg sticky top-0">
                <h2 className="text-2xl font-bold mb-4">
                  {detailedTask.title}
                </h2>
                <p className="text-gray-700">{detailedTask.description}</p>
              </div>
            )}
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
      {showDetailedModalMobile && (
        <div
          className="fixed inset-0 block lg:hidden z-50 flex justify-center items-center bg-black bg-opacity-50"
          onClick={() => setShowDetailedModalMobile(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{detailedTask?.title}</h3>
              <button
                onClick={() => setShowDetailedModalMobile(false)}
                className="text-gray-500 hover:text-black"
              >
                ✖
              </button>
            </div>

            <p className="text-gray-700">{detailedTask?.description}</p>

            <div className="mt-5 text-right">
              <button
                onClick={() => setShowDetailedModalMobile(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Tasks;
