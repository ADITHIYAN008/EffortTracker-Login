import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import ProtectedRoutes from "./util/ProtectedRoutes";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Unauthorized from "./components/unauthorized/Unauthorized";

import Dashboard from "./components/navigation-pages/Dashboard";
import Calendar from "./components/navigation-pages/Calendar";
import Team from "./components/navigation-pages/Team";
import Profile from "./components/navigation-pages/Profile";
import Reports from "./components/navigation-pages/Report";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />

        <Route path="/auth/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          element={
            <ProtectedRoutes
              allowedRoles={[
                "Admin",
                "Employee",
                "Manager",
                "HR",
                "Guest",
                "Superuser",
              ]}
            />
          }
        >
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/team" element={<Team />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
