import React, { useState } from "react";
import { FaChevronDown, FaRegBell } from "react-icons/fa";
import { FiBell, FiSearch } from "react-icons/fi";

function Topbar() {
  const [isProfile, setIsProfile] = useState(false);
  return (
    <div className="h-15 flex items-center px-5 justify-between border-b-[1px] border-black/30">
      <div className="w-96 bg-gray-200/50 border border-black/10 h-10 rounded-xl pl-3 flex items-center focus-within:outline-none focus-within:ring-0">
        <FiSearch className="text-black/50" />
        <input
          placeholder="Search tasks, team members, reports..."
          className="w-[350px] placeholder:text-sm ml-2 text-sm outline-none  focus:outline-none focus:ring-0"
        />
      </div>

      <div className="flex gap-6 items-center">
        <div className="hover:bg-gray-200/50 relative p-2 rounded-full cursor-pointer transition-all duration-200 ease-in-out">
          <FiBell size={20} className="text-black/50" />
          <div className="w-2 h-2 absolute top-1 right-1 rounded-full bg-red-500"></div>
        </div>
        <div className="relative ">
          <div
            onClick={() => setIsProfile(!isProfile)}
            className="flex items-center gap-2 cursor-pointer border-l border-black/20 pl-5"
          >
            <div className="flex items-center gap-2">
              <div className="bg-black w-8 h-8 rounded-full overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h1 className="text-[12px] font-bold">Cristiano Ronaldo</h1>
                <h2 className="text-[10px] font-semibold text-black/50">
                  Admin
                </h2>
              </div>
            </div>
            <FaChevronDown size={12} />
          </div>
          {isProfile && (
            <div className="bg-white border border-black/30 w-full ml-2 top-10 rounded-xl h-auto py-5 absolute flex justify-center px-5 items-center">
              <ul className="flex flex-col w-full gap-2">
                <li className="border-b cursor-pointer pb-2 text-sm border-black/20 w-full">
                  Password Reset
                </li>
                <li className="border-b pb-2 cursor-pointer text-sm border-black/20 w-full">
                  Settings
                </li>
                <li className="text-sm cursor-pointer">Status</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Topbar;
