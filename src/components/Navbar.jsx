import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Home, Heart, User, Calendar, Mail, LogOut } from "lucide-react";
import RestrictedModal from "./RestrictedModal";
import "../styles/components/Navbar.css";
import logo from "../assets/images/pantrix.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showRestrictedModal, setShowRestrictedModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const logged = localStorage.getItem("isLoggedIn") === "true";
      const role = localStorage.getItem("userRole");

      setIsLoggedIn(logged);
      setIsAdmin(role === "admin");
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);

    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    setIsLoggedIn(false);
    setIsAdmin(false);
    closeMenu();
    navigate("/login");
  };

  const handleProtectedNavigation = (path) => {
    if (!isLoggedIn) {
      setShowRestrictedModal(true);
      closeMenu();
      return;
    }

    navigate(path);
    closeMenu();
  };

  const logoDestination = isAdmin ? "/AdminDashboard" : "/";

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          {!isAdmin ? (
            <button
              className={`navbar-toggle ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              type="button"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          ) : (
            <div className="navbar-toggle-placeholder"></div>
          )}

          <Link to={logoDestination} className="navbar-logo" onClick={closeMenu}>
            <img src={logo} alt="Pantrix Logo" className="navbar-logo-img" />
            <div className="navbar-logo-text-wrap">
              <span className="navbar-logo-text">Pantrix</span>
              <span className="navbar-logo-subtitle">Cook Smart, Waste Less</span>
            </div>
          </Link>

          <div className="navbar-auth">
            {isLoggedIn ? (
              <button
                type="button"
                className="navbar-logout-btn"
                onClick={handleLogout}
                aria-label="Log out"
              >
                <LogOut size={28} />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="navbar-login-btn"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>

                <button
                  type="button"
                  className="navbar-signup-btn"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {!isAdmin && (
        <>
          <div
            className={`side-menu-overlay ${menuOpen ? "show" : ""}`}
            onClick={closeMenu}
          ></div>

          <aside className={`side-menu ${menuOpen ? "open" : ""}`}>
            <div className="side-menu-header">
              <div className="side-menu-brand">
                <img src={logo} alt="Pantrix Logo" className="side-menu-logo" />
                <span>Pantrix Menu</span>
              </div>

              <button
                className="side-menu-close"
                onClick={closeMenu}
                type="button"
              >
                ×
              </button>
            </div>

            <nav className="side-menu-links">
              <NavLink to="/" onClick={closeMenu}>
                <Home size={24} strokeWidth={2.2} />
                <span>Home</span>
              </NavLink>

              <button
                type="button"
                className="side-menu-link-btn"
                onClick={() => handleProtectedNavigation("/favorites")}
              >
                <Heart size={24} strokeWidth={2.2} />
                <span>Favorites</span>
              </button>

              <button
                type="button"
                className="side-menu-link-btn"
                onClick={() => handleProtectedNavigation("/profile")}
              >
                <User size={24} strokeWidth={2.2} />
                <span>Your Profile</span>
              </button>

              <button
                type="button"
                className="side-menu-link-btn"
                onClick={() => handleProtectedNavigation("/meal-planning")}
              >
                <Calendar size={24} strokeWidth={2.2} />
                <span>Meal Planning</span>
              </button>

              <button
                type="button"
                className="side-menu-link-btn"
                onClick={() => handleProtectedNavigation("/contact")}
              >
                <Mail size={24} strokeWidth={2.2} />
                <span>Contact Us</span>
              </button>
            </nav>

            {isLoggedIn && (
              <div className="side-menu-footer">
                <button
                  type="button"
                  className="side-menu-logout"
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </aside>
        </>
      )}

      <RestrictedModal
        isOpen={showRestrictedModal}
        onClose={() => setShowRestrictedModal(false)}
      />
    </>
  );
}