import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CurrentDate from "../../util/CurrentDate";
import CurrentTime from "../../util/CurrentTime";
import { IoMdTime } from "react-icons/io";
import { FaArrowRightLong, FaArrowTrendUp } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { FaUserCheck, FaUserCog, FaUserPlus } from "react-icons/fa";
import { MdOutlineBlock, MdOutlineTaskAlt } from "react-icons/md";

import { GrSearch } from "react-icons/gr";
import { RiFilePaper2Fill } from "react-icons/ri";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const { user } = useContext(AuthContext);

  const [newUserHovered, setNewUserHovered] = useState(false);
  const [modifyUserHovered, setModifyUserHovered] = useState(false);
  const [viewLoginHovered, setViewLoginHovered] = useState(false);
  const [accessViolationHovered, setAccessViolationHovered] = useState(false);
  const [policyHovered, setPolicyHovered] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="border border-black/20 shadow-2xs rounded-2xl py-4 px-6 flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-semibold">Welcome back, {user?.name}</h2>
          <div>
            <CurrentDate />
          </div>
          <p className="text-sm text-black/70">
            Here's what's happening with your organization today.
          </p>
        </div>
        <div className="flex text-xs items-center px-4 gap-2 bg-blue-500 text-white rounded-2xl h-14">
          <IoMdTime size={22} />
          <div>
            <h2>Current Time</h2>
            <div>
              <CurrentTime />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="border flex justify-between border-black/20 w-[24%] shadow-2xs rounded-2xl py-4 px-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm">Total Employees</h2>
            <h2 className="font-semibold text-3xl">
              <CountUp start={0} end={124} duration={2} />
            </h2>
            <div className="flex items-center text-green-400 text-xs gap-2">
              <FaArrowTrendUp />
              <p>+8 this month</p>
            </div>
          </div>
          <div className="bg-blue-300/40 h-12 flex items-center justify-center p-3 rounded-2xl">
            <LuUsers className="text-blue-600" size={25} />
          </div>
        </div>
        <div className="border flex justify-between border-black/20 w-[24%] shadow-2xs rounded-2xl py-4 px-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm">Active Users This Month</h2>
            <h2 className="font-semibold text-3xl">
              <CountUp start={0} end={98} duration={2} />
            </h2>
            <div className="flex items-center text-green-400 text-xs gap-2">
              <FaArrowTrendUp />
              <p>+79% engagement</p>
            </div>
          </div>
          <div className="bg-green-300/20 h-12 flex items-center justify-center p-3 rounded-2xl">
            <FaUserCheck className="text-green-500" size={25} />
          </div>
        </div>
        <div className="border flex justify-between border-black/20 w-[24%] shadow-2xs rounded-2xl py-4 px-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm">Tasks Completed</h2>
            <h2 className="font-semibold text-3xl">
              <CountUp start={0} end={1248} duration={2} />
            </h2>
            <div className="flex items-center text-green-400 text-xs gap-2">
              <FaArrowTrendUp />
              <p>+156 this week</p>
            </div>
          </div>
          <div className="bg-purple-300/20 h-12 flex items-center justify-center p-3 rounded-2xl">
            <MdOutlineTaskAlt className="text-purple-600" size={25} />
          </div>
        </div>
        <div className="border flex justify-between border-black/20 w-[24%] shadow-2xs rounded-2xl py-4 px-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm">Overall Efficiency Score</h2>
            <h2 className="font-semibold text-3xl">
              <CountUp start={0} end={92} duration={2} />%
            </h2>
            <div className="flex items-center text-green-400 text-xs gap-2">
              <FaArrowTrendUp />
              <p>+3 from last month</p>
            </div>
          </div>
          <div className="bg-orange-300/20 h-12 flex items-center juc p-3 rounded-2xl">
            <FaArrowTrendUp className="text-orange-600" size={20} />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="border border-black/20 w-[40%] rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <div className="flex mt-3 ml-3 text-sm  flex-col gap-4">
            <div className="flex flex-col border-b-[0.5px] pb-2 border-black/20">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <div className="ml-2">
                  <h2>User John D added to Development Team</h2>
                </div>
              </div>
              <p className="ml-4 text-black/40 text-xs">2 hours ago</p>
            </div>
            <div className="flex flex-col border-b-[0.5px] pb-2 border-black/20">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <div className="ml-2">
                  <h2>Effort report submitted by Priya S</h2>
                </div>
              </div>
              <p className="ml-4 text-black/40 text-xs">4 hours ago</p>
            </div>
            <div className="flex flex-col border-b-[0.5px] pb-2 border-black/20">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <div className="ml-2">
                  <h2>Appreciation badge awarded to Team Alpha</h2>
                </div>
              </div>
              <p className="ml-4 text-black/40 text-xs">6 hours ago</p>
            </div>
            <div className="flex flex-col border-b-[0.5px] pb-2 border-black/20">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <div className="ml-2">
                  <h2>New security policy implemented</h2>
                </div>
              </div>
              <p className="ml-4 text-black/40 text-xs">8 hours ago</p>
            </div>
            <div className="flex flex-col border-black/20">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <div className="ml-2">
                  <h2>Quarterly review scheduled for next week</h2>
                </div>
              </div>
              <p className="ml-4 text-black/40 text-xs">1 day ago</p>
            </div>
          </div>
        </div>
        <div className="border border-black/20 w-[28%] rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Security & Compliance</h2>
          <div className="flex gap-3 flex-col text-sm">
            <div
              onMouseEnter={() => setViewLoginHovered(true)}
              onMouseLeave={() => setViewLoginHovered(false)}
              className="bg-black/2 py-4 px-4 rounded-2xl flex  gap-2 items-center justify-between cursor-pointer hover:bg-black/10"
            >
              <div className="flex gap-2">
                <GrSearch className="text-blue-400" size={23} />
                <h2>View Login Activity</h2>
              </div>
              <FaArrowRightLong
                className={`mr-6 transition-all ease-in-out duration-300 ${
                  viewLoginHovered && "translate-x-3"
                }`}
                size={16}
              />
            </div>
            <div
              onMouseEnter={() => setAccessViolationHovered(true)}
              onMouseLeave={() => setAccessViolationHovered(false)}
              className="bg-black/2 py-4 px-4 rounded-2xl flex  gap-2 items-center justify-between cursor-pointer hover:bg-black/10"
            >
              <div className="flex gap-2">
                <MdOutlineBlock className="text-red-400" size={23} />
                <h2>Access Violation Logs</h2>
              </div>
              <FaArrowRightLong
                className={`mr-6 transition-all ease-in-out duration-300 ${
                  accessViolationHovered && "translate-x-3"
                }`}
                size={16}
              />
            </div>
            <div
              onMouseEnter={() => setPolicyHovered(true)}
              onMouseLeave={() => setPolicyHovered(false)}
              className="bg-black/2 py-4 px-4 rounded-2xl flex  gap-2 items-center justify-between cursor-pointer hover:bg-black/10"
            >
              <div className="flex gap-2">
                <RiFilePaper2Fill className="text-amber-600" size={23} />
                <h2>Policy Updates</h2>
              </div>
              <FaArrowRightLong
                className={`mr-6 transition-all ease-in-out duration-300 ${
                  policyHovered && "translate-x-3"
                }`}
                size={16}
              />
            </div>
          </div>
        </div>
        <div className="border border-black/20 w-[28%] rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex gap-3 flex-col text-sm">
            <Link
              to="/user-management"
              onMouseEnter={() => setNewUserHovered(true)}
              onMouseLeave={() => setNewUserHovered(false)}
              className="bg-black/2 py-4 px-4 rounded-2xl flex  gap-2 items-center justify-between cursor-pointer hover:bg-black/10"
            >
              <div className="flex gap-2">
                <FaUserPlus className="text-blue-500" size={23} />
                <h2>Create New User</h2>
              </div>
              <FaArrowRightLong
                className={`mr-6 transition-all ease-in-out duration-300 ${
                  newUserHovered && "translate-x-3"
                }`}
                size={16}
              />
            </Link>
            <Link
              to="/user-management"
              onMouseEnter={() => setModifyUserHovered(true)}
              onMouseLeave={() => setModifyUserHovered(false)}
              className="bg-black/2 py-4 px-4 rounded-2xl flex  gap-2 items-center justify-between cursor-pointer hover:bg-black/10"
            >
              <div className="flex gap-2">
                <FaUserCog className="text-green-600" size={23} />
                <h2>Modify User</h2>
              </div>
              <FaArrowRightLong
                className={`mr-6 transition-all ease-in-out duration-300 ${
                  modifyUserHovered && "translate-x-3"
                }`}
                size={16}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
