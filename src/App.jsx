import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import MealPlan from "./pages/MealPlan";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageFilters from "./pages/ManageFilters";
import ManageComments from "./pages/ManageComments";
import ReviewReports from "./pages/ReviewReports";
import RecipeLimits from "./pages/RecipeLimits";

function App() {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      <ScrollToTop />

      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/meal-planning" element={<MealPlan />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/filters" element={<ManageFilters />} />
        <Route path="/admin/comments" element={<ManageComments />} />
        <Route path="/admin/reports" element={<ReviewReports />} />
        <Route path="/admin/recipe-limits" element={<RecipeLimits />} />
      </Routes>
    </>
  );
}

export default App;