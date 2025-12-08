import React, { useState } from "react";
import { MY_PROFILE as profile } from "../../../json/Profile";
import { FiMail } from "react-icons/fi";
import { FaLocationDot, FaRegCalendar, FaRegStar } from "react-icons/fa6";
import { RxPencil1 } from "react-icons/rx";
import { BsDot } from "react-icons/bs";
import { IoIosTrendingUp } from "react-icons/io";
import { SlBadge } from "react-icons/sl";
import { PiBagSimpleBold } from "react-icons/pi";
import Overview from "../profile/Overview";
import Achievements from "../profile/Achievements";
import CareerHistory from "../profile/CareerHistory";
import Performance from "../profile/Performance";

function Profile() {
  const [activeTab, setActiveTab] = useState("Overview");
  return (
    <div className="px-6 ">
      <div className="flex justify-between border p-5 rounded-xl shadow-md border-black/20">
        <div className="flex gap-5">
          <div className="w-30 h-30 border-2 border-black/50 shadow-xl rounded-md overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={profile.img}
              alt={profile.name}
            />
          </div>
          <div className="flex flex-col mt-2 gap-2">
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
            <div className="flex items-center">
              <h2 className="text-sm text-black/50">{profile.role}</h2>
              <BsDot className="text-black/50" size={22} />
              <h2 className="text-sm text-black/50">
                {profile.department} Department
              </h2>
            </div>
            <div className="flex mt-2 gap-5">
              <div className="flex text-sm gap-2 items-center">
                <FiMail />
                <h2>{profile.email}</h2>
              </div>
              <div className="flex gap-2 text-sm items-center">
                <FaLocationDot />
                <h2>{profile.location}</h2>
              </div>
              <div className="flex gap-2  text-sm items-center">
                <FaRegCalendar />
                <h2>Joined {profile.joined}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm">
          <div className="flex bg-blue-400 px-3 hover:bg-blue-500 text-white cursor-pointer rounded-xl py-2 items-center gap-2">
            <RxPencil1 />
            <h2>Edit Profile</h2>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-[24%] h-30 border border-black/20 shadow-md mt-5 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100/50 w-10 h-10 flex items-center justify-center p-1 rounded-md">
              <IoIosTrendingUp className="text-blue-600" size={25} />
            </div>
            <h2 className="text-2xl font-semibold">
              {profile.performanceScore}%
            </h2>
          </div>
          <h2 className="mt-3 text-sm text-black/50">Performance Score</h2>
        </div>
        <div className="w-[24%] h-30 border border-black/20 shadow-md mt-5 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100/50 w-10 h-10 flex items-center justify-center p-1 rounded-md">
              <SlBadge className="text-green-600" size={25} />
            </div>
            <h2 className="text-2xl font-semibold">{profile.appreciations}</h2>
          </div>
          <h2 className="mt-3 text-sm text-black/50">Appriciations</h2>
        </div>
        <div className="w-[24%] h-30 border border-black/20 shadow-md mt-5 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100/50 w-10 h-10 flex items-center justify-center p-1 rounded-md">
              <FaRegStar className="text-purple-600" size={25} />
            </div>
            <h2 className="text-2xl font-semibold">{profile.badges}</h2>
          </div>
          <h2 className="mt-3 text-sm text-black/50">Badges Earned</h2>
        </div>
        <div className="w-[24%] h-30 border border-black/20 shadow-md mt-5 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-100/50 w-10 h-10 flex items-center justify-center p-1 rounded-md">
              <PiBagSimpleBold className="text-red-400" size={25} />
            </div>
            <h2 className="text-2xl font-semibold">{profile.experience}y</h2>
          </div>
          <h2 className="mt-3 text-sm text-black/50">Experience</h2>
        </div>
      </div>
      <div className="relative text-sm flex gap-2 mt-5 border text-black shadow-md border-black/20 w-fit rounded-xl items-center px-1">
        <div
          className="absolute top-1 bottom-1 rounded-xl bg-black transition-all duration-300"
          style={{
            left:
              activeTab === "Overview"
                ? "0.40rem"
                : activeTab === "Career History"
                ? "6.8rem"
                : activeTab === "Achievements"
                ? "15.2rem"
                : "23rem",
            width:
              activeTab === "Overview"
                ? "6rem"
                : activeTab === "Career History"
                ? "7rem"
                : activeTab === "Achievements"
                ? "7rem"
                : "7rem",
          }}
        ></div>

        <h2
          onClick={() => setActiveTab("Overview")}
          className={`cursor-pointer py-2 rounded-xl px-4 relative z-10 ${
            activeTab === "Overview" && "text-white"
          }`}
        >
          Overview
        </h2>

        <h2
          onClick={() => setActiveTab("Career History")}
          className={`cursor-pointer py-2 rounded-xl px-4 relative z-10 ${
            activeTab === "Career History" && "text-white"
          }`}
        >
          Career History
        </h2>

        <h2
          onClick={() => setActiveTab("Achievements")}
          className={`cursor-pointer py-3  rounded-xl px-4 relative z-10 ${
            activeTab === "Achievements" && "text-white"
          }`}
        >
          Achievements
        </h2>

        <h2
          onClick={() => setActiveTab("Performance")}
          className={`cursor-pointer py-2 rounded-xl px-4 relative z-10 ${
            activeTab === "Performance" && "text-white"
          }`}
        >
          Performance
        </h2>
      </div>
      <div className="mt-5">
        {activeTab === "Overview" && <Overview />}
        {activeTab === "Career History" && <CareerHistory />}
        {activeTab === "Achievements" && <Achievements />}
        {activeTab === "Performance" && <Performance />}
      </div>
    </div>
  );
}

export default Profile;
