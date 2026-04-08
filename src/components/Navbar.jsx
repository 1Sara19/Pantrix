import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/components/Navbar.css";
import logo from "../assets/images/pantrix.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <img src={logo} alt="Pantrix Logo" className="navbar-logo-img" />
            <span className="navbar-logo-text">Pantrix</span>
          </Link>

          <button
            className={`navbar-toggle ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
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
            <span>Pantrix</span>
          </div>

          <button className="side-menu-close" onClick={closeMenu}>
            ×
          </button>
        </div>

        <nav className="side-menu-links">
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/favorites" onClick={closeMenu}>Favorites</NavLink>
          <NavLink to="/profile" onClick={closeMenu}>Your Profile</NavLink>
          <NavLink to="/meal-planning" onClick={closeMenu}>Meal Planning</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact Us</NavLink>
        </nav>
      </aside>
    </>
  );
}