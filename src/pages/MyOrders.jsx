import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { authorizationToken } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const res = await fetch("https://vercel-backend-blue-phi.vercel.app/api/orders/my-orders", {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    },
                });

                const data = await res.json();

                if (res.ok && data.success) {
                    setOrders(data.orders);
                } else {
                    setError(data.message || "Failed to load orders");
                }
            } catch (err) {
                console.error("Fetch Orders Error:", err);
                setError("Server connection failed");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [authorizationToken]);

    const getStatusBadge = (status) => {
        switch (status) {
            case "Delivered":
                return <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill"><i className="bi bi-check-circle-fill me-1"></i> Delivered</span>;
            case "Shipped":
                return <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill"><i className="bi bi-truck me-1"></i> Shipped</span>;
            case "Processing":
                return <span className="badge bg-info-subtle text-info border border-info-subtle px-3 py-2 rounded-pill"><i className="bi bi-arrow-repeat me-1"></i> Processing</span>;
            case "Cancelled":
                return <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-3 py-2 rounded-pill"><i className="bi bi-x-circle me-1"></i> Cancelled</span>;
            case "Pending":
            default:
                return <span className="badge bg-warning-subtle text-warning border border-warning-subtle px-3 py-2 rounded-pill"><i className="bi bi-clock me-1"></i> Pending</span>;
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5 my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading orders...</span>
                </div>
                <p className="mt-3 text-muted">Retrieving your order history...</p>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="fw-bold mb-1 display-6">My Orders</h1>
                    <p className="text-muted small mb-0">Track delivery status and view order details</p>
                </div>
                <Link to="/products" className="btn btn-modern-outline">
                    <i className="bi bi-arrow-left me-1"></i> Continue Shopping
                </Link>
            </div>

            {error && (
                <div className="alert alert-danger rounded-3 shadow-sm mb-4">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
                </div>
            )}

            {orders.length === 0 ? (
                <div className="card border-0 shadow-sm rounded-4 p-5 text-center my-4 bg-white">
                    <div className="text-muted fs-1 mb-3">
                        <i className="bi bi-inbox"></i>
                    </div>
                    <h3 className="fw-bold mb-2">No Orders Placed Yet</h3>
                    <p className="text-muted mb-4">When you purchase items, your order history and live tracking will show up here.</p>
                    <div>
                        <Link to="/products" className="btn btn-modern-primary">
                            Browse Collection <i className="bi bi-arrow-right ms-1"></i>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="d-flex flex-column gap-4">
                    {orders.map((order) => (
                        <div key={order._id} className="card shadow-sm border rounded-4 overflow-hidden bg-white">
                            {/* Order Header */}
                            <div className="card-header bg-light d-flex flex-wrap justify-content-between align-items-center p-3 px-4">
                                <div>
                                    <span className="text-muted small fw-bold">ORDER ID: </span>
                                    <span className="fw-bold font-monospace small text-primary">#{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                                    <span className="mx-2 text-muted">|</span>
                                    <span className="text-muted small">
                                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>
                                <div className="d-flex align-items-center gap-3 mt-2 mt-sm-0">
                                    <div>{getStatusBadge(order.orderStatus)}</div>
                                    <span className="fw-bold fs-5 text-dark">
                                        ${order.totalPrice?.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Order Body */}
                            <div className="card-body p-4">
                                <div className="row g-4">
                                    {/* Order Items */}
                                    <div className="col-md-8">
                                        <h6 className="fw-bold text-muted small text-uppercase mb-3">Items Ordered:</h6>
                                        <div className="d-flex flex-column gap-3">
                                            {order.orderItems.map((item, idx) => (
                                                <div key={idx} className="d-flex align-items-center gap-3">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="rounded-3 shadow-sm"
                                                        style={{ width: "56px", height: "56px", objectFit: "cover" }}
                                                    />
                                                    <div className="flex-grow-1">
                                                        <p className="mb-0 fw-bold text-dark">{item.title}</p>
                                                        <span className="small text-muted">
                                                            Qty: {item.quantity} × ${item.price}
                                                        </span>
                                                    </div>
                                                    <span className="fw-bold text-dark">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Shipping & Payment Details */}
                                    <div className="col-md-4 border-start-md ps-md-4">
                                        <h6 className="fw-bold text-muted small text-uppercase mb-2">Delivery Address:</h6>
                                        <p className="small mb-1 fw-bold text-dark">{order.shippingAddress?.fullName}</p>
                                        <p className="small mb-1 text-muted">
                                            {order.shippingAddress?.address}, {order.shippingAddress?.city}
                                        </p>
                                        <p className="small text-muted mb-3">
                                            <i className="bi bi-telephone me-1"></i> {order.shippingAddress?.phone}
                                        </p>

                                        <h6 className="fw-bold text-muted small text-uppercase mb-1">Payment Method:</h6>
                                        <p className="small badge bg-secondary-subtle text-secondary border">
                                            {order.paymentMethod}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
