import "../styles/admin-dashboard.css";
import pantrixLogo from "../assets/images/Pantrix.png";

function AdminDashboard() {
  const user = {
    name: "Sarah",
    email: "sarah@pantrix.com",
  };

  const firstName = user.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : "Admin";

  const adminMenuItems = [
    {
      title: "Manage User Accounts",
      description: "View, edit, and delete user accounts",
      icon: "👥",
    },
    {
      title: "Manage Filter Settings",
      description: "Edit cooking times, food types, and dietary options",
      icon: "⚙️",
    },
    {
      title: "Search Results Limit",
      description: "Set maximum recipes shown per search query",
      icon: "📊",
    },
    {
      title: "Manage Comments",
      description: "View and moderate recipe reviews",
      icon: "💬",
    },
    {
      title: "Review User Reports",
      description: "Review messages from Contact Us form",
      icon: "🛡️",
    },
  ];

  const handleLogout = () => {
    alert("Logged out successfully");
  };

  const handleOpenSection = (title) => {
    alert(`Open: ${title}`);
  };

  return (
    <div className="admin-page">
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

              <button
                className="btn btn-ghost btn-icon admin-logout-btn"
                onClick={handleLogout}
                aria-label="Logout"
                title="Logout"
              >
                ⎋
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
                  <span className="admin-card__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                </div>

                <h3 className="card-title admin-card__title">{item.title}</h3>
                <p className="card-description">{item.description}</p>
              </div>

              <div className="card-content">
                <button
                  className="btn btn-secondary admin-card__button"
                  onClick={() => handleOpenSection(item.title)}
                >
                  Open
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;