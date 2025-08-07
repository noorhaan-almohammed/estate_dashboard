import { Link, Outlet } from "react-router-dom";

const links: {
  label: string;
  link: string;
}[] = [
  { label: "Properties", link: "/properties-dashboard" },
  { label: "Stats", link: "/stats-dashboard" },
  { label: "Achievements", link: "/achievements-dashboard" },
  { label: "Team", link: "/team-dashboard" },
  { label: "Office Location", link: "/office-locations-dashboard" },
  { label: "FAQ", link: "/faq-dashboard" },
  { label: "Reviews", link: "/reviews-dashboard" },
];

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 bg-[#1A1A1A] text-white p-6">
        <h1 className="text-2xl font-bold mb-6">
          <Link to="/">Dashboard</Link>
        </h1>
        <nav className="space-y-4">
          {links.map(({ link, label }) => (
            <Link key={link} to={link} className="block hover:text-mainPurple">
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 bg-white overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
