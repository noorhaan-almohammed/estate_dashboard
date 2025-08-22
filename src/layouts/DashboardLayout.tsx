import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect, type JSX } from "react";
import {
  FaHome,
  FaBuilding,
  FaChartLine,
  FaTrophy,
  FaUsers,
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaStar,
  FaUserTie,
  FaBars,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt 
} from "react-icons/fa";

type NavItem = {
  label: string;
  link: string;
  icon: JSX.Element;
};

const links: NavItem[] = [
  { label: "Properties", link: "/properties-dashboard", icon: <FaBuilding /> },
  { label: "Stats", link: "/stats-dashboard", icon: <FaChartLine /> },
  { label: "Achievements", link: "/achievements-dashboard", icon: <FaTrophy /> },
  { label: "Team", link: "/team-dashboard", icon: <FaUsers /> },
  { label: "Office Location", link: "/office-locations-dashboard", icon: <FaMapMarkerAlt /> },
  { label: "FAQ", link: "/faq-dashboard", icon: <FaQuestionCircle /> },
  { label: "Reviews", link: "/reviews-dashboard", icon: <FaStar /> },
  { label: "Client", link: "/clients-dashboard", icon: <FaUserTie /> },
];

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <header className="md:hidden fixed top-0 left-0 right-0 bg-darkGray text-mainText p-4 flex justify-between items-center z-20">
        <h1 className="text-xl font-bold">
          <Link to="/">Dashboard</Link>
        </h1>
        <button
          onClick={toggleSidebar}
          className="text-mainText focus:outline-none"
        >
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </header>

      <aside
        className={`bg-darkGray text-mainText transition-all duration-300 ease-in-out fixed md:relative z-10 h-full ${
          isSidebarOpen
            ? "w-64 translate-x-0"
            : "w-0 md:w-16 -translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 flex justify-between items-center border-b border-gray-700">
            <h1
              className={`text-xl font-bold transition-opacity whitespace-nowrap ${
                isSidebarOpen ? "opacity-100" : "opacity-0 md:opacity-100"
              }`}
            >
              <Link to="/" className="flex items-center">
                <FaHome className="mr-2" />
                {isSidebarOpen && "Dashboard"}
              </Link>
            </h1>
            <button
              onClick={toggleSidebar}
              className="hidden md:block text-mainText hover:text-mainPurple focus:outline-none ml-1 cursor-pointer"
            >
              {isSidebarOpen ? <FaChevronLeft size={14} /> : <FaChevronRight size={14} />}
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-2">
            {links.map(({ link, label, icon }) => (
              <NavLink
                key={link}
                to={link}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 hover:bg-gray-700 hover:text-mainPurple transition-colors ${
                    isActive
                      ? "border-r-4 border-mainPurple font-bold bg-gray-700"
                      : ""
                  } ${!isSidebarOpen ? "justify-center px-0" : ""}`
                }
              >
                <span className={`${isSidebarOpen ? "mr-2" : ""}`}>{icon}</span>
                {isSidebarOpen && <span className="text-sm whitespace-nowrap">{label}</span>}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto p-4 border-t border-gray-700 cursor-pointer">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center p-2  text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-lg transition-all duration-300 group cursor-pointer ${
                !isSidebarOpen ? "justify-center px-0" : ""
              }`}
            >
              <FaSignOutAlt className={`${isSidebarOpen ? "mr-2" : ""} group-hover:scale-110 transition-transform`} />
              {isSidebarOpen && <span className="text-sm whitespace-nowrap">Log Out</span>}
            </button>
          </div>
        </div>
      </aside>

      <main
        className={`w-full overflow-y-auto transition-all duration-300           
        ${isMobile && isSidebarOpen ? "ml-64" : ""}`}
      >
        <div className="md:hidden h-16"></div>
        <div className="">
          <Outlet />
        </div>
      </main>
    </div>
  );
}