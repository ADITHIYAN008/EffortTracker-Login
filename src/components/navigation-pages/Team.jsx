import React, { useState, useMemo } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiMail, FiPhone } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { TEAM_DATA as TEAM_MEMBERS } from "../../../json/Team";

function statusDotClass(status) {
  if (status === "Active") return "bg-green-500";
  if (status === "Idle") return "bg-yellow-500";
  if (status === "Busy") return "bg-orange-500";
  if (status === "Offline") return "bg-gray-400";
  if (status === "On Leave") return "bg-blue-500";
  if (status === "In Training") return "bg-purple-500";
  return "bg-gray-400";
}

function statusBadgeClass(status) {
  if (status === "Active") return "bg-green-100 text-green-500";
  if (status === "Idle") return "bg-yellow-100 text-yellow-700";
  if (status === "Busy") return "bg-orange-100 text-orange-500";
  if (status === "Offline") return "bg-gray-100 text-gray-500";
  if (status === "On Leave") return "bg-blue-100 text-blue-600";
  if (status === "In Training") return "bg-purple-100 text-purple-600";
  return "bg-gray-100 text-gray-500";
}

const ROLE_TAG = {
  Manager: "bg-blue-100 text-blue-600",
  Developer: "bg-purple-100 text-purple-600",
  "Senior Developer": "bg-red-100 text-red-600",
  Tester: "bg-emerald-100 text-emerald-600",
  "UI/UX Designer": "bg-pink-100 text-pink-600",
  "Project Lead": "bg-indigo-100 text-indigo-600",
  "Business Analyst": "bg-yellow-100 text-yellow-700",
  "HR Coordinator": "bg-sky-100 text-sky-600",
  "QA Lead": "bg-lime-100 text-lime-600",
  "Scrum Master": "bg-violet-100 text-violet-600",
  "DevOps Engineer": "bg-stone-100 text-stone-600",
  "Technical Architect": "bg-amber-100 text-amber-700",
  "Full Stack Developer": "bg-rose-100 text-rose-600",
  "Support Engineer": "bg-cyan-100 text-cyan-600",
  "Cloud Engineer": "bg-slate-100 text-slate-600",
  "Product Manager": "bg-emerald-100 text-emerald-600",
  "Security Analyst": "bg-fuchsia-100 text-fuchsia-600",
  "Frontend Developer": "bg-teal-100 text-teal-600",
  "Software Engineer": "bg-gray-100 text-gray-600",
  "Data Analyst": "bg-amber-100 text-amber-600",
};

export default function Team() {
  const [teamList, setTeamList] = useState(
    TEAM_MEMBERS.map((m) => ({ ...m, team: !!m.team }))
  );
  const [addMember, setAddMember] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });
  const [detailDrawer, setDetailDrawer] = useState({
    open: false,
    member: null,
  });

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRole, setFilterRole] = useState("");

  const teamCount = teamList.filter((m) => m.team).length;

  const toggleTeam = (id) => {
    setTeamList((prev) =>
      prev.map((user) => (user.id === id ? { ...user, team: true } : user))
    );
  };

  const deleteTeam = (id) => {
    setConfirmDelete({ open: false, id: null });
    setTeamList((prev) =>
      prev.map((user) => (user.id === id ? { ...user, team: false } : user))
    );
  };

  const openConfirm = (id) => setConfirmDelete({ open: true, id });

  const openDetails = (member) => setDetailDrawer({ open: true, member });

  const notInTeamFiltered = useMemo(() => {
    return teamList.filter((m) => {
      if (m.team) return false;
      if (search && !m.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (filterStatus && m.status !== filterStatus) return false;
      if (filterRole && m.role !== filterRole) return false;
      return true;
    });
  }, [teamList, search, filterStatus, filterRole]);

  const STATUS_OPTIONS = Array.from(new Set(teamList.map((t) => t.status)));
  const ROLE_OPTIONS = Array.from(new Set(teamList.map((t) => t.role)));

  return (
    <div className="p-6 ">
      <div className="flex justify-between  items-start gap-4">
        <div>
          <h2 className="text-xl font-bold">Team Members</h2>
          <h3 className="text-sm text-black/50">
            Manage your team structure and view member details
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm px-3 py-2 rounded-full bg-black/5 text-black/80">
            Team Members <span className="ml-2 font-semibold">{teamCount}</span>
          </div>

          <button
            onClick={() => setAddMember(true)}
            className="bg-blue-400 hover:bg-blue-500 cursor-pointer text-white flex gap-2 items-center px-4 py-2 rounded-xl text-sm"
          >
            <h2>Add Member</h2>
            <IoMdAdd size={18} />
          </button>
        </div>
      </div>

      {addMember && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => {
              setAddMember(false);
              setSearch("");
              setFilterRole("");
              setFilterStatus("");
            }}
          />

          <div className="fixed inset-0 flex items-start justify-center z-50 pt-16">
            <div className="w-[90%] max-w-5xl hide-scrollbar overflow-scroll bg-white rounded-2xl border border-black/20 p-6 shadow-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Add Members</h3>
                <div className="flex items-center gap-3">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name..."
                    className="px-3 cursor-pointer py-2 border rounded-lg text-sm outline-none"
                  />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 cursor-pointer border rounded-lg text-sm outline-none"
                  >
                    <option value="">All Status</option>
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-3 py-2 border cursor-pointer rounded-lg text-sm outline-none"
                  >
                    <option value="">All Roles</option>
                    {ROLE_OPTIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => {
                      setSearch("");
                      setFilterRole("");
                      setFilterStatus("");
                    }}
                    className="px-3 py-2 cursor-pointer bg-black text-white rounded-lg text-sm"
                  >
                    Reset
                  </button>

                  <button
                    onClick={() => {
                      setAddMember(false);
                      setSearch("");
                      setFilterRole("");
                      setFilterStatus("");
                    }}
                    className="px-4 py-2 bg-blue-400 cursor-pointer hover:bg-blue-500 text-white rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="mt-7 grid grid-cols-3 hide-scrollbar h-[700px] overflow-scroll gap-5">
                {notInTeamFiltered.length === 0 ? (
                  <div className="col-span-3 text-center text-gray-500 py-10">
                    No users found
                  </div>
                ) : (
                  notInTeamFiltered.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleTeam(item.id)}
                      className={`border border-black/20 shadow-md rounded-xl w-min-[350px] h-[300px] cursor-pointer p-6 hover:bg-black/5 transform transition-all duration-300 ease-in-out`}
                    >
                      <div className="flex relative justify-between">
                        <div className="w-16 border border-black/40 h-16 rounded-full overflow-hidden relative">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <div
                            className={`w-3 h-3 absolute -top-1 rounded-full left-12 ${statusDotClass(
                              item.status
                            )} ${
                              item.status === "Active" ? "animate-pulse" : ""
                            }`}
                          />
                        </div>

                        <BsThreeDotsVertical
                          className="cursor-pointer text-black/50"
                          size={22}
                        />
                      </div>

                      <div className="flex border-b border-black/10 pb-4 flex-col mt-5">
                        <h2 className="text-xl">{item.name}</h2>
                        <h3 className="text-md text-black/70">{item.role}</h3>
                        <div className="flex mt-2 items-center gap-2 text-black/50 text-[12px]">
                          <FiMail />
                          <h3>{item.email}</h3>
                        </div>
                      </div>

                      <div className="flex gap-8 mt-5 items-center">
                        <div>
                          <h1 className="font-bold">{item.tasksDone}</h1>
                          <h3 className="text-xs text-black/50">Tasks Done</h3>
                        </div>
                        <div>
                          <h1 className="font-bold">{item.hoursLogged}</h1>
                          <h1 className="text-xs text-black/50">
                            Hours Logged
                          </h1>
                        </div>

                        <span
                          className={`${statusBadgeClass(
                            item.status
                          )} mt-2 px-4 text-xs flex gap-1 items-center rounded-full`}
                        >
                          <GoDotFill />
                          <span>{item.status}</span>
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="mt-7 grid grid-cols-4 gap-5">
        {teamList.filter((m) => m.team).length === 0 ? (
          <div className="col-span-4 text-center text-gray-500 py-10">
            No team members yet
          </div>
        ) : (
          teamList.map(
            (item) =>
              item.team && (
                <div
                  key={item.id}
                  onClick={() => openDetails(item)}
                  className="border border-black/20 shadow-md rounded-xl w-min-[350px] h-[300px] cursor-pointer p-6 transform transition-all duration-300 ease-in-out hover:scale-[1.01]"
                >
                  <div className="flex relative justify-between">
                    <div className="flex items-start gap-4 cursor-pointer">
                      <div className="w-16 border border-black/40 h-16 rounded-full overflow-hidden relative">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div
                          className={`w-3 h-3 absolute -top-1 rounded-full left-12 ${statusDotClass(
                            item.status
                          )} ${
                            item.status === "Active" ? "animate-pulse" : ""
                          }`}
                        />
                      </div>
                      <div>
                        <h2 className="text-xl mb-1">{item.name}</h2>
                        <div
                          className={`text-[10px] inline-block px-2 py-1 rounded-full ${
                            ROLE_TAG[item.role] || "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.role}
                        </div>
                      </div>
                    </div>

                    <BsThreeDotsVertical
                      onClick={() => openConfirm(item.id)}
                      className="cursor-pointer text-black/50"
                      size={22}
                    />
                  </div>

                  <div className="flex border-b border-black/10 pb-4 flex-col mt-5">
                    <div className="flex items-center gap-2 text-black/50 text-[12px]">
                      <FiMail />
                      <h3>{item.email}</h3>
                    </div>
                  </div>

                  <div className="flex gap-8 mt-5 items-center">
                    <div>
                      <h1 className="font-bold">{item.tasksDone}</h1>
                      <h3 className="text-xs">Tasks Done</h3>
                    </div>
                    <div>
                      <h1 className="font-bold">{item.hoursLogged}</h1>
                      <h1 className="text-xs">Hours Logged</h1>
                    </div>

                    <span
                      className={`${statusBadgeClass(
                        item.status
                      )} mt-2 px-4 text-xs flex gap-1 items-center rounded-full`}
                    >
                      <GoDotFill />
                      <span>{item.status}</span>
                    </span>
                  </div>
                  <div className="mt-8 flex justify-between border px-8 py-2 rounded-xl">
                    <div className="flex gap-2 hover:text-red-500 transition-all w-fit items-center">
                      <FiMail size={18} />
                      <a className="text-xs" href={`mailto:${item.email}`}>
                        Email
                      </a>
                    </div>

                    <div className="flex hover:text-red-500 transition-all gap-2 w-fit items-center">
                      <FiPhone size={18} />
                      <a className="text-xs" href={`tel:${item.phone}`}>
                        Call
                      </a>
                    </div>
                  </div>
                </div>
              )
          )
        )}
      </div>

      {confirmDelete.open && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setConfirmDelete({ open: false, id: null })}
          />
          <div className="fixed inset-0 flex items-center justify-center z-60">
            <div className="bg-white rounded-xl border p-6 shadow-lg w-96">
              <h3 className="text-lg font-semibold mb-2">Remove Member</h3>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to remove this member from the team?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDelete({ open: false, id: null })}
                  className="px-4 py-2  cursor-pointer rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteTeam(confirmDelete.id)}
                  className="px-4 py-2 cursor-pointer rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {detailDrawer.open && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-50"
            onClick={() => setDetailDrawer({ open: false, member: null })}
          />
          <div className="fixed right-0 top-0 h-full w-[380px] bg-white shadow-2xl z-60 transform transition-transform duration-300">
            <div className="p-6 ">
              <div className="mt-4 flex gap-5 items-center ">
                <img
                  src={detailDrawer.member.img}
                  alt={detailDrawer.member.name}
                  className="w-28 h-28 rounded-full object-cover"
                />
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {detailDrawer.member.name}
                    </h2>
                    <div
                      className={`text-xs mt-1 inline-block px-2 py-1 rounded-full ${
                        ROLE_TAG[detailDrawer.member.role] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {detailDrawer.member.role}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <FiMail />
                  <span>{detailDrawer.member.email}</span>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Tasks Done</div>
                  <div className="font-semibold text-lg">
                    {detailDrawer.member.tasksDone}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Hours Logged</div>
                  <div className="font-semibold text-lg">
                    {detailDrawer.member.hoursLogged}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Status</div>
                  <div className="mt-1">
                    <span
                      className={`${statusBadgeClass(
                        detailDrawer.member.status
                      )} px-3 py-1 mt-1 rounded-full inline-flex items-center gap-2`}
                    >
                      <GoDotFill />
                      <span>{detailDrawer.member.status}</span>
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Email</div>
                  <div className="mt-1">{detailDrawer.member.email}</div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    openConfirm(detailDrawer.member.id);
                  }}
                  className="px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 bg-blue-500 text-white"
                >
                  Remove from Team
                </button>
                <button
                  onClick={() => {
                    setDetailDrawer({ open: false, member: null });
                  }}
                  className="px-4 py-2 cursor-pointer rounded-lg border"
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
