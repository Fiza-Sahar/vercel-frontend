import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminOrders = () => {
    const { authorizationToken } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const fetchAllOrders = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:3000/api/orders/admin/all", {
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setOrders(data.orders);
            } else {
                setError(data.message || "Failed to fetch orders");
            }
        } catch (err) {
            console.error(err);
            setError("Server connection failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, [authorizationToken]);

    const handleStatusChange = async (orderId, newStatus) => {
        setMessage("");
        setError("");

        try {
            const res = await fetch(`http://localhost:3000/api/orders/admin/${orderId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setMessage(`Order status updated to "${newStatus}"!`);
                fetchAllOrders();
            } else {
                setError(data.message || "Failed to update order status");
            }
        } catch (err) {
            console.error(err);
            setError("Server error while updating status");
        }
    };

    return (
        <div className="container py-5">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="fw-bold mb-1">Customer Orders Management</h1>
                    <p className="text-muted mb-0">Review all orders and update dispatch / delivery status</p>
                </div>
                <Link to="/admin" className="btn btn-outline-dark mt-2 mt-sm-0">
                    <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
                </Link>
            </div>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading orders...</span>
                    </div>
                </div>
            ) : (
                <div className="card shadow-sm border rounded-4 overflow-hidden bg-white">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th className="ps-4">Order Details</th>
                                    <th>Customer</th>
                                    <th>Items</th>
                                    <th>Total Price</th>
                                    <th>Payment</th>
                                    <th>Status & Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-muted">
                                            No customer orders placed yet
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((order) => (
                                        <tr key={order._id}>
                                            <td className="ps-4">
                                                <span className="font-monospace small fw-bold d-block text-primary">
                                                    #{order._id.substring(order._id.length - 8).toUpperCase()}
                                                </span>
                                                <span className="small text-muted">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </span>
                                            </td>

                                            <td>
                                                <span className="fw-bold d-block">
                                                    {order.shippingAddress?.fullName || order.user?.username}
                                                </span>
                                                <span className="small text-muted d-block">
                                                    {order.user?.email}
                                                </span>
                                                <span className="small text-muted">
                                                    <i className="bi bi-telephone me-1"></i>
                                                    {order.shippingAddress?.phone}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="small">
                                                    {order.orderItems?.map((item, i) => (
                                                        <div key={i} className="text-truncate" style={{ maxWidth: "200px" }}>
                                                            • {item.title} (x{item.quantity})
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>

                                            <td className="fw-bold text-dark">
                                                ${order.totalPrice?.toFixed(2)}
                                            </td>

                                            <td>
                                                <span className="badge bg-secondary-subtle text-secondary border">
                                                    {order.paymentMethod}
                                                </span>
                                            </td>

                                            <td>
                                                <select
                                                    className="form-select form-select-sm fw-bold"
                                                    style={{ width: "140px" }}
                                                    value={order.orderStatus}
                                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
