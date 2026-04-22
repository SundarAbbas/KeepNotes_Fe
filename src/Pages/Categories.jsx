import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { deleteStatus, getStatuses } from "../Services/statusService";
import { deletePriority, getPriorities } from "../Services/priorityService";

import { Delete, Pen, Plus, StepBack, StepBackIcon, Trash } from "lucide-react";
import { NavLink } from "react-router-dom";
import AddStatusModal from "../Components/AddStatusModal";
import AddPriorityModal from "../Components/AddPriorityModal";

const Categories = () => {
  const [status, setStatus] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState(null);

  const [isPriorityModalOpen, setIsPriorityModalOpen] = useState(false);
  const [editingPriority, setEditingPriority] = useState(null);

  useEffect(() => {
    loadStatuses();
    loadPriotities();
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
    if (window.confirm("Delete This Status ? ")) {
      await deleteStatus(id);
      loadStatuses();
    }
  };

  const handlePriorityDelete = async (id) => {
    if (window.confirm("Delete This Priority? ")) {
      await deletePriority(id);
      loadPriotities();
    }
  };

  const handleStatusAdded = () => {
    loadStatuses();
  };

  const handlePriorityAdded = () => {
    loadPriotities();
  };

  const handleEdit = (status) => {
    setIsModalOpen(true);
    setEditingStatus(status);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStatus(null);
  };

  const handlePriorityEdit = (status) => {
    setIsPriorityModalOpen(true);
    setEditingPriority(status);
  };

  const handleClosePriorityModal = () => {
    setIsPriorityModalOpen(false);
    setEditingPriority(null);
  };
  // if (loading) return <div>Loading Statuses</div>;

  return (
    <Sidebar>
      <div className="border-1 border-gray-300  rounded-xl p-10">
        <div className="flex mb-10 justify-between items-center ">
          <div className=" text-black font-bold text-2xl border-b-2 border-blue-500">
            Categories
          </div>
          <NavLink
            to="/"
            className="border-b-2 border-gray-300 text-gray-600 hover:text-gray-800"
          >
            <StepBackIcon />
          </NavLink>
        </div>

        {/* Status */}
        <div className="mb-10">
          <div className="flex justify-between items-center">
            <div className=" text-black font-bold text-lg border-b-2 border-blue-500">
              Task Status
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex gap-2 items-center "
            >
              <Plus className="text-blue-500 " size={20} />
              <span className="text-gray-400">Add Task Status</span>
            </button>
            <AddStatusModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onStatusAdded={handleStatusAdded}
              editingStatus={editingStatus}
            />
            {/* <AddPriorityModal/> */}
          </div>

          <div className="border mt-3 text-center  border-gray-400 rounded-xl">
            <table className="w-full table ">
              <thead className="border-b border-gray-300">
                <tr className="divide-x divide-gray-400">
                  <th className="p-3">SN</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {status.map((st) => (
                  <tr key={st.id} className="divide-x divide-gray-400">
                    <td className="p-3 ">{st.id}</td>
                    <td className="p-3">{st.name}</td>
                    <td className="p-3 flex items-center justify-center gap-2   ">
                      <span
                        onClick={() => handleEdit(st)}
                        className="rounded-xl text-white text-sm bg-blue-400 px-4 py-2  "
                      >
                        <Pen className="inline " size={15} />
                        Edit
                      </span>

                      <span
                        onClick={() => handleDelete(st.id)}
                        className="rounded-xl bg-blue-400 text-sm text-white px-4 py-2  "
                      >
                        <Trash className="inline " size={15} />
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Priority */}
        <div className="">
          <div className="flex justify-between items-center">
            <div className=" text-black font-bold text-lg border-b-2 border-blue-500">
              Task Priority
            </div>
            <button
              onClick={() => setIsPriorityModalOpen(true)}
              className="flex gap-2 items-center "
            >
              <Plus className="text-blue-500 " size={20} />
              <span className="text-gray-400">Add Task Priority</span>
            </button>
            <AddPriorityModal
              isOpen={isPriorityModalOpen}
              onClose={handleClosePriorityModal}
              onPriorityAdded={handlePriorityAdded}
              editingPriority={editingPriority}
            />
          </div>

          <div className="border mt-3 text-center  border-gray-400 rounded-xl">
            <table className="w-full table ">
              <thead className="border-b border-gray-300">
                <tr className="divide-x divide-gray-400">
                  <th className="p-3">SN</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {priorities.map((pr) => (
                  <tr className="divide-x divide-gray-400">
                    <td className="p-3 ">{pr.id}</td>
                    <td className="p-3">{pr.name}</td>
                    <td className="p-3 flex items-center justify-center gap-2   ">
                      <span
                        onClick={() => handlePriorityEdit(pr)}
                        className="rounded-xl  text-sm text-white bg-blue-400 px-4 py-2  "
                      >
                        <Pen className="inline " size={15} />
                        Edit
                      </span>

                      <span
                        onClick={() => handlePriorityDelete(pr.id)}
                        className="rounded-xl  text-sm bg-blue-400 text-white px-4 py-2  "
                      >
                        <Trash className="inline " size={15} />
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Categories;
