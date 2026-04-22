import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import PartnerDashboard from "./pages/PartnerDashboard";
import BusinessDashboard from "./pages/BusinessDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import ForgotPassword from "./pages/ForgotPassword";

// Team Management Pages
import TeamHome from "./pages/team/TeamHome";
import AddMember from "./pages/team/AddMember";
import ViewMembers from "./pages/team/ViewMembers";
import MemberDetails from "./pages/team/MemberDetails";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", background:"var(--bg)" }}>
      <div className="spinner" style={{ width:36, height:36 }} />
    </div>
  );
  if (!user) return <Navigate to="/" replace />;
  const roleRoutes = { admin:"/admin", partner:"/partner", business:"/business", customer:"/customer" };
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to={roleRoutes[user.role] || "/"} replace />;
  return children;
}

function App() {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", background:"var(--bg)" }}>
      <div className="spinner" style={{ width:36, height:36 }} />
    </div>
  );
  const roleRoutes = { admin:"/admin", partner:"/partner", business:"/business", customer:"/customer" };
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={user ? <Navigate to={roleRoutes[user.role] || "/"} replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to={roleRoutes[user.role] || "/"} replace /> : <Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/*" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/partner/*" element={<ProtectedRoute allowedRoles={["partner"]}><PartnerDashboard /></ProtectedRoute>} />
        <Route path="/business/*" element={<ProtectedRoute allowedRoles={["business"]}><BusinessDashboard /></ProtectedRoute>} />
        <Route path="/customer/*" element={<ProtectedRoute allowedRoles={["customer"]}><CustomerDashboard /></ProtectedRoute>} />

        {/* Team Management Routes (no auth required) */}
        <Route path="/team" element={<TeamHome />} />
        <Route path="/team/add" element={<AddMember />} />
        <Route path="/team/members" element={<ViewMembers />} />
        <Route path="/team/members/:id" element={<MemberDetails />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
