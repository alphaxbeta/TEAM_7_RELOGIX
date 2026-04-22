import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import ServicePartnerHome from "./partner/ServicePartnerHome";
import RepairTasks from "./partner/RepairTasks";
import InspectionGrading from "./partner/InspectionGrading";
import PickupSchedule from "./partner/PickupSchedule";

export default function PartnerDashboard() {
  return (
    <DashboardLayout role="partner">
      <Routes>
        <Route index element={<ServicePartnerHome />} />
        <Route path="repairs" element={<RepairTasks />} />
        <Route path="inspection" element={<InspectionGrading />} />
        <Route path="schedule" element={<PickupSchedule />} />
        <Route path="analytics" element={<ServicePartnerHome />} />
        <Route path="*" element={<Navigate to="/partner" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
