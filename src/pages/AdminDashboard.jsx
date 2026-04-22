import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import AdminOverview from "./admin/AdminOverview";
import ReturnRequests from "./admin/ReturnRequests";
import FinanceDashboard from "./admin/FinanceDashboard";
import SustainabilityESG from "./admin/SustainabilityESG";
import LogisticsOverview from "./logistics/LogisticsOverview";
import HubCoordination from "./logistics/HubCoordination";
import LogisticsReports from "./logistics/LogisticsReports";

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <Routes>
        <Route index element={<AdminOverview />} />
        <Route path="returns" element={<ReturnRequests />} />
        <Route path="logistics" element={<LogisticsOverview />} />
        <Route path="finance" element={<FinanceDashboard />} />
        <Route path="analytics" element={<LogisticsReports />} />
        <Route path="users" element={<AdminOverview />} />
        <Route path="sustainability" element={<SustainabilityESG />} />
        <Route path="hubs" element={<HubCoordination />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
