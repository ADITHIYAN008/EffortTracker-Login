import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AdminDashboard from "../dashboard/AdminDashboard";
import Default from "../dashboard/Default";
import FacilitatorDashboard from "../dashboard/FacilitatorDashboard";

function Dashboard() {
  const { user } = useContext(AuthContext);
  switch (user.role) {
    case "Admin":
      return <AdminDashboard />;
    case "Facilitator":
      return <FacilitatorDashboard />;
    default:
      return <Default />;
  }
}

export default Dashboard;
