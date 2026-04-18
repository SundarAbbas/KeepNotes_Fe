import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { deletePriority, getPriorities } from "../Services/priorityService";
import { Trash } from "lucide-react";

const Priority = () => {
  const [loading, setLoading] = useState(false);
  const [priorities, setPriorities] = useState([]);

  useEffect(() => {
    loadPriotities();
  }, []);

  const loadPriotities = async () => {
    try {
      const resp = await getPriorities();
      setPriorities(resp.data);
    } catch (er) {
      console.log(er);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete This Priority? ")) {
      await deletePriority(id);
      loadPriotities();
    }
  };

  if (loading) return <div>Loading Priorites ... </div>;
  return (
    <Sidebar>
      <div className="text-4xl text-black font-bold mb-10">All Priorities</div>
      <div className="">
        {priorities.map((pr) => (
          <div className="gap-x-5 mb-3 flex items-center " key={pr.name}>
            <span>{pr.name}</span>
            <button
              onClick={() => handleDelete(pr.id)}
              className="text-red-700"
            >
              <Trash />
            </button>
          </div>
        ))}
      </div>
    </Sidebar>
  );
};

export default Priority;
