import { useEffect, useState } from "react";
import "../styles/pages/ManageUsers.css";
import { Link } from "react-router-dom";
import {
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin,
} from "../services/adminService";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "user",
  });

  const [errors, setErrors] = useState({
    role: "",
  });

  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };

  const getCurrentUser = () => {
  try {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      return JSON.parse(storedUser);
    }

    const token = localStorage.getItem("token");

    if (!token) {
      return null;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));

    return {
      id: payload.id || payload._id || payload.userId,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
};

  const normalizeUser = (user) => ({
    id: user._id || user.id,
    name: user.name || "",
    email: user.email || "",
    role: user.role || "user",
  });

  const loadUsers = async () => {
    try {
      setIsLoading(true);

      const data = await getAllUsers();
      const currentUser = getCurrentUser();

      const filteredUsers = data
        .map(normalizeUser)
        .filter((user) => {
          const currentId = currentUser?.id || currentUser?._id || currentUser?.userId;
          const currentEmail = currentUser?.email;

          return user.id !== currentId && user.email !== currentEmail;
        });

      setUsers(filteredUsers);
    } catch (error) {
      showToast(error.message || "Failed to load users.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    try {
      await deleteUserByAdmin(selectedUser.id);

      setUsers(users.filter((user) => user.id !== selectedUser.id));
      setShowDeleteDialog(false);
      setSelectedUser(null);
      showToast("User deleted successfully");
    } catch (error) {
      showToast(error.message || "Failed to delete user.");
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
      role: "",
    });

    setShowEditDialog(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedUser) return;

    const selectedRole = editForm.role;

    const newErrors = {
      role: "",
    };

    if (!selectedRole) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);

    if (newErrors.role) {
      return;
    }

    try {
      const data = await updateUserByAdmin(selectedUser.id, {
        role: selectedRole,
      });

      const updatedUser = normalizeUser(data.user || data);

      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? updatedUser : user
        )
      );

      setShowEditDialog(false);
      setSelectedUser(null);
      setErrors({
        role: "",
      });

      showToast("User role updated successfully");
    } catch (error) {
      showToast(error.message || "Failed to update user.");
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
          <p className="text-muted">
            Total: {users.length} users
          </p>
        </div>

        {isLoading ? (
          <div className="card manage-users-card">
            <p className="text-muted">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="card manage-users-card">
            <p className="text-muted">No users found.</p>
          </div>
        ) : (
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
                    Edit Role
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
        )}
      </main>

      {showDeleteDialog && (
        <div className="modal-overlay">
          <div className="card modal-card delete-user-modal">
            <button
              className="modal-close-btn"
              onClick={() => {
                setShowDeleteDialog(false);
                setSelectedUser(null);
              }}
              aria-label="Close"
            >
              ×
            </button>

            <div className="delete-user-modal__header">
              <h3>Delete User?</h3>
              <p className="text-muted">
                Are you sure you want to delete this user? This action cannot be
                undone.
              </p>
            </div>

            {selectedUser && (
              <div className="delete-user-modal__user-box">
                <p className="delete-user-modal__user-name">
                  {selectedUser.name}
                </p>
                <p className="text-muted">{selectedUser.email}</p>
              </div>
            )}

            <div className="delete-user-modal__actions">
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
                  setSelectedUser(null);
                }}
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
              onClick={() => {
                setShowEditDialog(false);
                setSelectedUser(null);
              }}
              aria-label="Close"
            >
              ×
            </button>

            <div className="edit-user-modal__header">
              <h3>Edit User Role</h3>
              <p className="text-muted">
                Only the user role can be changed by admin.
              </p>
            </div>

            <div className="manage-users-form">
              <div className="manage-users-form-group">
                <label htmlFor="edit-name">Full Name</label>
                <input
                  id="edit-name"
                  className="input"
                  type="text"
                  value={editForm.name}
                  readOnly
                />
              </div>

              <div className="manage-users-form-group">
                <label htmlFor="edit-email">Email</label>
                <input
                  id="edit-email"
                  className="input"
                  type="email"
                  value={editForm.email}
                  readOnly
                />
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
                onClick={() => {
                  setShowEditDialog(false);
                  setSelectedUser(null);
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

export default ManageUsers;