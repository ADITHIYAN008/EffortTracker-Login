import React, { useContext, useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FiBell, FiSearch } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";
import { GoDotFill } from "react-icons/go";
import ThemeToggle from "../../context/ThemeToggle";

function Topbar() {
  const { user } = useContext(AuthContext);

  const [isProfile, setIsProfile] = useState(false);
  const [notificationPanel, setNotificationPanel] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  /* ======================
     CLOSE ON OUTSIDE CLICK
  ====================== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target) &&
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setNotificationPanel(false);
        setIsProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-15 flex items-center px-5 justify-between border-b border-black/20">
      {/* SEARCH */}
      <div className="w-96 bg-gray-200/50 border border-black/10 h-10 rounded-xl pl-3 flex items-center">
        <FiSearch className="text-black/50" />
        <input
          placeholder="Search tasks, team members, reports..."
          className="w-full ml-2 text-sm outline-none bg-transparent"
        />
      </div>

      <div className="flex gap-6 items-center">
        <ThemeToggle />

        <div ref={notifRef} className="relative">
          <button
            onClick={() => {
              setNotificationPanel((prev) => !prev);
              setIsProfile(false);
            }}
            className="hover:bg-gray-200/50 cursor-pointer p-2 rounded-full relative"
          >
            <FiBell size={20} className="text-black/60" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {notificationPanel && (
            <div
              className="
                absolute top-14 -left-44 w-96 z-50
                rounded-2xl
                bg-white/85 backdrop-blur-xl
                border border-white/40
                shadow-[0_25px_60px_rgba(0,0,0,0.28)]
                ring-1 ring-black/5
                overflow-hidden
              "
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-black/10">
                <h2 className="text-sm font-semibold text-black/70">
                  Notifications
                </h2>
                <button
                  onClick={() => setNotificationPanel(false)}
                  className="text-black/40 cursor-pointer hover:text-black"
                >
                  ✕
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {[
                  {
                    id: 1,
                    name: "Karthikeyan",
                    role: "Facilitator",
                    time: "2 hours ago",
                  },
                  {
                    id: 2,
                    name: "Kishore",
                    role: "Teaching Assistant",
                    time: "3 hours ago",
                  },
                  {
                    id: 3,
                    name: "Adithiyan",
                    role: "Admin",
                    time: "5 hours ago",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="group flex gap-3 px-5 py-4 hover:bg-black/5 transition"
                  >
                    <div className="w-9 h-9 rounded-full bg-blue-500/15 text-blue-600 flex items-center justify-center font-semibold">
                      {item.name[0]}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold">{item.name}</span>{" "}
                        created a new batch
                      </p>
                      <div className="flex items-center gap-1 text-xs text-black/50 mt-1">
                        <span>{item.time}</span>
                        <GoDotFill size={8} />
                        <span>{item.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="px-5 py-3 border-t border-black/10 text-center">
                <button className="text-sm cursor-pointer text-blue-600 hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => {
              setIsProfile((prev) => !prev);
              setNotificationPanel(false);
            }}
            className="flex items-center gap-2 border-l pl-5 border-black/20"
          >
            <div className="w-8 h-8 rounded-full border flex items-center justify-center">
              <span className="font-semibold">{user.name[0]}</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold">{user.name}</p>
              <p className="text-[10px] text-black/50">{user.role}</p>
            </div>
            <FaChevronDown size={12} />
          </button>

          {isProfile && (
            <div className="absolute right-0 top-12 bg-white border rounded-xl shadow-xl p-4 w-40">
              <ul className="text-sm space-y-2">
                <li className="hover:underline cursor-pointer">
                  Reset Password
                </li>
                <li className="hover:underline cursor-pointer">Settings</li>
                <li className="hover:underline cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
