import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
    const { user, isAdmin, logout } = useAuth();
    const { totalItemsCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    // Check if the current route is within the Admin Portal
    const isAdminSection = location.pathname.startsWith("/admin");

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // If currently inside Admin Portal, render dedicated Admin navigation (No customer pages shown)
    if (isAdminSection && isAdmin) {
        return (
            <nav className="navbar navbar-expand-lg navbar-custom">
                <div className="container">
                    <Link className="navbar-brand navbar-brand-custom" to="/admin">
                        <i className="bi bi-shield-lock-fill text-primary me-2 fs-4"></i>
                        <span>
                            MERN<span className="text-primary">Admin</span>
                        </span>
                        <span className="badge bg-dark text-warning border ms-2 small" style={{ fontSize: "0.7rem" }}>
                            PORTAL
                        </span>
                    </Link>

                    <button
                        className="navbar-toggler border-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#adminNavbarNav"
                        aria-controls="adminNavbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="bi bi-list fs-2 text-dark"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="adminNavbarNav">
                        <ul className="navbar-nav me-auto align-items-center gap-1 ms-lg-4">
                            <li className="nav-item">
                                <NavLink className="nav-link nav-link-custom" to="/admin" end>
                                    <i className="bi bi-speedometer2 me-1"></i> Overview
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link nav-link-custom" to="/admin/products">
                                    <i className="bi bi-box-seam me-1"></i> Products
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link nav-link-custom" to="/admin/orders">
                                    <i className="bi bi-receipt me-1"></i> Orders
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link nav-link-custom" to="/admin/users">
                                    <i className="bi bi-people me-1"></i> Users
                                </NavLink>
                            </li>
                        </ul>

                        <ul className="navbar-nav ms-auto align-items-center gap-2">
                            <li className="nav-item">
                                <Link to="/" className="btn btn-sm btn-outline-secondary rounded-pill px-3">
                                    <i className="bi bi-shop me-1"></i> View Storefront
                                </Link>
                            </li>

                            <li className="nav-item">
                                <span className="badge bg-primary-subtle text-primary border px-3 py-2 rounded-pill small fw-bold">
                                    <i className="bi bi-person-circle me-1"></i> {user?.username || "Admin"}
                                </span>
                            </li>

                            <li className="nav-item">
                                <button
                                    className="btn btn-outline-danger btn-sm rounded-pill px-3 py-1"
                                    onClick={handleLogout}
                                    title="Logout"
                                >
                                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

    // Standard Storefront Navigation (for customers and public visitors)
    return (
        <nav className="navbar navbar-expand-lg navbar-custom">
            <div className="container">
                <Link className="navbar-brand navbar-brand-custom" to="/">
                    <i className="bi bi-shop text-primary me-1 fs-4"></i>
                    <span>
                        SHOP<span className="text-primary">Sphere</span>
                    </span>
                </Link>

                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="bi bi-list fs-2 text-dark"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center gap-1">
                        <li className="nav-item">
                            <NavLink className="nav-link nav-link-custom" to="/">
                                <i className="bi bi-house-door me-1"></i> Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link nav-link-custom" to="/products">
                                <i className="bi bi-grid me-1"></i> Products
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link nav-link-custom" to="/about">
                                <i className="bi bi-info-circle me-1"></i> About
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link nav-link-custom" to="/contact">
                                <i className="bi bi-envelope me-1"></i> Contact
                            </NavLink>
                        </li>

                        {/* Shopping Cart Link with Badge */}
                        <li className="nav-item me-1">
                            <NavLink className="nav-link nav-link-custom position-relative" to="/cart">
                                <i className="bi bi-cart3 me-1"></i> Cart
                                {totalItemsCount > 0 && (
                                    <span className="cart-badge ms-1">
                                        {totalItemsCount}
                                    </span>
                                )}
                            </NavLink>
                        </li>

                        {!user ? (
                            <>
                                <li className="nav-item ms-lg-2">
                                    <NavLink className="nav-link nav-link-custom" to="/login">
                                        <i className="bi bi-box-arrow-in-right me-1"></i> Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="btn btn-modern-primary py-2 px-3 ms-lg-1" to="/register">
                                        Sign Up Free
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link nav-link-custom" to="/my-orders">
                                        <i className="bi bi-bag-check me-1"></i> Orders
                                    </NavLink>
                                </li>

                                {isAdmin && (
                                    <li className="nav-item ms-lg-1">
                                        <NavLink className="nav-link admin-nav-pill" to="/admin" title="Open Admin Panel">
                                            <i className="bi bi-shield-lock-fill me-1"></i> Admin Panel
                                        </NavLink>
                                    </li>
                                )}

                                <li className="nav-item ms-lg-1">
                                    <NavLink className="nav-link nav-link-custom" to="/dashboard">
                                        <i className="bi bi-person-circle me-1"></i> {user.username || "Profile"}
                                    </NavLink>
                                </li>

                                <li className="nav-item ms-lg-2">
                                    <button
                                        className="btn btn-outline-danger btn-sm rounded-pill px-3 py-1"
                                        onClick={handleLogout}
                                        title="Logout"
                                    >
                                        <i className="bi bi-box-arrow-right me-1"></i> Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
