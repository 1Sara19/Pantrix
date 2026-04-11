import { useState } from "react";
import "../styles/pages/ReviewReports.css";
import pantrixLogo from "../assets/images/Pantrix.png";
import { Link } from "react-router-dom";

function ReviewReports() {
  const initialReports = [
    {
      id: "1",
      subject: "Cannot save favorite recipes",
      message:
        "I am unable to save recipes to my favorites. When I click the heart button, nothing happens. Please help!",
      userEmail: "john@example.com",
      date: "Feb 27, 2026",
      status: "pending",
    },
    {
      id: "2",
      subject: "Feature request: Shopping list",
      message:
        "It would be great if you could add a shopping list feature that automatically adds missing ingredients from recipes.",
      userEmail: "sarah@example.com",
      date: "Feb 26, 2026",
      status: "pending",
    },
    {
      id: "3",
      subject: "Login issues",
      message:
        "I keep getting logged out every few hours. Is this normal? It's quite frustrating.",
      userEmail: "mike@example.com",
      date: "Feb 25, 2026",
      status: "resolved",
    },
    {
      id: "4",
      subject: "Recipe suggestion",
      message:
        "Please add more vegan recipes! The current selection is limited.",
      userEmail: "emma@example.com",
      date: "Feb 24, 2026",
      status: "pending",
    },
  ];

  const [reports, setReports] = useState(initialReports);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };

  const handleMarkResolved = (reportId) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === reportId ? { ...report, status: "resolved" } : report
      )
    );
    showToast("Report marked as resolved");
  };

  const handleDeleteClick = (report) => {
    setSelectedReport(report);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedReport) {
      setReports((prev) => prev.filter((r) => r.id !== selectedReport.id));
      setShowDeleteDialog(false);
      setSelectedReport(null);
      showToast("Report deleted successfully");
    }
  };


  const pendingCount = reports.filter((r) => r.status === "pending").length;
  const resolvedCount = reports.filter((r) => r.status === "resolved").length;

  return (
    <div className="review-reports-page">
      {toast && <div className="toast">{toast}</div>}

      <header className="review-reports-header">
        <div className="container">
          <div className="review-reports-header__content">
            <div className="review-reports-header__left">
              <Link to="/admin" className="btn btn-ghost review-reports-back">
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container review-reports-main">
        <div className="review-reports-top">
          <div>
            <h2>All Reports</h2>
            <p className="text-muted">
              {pendingCount} pending • {resolvedCount} resolved
            </p>
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="card review-reports-empty">
            <p className="text-muted">No reports available.</p>
          </div>
        ) : (
          <div className="review-reports-list">
            {reports.map((report) => (
              <div
                key={report.id}
                className={`card review-reports-card ${
                  report.status === "resolved"
                    ? "review-reports-card--resolved"
                    : ""
                }`}
              >
                <div className="review-reports-card__content">
                  <div className="review-reports-card__header">
                    <div className="review-reports-card__header-text">
                      <div className="review-reports-title-row">
                        <h3>{report.subject}</h3>
                        <span
                          className={`badge ${
                            report.status === "resolved"
                              ? "badge-success"
                              : "badge-warning"
                          }`}
                        >
                          {report.status === "resolved" ? "Resolved" : "Pending"}
                        </span>
                      </div>

                      <div className="review-reports-meta">
                        <span>📧 {report.userEmail}</span>
                        <span className="review-reports-dot">•</span>
                        <span>{report.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="review-reports-message-box">
                    <p className="review-reports-message">{report.message}</p>
                  </div>

                  <div className="review-reports-actions">
                    {report.status === "pending" && (
                      <button
                        className="btn btn-primary review-reports-action-btn"
                        onClick={() => handleMarkResolved(report.id)}
                      >
                        Mark as Resolved
                      </button>
                    )}

                    <button
                      className="btn btn-destructive review-reports-action-btn"
                      onClick={() => handleDeleteClick(report)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showDeleteDialog && (
        <div className="modal-overlay">
          <div className="card modal-card delete-report-modal">
            <button
              className="modal-close-btn"
              onClick={() => {
                setShowDeleteDialog(false);
                setSelectedReport(null);
              }}
              aria-label="Close"
            >
              ×
            </button>

            <div className="delete-report-modal__header">
              <h3>Delete Report?</h3>
              <p className="text-muted">This action cannot be undone.</p>
            </div>

            {selectedReport && (
              <div className="delete-report-modal__box">
                <p className="delete-report-modal__subject">
                  {selectedReport.subject}
                </p>
                <p className="delete-report-modal__email text-muted">
                  From: {selectedReport.userEmail}
                </p>
                <p className="delete-report-modal__message">
                  {selectedReport.message}
                </p>
              </div>
            )}

            <div className="delete-report-modal__actions">
              <button className="btn btn-destructive" onClick={handleConfirmDelete}>
                Confirm Delete
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowDeleteDialog(false);
                  setSelectedReport(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewReports;