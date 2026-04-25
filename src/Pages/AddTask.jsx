import React, { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { createTask } from "../Services/taskService";
import { useState } from "react";
import { Save } from "lucide-react";
import { getPriorities } from "../Services/priorityService";
import { getStatuses } from "../Services/statusService";

const AddTask = () => {
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    loadPriorities();
    loadStatuses();
  }, []);

  const loadPriorities = async () => {
    try {
      const pr = await getPriorities();
      setPriorities(pr.data);
    } catch (er) {
      console.log(er);
    }
  };

  const loadStatuses = async () => {
    try {
      const pr = await getStatuses();
      setStatuses(pr.data);
    } catch (er) {
      console.log(er);
    }
  };

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: 1,
    status: 1,
    date: "",
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createTask(newTask);
      setNewTask({
        title: "",
        description: "",
        priority: 1,
        status: 1,
        date: "",
      });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Sidebar>
      <div className=" flex justify-center items-center flex-col min-h-screen">
        {/* <div className="text-4xl text-black font-bold  mb-10">Add Task</div> */}
        <div className="mb-7 text-center">
          <div className="text-slate-800 text-4xl font-extrabold tracking-tight">
            Add <span className="text-blue-600">Tasks</span>
          </div>
          <span className="text-gray-400 mt-2">
            Create Your Tasks And Start Development
          </span>
        </div>
        <form
          onSubmit={handleCreate}
          className="bg-white border border-slate-200  shadow-xl shadow-blue-100/50 w-full max-w-md rounded-2xl p-8"
        >
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            className=" mb-2  shadow appearance-none border border-slate-300  rounded-xl w-full py-3 px-4 leading-tight outline-none transition-all focus:ring-2 focus:border-transparent focus:ring-blue-500 text-slate-700"
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className=" mb-2  shadow appearance-none border border-slate-300  rounded-xl w-full py-3 px-4 leading-tight outline-none transition-all focus:ring-2 focus:border-transparent focus:ring-blue-500 text-slate-700"
            value={newTask.description}
            onChange={(e) =>
              setNewTask({ ...newTask, description: e.target.value })
            }
          />
          <input
            type="date"
            className="mb-2  shadow appearance-none border border-slate-300  rounded-xl w-full py-3 px-4 leading-tight outline-none transition-all focus:ring-2 focus:border-transparent focus:ring-blue-500 text-slate-700"
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
            required
          />
          <select
            value={newTask.priority}
            className=" mb-2  shadow appearance-none border border-slate-300  rounded-xl w-full py-3 px-4 leading-tight outline-none transition-all focus:ring-2 focus:border-transparent focus:ring-blue-500 text-slate-700"
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
          >
            {priorities.map((p) => (
              <option value={p.id} key={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <select
            value={newTask.status}
            className=" mb-2  shadow appearance-none border border-slate-300  rounded-xl w-full py-3 px-4 leading-tight outline-none transition-all focus:ring-2 focus:border-transparent focus:ring-blue-500 text-slate-700"
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            {statuses.map((s) => (
              <option value={s.id} key={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <button
            className="w-full py-3 rounded-xl text-lg font-bold bg-blue-500 mt-6 hover:bg-blue-600 text-white transitona-all shadow-;g activate-scale-[0.98] "
            type="submit"
          >
            {" "}
            {/* <Save size={30} />{" "} */}
            Save
          </button>
        </form>
      </div>
    </Sidebar>
  );
};

export default AddTask;
