import React, { useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaRegCalendar } from "react-icons/fa";
import { FiCoffee } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbLogout2, TbReportSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/auth/login");
  };

  return (
    <div className="w-56 border-r-[1px] border-black/30 h-screen py-2 flex flex-col justify-between">
      <div>
        <div className="flex gap-2 justify-center mt-1 items-center border-b-[1px] pb-5 border-black/30">
          <FiCoffee size={30} />
          <div>
            <h1 className="text-md font-bold">Effort Tracker</h1>
            <h2 className="text-xs text-black/50">Internal Portal</h2>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center p-3 text-center">
          <div
            onClick={() => setIsOpen("dashboard")}
            className={`${
              isOpen === "dashboard"
                ? "bg-black text-white"
                : " hover:bg-gray-100"
            } 
              w-full cursor-pointer rounded-md`}
          >
            <div className="flex items-center py-2 ml-6 gap-2">
              <LuLayoutDashboard />
              <h3 className="text-sm">Dashboard</h3>
            </div>
          </div>

          <div
            onClick={() => setIsOpen("calendar")}
            className={`${
              isOpen === "calendar"
                ? "bg-black text-white"
                : " hover:bg-gray-100"
            } 
              w-full cursor-pointer rounded-md `}
          >
            {" "}
            <div className="flex items-center py-2 ml-6 gap-2">
              <FaRegCalendar />

              <h3 className="text-sm">Calendar</h3>
            </div>
          </div>

          <div
            onClick={() => setIsOpen("team")}
            className={`${
              isOpen === "team" ? "bg-black text-white" : " hover:bg-gray-100"
            } 
              w-full cursor-pointer rounded-md `}
          >
            <div className="flex items-center py-2 ml-6 gap-2">
              <BsFillPeopleFill size={20} />

              <h3 className="text-sm">Team</h3>
            </div>
          </div>

          <div
            onClick={() => setIsOpen("profile")}
            className={`${
              isOpen === "profile"
                ? "bg-black text-white"
                : " hover:bg-gray-100"
            } 
              w-full cursor-pointer rounded-md `}
          >
            <div className="flex items-center py-2 ml-6 gap-2">
              <GoPerson size={20} />

              <h3 className="text-sm">Profile</h3>
            </div>
          </div>

          <div
            onClick={() => setIsOpen("reports")}
            className={`${
              isOpen === "reports" ? "bg-black text-white" : "hover:bg-gray-100"
            } 
              w-full cursor-pointer rounded-md `}
          >
            <div className="flex items-center py-2 ml-6 gap-2">
              <TbReportSearch size={20} />
              <h3 className="text-sm">Reports</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div
          onClick={handleLogout}
          className="bg-black/80 text-white mx-6 rounded-md flex items-center justify-center flex-row-reverse gap-10 py-2 cursor-pointer hover:bg-black transition-all duration-200 ease-in-oute mb-5"
        >
          <TbLogout2 />
          Logout
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
