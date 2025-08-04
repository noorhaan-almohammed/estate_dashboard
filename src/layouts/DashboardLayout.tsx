import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 bg-[#1A1A1A] text-white p-6">
        <h1 className="text-2xl font-bold mb-6">
          <Link to="/" >Dashboard</Link>
        </h1>
        <nav className="space-y-4">
          <Link to="/propertiesdashboard" className="block hover:text-[#703BF7]">Properties</Link>
        </nav>
      </aside>
      <main className="flex-1 bg-white overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
