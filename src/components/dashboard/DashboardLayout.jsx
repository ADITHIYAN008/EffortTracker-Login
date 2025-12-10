import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../main/Sidebar";
import Topbar from "../main/Topbar";
import ThreeDotsLoader from "../../util/ThreeDotsLoader";

export default function DashboardLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full flex overflow-hidden">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <ThreeDotsLoader />
        </div>
      ) : (
        <>
          <div className="w-56 fixed left-0 top-0 h-screen">
            <Sidebar />
          </div>

          <div className="flex-1 ml-56 flex flex-col h-screen">
            <div className="fixed top-0 left-56 right-0 z-10 bg-white">
              <Topbar />
            </div>

            <main className="flex-1 mt-[70px] hide-scrollbar overflow-y-auto p-4">
              <Outlet />
            </main>
          </div>
        </>
      )}
    </div>
  );
}
