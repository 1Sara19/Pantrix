import { useEffect, useState } from "react";
import "../styles/pages/ReviewReports.css";
import { Link } from "react-router-dom";
import {
  getContactReports,
  resolveContactReport,
  deleteContactReport,
} from "../services/contactService.js";

function ReviewReports() {
  const [reports, setReports] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "No date";

    return new Date(dateValue).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const loadReports = async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await getContactReports();
      setReports(data);
    } catch (err) {
      setError(err.message || "Failed to load reports.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleMarkResolved = async (reportId) => {
    try {
      const data = await resolveContactReport(reportId);

      setReports((prev) =>
        prev.map((report) =>
          report._id === reportId ? data.contactReport : report
        )
      );

      showToast("Report marked as resolved");
    } catch (err) {
      showToast(err.message || "Failed to resolve report.");
    }
  };

  const handleDeleteClick = (report) => {
    setSelectedReport(report);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedReport) return;

    try {
      await deleteContactReport(selectedReport._id);

      setReports((prev) =>
        prev.filter((report) => report._id !== selectedReport._id)
      );

      setShowDeleteDialog(false);
      setSelectedReport(null);
      showToast("Report deleted successfully");
    } catch (err) {
      showToast(err.message || "Failed to delete report.");
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

        {isLoading ? (
          <div className="card review-reports-empty">
            <p className="text-muted">Loading reports...</p>
          </div>
        ) : error ? (
          <div className="card review-reports-empty">
            <p className="text-muted">{error}</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="card review-reports-empty">
            <p className="text-muted">No reports available.</p>
          </div>
        ) : (
          <div className="review-reports-list">
            {reports.map((report) => (
              <div
                key={report._id}
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
                        <span>📧 {report.email}</span>
                        <span className="review-reports-dot">•</span>
                        <span>{formatDate(report.createdAt)}</span>
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
                        onClick={() => handleMarkResolved(report._id)}
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
                  From: {selectedReport.email}
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