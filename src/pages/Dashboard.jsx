import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user, authorizationToken, updateUser, isAdmin } = useAuth();

    const [formData, setFormData] = useState({
        username: user?.username || "",
        phone: user?.phone || "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/auth/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Profile updated successfully!");
                updateUser(data.user);
                setIsEditing(false);
            } else {
                setError(data.message || "Failed to update profile");
            }
        } catch (err) {
            console.error(err);
            setError("Server connection error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    {/* Welcome Header */}
                    <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div className="d-flex align-items-center gap-3">
                                <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-4" style={{ width: "60px", height: "60px" }}>
                                    {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
                                </div>
                                <div>
                                    <div className="d-flex align-items-center gap-2 mb-1">
                                        <h3 className="fw-bold mb-0">{user?.username || "Valued Customer"}</h3>
                                        <span className={`badge ${isAdmin ? "bg-dark text-warning border" : "bg-primary-subtle text-primary"} rounded-pill fw-bold`}>
                                            <i className={`bi ${isAdmin ? "bi-shield-lock-fill me-1" : "bi-person-check-fill me-1"}`}></i>
                                            {isAdmin ? "Administrator" : "Customer Account"}
                                        </span>
                                    </div>
                                    <p className="text-muted small mb-0">{user?.email}</p>
                                </div>
                            </div>

                            <div className="d-flex gap-2">
                                <Link to="/my-orders" className="btn btn-modern-outline">
                                    <i className="bi bi-box-seam me-1"></i> My Orders
                                </Link>
                                <Link to="/products" className="btn btn-modern-primary">
                                    <i className="bi bi-cart3 me-1"></i> Browse Store
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats / Action Cards */}
                    <div className="row g-3 mb-4">
                        <div className="col-md-4">
                            <Link to="/my-orders" className="text-decoration-none">
                                <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100 text-center">
                                    <div className="text-primary fs-3 mb-2">
                                        <i className="bi bi-bag-check"></i>
                                    </div>
                                    <h6 className="fw-bold text-dark mb-1">Order History</h6>
                                    <p className="text-muted small mb-0">Track and review past orders</p>
                                </div>
                            </Link>
                        </div>

                        <div className="col-md-4">
                            <Link to="/cart" className="text-decoration-none">
                                <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100 text-center">
                                    <div className="text-primary fs-3 mb-2">
                                        <i className="bi bi-cart3"></i>
                                    </div>
                                    <h6 className="fw-bold text-dark mb-1">Shopping Cart</h6>
                                    <p className="text-muted small mb-0">View items saved in cart</p>
                                </div>
                            </Link>
                        </div>

                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100 text-center">
                                <div className="text-success fs-3 mb-2">
                                    <i className="bi bi-shield-check"></i>
                                </div>
                                <h6 className="fw-bold text-dark mb-1">Account Security</h6>
                                <p className="text-muted small mb-0">JWT authenticated session</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Information & Edit Form */}
                    <div className="card border-0 shadow-sm rounded-4 bg-white p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                            <div>
                                <h5 className="fw-bold mb-1">Profile Details</h5>
                                <p className="text-muted small mb-0">Manage your personal information and contact number</p>
                            </div>
                            {!isEditing && (
                                <button
                                    className="btn btn-sm btn-outline-dark rounded-pill px-3"
                                    onClick={() => setIsEditing(true)}
                                >
                                    <i className="bi bi-pencil me-1"></i> Edit Profile
                                </button>
                            )}
                        </div>

                        {message && (
                            <div className="alert alert-success rounded-3 shadow-sm mb-3">
                                <i className="bi bi-check-circle-fill me-2"></i> {message}
                            </div>
                        )}
                        {error && (
                            <div className="alert alert-danger rounded-3 shadow-sm mb-3">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
                            </div>
                        )}

                        {!isEditing ? (
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label className="text-muted small fw-bold text-uppercase">Username</label>
                                    <p className="fw-semibold fs-6 mb-0 text-dark">{user?.username || "—"}</p>
                                </div>

                                <div className="col-sm-6">
                                    <label className="text-muted small fw-bold text-uppercase">Email Address</label>
                                    <p className="fw-semibold fs-6 mb-0 text-dark">{user?.email || "—"}</p>
                                </div>

                                <div className="col-sm-6">
                                    <label className="text-muted small fw-bold text-uppercase">Contact Phone</label>
                                    <p className="fw-semibold fs-6 mb-0 text-dark">{user?.phone || "Not provided"}</p>
                                </div>

                                <div className="col-sm-6">
                                    <label className="text-muted small fw-bold text-uppercase">Account Type</label>
                                    <p className="fw-semibold fs-6 mb-0 text-dark">{isAdmin ? "Administrator" : "Standard Customer"}</p>
                                </div>

                                {isAdmin && (
                                    <div className="col-12 mt-4 pt-3 border-top">
                                        <div className="alert alert-dark d-flex justify-content-between align-items-center mb-0 rounded-3 text-white">
                                            <div>
                                                <i className="bi bi-shield-lock-fill text-warning me-2"></i>
                                                <strong>Administrator privileges detected.</strong> You have full store management permissions.
                                            </div>
                                            <Link to="/admin" className="btn btn-sm btn-warning fw-bold text-nowrap ms-3">
                                                Open Admin Panel <i className="bi bi-arrow-right ms-1"></i>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold small text-muted">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold small text-muted">Email Address (Read only)</label>
                                    <input
                                        type="email"
                                        className="form-control bg-light"
                                        value={user?.email || ""}
                                        disabled
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-bold small text-muted">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="d-flex gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-modern-primary"
                                        disabled={loading}
                                    >
                                        {loading ? "Saving Changes..." : "Save Changes"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;