import { useState } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import BulkUserUpload from "../BulkUserUpload";
import { createUser, updateUser, bulkUploadUsers } from "../../../api";

function CreateUserModal({ mode, user, onClose }) {
  const [formData, setFormData] = useState(
    user || {
      id: "",
      name: "",
      email: "",
      role: "Developer",
      status: "Active",
    }
  );

  const [bulkFile, setBulkFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const isView = mode === "view";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (bulkFile) {
        await bulkUploadUsers(bulkFile);

        onClose(true); // ✅ tell parent to refresh
        return;
      }

      /* VALIDATION */
      if (!formData.id || !formData.name || !formData.email) {
        toast.error("Please fill all required fields");
        return;
      }

      /* CREATE / UPDATE */
      if (mode === "edit") {
        await updateUser(formData);
      } else {
        await createUser(formData);
      }

      onClose(true); // ✅ refresh parent
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">
              {mode === "create" && "Create New User"}
              {mode === "edit" && "Edit User"}
              {mode === "view" && "User Details"}
            </h2>
            <p className="text-sm text-black/50">
              Add a new employee to the system
            </p>
          </div>
          <button onClick={() => onClose(false)}>
            <FiX />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <h3 className="text-sm font-medium">Basic Information</h3>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm mb-1">Employee ID *</label>
              <input
                name="id"
                disabled={isView}
                value={formData.id}
                placeholder="Enter Employee ID"
                onChange={handleChange}
                className="h-10 border rounded-md px-3"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1">Full Name *</label>
              <input
                name="name"
                disabled={isView}
                value={formData.name}
                placeholder="Enter Full Name"
                onChange={handleChange}
                className="h-10 border rounded-md px-3"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1">Email *</label>
              <input
                name="email"
                disabled={isView}
                value={formData.email}
                placeholder="Enter Email"
                onChange={handleChange}
                className="h-10 border rounded-md px-3"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1">Role</label>
              <select
                name="role"
                disabled={isView}
                value={formData.role}
                onChange={handleChange}
                className="h-10 border rounded-md px-3"
              >
                <option>Developer</option>
                <option>Manager</option>
                <option>TA</option>
                <option>Senior / SME</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1">Status</label>
              <select
                name="status"
                disabled={isView}
                value={formData.status}
                onChange={handleChange}
                className="h-10 border rounded-md px-3"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <BulkUserUpload onUpload={setBulkFile} />

          <div className="text-xs bg-yellow-50 border border-yellow-200 p-3 rounded-md">
            ⚠ Users cannot be deleted as per organizational policy.
          </div>
        </div>

        {/* Footer */}
        {mode !== "view" && (
          <div className="flex justify-end gap-3 px-6 py-4 border-t">
            <button
              onClick={() => onClose(false)}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {loading ? "Processing..." : "Save"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateUserModal;
