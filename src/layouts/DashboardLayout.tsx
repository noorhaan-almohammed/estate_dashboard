import { Link, NavLink, Outlet } from "react-router-dom";

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
      <aside className="xl:w-64 w-52 bg-darkGray text-mainText py-6 pl-6">
        <h1 className="text-2xl font-bold mb-6">
          <Link to="/">Dashboard</Link>
        </h1>
        <nav className="space-y-4">
          {links.map(({ link, label }) => (
            <NavLink
              key={link}
              to={link}
              className={({ isActive }) =>
                `w-full m-0 block hover:text-mainPurple py-4 ${
                  isActive ? "border-r-4  border-mainPurple font-bold" : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 bg-mainText overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
