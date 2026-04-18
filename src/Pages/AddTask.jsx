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
  },[]);

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
      <div className="text-4xl text-black font-bold mb-10">Add Task</div>
      <form onSubmit={handleCreate} className="flex flex-col w-[40%]">
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          className="w-[20vw] appearance-none mb-4 focus:ring-1 py-2 px-4 border border-gray-700"
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="w-[20vw] appearance-none mb-4 focus:ring-1 py-2 px-4 border border-gray-700"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <div>
          <input
            type="date"
            className="w-[20vw] appearance-none mb-4 focus:ring-1 py-2 px-4 border border-gray-700"
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
            required
          />
        </div>
        <div>
          <select
            value={newTask.priority}
            className="w-[20vw] appearance-none mb-4 focus:ring-1 py-2 px-4 border border-gray-700"
            onChange={(e) =>
              setNewTask({ ...newTask, priority: e.target.value })
            }
          >
            {priorities.map((p) => (
              <option value={p.id} key={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={newTask.status}
            className="w-[20vw] appearance-none mb-4 focus:ring-1 py-2 px-4 border border-gray-700"
            onChange={(e) =>
              setNewTask({ ...newTask, status: e.target.value })
            }
          >
            {statuses.map((s) => (
              <option value={s.id} key={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        <button className=" text-blue-700" type="submit">
          {" "}
          <Save size={30} />{" "}
        </button>
      </form>
    </Sidebar>
  );
};

export default AddTask;
