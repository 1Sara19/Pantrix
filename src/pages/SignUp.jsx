import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/signup.css";
import pantrixLogo from "../assets/images/Pantrix.png";

function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState("");

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(""), 2000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            showToast("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            showToast("Passwords don't match");
            return;
        }

        if (password.length < 6) {
            showToast("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            showToast("Account created successfully!");
            setIsLoading(false);

            navigate("/");
        }, 800);
    };

    return (
        <div className="signup-page">
            {toast && <div className="toast">{toast}</div>}

            <div className="signup-wrapper">
                <div className="signup-logo-block">
                    <img src={pantrixLogo} alt="Pantrix logo" className="signup-logo" />
                    <div className="signup-logo-text">
                        <h1>Pantrix</h1>
                        <p>Cook Smart, Waste Less</p>
                    </div>
                </div>

                <div className="card signup-card">
                    <div className="card-header">
                        <h2 className="signup-card-title">Create Account</h2>
                        <p className="card-description signup-card-description">
                            Join Pantrix to save recipes and personalize your experience
                        </p>
                    </div>

                    <div className="card-content">
                        <form onSubmit={handleSubmit} className="signup-form">

                            <div className="signup-form-group">
                                <label>Full Name</label>
                                <input
                                    className="input"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="signup-form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="input"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="signup-form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="signup-form-group">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary signup-submit-btn"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating account..." : "Sign Up"}
                            </button>
                        </form>

                        <div className="signup-footer">
                            <p>
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    className="signup-link-btn"
                                    onClick={() => navigate("/login")}>
                                    Log in
                                </button>
                            </p>

                            <p className="signup-demo-text">
                                Demo: Use any credentials to create an account
                            </p>
                        </div>
                    </div>
                </div>

                <div className="signup-back-home">
                    <button
                        className="btn btn-ghost"
                        onClick={() => navigate("/")}
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;