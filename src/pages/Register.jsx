import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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
            const response = await fetch("https://vercel-backend-blue-phi.vercel.app/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (response.ok) {
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                });

                // Redirect to login page with success
                navigate("/login");
            } else {
                setError(data.msg || data.message || "Registration failed. Please check your information.");
            }
        } catch (err) {
            console.error("Register Error:", err);
            setError("Server connection failed. Please ensure the backend is running.");
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
                            <div className="p-4 p-md-5">
                                <div className="text-center mb-4">
                                    <div className="d-inline-flex p-3 rounded-circle bg-primary-subtle text-primary mb-3">
                                        <i className="bi bi-person-plus-fill fs-3"></i>
                                    </div>
                                    <h2 className="fw-bold mb-1">Create an Account</h2>
                                    <p className="text-muted small">
                                        Join MERN Store to enjoy seamless ordering, wishlist, and fast checkout
                                    </p>
                                </div>

                                {error && (
                                    <div className="alert alert-danger d-flex align-items-center rounded-3 shadow-sm mb-4" role="alert">
                                        <i className="bi bi-exclamation-circle-fill me-2 fs-5"></i>
                                        <div>{error}</div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted">
                                                Username
                                            </label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    <i className="bi bi-person text-muted"></i>
                                                </span>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    className="form-control border-start-0 bg-light py-2"
                                                    placeholder="JohnDoe"
                                                    value={user.username}
                                                    onChange={handleInput}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted">
                                                Phone Number
                                            </label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    <i className="bi bi-telephone text-muted"></i>
                                                </span>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    className="form-control border-start-0 bg-light py-2"
                                                    placeholder="+92 300 1234567"
                                                    value={user.phone}
                                                    onChange={handleInput}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12">
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

                                        <div className="col-12">
                                            <label className="form-label fw-bold small text-muted">
                                                Password
                                            </label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    <i className="bi bi-lock text-muted"></i>
                                                </span>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    className="form-control border-start-0 border-end-0 bg-light py-2"
                                                    placeholder="Create a strong password"
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
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-modern-primary w-100 py-3 mt-4 mb-3 fw-bold"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                Creating account...
                                            </>
                                        ) : (
                                            <>
                                                Create Account <i className="bi bi-arrow-right ms-1"></i>
                                            </>
                                        )}
                                    </button>

                                    <div className="text-center">
                                        <p className="text-muted small mb-0">
                                            Already have an account?{" "}
                                            <Link to="/login" className="text-primary fw-bold text-decoration-none">
                                                Sign In
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;