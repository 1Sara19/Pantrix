import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/admin-dashboard.css";
import pantrixLogo from "../assets/images/Pantrix.png";

function AdminDashboard() {
  const [toast, setToast] = useState("");

  const user = {
    name: "Sarah",
    email: "sarah@pantrix.com",
  };

  const firstName = user.name
    ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
    : "Admin";

  const adminMenuItems = [
    {
      title: "Manage User Accounts",
      description: "View, edit, and delete user accounts",
      icon: <i className="fa-solid fa-users"></i>,
      path: "/admin/users",
    },
    {
      title: "Manage Filter Settings",
      description: "Edit cooking times, food types, and dietary options",
      icon: <i className="fa-solid fa-gear"></i>,
      path: "/admin/filters",
    },
    {
      title: "Search Results Limit",
      description: "Set maximum recipes shown per search query",
      icon: <i className="fa-solid fa-chart-column"></i>,
      path: "/admin/limits",
    },
    {
      title: "Manage Comments",
      description: "View and moderate recipe reviews",
      icon: <i className="fa-solid fa-comment"></i>,
      path: "/admin/comments",
    },
    {
      title: "Review User Reports",
      description: "Review messages from Contact Us form",
      icon: <i className="fa-solid fa-shield-halved"></i>,
      path: "/admin/reports",
    },
  ];

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  const handleLogout = () => {
    showToast("Logged out successfully");
  };

  return (
    <div className="admin-page">
      {toast && <div className="toast">{toast}</div>}

      <header className="admin-header">
        <div className="container">
          <div className="admin-header__content">
            <div className="admin-brand">
              <img
                src={pantrixLogo}
                alt="Pantrix logo"
                className="admin-brand__logo"
              />
              <div>
                <h1 className="admin-brand__title">Pantrix Admin</h1>
                <p className="admin-brand__subtitle">Admin Dashboard</p>
              </div>
            </div>

            <div className="admin-user">
              <div className="admin-user__info">
                <p className="admin-user__name">{user.name}</p>
                <p className="admin-user__email">{user.email}</p>
              </div>

              {/* 🔥 Logout Icon (معدل) */}
              <button
                className="btn btn-ghost btn-icon admin-logout-btn"
                onClick={handleLogout}
                aria-label="Logout"
                title="Logout"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container admin-main">
        <section className="admin-welcome">
          <h2>Welcome, {firstName}</h2>
          <p className="text-muted">
            Manage Pantrix platform settings and user data.
          </p>
        </section>

        <section className="admin-grid">
          {adminMenuItems.map((item) => (
            <div key={item.title} className="card card-interactive admin-card">
              <div className="card-header">
                <div className="admin-card__icon-wrap">
                  <span className="admin-card__icon">
                    {item.icon}
                  </span>
                </div>

                <h3 className="card-title admin-card__title">{item.title}</h3>
                <p className="card-description">{item.description}</p>
              </div>

              <div className="card-content">
                <Link
                  to={item.path}
                  className="btn btn-secondary admin-card__button"
                >
                  Open
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;