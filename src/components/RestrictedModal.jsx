import React from "react";
import { useNavigate } from "react-router";
import "../styles/RestrictedModal.css";

export default function RestrictedModal({ isOpen, onClose }) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <div className="modal-icon">🔒</div>
                    <h3 className="modal-title">Authentication Required</h3>
                </div>

                <div className="modal-body">
                    <p className="modal-text">
                        Please sign in or create an account to access this feature.
                    </p>
                    <p className="modal-subtext">
                        Save your favorite recipes, plan meals, and get personalized recommendations!
                    </p>
                </div>

                <div className="modal-footer">
                    <button
                        className="btn btn-primary modal-button"
                        onClick={() => {
                            onClose();
                            navigate("/login");
                        }}
                    >
                        Log In
                    </button>

                    <button
                        className="btn btn-secondary modal-button"
                        onClick={() => {
                            onClose();
                            navigate("/signup");
                        }}
                    >
                        Sign Up
                    </button>

                    <button
                        className="btn btn-ghost modal-button"
                        onClick={onClose}
                    >
                        Maybe Later
                    </button>
                </div>

                <button className="modal-close" onClick={onClose}>
                    ×
                </button>
            </div>
        </div>
    );
}