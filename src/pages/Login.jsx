import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Login.css";
import pantrixLogo from "../assets/images/Pantrix.png";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState("");

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(""), 2000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            showToast("Please fill in all fields");
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            // showToast(role === "admin" ? "Welcome Admin!" : "Welcome back!");
            // setIsLoading(false);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userRole", role);
            localStorage.setItem("userEmail", email);

            showToast(role === "admin" ? "Welcome Admin!" : "Welcome back!");
        

            // يرجع للهوم بيج
            navigate("/");
        }, 800);
    };

    return (
        <div className="login-page">
            {toast && <div className="toast">{toast}</div>}

            <div className="login-wrapper">
                <div className="login-logo-block">
                    <img
                        src={pantrixLogo}
                        alt="Pantrix logo"
                        className="login-logo"
                    />
                    <div className="login-logo-text">
                        <h1>Pantrix</h1>
                        <p>Cook Smart, Waste Less</p>
                    </div>
                </div>

                <div className="card login-card">
                    <div className="card-header">
                        <h2 className="login-card-title">Welcome Back</h2>
                        <p className="card-description login-card-description">
                            Log in to access your saved recipes and preferences
                        </p>
                    </div>

                    <div className="card-content">
                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="login-form-group">
                                <label>Select Role</label>

                                <div className="login-role-switch">
                                    <button
                                        type="button"
                                        onClick={() => setRole("user")}
                                        className={`login-role-btn ${
                                            role === "user" ? "login-role-btn--active" : ""
                                        }`}
                                        disabled={isLoading}
                                    >
                                        Regular User
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setRole("admin")}
                                        className={`login-role-btn ${
                                            role === "admin" ? "login-role-btn--active" : ""
                                        }`}
                                        disabled={isLoading}
                                    >
                                        Admin
                                    </button>
                                </div>
                            </div>

                            <div className="login-form-group">
                                <label htmlFor="email">Email</label>
                                <div className="login-input-wrap">
                                    <span className="login-input-icon">@</span>
                                    <input
                                        id="email"
                                        type="email"
                                        className="input login-input"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="login-form-group">
                                <label htmlFor="password">Password</label>
                                <div className="login-input-wrap">
                                    <span className="login-input-icon">🔒</span>
                                    <input
                                        id="password"
                                        type="password"
                                        className="input login-input"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary login-submit-btn" disabled={isLoading}
                            >
                                {isLoading ? "Logging in..." : "Log In"}
                            </button>
                        </form>

                        <div className="login-footer">
                            <p>
                                Don&apos;t have an account?{" "}
                                <button
                                    type="button"
                                    className="login-link-btn"
                                    onClick={() => navigate("/signup")}
                                >
                                    Sign up
                                </button>
                            </p>

                            <p className="login-demo-text">
                                Demo: Use any email and password to log in
                            </p>
                        </div>
                    </div>
                </div>

                <div className="login-back-home">
                    <button
                        type="button"
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

export default Login;