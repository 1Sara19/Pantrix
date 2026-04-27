import { useNavigate } from "react-router-dom";
import "../styles/components/RestrictedModal.css";

export default function RestrictedModal({ isOpen, onClose }) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-card"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close" onClick={onClose}>
                    ×
                </button>

                <h3 className="modal-title">Login Required</h3>

                <p className="modal-subtitle">
                    Please log in or create an account
                </p>

                <div className="modal-actions">
                    <button
                        className="modal-btn modal-btn-primary"
                        onClick={() => {
                            onClose();
                            navigate("/login");
                        }}
                    >
                        Log In
                    </button>

                    <button
                        className="modal-btn modal-btn-secondary"
                        onClick={() => {
                            onClose();
                            navigate("/signup");
                        }}
                    >
                        Sign Up
                    </button>

                    <button
                        className="modal-btn modal-btn-cancel"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}