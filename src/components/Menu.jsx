import "../styles/theme.css";
import "../styles/menu.css";

function Menu({ isOpen, onClose, activeItem = "profile", setPage }) {
  if (!isOpen) return null;

  const handleNavigate = (targetPage) => {
    if (setPage) setPage(targetPage);
    onClose();
  };

  return (
    <div className="menu-overlay" onClick={onClose}>
      <aside className="menu-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="menu-header">
          <div className="menu-brand">
            <span className="menu-logo">🍳</span>
            <h3>Pantrix Menu</h3>
          </div>

          <button type="button" className="menu-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <nav className="menu-nav">
          <button
            type="button"
            className={`menu-item ${activeItem === "home" ? "active" : ""}`}
            onClick={() => handleNavigate("home")}
          >
            <span>🏠</span>
            <span>Home</span>
          </button>

          <button
            type="button"
            className={`menu-item ${activeItem === "favorites" ? "active" : ""}`}
            onClick={() => handleNavigate("favorites")}
          >
            <span>♡</span>
            <span>Favorites</span>
          </button>

          <button
            type="button"
            className={`menu-item ${activeItem === "profile" ? "active" : ""}`}
            onClick={() => handleNavigate("profile")}
          >
            <span>👤</span>
            <span>Your Profile</span>
          </button>

          <button
            type="button"
            className={`menu-item ${activeItem === "mealplan" ? "active" : ""}`}
            onClick={() => handleNavigate("mealplan")}
          >
            <span>📅</span>
            <span>Meal Planning</span>
          </button>

          <button
            type="button"
            className={`menu-item ${activeItem === "contact" ? "active" : ""}`}
            onClick={() => handleNavigate("contact")}
          >
            <span>✉️</span>
            <span>Contact Us</span>
          </button>
        </nav>
      </aside>
    </div>
  );
}

export default Menu;