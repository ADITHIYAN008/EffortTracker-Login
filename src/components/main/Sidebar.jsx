import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaRegCalendar } from "react-icons/fa";
import { FiCoffee } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbLogout2, TbReportSearch } from "react-icons/tb";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const current = location.pathname;

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/auth/login");
  };

  const menu = [
    { label: "Dashboard", icon: <LuLayoutDashboard />, path: "/dashboard" },
    { label: "Calendar", icon: <FaRegCalendar />, path: "/calendar" },
    { label: "Team", icon: <BsFillPeopleFill />, path: "/team" },
    { label: "Profile", icon: <GoPerson />, path: "/profile" },
    { label: "Reports", icon: <TbReportSearch />, path: "/reports" },
  ];

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
          {menu.map((item, index) => {
            const isActive = current.startsWith(item.path);

            return (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className={`${
                  isActive ? "bg-black text-white" : "hover:bg-gray-100"
                } w-full cursor-pointer rounded-md`}
              >
                <div className="flex items-center py-2 ml-6 gap-2">
                  {item.icon}
                  <h3 className="text-sm">{item.label}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <div
          onClick={handleLogout}
          className="bg-black/80 text-white mx-6 rounded-md flex items-center justify-center flex-row-reverse gap-10 py-2 cursor-pointer hover:bg-black transition-all duration-200 ease-in-out mb-5"
        >
          <TbLogout2 />
          Logout
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
