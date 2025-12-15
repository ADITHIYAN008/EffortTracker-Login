import { useState } from "react";
import { FiX } from "react-icons/fi";

function CreateUserModal({ mode, user, onClose, onCreateUser, onUpdateUser }) {
  const [formData, setFormData] = useState(
    user || {
      id: "",
      name: "",
      email: "",
      role: "Developer",
      team: "Development",
      status: "Active",
    }
  );
  const isView = mode === "view";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.id || !formData.name || !formData.email) {
      alert("Please fill all required fields");
      return;
    }

    if (mode === "create") {
      onCreateUser(formData);
    }

    if (mode === "edit") {
      onUpdateUser(formData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-black/20">
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
          <button className="cursor-pointer" onClick={onClose}>
            <FiX size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <h3 className="text-sm font-medium mb-3">Basic Information</h3>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex flex-col">
                <label className="text-sm text-black/70 mb-1">
                  Employee ID *
                </label>
                <input
                  name="id"
                  disabled={isView}
                  value={formData.id}
                  onChange={handleChange}
                  placeholder="Employee ID"
                  className="h-10 border border-black/30 rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-black/70 mb-1">
                  Full Name *
                </label>
                <input
                  name="name"
                  disabled={isView}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="h-10 border border-black/30 rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-black/70 mb-1">
                  Email (company domain) *
                </label>
                <input
                  name="email"
                  disabled={isView}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@tcs.com"
                  className="h-10 border border-black/30 rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-black/70 mb-1">Role</label>
                <select
                  name="role"
                  disabled={isView}
                  value={formData.role}
                  onChange={handleChange}
                  className="h-10 border border-black/30 rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option>Developer</option>
                  <option>Manager</option>
                  <option>TA</option>
                  <option>Senior / SME</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-black/70 mb-1">
                  Team Assignment
                </label>
                <select
                  name="team"
                  disabled={isView}
                  value={formData.team}
                  onChange={handleChange}
                  className="h-10 border border-black/30 rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option>Development</option>
                  <option>QA</option>
                  <option>Architecture</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-black/70 mb-1">Status</label>
                <select
                  name="status"
                  disabled={isView}
                  value={formData.status}
                  onChange={handleChange}
                  className="h-10 border border-black/30 rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Access Level Preview</h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="border border-black/20 rounded-lg p-3 bg-blue-50">
                <strong>View Access</strong>
                <ul className="list-disc ml-4 mt-1">
                  <li>Projects</li>
                  <li>Tasks</li>
                  <li>Documentation</li>
                </ul>
              </div>

              <div className="border border-black/20 rounded-lg p-3 bg-green-50">
                <strong>Edit Access</strong>
                <ul className="list-disc ml-4 mt-1">
                  <li>Own Tasks</li>
                  <li>Code Repositories</li>
                </ul>
              </div>

              <div className="border border-black/20 rounded-lg p-3 bg-purple-50">
                <strong>Approval Access</strong>
                <p className="text-xs mt-1">No approval permissions</p>
              </div>

              <div className="border border-black/20 rounded-lg p-3 bg-red-50">
                <strong>Restricted Actions</strong>
                <ul className="list-disc ml-4 mt-1">
                  <li>User Management</li>
                  <li>Team Settings</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-xs bg-yellow-50 border border-yellow-200 p-3 rounded-md">
            ⚠ Users cannot be deleted as per organizational policy. To
            deactivate a user, change their status to "Inactive".
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer border rounded-md text-sm"
          >
            Cancel
          </button>
          {mode !== "view" && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              {mode === "edit" ? "Update User" : "Create User"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateUserModal;
