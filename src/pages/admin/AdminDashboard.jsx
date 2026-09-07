import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
    const { authorizationToken, user } = useAuth();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        recentOrders: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const res = await fetch("http://localhost:3000/api/admin/stats", {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    },
                });

                const data = await res.json();

                if (res.ok && data.success) {
                    setStats(data.stats);
                } else {
                    setError(data.message || "Failed to load dashboard stats");
                }
            } catch (err) {
                console.error("Admin Stats Error:", err);
                setError("Server connection failed. Ensure backend server is running on port 3000.");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [authorizationToken]);

    if (loading) {
        return (
            <div className="text-center py-5 my-5">
                <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                    <span className="visually-hidden">Loading dashboard...</span>
                </div>
                <p className="mt-3 text-muted">Loading admin analytics...</p>
            </div>
        );
    }

    return (
        <div className="container py-5">
            {/* Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3 bg-white p-4 rounded-4 shadow-sm border">
                <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="badge bg-dark text-warning border px-3 py-1 rounded-pill fw-bold">
                            <i className="bi bi-shield-lock-fill me-1"></i> Administrator Portal
                        </span>
                        <span className="text-muted small">Logged in as <strong>{user?.username || "Admin"}</strong></span>
                    </div>
                    <h1 className="fw-bold mb-1 display-6">Store Overview & Analytics</h1>
                    <p className="text-muted mb-0">Manage catalog, track customer orders, and view live revenue metrics.</p>
                </div>

                <div className="d-flex flex-wrap gap-2">
                    <Link to="/admin/products" className="btn btn-modern-primary">
                        <i className="bi bi-box-seam me-1"></i> Products
                    </Link>
                    <Link to="/admin/orders" className="btn btn-modern-amber">
                        <i className="bi bi-receipt me-1"></i> Orders
                    </Link>
                    <Link to="/admin/users" className="btn btn-modern-outline">
                        <i className="bi bi-people me-1"></i> Users
                    </Link>
                </div>
            </div>

            {error && (
                <div className="alert alert-danger rounded-3 shadow-sm mb-4">
                    <i className="bi bi-exclamation-octagon-fill me-2"></i> {error}
                </div>
            )}

            {/* Statistics Cards */}
            <div className="row g-4 mb-5">
                {/* Total Revenue */}
                <div className="col-sm-6 col-lg-3">
                    <div className="admin-stat-card">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-muted small fw-bold text-uppercase">Total Sales</span>
                            <div className="admin-stat-icon revenue">
                                <i className="bi bi-currency-dollar"></i>
                            </div>
                        </div>
                        <h3 className="fw-bold mb-1 text-success">
                            ${stats.totalRevenue?.toFixed(2) || "0.00"}
                        </h3>
                        <span className="text-muted small">
                            <i className="bi bi-graph-up text-success me-1"></i> Lifetime Store Earnings
                        </span>
                    </div>
                </div>

                {/* Total Orders */}
                <div className="col-sm-6 col-lg-3">
                    <div className="admin-stat-card">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-muted small fw-bold text-uppercase">Total Orders</span>
                            <div className="admin-stat-icon orders">
                                <i className="bi bi-bag-check-fill"></i>
                            </div>
                        </div>
                        <h3 className="fw-bold mb-1 text-primary">{stats.totalOrders || 0}</h3>
                        <span className="text-muted small">
                            <i className="bi bi-cart-check text-primary me-1"></i> Customer Purchases
                        </span>
                    </div>
                </div>

                {/* Total Products */}
                <div className="col-sm-6 col-lg-3">
                    <div className="admin-stat-card">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-muted small fw-bold text-uppercase">Catalog Items</span>
                            <div className="admin-stat-icon products">
                                <i className="bi bi-tags-fill"></i>
                            </div>
                        </div>
                        <h3 className="fw-bold mb-1 text-dark">{stats.totalProducts || 0}</h3>
                        <span className="text-muted small">
                            <i className="bi bi-box text-dark me-1"></i> Active Store Products
                        </span>
                    </div>
                </div>

                {/* Total Users */}
                <div className="col-sm-6 col-lg-3">
                    <div className="admin-stat-card">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-muted small fw-bold text-uppercase">Total Customers</span>
                            <div className="admin-stat-icon users">
                                <i className="bi bi-person-lines-fill"></i>
                            </div>
                        </div>
                        <h3 className="fw-bold mb-1 text-dark">{stats.totalUsers || 0}</h3>
                        <span className="text-muted small">
                            <i className="bi bi-person-check text-dark me-1"></i> Registered Accounts
                        </span>
                    </div>
                </div>
            </div>

            {/* Recent Orders Section */}
            <div className="card border shadow-sm rounded-4 overflow-hidden bg-white mb-4">
                <div className="card-header bg-dark text-white p-3 px-4 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-clock-history text-primary fs-5"></i>
                        <h5 className="mb-0 text-white fw-bold">Recent Customer Orders</h5>
                    </div>
                    <Link to="/admin/orders" className="btn btn-sm btn-outline-light rounded-pill px-3">
                        View All Orders <i className="bi bi-arrow-right ms-1"></i>
                    </Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="ps-4">Order ID</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.recentOrders?.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">
                                        <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                                        No recent orders placed yet.
                                    </td>
                                </tr>
                            ) : (
                                stats.recentOrders?.map((order) => (
                                    <tr key={order._id}>
                                        <td className="ps-4 font-monospace small fw-bold text-primary">
                                            #{order._id.substring(order._id.length - 8).toUpperCase()}
                                        </td>
                                        <td>
                                            <span className="fw-semibold d-block">
                                                {order.user?.username || "Guest / Deleted"}
                                            </span>
                                            <span className="small text-muted">
                                                {order.user?.email}
                                            </span>
                                        </td>
                                        <td className="fw-bold text-dark">${order.totalPrice?.toFixed(2)}</td>
                                        <td>
                                            <span
                                                className={`badge rounded-pill px-3 py-2 ${
                                                    order.orderStatus === "Delivered"
                                                        ? "bg-success"
                                                        : order.orderStatus === "Shipped"
                                                        ? "bg-primary"
                                                        : "bg-warning text-dark"
                                                }`}
                                            >
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        <td className="small text-muted">
                                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric"
                                            })}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
