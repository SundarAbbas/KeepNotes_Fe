import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { deleteStatus, getStatuses } from "../Services/statusService";
import { Delete, Trash } from "lucide-react";

const Status = () => {
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadStatuses();
  }, []);

  const loadStatuses = async () => {
    try {
      const response = await getStatuses();
      setStatus(response.data);
    } catch (err) {
      console.error("Error Fetching Statueses", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete This Status ? ")) {
      await deleteStatus(id);
      loadStatuses();
    }
  };
  // if (loading) return <div>Loading Statuses</div>;

  return (
    <Sidebar>
      <div className="text-4xl text-black font-bold mb-10">All Statuses</div>
      {status.map((st) => (
        <div className="flex items-center mt-2 mb-4  gap-x-4" key={st.name}>
          {st.name}
          <button className="text-red-800" onClick={() => handleDelete(st.id)}>
            <Trash />
          </button>
        </div>
      ))}
    </Sidebar>
  );
};

export default Status;
