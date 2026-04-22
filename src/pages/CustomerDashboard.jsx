import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import MyReturns from "./customer/MyReturns";
import InitiateReturn from "./customer/InitiateReturn";
import PickupTracking from "./customer/PickupTracking";
import RefundStatus from "./customer/RefundStatus";
import CustomerImpact from "./customer/CustomerImpact";

export default function CustomerDashboard() {
  return (
    <DashboardLayout role="customer">
      <Routes>
        <Route index element={<MyReturns />} />
        <Route path="new-return" element={<InitiateReturn />} />
        <Route path="pickup" element={<PickupTracking />} />
        <Route path="refund" element={<RefundStatus />} />
        <Route path="impact" element={<CustomerImpact />} />
        <Route path="*" element={<Navigate to="/customer" replace />} />
      </Routes>
    </DashboardLayout>
  );
}
