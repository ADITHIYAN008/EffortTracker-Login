import { useEffect, useState } from "react";
import Sidebar from "../main/Sidebar";
import Topbar from "../main/Topbar";
import Dashboard from "../navigation-pages/Dashboard";
import Calendar from "../navigation-pages/Calendar";
import Team from "../navigation-pages/Team";
import Profile from "../navigation-pages/Profile";
import Report from "../navigation-pages/Report";
import ThreeDotsLoader from "../../util/ThreeDotsLoader";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem("currentPage") || "dashboard";
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", isOpen);
  }, [isOpen]);

  return (
    <div className="h-screen w-full flex overflow-hidden">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <ThreeDotsLoader />
        </div>
      ) : (
        <>
          <div className="w-56 fixed left-0 top-0 h-screen">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>

          <div className="flex-1 ml-56 flex flex-col h-screen">
            <div className="fixed top-0 left-56 right-0 z-10 bg-white">
              <Topbar />
            </div>

            <main className="flex-1 mt-[70px] hide-scrollbar overflow-y-auto p-4">
              {isOpen === "dashboard" && <Dashboard />}
              {isOpen === "calendar" && <Calendar />}
              {isOpen === "team" && <Team />}
              {isOpen === "profile" && <Profile />}
              {isOpen === "reports" && <Report />}
            </main>
          </div>
        </>
      )}
    </div>
  );
}
