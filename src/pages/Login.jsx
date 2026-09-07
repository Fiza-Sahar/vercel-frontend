import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("https://vercel-backend-blue-phi.vercel.app/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Invalid email or password");
                setLoading(false);
                return;
            }

            // Save token and user details in AuthContext & LocalStorage
            login(data.token, data.user);

            // ROLE-BASED REDIRECTION:
            // If Admin -> Redirect directly to Admin Panel (/admin)
            // If Regular User -> Redirect directly to User Panel / Profile (/dashboard)
            if (data.user && data.user.isAdmin) {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError("Unable to connect to the server. Please check your backend connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-5" style={{ minHeight: "85vh", display: "flex", alignItems: "center" }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-7">
                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden bg-white">
                            <div className="row g-0">
                                <div className="p-4 p-md-5">
                                    <div className="text-center mb-4">
                                        <div className="d-inline-flex p-3 rounded-circle bg-primary-subtle text-primary mb-3">
                                            <i className="bi bi-shield-lock-fill fs-3"></i>
                                        </div>
                                        <h2 className="fw-bold mb-1">Welcome Back</h2>
                                        <p className="text-muted small">
                                            Enter your credentials to access your account & dashboard
                                        </p>
                                    </div>

                                    {error && (
                                        <div className="alert alert-danger d-flex align-items-center rounded-3 shadow-sm mb-4" role="alert">
                                            <i className="bi bi-exclamation-circle-fill me-2 fs-5"></i>
                                            <div>{error}</div>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold small text-muted">
                                                Email Address
                                            </label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    <i className="bi bi-envelope text-muted"></i>
                                                </span>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control border-start-0 bg-light py-2"
                                                    placeholder="name@example.com"
                                                    value={user.email}
                                                    onChange={handleInput}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <label className="form-label fw-bold small text-muted mb-0">
                                                    Password
                                                </label>
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    <i className="bi bi-lock text-muted"></i>
                                                </span>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    className="form-control border-start-0 border-end-0 bg-light py-2"
                                                    placeholder="••••••••"
                                                    value={user.password}
                                                    onChange={handleInput}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="input-group-text bg-light border-start-0 text-muted"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-modern-primary w-100 py-3 mb-3 fw-bold"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                    Signing in...
                                                </>
                                            ) : (
                                                <>
                                                    Sign In to Account <i className="bi bi-arrow-right ms-1"></i>
                                                </>
                                            )}
                                        </button>

                                       

                                        <div className="text-center">
                                            <p className="text-muted small mb-0">
                                                Don't have an account yet?{" "}
                                                <Link to="/register" className="text-primary fw-bold text-decoration-none">
                                                    Create an account
                                                </Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
