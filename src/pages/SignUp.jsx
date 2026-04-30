import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/SignUp.css";
import pantrixLogo from "../assets/images/Pantrix.png";
import { User, Mail, Lock } from "lucide-react";
import { signup } from "../services/authService.js";

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
        setTimeout(() => setToast(""), 2200);
    };
    const passwordChecks = {
        hasMinLength: password.length >= 6,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[@$!%*#&]/.test(password),
    };

    const isPasswordValid =
        passwordChecks.hasMinLength &&
        passwordChecks.hasUppercase &&
        passwordChecks.hasLowercase &&
        passwordChecks.hasNumber &&
        passwordChecks.hasSpecialChar;

    const showPasswordRules = password.length > 0 && !isPasswordValid;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            showToast("Please fill in all fields");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            showToast("Email must include '@' and '.' like example@email.com");
            return;
        }

        if (password !== confirmPassword) {
            showToast("Passwords don't match");
            return;
        }

        if (!isPasswordValid) {
            showToast("Password does not meet all requirements");
            return;
        }

        try {
            setIsLoading(true);

            await signup({
                name,
                email,
                password,
            });

            showToast("Account created successfully!");
            navigate("/login");
        } catch (error) {
            showToast(error.message);
        } finally {
            setIsLoading(false);
        }
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
                        <form onSubmit={handleSubmit} className="signup-form" noValidate>
                            <div className="signup-form-group">
                                <label htmlFor="name">Full Name</label>
                                <div className="signup-input-wrap">
                                    <User className="signup-input-icon-svg" />
                                    <input
                                        id="name"
                                        type="text"
                                        className="input signup-input"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="signup-form-group">
                                <label htmlFor="email">Email</label>
                                <div className="signup-input-wrap">
                                    <Mail className="signup-input-icon-svg" />
                                    <input
                                        id="email"
                                        type="email"
                                        className="input signup-input"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>



                            <div className="signup-form-group">
                                <label htmlFor="password">Password</label>
                                <div className="signup-input-wrap">
                                    <Lock className="signup-input-icon-svg" />
                                    <input
                                        id="password"
                                        type="password"
                                        className="input signup-input"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>

                                {showPasswordRules && (
                                    <div className="password-rules">
                                        <p className="password-rules-title">Password must include:</p>

                                        <div className={`password-rule ${passwordChecks.hasMinLength ? "valid" : ""}`}>
                                            {passwordChecks.hasMinLength ? "✅" : "❌"} At least 6 characters
                                        </div>

                                        <div className={`password-rule ${passwordChecks.hasUppercase ? "valid" : ""}`}>
                                            {passwordChecks.hasUppercase ? "✅" : "❌"} At least one uppercase letter
                                        </div>

                                        <div className={`password-rule ${passwordChecks.hasLowercase ? "valid" : ""}`}>
                                            {passwordChecks.hasLowercase ? "✅" : "❌"} At least one lowercase letter
                                        </div>

                                        <div className={`password-rule ${passwordChecks.hasNumber ? "valid" : ""}`}>
                                            {passwordChecks.hasNumber ? "✅" : "❌"} At least one number
                                        </div>

                                        <div className={`password-rule ${passwordChecks.hasSpecialChar ? "valid" : ""}`}>
                                            {passwordChecks.hasSpecialChar ? "✅" : "❌"} At least one special character (@$!%*#&)
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="signup-form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <div className="signup-input-wrap">
                                    <Lock className="signup-input-icon-svg" />
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        className="input signup-input"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
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
                                    onClick={() => navigate("/login")}
                                >
                                    Log in
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="signup-back-home">
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

export default SignUp;