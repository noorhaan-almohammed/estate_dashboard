import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import PropertiesPage from "./pages/dashboard/PropertiesPage";
import PropertyPage from "./pages/PropertyPage";
import StatsPage from "./pages/dashboard/StatsPage";
import StatPage from "./pages/StatPage";
import AchievementsPage from "./pages/dashboard/AchievementsPage";
import AchievementPage from "./pages/AchievementPage";
import TeamPage from "./pages/dashboard/TeamPage";
import MemberTeamPage from "./pages/MemberTeamPage";
import OfficeLocationsPage from "./pages/dashboard/OfficeLocationsPage";
import OfficeLocationPage from "./pages/OfficeLocationPage";
import ClientsPage from "./pages/dashboard/ClientsPage";
import ClientPage from "./pages/ClientPage";
import FAQListPage from "./components/lists/FAQListPage";
import ReviewsPage from "./pages/dashboard/ReviewsPage";
import ReviewPage from "./pages/ReviewPage";
import HomePage from "./pages/dashboard/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
          <Route path="properties-dashboard" element={<PropertiesPage />} />
          <Route path={`property/:id`} element={<PropertyPage />} />
          {/* Stats =>  */}
          <Route path="stats-dashboard" element={<StatsPage />} />
          <Route path={`stat/:id`} element={<StatPage />} />
          {/* Achievements */}
          <Route path="achievements-dashboard" element={<AchievementsPage />} />
          <Route path={`achieve/:id`} element={<AchievementPage />} />
          {/* Team */}
          <Route path="team-dashboard" element={<TeamPage />} />
          <Route path={`team-member/:id`} element={<MemberTeamPage />} />
          {/* office locations */}
          <Route
            path="office-locations-dashboard"
            element={<OfficeLocationsPage />}
          />
          <Route
            path={`office-location/:id`}
            element={<OfficeLocationPage />}
          />
          {/* clients */}
          <Route path="clients-dashboard" element={<ClientsPage />} />
          <Route path={`client/:id`} element={<ClientPage />} />
          {/* FAQ */}
          <Route path="faq-dashboard" element={<FAQListPage />} />
          {/* Reviews */}
          <Route path="reviews-dashboard" element={<ReviewsPage />} />
          <Route path={`review/:id`} element={<ReviewPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
