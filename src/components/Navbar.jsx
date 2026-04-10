import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Home, Heart, User, Calendar, Mail, LogOut } from "lucide-react";
import "../styles/components/Navbar.css";
import logo from "../assets/images/pantrix.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
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
    closeMenu();
    navigate("/login");
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          {/* Left: hamburger */}
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

          {/* Center: logo */}
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <img src={logo} alt="Pantrix Logo" className="navbar-logo-img" />
            <div className="navbar-logo-text-wrap">
              <span className="navbar-logo-text">Pantrix</span>
              <span className="navbar-logo-subtitle">Cook Smart, Waste Less</span>
            </div>
          </Link>

          {/* Right: auth actions */}
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

      {/* overlay */}
      <div
        className={`side-menu-overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
      ></div>

      {/* side menu */}
      <aside className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className="side-menu-header">
          <div className="side-menu-brand">
            <img src={logo} alt="Pantrix Logo" className="side-menu-logo" />
            <span>Pantrix Menu</span>
          </div>

          <button className="side-menu-close" onClick={closeMenu} type="button">
            ×
          </button>
        </div>

        <nav className="side-menu-links">
          <NavLink to="/" onClick={closeMenu}>
            <Home size={24} strokeWidth={2.2} />
            <span>Home</span>
          </NavLink>

          <NavLink to="/favorites" onClick={closeMenu}>
            <Heart size={24} strokeWidth={2.2} />
            <span>Favorites</span>
          </NavLink>

          <NavLink to="/profile" onClick={closeMenu}>
            <User size={24} strokeWidth={2.2} />
            <span>Your Profile</span>
          </NavLink>

          <NavLink to="/meal-planning" onClick={closeMenu}>
            <Calendar size={24} strokeWidth={2.2} />
            <span>Meal Planning</span>
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu}>
            <Mail size={24} strokeWidth={2.2} />
            <span>Contact Us</span>
          </NavLink>
        </nav>

        {isLoggedIn && (
          <div className="side-menu-footer">
            <button type="button" className="side-menu-logout" onClick={handleLogout}>
              <LogOut size={20} />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}