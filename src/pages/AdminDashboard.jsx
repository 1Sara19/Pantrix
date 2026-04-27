import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/AdminDashboard.css";
import { useEffect} from "react";

function AdminDashboard() {
  const [toast, setToast] = useState("");
  useEffect(() => {
    const savedMessage = localStorage.getItem("welcomeMessage");

    if (savedMessage) {
      setToast(savedMessage);
      localStorage.removeItem("welcomeMessage");

      setTimeout(() => {
        setToast("");
      }, 2000);
    }
  }, []);
  
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

  return (
    <div className="admin-page">
      {toast && <div className="toast">{toast}</div>}

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