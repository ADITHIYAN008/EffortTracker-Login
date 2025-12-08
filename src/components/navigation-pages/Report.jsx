import React from "react";
import { FiSearch } from "react-icons/fi";
import { LuFileSpreadsheet } from "react-icons/lu";
import { FiDownload } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";
import { FaRegCalendar } from "react-icons/fa";
import { GoPerson } from "react-icons/go";

const REPORT_DATA = [
  {
    date: "Nov 25, 2025",
    user: "Sarah Anderson",
    category: "Development",
    hours: "8h",
    tasks: 5,
    status: "completed",
  },
  {
    date: "Nov 24, 2025",
    user: "Sarah Anderson",
    category: "Meeting",
    hours: "3h",
    tasks: 2,
    status: "completed",
  },
  {
    date: "Nov 23, 2025",
    user: "Sarah Anderson",
    category: "Documentation",
    hours: "4h",
    tasks: 3,
    status: "completed",
  },
  {
    date: "Nov 22, 2025",
    user: "Alex Kumar",
    category: "Development",
    hours: "9h",
    tasks: 6,
    status: "completed",
  },
  {
    date: "Nov 21, 2025",
    user: "Priya Sharma",
    category: "Support",
    hours: "7h",
    tasks: 12,
    status: "completed",
  },
  {
    date: "Nov 20, 2025",
    user: "Raj Patel",
    category: "Development",
    hours: "8h",
    tasks: 4,
    status: "completed",
  },
];

function Report() {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("All Categories");
  const [timeRange, setTimeRange] = React.useState("All Time");
  const [showModal, setShowModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const filteredData = REPORT_DATA.filter((row) => {
    const matchesSearch =
      row.user.toLowerCase().includes(search.toLowerCase()) ||
      row.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All Categories" || row.category === category;

    const matchesTime =
      timeRange === "All Time" ||
      (timeRange === "This Month" && row.date.includes("Nov")) ||
      (timeRange === "This Week" && row.date.includes("25"));

    return matchesSearch && matchesCategory && matchesTime;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Reports</h1>
      <h3 className="text-sm mb-7 text-black/50">
        Manage your team structure and view member details
      </h3>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="p-6 border border-black/20 rounded-xl flex flex-col jube shadow-md bg-white">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 bg-blue-100 flex items-center justify-center rounded-xl">
              <BiSolidReport className="text-blue-500" size={28} />
            </div>
            <h2 className="text-2xl font-semibold">8</h2>
          </div>
          <p className="text-black/50 text-sm mt-4">Total Records</p>
        </div>

        <div className="p-6 border border-black/20 rounded-xl flex flex-col jube shadow-md bg-white">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 bg-green-100 flex items-center justify-center rounded-xl">
              <FaRegCalendar className="text-green-500" size={23} />
            </div>
            <h2 className="text-2xl font-semibold">52h</h2>
          </div>
          <p className="text-black/50 text-sm mt-4">Total Hours</p>
        </div>

        <div className="p-6 border border-black/20 rounded-xl flex flex-col jube shadow-md bg-white">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 bg-purple-100 flex items-center justify-center rounded-xl">
              <GoPerson className="text-purple-500" size={28} />
            </div>
            <h2 className="text-2xl font-semibold">44</h2>
          </div>
          <p className="text-black/50 text-sm mt-4">Total Tasks</p>
        </div>

        <div className="p-5 border border-black/20 rounded-xl shadow-md bg-white hover:bg-gray-50 transition">
          <p className="text-black/50 text-sm mb-3">Download Reports</p>
          <div className="flex mb-2 items-center cursor-pointer gap-2 text-orange-600">
            <FiDownload size={20} />
            <p className="text-sm font-semibold">Export Excel</p>
          </div>
          <div className="flex items-center gap-2 cursor-pointer text-blue-500">
            <FiDownload size={20} />
            <p className="text-sm font-semibold">Export Pdf</p>
          </div>
        </div>
      </div>

      <div className="p-5 border border-black/20 rounded-xl shadow-md bg-white mb-6">
        <h2 className="font-semibold text-black/70 mb-4 flex items-center gap-2">
          <span>Filters</span>
        </h2>

        <div className="grid grid-cols-3 gap-5">
          <div className="relative">
            <FiSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search user or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full cursor-pointer border rounded-lg pl-10 py-2 text-sm outline-none border-black/50 focus:ring-1 focus:ring-black/50"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-black/50 rounded-lg py-2 px-3 text-sm outline-none focus:ring-1 focus:ring-black/50"
          >
            <option>All Categories</option>
            <option>Development</option>
            <option>Meeting</option>
            <option>Support</option>
            <option>Documentation</option>
          </select>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-black/50  rounded-lg py-2 px-3 text-sm outline-none focus:ring-1 focus:ring-black/50"
          >
            <option>All Time</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      <div className="border border-black/20 rounded-xl shadow-md bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-black/20">
            <tr>
              <th className="text-left p-4 text-black/60">DATE</th>
              <th className="text-left p-4 text-black/60">USER</th>
              <th className="text-left p-4 text-black/60">CATEGORY</th>
              <th className="text-left p-4 text-black/60">HOURS</th>
              <th className="text-left p-4 text-black/60">TASKS</th>
              <th className="text-left p-4 text-black/60">STATUS</th>
              <th className="text-left p-4 text-black/60">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, index) => (
              <tr
                key={index}
                className="border-b border-black/20 hover:bg-gray-50"
              >
                <td className="p-4">{row.date}</td>
                <td className="p-4">{row.user}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs">
                    {row.category}
                  </span>
                </td>
                <td className="p-4">{row.hours}</td>
                <td className="p-4">{row.tasks}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md">
                    completed
                  </span>
                </td>
                <td className="p-4">
                  <span
                    onClick={() => {
                      setSelectedRow(row);
                      setShowModal(true);
                    }}
                    className="text-blue-600 cursor-pointer hover:text-blue-800"
                  >
                    View Details
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && selectedRow && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setShowModal(false)}
          ></div>

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-[500px] p-6 rounded-2xl shadow-lg border border-black/10">
              <h2 className="text-lg font-bold mb-4">Task Details</h2>

              <div className="space-y-3 text-sm">
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {selectedRow.date}
                </p>
                <p>
                  <span className="font-semibold">User:</span>{" "}
                  {selectedRow.user}
                </p>
                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  {selectedRow.category}
                </p>
                <p>
                  <span className="font-semibold">Hours Logged:</span>{" "}
                  {selectedRow.hours}
                </p>
                <p>
                  <span className="font-semibold">Total Tasks:</span>{" "}
                  {selectedRow.tasks}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {selectedRow.status}
                </p>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 rounded-lg bg-black text-white text-sm hover:bg-black/80"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Report;
