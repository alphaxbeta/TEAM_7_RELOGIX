import Sidebar from "./Sidebar";

export default function DashboardLayout({ role, children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar role={role} />
      <main style={{ flex: 1, overflow: "auto", padding: "0" }}>
        {children}
      </main>
    </div>
  );
}
