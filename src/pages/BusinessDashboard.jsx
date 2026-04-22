import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import LogisticsOverview from "./logistics/LogisticsOverview";
import HubCoordination from "./logistics/HubCoordination";
import ShipmentTracking from "./logistics/ShipmentTracking";
import PartnerPerformance from "./logistics/PartnerPerformance";
import LogisticsReports from "./logistics/LogisticsReports";
import SustainabilityESG from "./admin/SustainabilityESG";
import ReturnRequests from "./admin/ReturnRequests";

export default function BusinessDashboard() {
  return (
    <DashboardLayout role="business">
      <Routes>
        <Route index element={<LogisticsOverview />} />
        <Route path="returns" element={<ReturnRequests />} />
        <Route path="hubs" element={<HubCoordination />} />
        <Route path="shipments" element={<ShipmentTracking />} />
        <Route path="partners" element={<PartnerPerformance />} />
        <Route path="reports" element={<LogisticsReports />} />
        <Route path="sustainability" element={<SustainabilityESG />} />
        <Route path="*" element={<Navigate to="/business" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
