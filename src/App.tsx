import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import PropertiesPage from "./pages/dashboard/PropertiesPage";
import PropertyPage from "./pages/PropertyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="propertiesdashboard" element={<PropertiesPage />} />
          <Route path={`property/:id`} element={<PropertyPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
