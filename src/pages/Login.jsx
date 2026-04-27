import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/login.css";
import { Mail, Lock } from "lucide-react";
import pantrixLogo from "../assets/images/Pantrix.png";
import { login } from "../services/authService.js";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState("");

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(""), 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            showToast("Please fill in all fields");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            showToast("Email must include '@' and '.' like example@email.com");
            return;
        }

        try {
            setIsLoading(true);

            const user = await login(email, password);

            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem(
                "welcomeMessage",
                user.role === "admin" ? "Welcome Admin!" : "Welcome back!"
            );

            showToast(user.role === "admin" ? "Welcome Admin!" : "Welcome back!");

            if (user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (error) {
            showToast(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">
            {toast && <div className="toast">{toast}</div>}

            <div className="login-wrapper">
                <div className="login-logo-block">
                    <img src={pantrixLogo} alt="Pantrix logo" className="login-logo" />
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
                        <form onSubmit={handleSubmit} className="login-form" noValidate>
                            <div className="login-form-group">
                                <label htmlFor="email">Email</label>
                                <div className="login-input-wrap">
                                    <Mail className="login-input-icon-svg" />
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
                                    <Lock className="login-input-icon-svg" />
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
                                className="btn btn-primary login-submit-btn"
                                disabled={isLoading}
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