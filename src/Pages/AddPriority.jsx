import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import { createPriority } from "../Services/priorityService";
import { Save } from "lucide-react";

const AddPriority = () => {
  const [newPriority, setNewPriority] = useState({
    name: "",
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createPriority(newPriority);
      setNewPriority({
        name: "",
      });
    } catch (er) {
      console.log(er);
    }
  };
  return (
    <Sidebar>
      <div className="text-4xl text-black font-bold mb-10">Add Priority</div>
      <form onSubmit={handleCreate} className="flex flex-row gap-5">
        <input
          type="text"
          placeholder="Enter New Priority Name"
          required
          value={newPriority.name}
          onChange={(e) =>
            setNewPriority({ ...newPriority, name: e.target.value })
          }
          className="w-[20vw] appearance-none focus:ring-1 py-2 px-4 border border-gray-700"
        />
        <button className="text-blue-600" type="submit">
          <Save />
        </button>
      </form>
    </Sidebar>
  );
};

export default AddPriority;
