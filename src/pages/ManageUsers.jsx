import { useState } from "react";
import "../styles/pages/ManageUsers.css";
import { Link } from "react-router-dom";

function ManageUsers() {
  const [users, setUsers] = useState([
    { id: "1", name: "John Doe", email: "john@example.com", role: "user" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "user" },
    { id: "4", name: "Alice Williams", email: "alice@example.com", role: "user" },
  ]);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "user",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      setShowDeleteDialog(false);
      setSelectedUser(null);
      showToast("User deleted successfully");
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setErrors({
      name: "",
      email: "",
      role: "",
    });
    setShowEditDialog(true);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSaveEdit = () => {
    const trimmedName = editForm.name.trim();
    const trimmedEmail = editForm.email.trim().toLowerCase();
    const selectedRole = editForm.role;

    const newErrors = {
      name: "",
      email: "",
      role: "",
    };

    if (!trimmedName) {
      newErrors.name = "Name is required";
    }

    if (!trimmedEmail) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(trimmedEmail)) {
      newErrors.email = "Enter a valid email address";
    } else {
      const duplicateEmail = users.some(
        (user) =>
          user.email.toLowerCase() === trimmedEmail &&
          user.id !== selectedUser.id
      );

      if (duplicateEmail) {
        newErrors.email = "This email is already in use";
      }
    }

    if (!selectedRole) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.role) {
      return;
    }

    if (selectedUser) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                name: trimmedName,
                email: trimmedEmail,
                role: selectedRole,
              }
            : user
        )
      );

      setShowEditDialog(false);
      setSelectedUser(null);
      setErrors({
        name: "",
        email: "",
        role: "",
      });
      showToast("User updated successfully");
    }
  };

  return (
    <div className="manage-users-page">
      {toast && <div className="toast">{toast}</div>}

      <header className="manage-users-header">
        <div className="container">
          <div className="manage-users-header__content">
            <div className="manage-users-header__left">
              <Link to="/admin" className="btn btn-ghost manage-users-back">
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container manage-users-main">
        <div className="manage-users-top">
          <h2>All Users</h2>
          <p className="text-muted">Total: {users.length} users</p>
        </div>

        <div className="manage-users-grid">
          {users.map((user) => (
            <div key={user.id} className="card manage-users-card">
              <div className="card-header">
                <h3 className="card-title">{user.name}</h3>
              </div>

              <div className="card-content manage-users-card__content">
                <div className="manage-users-field">
                  <p className="manage-users-label">Email</p>
                  <p className="manage-users-value">{user.email}</p>
                </div>

                <div className="manage-users-field">
                  <p className="manage-users-label">Role</p>
                  <p className="manage-users-value manage-users-role">
                    {user.role}
                  </p>
                </div>
              </div>

              <div className="manage-users-actions">
                <button
                  className="btn btn-secondary manage-users-action-btn"
                  onClick={() => handleEditClick(user)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-destructive manage-users-action-btn"
                  onClick={() => handleDeleteClick(user)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showDeleteDialog && (
        <div className="modal-overlay">
          <div className="card modal-card delete-user-modal">
            <button
              className="modal-close-btn"
              onClick={() => setShowDeleteDialog(false)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="delete-user-modal__header">
              <h3>Delete User?</h3>
              <p className="text-muted">
                Are you sure you want to delete this user? This action cannot be undone.
              </p>
            </div>

            {selectedUser && (
              <div className="delete-user-modal__user-box">
                <p className="delete-user-modal__user-name">{selectedUser.name}</p>
                <p className="text-muted">{selectedUser.email}</p>
              </div>
            )}

            <div className="delete-user-modal__actions">
              <button className="btn btn-destructive" onClick={handleConfirmDelete}>
                Confirm Delete
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditDialog && (
        <div className="modal-overlay">
          <div className="card modal-card edit-user-modal">
            <button
              className="modal-close-btn"
              onClick={() => setShowEditDialog(false)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="edit-user-modal__header">
              <h3>Edit User</h3>
              <p className="text-muted">Update user information</p>
            </div>

            <div className="manage-users-form">
              <div className="manage-users-form-group">
                <label htmlFor="edit-name">Full Name</label>
                <input
                  id="edit-name"
                  className="input"
                  type="text"
                  value={editForm.name}
                  onChange={(e) => {
                    setEditForm({ ...editForm, name: e.target.value });
                    setErrors({ ...errors, name: "" });
                  }}
                />
                {errors.name && (
                  <p className="manage-users-error">{errors.name}</p>
                )}
              </div>

              <div className="manage-users-form-group">
                <label htmlFor="edit-email">Email</label>
                <input
                  id="edit-email"
                  className="input"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => {
                    setEditForm({ ...editForm, email: e.target.value });
                    setErrors({ ...errors, email: "" });
                  }}
                />
                {errors.email && (
                  <p className="manage-users-error">{errors.email}</p>
                )}
              </div>

              <div className="manage-users-form-group">
                <label htmlFor="edit-role">Role</label>
                <select
                  id="edit-role"
                  className="input"
                  value={editForm.role}
                  onChange={(e) => {
                    setEditForm({ ...editForm, role: e.target.value });
                    setErrors({ ...errors, role: "" });
                  }}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && (
                  <p className="manage-users-error">{errors.role}</p>
                )}
              </div>
            </div>

            <div className="edit-user-modal__actions">
              <button className="btn btn-primary" onClick={handleSaveEdit}>
                Save Changes
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowEditDialog(false)}
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

export default ManageUsers;