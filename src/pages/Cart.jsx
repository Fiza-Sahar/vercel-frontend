import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        shippingPrice,
        totalPrice,
    } = useCart();

    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!isLoggedIn) {
            navigate("/login");
        } else {
            navigate("/checkout");
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container py-5 text-center my-5">
                <div className="card border-0 shadow-sm rounded-4 p-5 mx-auto bg-white" style={{ maxWidth: "500px" }}>
                    <div className="text-muted fs-1 mb-3">
                        <i className="bi bi-cart-x"></i>
                    </div>
                    <h2 className="fw-bold mb-2">Your Cart is Empty</h2>
                    <p className="text-muted mb-4">
                        Looks like you haven't added any products to your cart yet.
                    </p>
                    <Link to="/products" className="btn btn-modern-primary btn-lg">
                        Start Shopping <i className="bi bi-arrow-right ms-1"></i>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-4 display-6">Shopping Cart ({cartItems.length} items)</h1>

            <div className="row g-4">
                {/* Cart Items List */}
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0 rounded-4 mb-3 overflow-hidden bg-white">
                        <div className="table-responsive">
                            <table className="table align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col" className="ps-4">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                        <th scope="col" className="text-end pe-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item._id} className="border-bottom">
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center gap-3 py-2">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="rounded-3 shadow-sm"
                                                        style={{ width: "64px", height: "64px", objectFit: "cover" }}
                                                    />
                                                    <div>
                                                        <Link
                                                            to={`/product/${item._id}`}
                                                            className="fw-bold text-dark text-decoration-none"
                                                        >
                                                            {item.title}
                                                        </Link>
                                                        <span className="d-block small text-muted">Category: {item.category}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="fw-semibold">${item.price}</td>
                                            <td>
                                                <div className="input-group" style={{ width: "115px" }}>
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="input-group-text bg-white px-3 small fw-bold">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                        disabled={item.quantity >= (item.stock || 100)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="fw-bold text-dark">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </td>
                                            <td className="text-end pe-4">
                                                <button
                                                    className="btn btn-sm btn-outline-danger rounded-circle p-2"
                                                    onClick={() => removeFromCart(item._id)}
                                                    title="Remove item"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <Link to="/products" className="btn btn-modern-outline">
                            <i className="bi bi-arrow-left me-1"></i> Continue Shopping
                        </Link>
                        <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>
                            <i className="bi bi-x-circle me-1"></i> Clear Cart
                        </button>
                    </div>
                </div>

                {/* Cart Summary */}
                <div className="col-lg-4">
                    <div className="card shadow-sm border-0 rounded-4 p-4 bg-white">
                        <h4 className="fw-bold mb-3">Order Summary</h4>

                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Subtotal</span>
                            <span className="fw-bold">${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Estimated Shipping</span>
                            <span className="fw-bold">
                                {shippingPrice === 0 ? (
                                    <span className="badge bg-success-subtle text-success">Free</span>
                                ) : (
                                    `$${shippingPrice.toFixed(2)}`
                                )}
                            </span>
                        </div>

                        {shippingPrice > 0 && (
                            <p className="small text-muted mb-3">
                                <i className="bi bi-info-circle me-1"></i> Add ${(100 - subtotal).toFixed(2)} more for Free Shipping!
                            </p>
                        )}

                        <hr />

                        <div className="d-flex justify-content-between mb-4 fs-5 fw-bold">
                            <span>Estimated Total</span>
                            <span className="text-dark">${totalPrice.toFixed(2)}</span>
                        </div>

                        <button
                            className="btn btn-modern-primary btn-lg w-100 fw-bold"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout <i className="bi bi-arrow-right ms-1"></i>
                        </button>

                        {!isLoggedIn && (
                            <p className="small text-center text-muted mt-2 mb-0">
                                You will be asked to log in before confirming your order.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
