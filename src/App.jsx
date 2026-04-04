import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageComments from "./pages/ManageComments";
import RecipeLimits from "./pages/RecipeLimits";
import ReviewReports from "./pages/ReviewReports";
import ManageFilters from "./pages/ManageFilters";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/comments" element={<ManageComments />} />
        <Route path="/admin/limits" element={<RecipeLimits />} />
        <Route path="/admin/reports" element={<ReviewReports />} />
        <Route path="/admin/filters" element={<ManageFilters />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;