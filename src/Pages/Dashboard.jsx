import React, { useState, useEffect } from "react";
import { getTasks, createTask, deleteTask } from "../Services/taskService";
import Sidebar from "../Components/Sidebar";
import { Trash } from "lucide-react";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div>Loading tasks...</div>;

  return (
    <Sidebar>
      <div className=" dashboard">
        <div className="header">
          <h1 className="text-4xl text-black font-extrabold text-center mb-10">All Tasks</h1>
          {/* <div>
            <button onClick={() => setShowForm(!showForm)}>
              {showForm ? "Cancel" : "+ Add Task"}
            </button>
          </div> */}
        </div>

     

        <div className=" flex flex-wrap items-center justify-center gap-10 ">
          {tasks.length === 0 && <p>No tasks yet. Create your first task!</p>}
          {tasks.map((task) => (
            <div key={task.id} className="task-card border  lg:w-[20vw] w-[100%] p-5">
              <h3 className="text-2xl mb-2">{task.title}</h3>
              <p className="italic">{task.description}</p>
              <small className="mb-6 block">Due: {task.date}</small>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-800"
              >
                <Trash />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Sidebar>
  );
}

export default Dashboard;
