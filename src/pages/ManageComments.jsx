import { useState } from "react";
import "../styles/pages/manage-comments.css";
import pantrixLogo from "../assets/images/Pantrix.png";
import { Link } from "react-router-dom";

function ManageComments() {
  const initialComments = [
    {
      id: "1",
      recipeId: "1",
      recipeName: "Classic Chicken Stir-Fry",
      recipeImage:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200",
      userName: "John Doe",
      rating: 5,
      comment:
        "Amazing recipe! My family loved it. Very easy to make and delicious.",
      date: "Feb 25, 2026",
      hidden: false,
    },
    {
      id: "2",
      recipeId: "2",
      recipeName: "Creamy Tomato Pasta",
      recipeImage:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200",
      userName: "Jane Smith",
      rating: 4,
      comment:
        "Great pasta! Could use a bit more seasoning but overall excellent.",
      date: "Feb 24, 2026",
      hidden: false,
    },
  ];

  const [comments, setComments] = useState(initialComments);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };

  const handleDeleteClick = (comment) => {
    setSelectedComment(comment);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedComment) {
      setComments((prev) => prev.filter((c) => c.id !== selectedComment.id));
      setShowDeleteDialog(false);
      setSelectedComment(null);
      showToast("Comment deleted permanently.");
    }
  };

  const handleToggleHide = (comment) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === comment.id ? { ...c, hidden: !c.hidden } : c
      )
    );

    if (comment.hidden) {
      showToast(`Comment by ${comment.userName} is now visible.`);
    } else {
      showToast(`Comment by ${comment.userName} is now hidden.`);
    }
  };

  const totalCount = comments.length;
  const hiddenCount = comments.filter((c) => c.hidden).length;
  const visibleCount = totalCount - hiddenCount;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={index < rating ? "comment-star filled" : "comment-star"}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="manage-comments-page">
      {toast && <div className="toast">{toast}</div>}

      <header className="manage-comments-header">
        <div className="container">
          <div className="manage-comments-header__content">
            <div className="manage-comments-header__left">
              <Link to="/admin" className="btn btn-ghost manage-comments-back">
                ← Back to Dashboard
              </Link>

              <div className="manage-comments-brand">
                <img
                  src={pantrixLogo}
                  alt="Pantrix logo"
                  className="manage-comments-brand__logo"
                />
                <div>
                  <h1 className="manage-comments-brand__title">
                    Manage Comments
                  </h1>
                  <p className="manage-comments-brand__subtitle">
                    View and moderate recipe reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container manage-comments-main">
        <div className="manage-comments-top">
          <div className="manage-comments-top__title">
            <h2>All Comments</h2>
          </div>

          <div className="manage-comments-stats">
            <span className="badge badge-secondary">Total: {totalCount}</span>
            <span className="badge badge-success">Visible: {visibleCount}</span>
            {hiddenCount > 0 && (
              <span className="badge badge-warning">Hidden: {hiddenCount}</span>
            )}
          </div>
        </div>

        <div className="manage-comments-list">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className={`card manage-comments-card ${
                comment.hidden ? "manage-comments-card--hidden" : ""
              }`}
            >
              <div className="manage-comments-card__row">
                <div className="manage-comments-thumb-wrap">
                  <img
                    src={comment.recipeImage}
                    alt={comment.recipeName}
                    className={`manage-comments-thumb ${
                      comment.hidden ? "manage-comments-thumb--hidden" : ""
                    }`}
                  />
                  {comment.hidden && (
                    <div className="manage-comments-thumb__overlay">🙈</div>
                  )}
                </div>

                <div className="manage-comments-body">
                  <div className="manage-comments-title-row">
                    <h3>{comment.recipeName}</h3>
                    {comment.hidden && (
                      <span className="badge badge-warning">Hidden</span>
                    )}
                  </div>

                  <div className="manage-comments-meta">
                    <span>
                      by <strong>{comment.userName}</strong>
                    </span>
                    <span className="manage-comments-dot">•</span>
                    <span>{comment.date}</span>
                  </div>

                  <div className="manage-comments-rating">
                    {renderStars(comment.rating)}
                    <span className="manage-comments-rating__text">
                      {comment.rating} / 5
                    </span>
                  </div>

                  <p className="manage-comments-text">"{comment.comment}"</p>

                  <div className="manage-comments-actions">
                    <button
                      className="btn btn-secondary manage-comments-action-btn"
                      onClick={() => handleToggleHide(comment)}
                    >
                      {comment.hidden ? "Show" : "Hide"}
                    </button>

                    <button
                      className="btn btn-destructive manage-comments-action-btn"
                      onClick={() => handleDeleteClick(comment)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showDeleteDialog && (
        <div className="modal-overlay">
          <div className="card modal-card delete-comment-modal">
            <button
              className="modal-close-btn"
              onClick={() => {
                setShowDeleteDialog(false);
                setSelectedComment(null);
              }}
              aria-label="Close"
            >
              ×
            </button>

            <div className="delete-comment-modal__header">
              <h3>Delete Comment?</h3>
              <p className="text-muted">This action cannot be undone.</p>
            </div>

            {selectedComment && (
              <div className="delete-comment-modal__box">
                <p className="delete-comment-modal__recipe">
                  {selectedComment.recipeName}
                </p>
                <p className="delete-comment-modal__meta text-muted">
                  Comment by <strong>{selectedComment.userName}</strong> ·{" "}
                  {selectedComment.date}
                </p>
                <p className="delete-comment-modal__text">
                  "{selectedComment.comment}"
                </p>
              </div>
            )}

            <div className="delete-comment-modal__actions">
              <button
                className="btn btn-destructive"
                onClick={handleConfirmDelete}
              >
                Confirm Delete
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowDeleteDialog(false);
                  setSelectedComment(null);
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

export default ManageComments;