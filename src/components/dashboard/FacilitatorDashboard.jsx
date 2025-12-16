import React, { useContext } from "react";
import { IoIosRedo, IoMdTime } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";
import { FaArrowTrendUp, FaRegCalendar, FaUserCheck } from "react-icons/fa6";
import CountUp from "react-countup";
import { MdOutlineCreateNewFolder, MdOutlineTaskAlt } from "react-icons/md";
import { LuUpload, LuUsers } from "react-icons/lu";
import { SlBadge } from "react-icons/sl";
import { IoEyeOutline } from "react-icons/io5";
import { TbDownload } from "react-icons/tb";
import { Link } from "react-router-dom";

function FacilitatorDashboard() {
  const { user } = useContext(AuthContext);
  return (
    <div className="p-4">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold">Welcome back, {user?.name}</h2>
        <p className="text-sm text-black/70">
          Manage Ignite batches and track trainee progress.
        </p>
      </div>
      <div className="flex mt-7 justify-between">
        <div className="border flex justify-between border-black/20 w-[24%] shadow-2xs rounded-2xl py-6 px-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm">Active Batches</h2>
            <h2 className="font-semibold text-3xl">
              <CountUp start={0} end={12} duration={2} />
            </h2>
          </div>
          <div className="bg-blue-300/40 h-12 flex items-center justify-center p-3 rounded-2xl">
            <LuUsers className="text-blue-600" size={25} />
          </div>
        </div>
        <div className="border flex justify-between border-black/20 w-[24%] shadow-2xs rounded-2xl py-6 px-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm">Upcoming Batches</h2>
            <h2 className="font-semibold text-3xl">
              <CountUp start={0} end={5} duration={2} />
            </h2>
          </div>
          <div className="bg-green-300/20 h-12 flex items-center justify-center p-3 rounded-2xl">
            <FaRegCalendar className="text-green-500" size={25} />
          </div>
        </div>
        <div className="border flex justify-between border-black/20 w-[24%] shadow-2xs rounded-2xl py-6 px-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm">Total Trainees</h2>
            <h2 className="font-semibold text-3xl">
              <CountUp start={0} end={347} duration={2} />
            </h2>
          </div>
          <div className="bg-purple-300/20 h-12 flex items-center justify-center p-3 rounded-2xl">
            <FaArrowTrendUp className="text-purple-600" size={25} />
          </div>
        </div>
        <div className="border flex justify-between border-black/20 w-[24%] shadow-2xs rounded-2xl py-6 px-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm">Completion Rate</h2>
            <h2 className="font-semibold text-3xl">
              <CountUp start={0} end={87} duration={2} />%
            </h2>
          </div>
          <div className="bg-orange-300/20 h-12 flex items-center juc p-3 rounded-2xl">
            <SlBadge className="text-orange-600" size={20} />
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-between">
        <div className="w-[65%] p-6 rounded-2xl shadow-2xs border border-black/20">
          <h2 className="text-lg font-semibold">Upcoming Batch Spotlight</h2>
          <div className="mt-4 text-white bg-blue-500 rounded-2xl flex justify-between p-6">
            <div>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold tracking-wider">
                  IGNITE-2025-A
                </h2>
                <h2 className="text-md">Start Date: Jan 15,2025</h2>
                <h2 className="text-md">Duration: 16 Weeks</h2>
              </div>
              <div className="bg-white hover:bg-white/80  cursor-pointer text-blue-500 flex justify-center items-center py-2 mt-6 rounded-md">
                View Batch
              </div>
            </div>
            <div className="bg-white/20 text-xs h-7 flex items-center justify-center px-4 rounded-xl font-semibold">
              Upcoming
            </div>
          </div>
        </div>
        <div className="border w-[33%] border-slate-200 shadow-sm p-6 rounded-2xl bg-white">
          <h2 className="text-lg font-semibold text-slate-800">
            Quick Actions
          </h2>

          <div className="mt-5 flex flex-col gap-3">
            <Link
              to="/batch-creation"
              className="
        border border-slate-200
        bg-white
        hover:bg-slate-50
        transition
        p-3
        flex items-center gap-3
        rounded-xl
        text-slate-700
      "
            >
              <MdOutlineCreateNewFolder size={22} className="text-slate-600" />
              <h2>Create New Batch</h2>
            </Link>

            <Link
              to="/batches"
              className="
        border border-slate-200
        bg-white
        hover:bg-slate-50
        transition
        p-3
        flex items-center gap-3
        rounded-xl
        text-slate-700
      "
            >
              <IoEyeOutline size={22} className="text-slate-600" />
              <h2>View All Batches</h2>
            </Link>

            <Link
              to="/reports"
              className="
        border border-slate-200
        bg-white
        hover:bg-slate-50
        transition
        p-3
        flex items-center gap-3
        rounded-xl
        text-slate-700
      "
            >
              <TbDownload size={22} className="text-slate-600" />
              <h2>Download Batch Report</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacilitatorDashboard;
