import { useState } from "react";
import { FiEye, FiEdit2, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { batches as initialBatches } from "../../../json/Batches";
import BatchDetailsModal from "./modal/BatchDetailsModal";
import { Bath } from "lucide-react";
import BatchOverview from "../admin/modal/BatchOverview";

function Batches() {
  const BATCHES_PER_PAGE = 6;
  const [searchTerm, setSearchTerm] = useState("");
  const [batches, setBatches] = useState(initialBatches);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("view");

  const [statusFilter, setStatusFilter] = useState("All");
  const [domainFilter, setDomainFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBatches = batches.filter((batch) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      batch.code.toLowerCase().includes(search) ||
      batch.name.toLowerCase().includes(search) ||
      batch.domain.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || batch.status === statusFilter;

    const matchesDomain =
      domainFilter === "All" || batch.domain === domainFilter;

    return matchesSearch && matchesStatus && matchesDomain;
  });

  const totalPages = Math.ceil(filteredBatches.length / BATCHES_PER_PAGE);
  const startIndex = (currentPage - 1) * BATCHES_PER_PAGE;
  const endIndex = startIndex + BATCHES_PER_PAGE;
  const currentBatches = filteredBatches.slice(startIndex, endIndex);

  const statusStyles = {
    Upcoming: "bg-blue-100 text-blue-700",
    Ongoing: "bg-green-100 text-green-700",
    Completed: "bg-purple-100 text-purple-700",
    Archived: "bg-gray-200 text-gray-600",
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Batch Management</h1>
        <p className="text-sm text-black/50">
          View and manage all Ignite batches
        </p>
      </div>

      <div className="bg-white border border-black/10 rounded-xl p-4">
        <h3 className="text-sm font-medium mb-3">Filters</h3>

        <div className="grid grid-cols-4 gap-4">
          {/* SEARCH */}
          <div>
            <label className="text-xs font-medium text-black/60 mb-1 block">
              Search Batches
            </label>
            <input
              type="text"
              placeholder="Search by Batch Code or Name"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="text-xs font-medium text-black/60 mb-1 block">
              Batch Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="All">All Statuses</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          {/* DOMAIN */}
          <div>
            <label className="text-xs font-medium text-black/60 mb-1 block">
              Domain
            </label>
            <select
              value={domainFilter}
              onChange={(e) => {
                setDomainFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="All">All Domains</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Java">Java</option>
              <option value="AI / ML">AI / ML</option>
              <option value="Cloud">Cloud</option>
              <option value="Data Engineering">Data Engineering</option>
            </select>
          </div>

          {/* DATE */}
          <div>
            <label className="text-xs font-medium text-black/60 mb-1 block">
              Date Range
            </label>
            <select className="w-full border rounded-md px-3 py-2 text-sm">
              <option>All Time</option>
              <option>Current</option>
              <option>Past</option>
              <option>Future</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-black/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-3">Batch Code</th>
              <th className="px-4 py-3">Batch Name</th>
              <th className="px-4 py-3">Domain</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">End Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Trainees</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentBatches.map((batch) => (
              <tr
                key={batch.code}
                onClick={() => setSelectedBatch(batch)}
                className="border-b hover:bg-black/2 cursor-pointer border-black/10"
              >
                <td className="px-4 py-4 font-medium">{batch.code}</td>
                <td className="px-4 py-4">{batch.name}</td>
                <td className="px-4 py-4">{batch.domain}</td>
                <td className="px-4 py-4">{batch.startDate}</td>
                <td className="px-4 py-4">{batch.endDate}</td>
                <td className="px-4 py-4">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      statusStyles[batch.status]
                    }`}
                  >
                    {batch.status}
                  </span>
                </td>
                <td className="px-4 py-4">{batch.trainees}</td>
                <td className="px-4 py-4 flex justify-center gap-6">
                  <FiEye
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBatch(batch);
                      setMode("view");
                      setIsModalOpen(true);
                    }}
                  />

                  <FiEdit2
                    className="cursor-pointer text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBatch(batch);
                      setMode("edit");
                      setIsModalOpen(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center px-4 py-3 text-sm text-black/50">
          <span>
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredBatches.length)} of{" "}
            {filteredBatches.length} batches
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 border rounded disabled:opacity-40"
            >
              <FiChevronLeft />
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 border rounded disabled:opacity-40"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
      <BatchOverview batch={selectedBatch} />

      {isModalOpen && selectedBatch && (
        <BatchDetailsModal
          mode={mode}
          batch={selectedBatch}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedBatch(null);
          }}
          onUpdateBatch={(updatedBatch) => {
            setBatches((prev) =>
              prev.map((b) => (b.code === updatedBatch.code ? updatedBatch : b))
            );
          }}
        />
      )}
    </div>
  );
}

export default Batches;
