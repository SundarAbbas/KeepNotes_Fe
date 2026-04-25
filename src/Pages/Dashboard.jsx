import React, { useState, useEffect } from "react";
import { CircularProgressBar } from "@tomickigrzegorz/react-circular-progress-bar";
import { Menu } from "@headlessui/react";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
} from "../Services/taskService";
import Sidebar from "../Components/Sidebar";
import UpdateStatusModal from "../Components/UpdateStatusModal";
import {
  Trash,
  Circle,
  List,
  Edit2,
  Plus,
  CardSim,
  Eye,
  CheckCheckIcon,
  Stamp,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Dashboard() {
  //Current Date
  const today = new Date().toDateString();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [detailedTask, setDetailedTask] = useState(null);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDetailedModalMobile, setShowDetailedModalMobile] = useState(false);

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

  const totalTasks = () => {
    const total = tasks.length;
    if (total === 0) {
      return {
        completed: 0,
        inProgress: 0,
        notStarted: 0,
      };
    }

    const completed = tasks.filter(
      (task) => task.status_name === "Completed",
    ).length;
    const inProgress = tasks.filter(
      (task) => task.status_name === "In Progress",
    ).length;
    const notStarted = tasks.filter(
      (task) => task.status_name === "Not Started",
    ).length;

    return {
      completed: Math.round((completed / total) * 100),
      inProgress: Math.round((inProgress / total) * 100),
      notStarted: Math.round((notStarted / total) * 100),
    };
  };

  const stats = totalTasks();
  // if (loading) return <div className="text-center mt-10">Loading tasks...</div>;

  return (
    <Sidebar>
      {showStatusModal && (
        <UpdateStatusModal
          task={selectedTask}
          onClose={() => setShowStatusModal(false)}
          onUpdate={handleStatusUpdate}
        />
      )}

      <div className=" p-5 flex justify-center flex-col lg:flex-row  gap-10">
        <div className="flex flex-col gap-4  w-full   lg:w-1/2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CardSim className="text-sm text-gray-400" size={18} />
              <span className="text-sm text-blue-500">To-Do</span>
            </div>
            {/* <div className="flex items-center gap-2"> */}
            <NavLink
              to="/addTasks"
              className="flex items-center gap-2 text-sm text-gray-400"
            >
              <Plus className="text-blue-500" size={15} />
              <span>Add Task</span>
            </NavLink>
            {/* </div> */}
          </div>
          <div className="flex justify-start items-center gap-2">
            <div className="text-xs text">{today}</div>
            <div className="text-sm text-gray-400">Today</div>
          </div>
          {tasks.length === 0 && (
            <p className="text-gray-500 text-center">
              No tasks yet. Create your first task!
            </p>
          )}
          {tasks
            // .filter((task) => task.priority_name === "Extreme")

            .map((task) => (
              <div
                key={task.id}
                className={`task-card border rounded-lg  border-gray-400 lg:w-[100%]  w-[100%] p-5 shadow-md hover:shadow-lg transition-shadow `}
                // onClick={() => setDetailedTask(task)}
              >
                <div className="mb-6 flex justify-between items-center">
                  <Circle
                    className={` ${
                      task.status_name === "Completed"
                        ? "text-green-800"
                        : task.status_name === "In Progress"
                          ? " text-yellow-400"
                          : " text-red-500"
                    }`}
                  />
                  <h3 className="text-xl font-semibold">
                    {task.title.slice(0, 30)}
                  </h3>
                  <Menu as="div" className="relative inline-block text-left ">
                    <Menu.Button className="text-black">
                      {" "}
                      <List />{" "}
                    </Menu.Button>

                    <Menu.Items className="absolute  mx-auto right-0 mt-2 w-15 bg-white rounded border border-gray-400 shadow-lg z-50">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={(e) => {
                              handleUpdateStatus(task);
                              e.stopPropagation();
                            }}
                            className={`block text-center text-blue-600 w-full text-left px-4 py-2 ${
                              active ? "bg-gray-100" : ""
                            }`}
                          >
                            <Edit2 size={18} />
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={(e) => {
                              handleDelete(task.id);
                              e.stopPropagation();
                            }}
                            className={`block w-full text-red-600 text-left px-4 py-2 ${
                              active ? "bg-gray-100" : ""
                            }`}
                          >
                            <Trash size={18} />
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={(e) => {
                              setShowDetailedModalMobile(true);
                              e.stopPropagation();
                              setDetailedTask(task);
                            }}
                            className={`block text-green-600  w-full text-left px-4 py-2 ${
                              active ? "bg-gray-100" : ""
                            }`}
                          >
                            <Eye size={18} />
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                </div>

                <p className="text-gray-600 mb-7">
                  {task.description.slice(0, 100)}
                </p>

                <div className="flex text-sm items-center flex-col lg:flex-row gap-2 justyfy-center">
                  <div className="mb-2">
                    <span className="font-semibold">Status:</span>
                    <span
                      className={`px-2 py-1 rounded ${
                        task.status_name === "Completed"
                          ? "text-green-800"
                          : task.status_name === "In Progress"
                            ? " text-yellow-400"
                            : " text-red-500"
                      }`}
                    >
                      {task.status_name || task.status}
                    </span>
                  </div>

                  <div className="mb-2">
                    <span className="font-semibold">Priority: </span>
                    <span
                      className={`
                                          ${
                                            task.priority_name == "Extreme"
                                              ? "text-red-500"
                                              : task.priority_name == "High"
                                                ? "text-yellow-500"
                                                : task.priority_name == "Medium"
                                                  ? "text-blue-500"
                                                  : "text-black"
                                          }
                                            `}
                    >
                      {task.priority_name || task.priority}
                    </span>
                  </div>

                  <small className="block text-gray-500 mb-1">
                    Due: {task.date}
                  </small>
                </div>
              </div>
            ))}
        </div>

        <div className=" flex flex-col gap-10 w-full lg:w-1/2">
          <div className="  rounded-xl">
            <div className=" flex flex-col gap-10 ">
              <div
                className="bg-white
                 rounded-xl "
              >
                <h3 className="flex items-center gap-3 text-lg font-semibold mb-4 text-gray-700">
                  <Stamp size={15} />
                  <span className="text-sm text-blue-400">Task Status</span>
                </h3>
                <div className="flex flex-col md:flex-row justify-around items-center gap-6">
                  {/* Completed */}
                  <div className="flex flex-col items-center">
                    <CircularProgressBar
                      percent={stats.completed}
                      colorSlice="#22c55e"
                      colorCircle="#e5e7eb"
                      fontColor="#166534"
                      fontSize="1.5rem"
                      fontWeight={600}
                      size={80}
                      stroke={10}
                      round={true}
                      unit="%"
                    />
                    <p className="mt-3 font-semibold text-green-700">
                      Completed
                    </p>
                    <p className="text-xs text-gray-500">
                      {
                        tasks.filter((t) => t.status_name === "Completed")
                          .length
                      }{" "}
                      / {tasks.length}
                    </p>
                  </div>

                  {/* In Progress */}
                  <div className="flex flex-col items-center">
                    <CircularProgressBar
                      percent={stats.inProgress}
                      colorSlice="#3b82f6"
                      colorCircle="#e5e7eb"
                      fontColor="#1e40af"
                      fontSize="1.5rem"
                      fontWeight={600}
                      size={80}
                      stroke={10}
                      round={true}
                      unit="%"
                    />
                    <p className="mt-3 font-semibold text-blue-700">
                      In Progress
                    </p>
                    <p className="text-xs text-gray-500">
                      {
                        tasks.filter((t) => t.status_name === "In Progress")
                          .length
                      }{" "}
                      / {tasks.length}
                    </p>
                  </div>

                  {/* Not Started */}
                  <div className="flex flex-col items-center">
                    <CircularProgressBar
                      percent={stats.notStarted}
                      colorSlice="#ef4444"
                      colorCircle="#e5e7eb"
                      fontColor="#991b1b"
                      fontSize="1.5rem"
                      fontWeight={600}
                      size={80}
                      stroke={10}
                      round={true}
                      unit="%"
                    />
                    <p className="mt-3 font-semibold text-red-700">
                      Not Started
                    </p>
                    <p className="text-xs text-gray-500">
                      {
                        tasks.filter((t) => t.status_name === "Not Started")
                          .length
                      }{" "}
                      / {tasks.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-gray-400 border px-5 py-10 flex  flex-col gap-5  rounded-xl">
            <div className="flex  items-center justify-start gap-2">
              <CheckCheckIcon size={15} className="text-gray-500" />
              <span className="text-blue-400 text-sm">Completed Tasks</span>
            </div>
            {tasks.filter((task) => task.status_name === "Completed").length ===
              0 && (
              <p className="text-gray-500 border-gray-400 border p-2  ">
                No completed Tasks yet.
              </p>
            )}
            {/* {tasks
                .filter((task) => task.status_name === "Completed")
                .map((task) => (
                  <div></div>
                ))} */}
            {tasks
              .filter((task) => task.status_name === "Completed")

              .map((task) => (
                <div
                  key={task.id}
                  className={`task-card border rounded-lg  border-gray-400 lg:w-[100%]  w-[100%] p-5 shadow-md hover:shadow-lg transition-shadow `}
                  // onClick={() => setDetailedTask(task)}
                >
                  <div className="mb-6 flex justify-between items-center">
                    <Circle
                      className={` ${
                        task.status_name === "Completed"
                          ? "text-green-800"
                          : task.status_name === "In Progress"
                            ? " text-yellow-400"
                            : " text-red-500"
                      }`}
                    />
                    <h3 className="text-xl font-semibold">
                      {task.title.slice(0, 30)}
                    </h3>
                    <Menu as="div" className="relative inline-block text-left ">
                      <Menu.Button className="text-black">
                        {" "}
                        <List />{" "}
                      </Menu.Button>

                      <Menu.Items className="absolute  mx-auto right-0 mt-2 w-15 bg-white rounded border border-gray-400 shadow-lg z-50">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={(e) => {
                                handleUpdateStatus(task);
                                e.stopPropagation();
                              }}
                              className={`block text-center text-blue-600 w-full text-left px-4 py-2 ${
                                active ? "bg-gray-100" : ""
                              }`}
                            >
                              <Edit2 size={18} />
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={(e) => {
                                handleDelete(task.id);
                                e.stopPropagation();
                              }}
                              className={`block w-full text-red-600 text-left px-4 py-2 ${
                                active ? "bg-gray-100" : ""
                              }`}
                            >
                              <Trash size={18} />
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={(e) => {
                                setShowDetailedModalMobile(true);
                                e.stopPropagation();
                                setDetailedTask(task);
                              }}
                              className={`block text-green-600  w-full text-left px-4 py-2 ${
                                active ? "bg-gray-100" : ""
                              }`}
                            >
                              <Eye size={18} />
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </div>

                  <p className="text-gray-600 mb-7">
                    {task.description.slice(0, 100)}
                  </p>

                  <div className="flex text-sm items-center flex-col lg:flex-row gap-2 justyfy-center">
                    <div className="mb-2">
                      <span className="font-semibold">Status:</span>
                      <span
                        className={`px-2 py-1 rounded ${
                          task.status_name === "Completed"
                            ? "text-green-800"
                            : task.status_name === "In Progress"
                              ? " text-yellow-400"
                              : " text-red-500"
                        }`}
                      >
                        {task.status_name || task.status}
                      </span>
                    </div>

                    <div className="mb-2">
                      <span className="font-semibold">Priority: </span>
                      <span
                        className={`
                                          ${
                                            task.priority_name == "Extreme"
                                              ? "text-red-500"
                                              : task.priority_name == "High"
                                                ? "text-yellow-500"
                                                : task.priority_name == "Medium"
                                                  ? "text-blue-500"
                                                  : "text-black"
                                          }
                                            `}
                      >
                        {task.priority_name || task.priority}
                      </span>
                    </div>

                    <small className="block text-gray-500 mb-1">
                      Due: {task.date}
                    </small>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {showDetailedModalMobile && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
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
    </Sidebar>
  );
}

export default Dashboard;
