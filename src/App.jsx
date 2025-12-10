import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import ProtectedRoutes from "./util/ProtectedRoutes";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Unauthorized from "./components/unauthorized/Unauthorized";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="auth/login" replace />} />

        <Route path="auth/login" element={<Login />} />

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
          <Route path="/dashboard/*" element={<DashboardLayout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
