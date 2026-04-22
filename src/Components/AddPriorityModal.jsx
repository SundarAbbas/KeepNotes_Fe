import React from "react";
import { createPriority ,  updatePriority } from "../Services/priorityService";
import { useState, useEffect } from "react";

const AddPriorityModal = ({
  isOpen,
  onClose,
  onPriorityAdded,
  editingPriority,
}) => {
  const isEditMode = !!editingPriority;

  const [formData, setFormData] = useState({
    name: "",
  });

  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingPriority) {
      setFormData({ name: editingPriority.name });
    } else {
      setFormData({ name: "" });
    }
  }, [editingPriority, isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isEditMode) {
        await updatePriority(editingPriority.id, formData);
      } else {
        await createPriority(formData);
      }

      setFormData({
        name: "",
      });
      onPriorityAdded();
      onClose();
    } catch (er) {
      console.log(er);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-400">
            <h2 className="text-xl font-extrabold">
              {isEditMode ? "Edit Priority" : "Add New Priority"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter name"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? isEditMode
                    ? "Updating"
                    : "Submitting"
                  : isEditMode
                    ? "Update"
                    : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPriorityModal;
