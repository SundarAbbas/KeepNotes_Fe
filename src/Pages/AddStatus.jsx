import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import { createStatus } from "../Services/statusService";
import { Save, Truck } from "lucide-react";

const AddStatus = () => {
  const [newStatus, setNewStatus] = useState({
    name: "",
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createStatus(newStatus);
      setNewStatus({
        name: "",
      });
    } catch (er) {
      console.log(er);
    }
  };
  return (
    <Sidebar>
      <div className="text-4xl text-black font-bold mb-10">Add Status</div>
      <form onSubmit={handleCreate} className="flex flex-row gap-5 ">
        <input
          type="text"
          placeholder="Enter Status Name"
          value={newStatus.name}
                  required
                  className="w-[20vw] appearance-none focus:ring-1 py-2 px-4 border border-gray-700"
          onChange={(e) => setNewStatus({ ...newStatus, name: e.target.value })}
              />
              <button type="submit" className=" text-blue-600" > <Save /> </button>
      </form>
    </Sidebar>
  );
};

export default AddStatus;
