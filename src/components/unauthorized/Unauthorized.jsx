import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 dark:text-white">
      <div className="p-10 rounded-xl shadow-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-center">
        <div className="flex justify-center mb-4">
          <Lock size={60} className="text-red-500" />
        </div>

        <h1 className="text-3xl font-bold mb-2">Access Denied</h1>

        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          You do not have permission to access this page. If you think this is a
          mistake, contact your administrator.
        </p>

        <Link
          to="/dashboard"
          className="px-6 py-3 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
