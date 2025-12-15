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
import UserManagement from "./components/admin/UserManagement";
import Batches from "./components/facilitator/Batches";
import BatchCreation from "./components/facilitator/BatchCreation";
import MacNotifications from "./components/mac-style-notification/MacNotifications";
import { NotificationProvider } from "./context/NotificationContext";

function App() {
  return (
    <NotificationProvider>
      <MacNotifications />

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
                  "Facilitator",
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
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/batches" element={<Batches />} />
              <Route path="/batch-creation" element={<BatchCreation />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
