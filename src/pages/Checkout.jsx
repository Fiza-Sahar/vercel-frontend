import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
    const { cartItems, subtotal, shippingPrice, totalPrice, clearCart } = useCart();
    const { user, authorizationToken } = useAuth();
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState({
        fullName: user?.username || "",
        phone: user?.phone || "",
        address: "",
        city: "",
        postalCode: "",
        country: "Pakistan",
    });

    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value,
        });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setError("");

        if (cartItems.length === 0) {
            setError("Cart empty hai!");
            return;
        }

        // Validate address fields
        if (
            !shippingAddress.fullName ||
            !shippingAddress.phone ||
            !shippingAddress.address ||
            !shippingAddress.city
        ) {
            setError("Kripya saare zaroori address fields fill karein.");
            return;
        }

        try {
            setLoading(true);

            // Format order items for backend
            const orderItems = cartItems.map((item) => ({
                title: item.title,
                quantity: item.quantity,
                price: item.price,
                image: item.image,
                product: item._id,
            }));

            const response = await fetch("http://localhost:3000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify({
                    orderItems,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice: subtotal,
                    shippingPrice,
                    totalPrice,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Cart clear karein
                clearCart();
                // My Orders page par redirect karein
                navigate("/my-orders");
            } else {
                setError(data.message || "Order place karne mein masla aaya");
            }
        } catch (err) {
            console.error("Order Place Error:", err);
            setError("Server se connect nahi ho saka");
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container py-5 text-center">
                <div className="alert alert-warning">
                    Aapka cart khali hai. Order karne ke liye pehle products add karein.
                </div>
                <Link to="/products" className="btn btn-dark">
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-4">Checkout & Shipping</h1>

            {error && <div className="alert alert-danger mb-4">{error}</div>}

            <div className="row g-5">
                {/* Shipping Details Form */}
                <div className="col-lg-7">
                    <div className="card shadow-sm border-0 rounded-3 p-4">
                        <h4 className="fw-bold mb-4">1. Shipping Information</h4>

                        <form onSubmit={handlePlaceOrder}>
                            <div className="row g-3 mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Full Name *</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        className="form-control"
                                        value={shippingAddress.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Phone Number *</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control"
                                        placeholder="0300-1234567"
                                        value={shippingAddress.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Street Address *</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    placeholder="House / Flat No., Street, Area"
                                    value={shippingAddress.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="row g-3 mb-4">
                                <div className="col-md-4">
                                    <label className="form-label">City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        className="form-control"
                                        placeholder="Karachi / Lahore etc."
                                        value={shippingAddress.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label">Postal Code</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        className="form-control"
                                        placeholder="75000"
                                        value={shippingAddress.postalCode}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        className="form-control"
                                        value={shippingAddress.country}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <h4 className="fw-bold mb-3 mt-4">2. Payment Method</h4>
                            <div className="mb-4">
                                <div className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="paymentMethod"
                                        id="cod"
                                        value="Cash on Delivery"
                                        checked={paymentMethod === "Cash on Delivery"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <label className="form-check-label fw-semibold" htmlFor="cod">
                                        💵 Cash on Delivery (COD)
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="paymentMethod"
                                        id="online"
                                        value="Online Payment (Demo)"
                                        checked={paymentMethod === "Online Payment (Demo)"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <label className="form-check-label fw-semibold" htmlFor="online">
                                        💳 Debit / Credit Card (Demo)
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-warning btn-lg w-100 fw-bold py-3 mt-2"
                                disabled={loading}
                            >
                                {loading ? "Placing Order..." : `Place Order ($${totalPrice.toFixed(2)})`}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Order Items Review Sidebar */}
                <div className="col-lg-5">
                    <div className="card shadow-sm border-0 rounded-3 p-4 bg-light">
                        <h4 className="fw-bold mb-3">Order Items ({cartItems.length})</h4>

                        <div className="checkout-items-list mb-3" style={{ maxHeight: "300px", overflowY: "auto" }}>
                            {cartItems.map((item) => (
                                <div key={item._id} className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex align-items-center gap-2">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="rounded"
                                            style={{ width: "45px", height: "45px", objectFit: "cover" }}
                                        />
                                        <div>
                                            <p className="mb-0 small fw-bold text-truncate" style={{ maxWidth: "180px" }}>
                                                {item.title}
                                            </p>
                                            <span className="small text-muted">
                                                Qty: {item.quantity} × ${item.price}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="fw-bold">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Items Subtotal</span>
                            <span className="fw-bold">${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Shipping</span>
                            <span className="fw-bold">
                                {shippingPrice === 0 ? "Free" : `$${shippingPrice.toFixed(2)}`}
                            </span>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
                            <span>Grand Total</span>
                            <span className="text-warning">${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
