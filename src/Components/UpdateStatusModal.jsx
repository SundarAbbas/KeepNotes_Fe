import React, { useState, useEffect } from "react";
import { updateTaskStatus } from "../Services/taskService";
import { X } from "lucide-react";
import { getStatuses } from "../Services/statusService";

function UpdateStatusModal({ task, onClose, onUpdate }) {
  const [selectedStatus, setSelectedStatus] = useState(task?.status || "");
  const [loading, setLoading] = useState(false);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
      fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    try {
        const response = await getStatuses();
      setStatuses(response.data);
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateTaskStatus(task.id, selectedStatus);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Update Task Status</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Task: {task?.title}
            </label>
            <label className="block text-gray-700 mb-2">
              Current Status: {task?.status_name}
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select New Status</option>
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? "Updating..." : "Update Status"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateStatusModal;
