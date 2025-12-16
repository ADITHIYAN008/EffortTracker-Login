import { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit2,
  FiEye,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { toast } from "react-toastify";

import CreateUserModal from "./modal/CreateUserModal";
import { getUsers } from "../../api";

function UserManagement() {
  const USERS_PER_PAGE = 7;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState("All");
  const [teamFilter, setTeamFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [mode, setMode] = useState("create");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  /* =============================================== */

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(search) ||
      user.id.toLowerCase().includes(search);

    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const matchesTeam = teamFilter === "All" || user.team === teamFilter;
    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesTeam && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="p-4 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">User Management</h1>
          <p className="text-sm text-black/50">
            Manage employee accounts, roles, and access permissions
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedUser(null);
            setMode("create");
            setIsUserModalOpen(true);
          }}
          className="bg-blue-400 cursor-pointer text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-500 transition"
        >
          <FiPlus />
          Create New User
        </button>
      </div>

      {/* FILTERS */}
      <div className="bg-white border border-black/10 rounded-xl p-4">
        <h3 className="text-sm font-medium mb-3">Filters</h3>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-medium text-black/60 mb-2 block">
              Search Users
            </label>
            <input
              type="text"
              placeholder="Search by Employee ID or Name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs mb-1 font-medium text-black/60">
              Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
              <option value="TA">TA</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs mb-1 font-medium text-black/60">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-black/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-4 text-sm text-black/50">Loading users...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3">Employee ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>

                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-b border-black/10">
                  <td className="px-4 py-5">{user.id}</td>
                  <td className="px-4 py-5 font-medium">{user.name}</td>
                  <td className="px-4 py-5 text-black/60">{user.email}</td>
                  <td className="px-4 py-5">{user.role}</td>

                  <td className="px-4 py-5">
                    <span
                      className={`${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-500"
                      } text-xs px-2 py-1 rounded-full`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-5 flex justify-center gap-7">
                    <FiEye
                      size={18}
                      className="cursor-pointer text-gray-600 hover:text-black"
                      onClick={() => {
                        setSelectedUser(user);
                        setMode("view");
                        setIsUserModalOpen(true);
                      }}
                    />
                    <FiEdit2
                      size={18}
                      className="cursor-pointer text-blue-600 hover:text-blue-800"
                      onClick={() => {
                        setSelectedUser(user);
                        setMode("edit");
                        setIsUserModalOpen(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* PAGINATION */}
        <div className="flex justify-between items-center px-4 py-3 text-sm text-black/50">
          <span>
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}{" "}
            users
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 cursor-pointer border rounded disabled:opacity-40"
            >
              <FiChevronLeft />
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 border cursor-pointer rounded disabled:opacity-40"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>

      <div className="text-xs text-black/50">
        ⚠ User deletion is restricted as per organizational policy.
      </div>

      {isUserModalOpen && (
        <CreateUserModal
          mode={mode}
          user={selectedUser}
          onClose={async (success) => {
            setIsUserModalOpen(false);
            setSelectedUser(null);

            if (success) {
              toast.success("User updated successfully");
              await fetchUsers(); // 🔥 REFRESH
            }
          }}
        />
      )}
    </div>
  );
}

export default UserManagement;
