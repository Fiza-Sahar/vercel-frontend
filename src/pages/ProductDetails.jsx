import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [addedMessage, setAddedMessage] = useState(false);

    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await fetch(`https://vercel-backend-blue-phi.vercel.app/api/products/${id}`);
                const data = await res.json();

                if (res.ok && data.success) {
                    setProduct(data.product);
                } else {
                    setError(data.message || "Product not found");
                }
            } catch (err) {
                console.error("Product Details Error:", err);
                setError("Server connection failed");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, quantity);
        setAddedMessage(true);
        setTimeout(() => setAddedMessage(false), 3500);
    };

    if (loading) {
        return (
            <div className="text-center py-5 my-5">
                <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading product details...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container py-5 text-center my-5">
                <div className="alert alert-danger mb-4 shadow-sm">{error || "Product not found"}</div>
                <Link to="/products" className="btn btn-modern-primary">
                    <i className="bi bi-arrow-left me-1"></i> Back to Products Catalog
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <Link to="/products" className="btn btn-modern-outline mb-4">
                <i className="bi bi-arrow-left"></i> Back to Products
            </Link>

            {addedMessage && (
                <div className="alert alert-success alert-dismissible fade show rounded-3 shadow-sm d-flex align-items-center justify-content-between" role="alert">
                    <div>
                        <i className="bi bi-check-circle-fill me-2 text-success"></i>
                        <strong>{product.title}</strong> (Quantity: {quantity}) was added to your cart!
                    </div>
                    <Link to="/cart" className="btn btn-sm btn-success fw-bold px-3">
                        View Cart & Checkout <i className="bi bi-arrow-right ms-1"></i>
                    </Link>
                </div>
            )}

            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
                <div className="row g-5 align-items-center">
                    {/* Product Image */}
                    <div className="col-lg-6 text-center">
                        <div className="position-relative overflow-hidden rounded-4 shadow-sm bg-light p-2">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="img-fluid rounded-3"
                                style={{ maxHeight: "420px", width: "100%", objectFit: "cover" }}
                            />
                            <span className="badge bg-dark position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill">
                                {product.category}
                            </span>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="col-lg-6">
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-1 rounded-pill">
                                {product.category}
                            </span>
                            <span className="product-rating">
                                <i className="bi bi-star-fill text-warning me-1"></i>
                                {product.rating || 4.8} / 5.0 (Verified Reviews)
                            </span>
                        </div>

                        <h1 className="fw-bold mb-3 text-dark display-6">{product.title}</h1>

                        <div className="d-flex align-items-baseline gap-3 mb-4">
                            <span className="display-6 fw-bold text-dark">
                                ${product.price}
                            </span>
                            <span className="text-muted text-decoration-line-through fs-5">
                                ${(product.price * 1.25).toFixed(0)}
                            </span>
                            <span className="badge bg-success-subtle text-success fw-bold px-2 py-1">
                                Save 20%
                            </span>
                        </div>

                        <p className="text-muted fs-6 mb-4" style={{ lineHeight: "1.7" }}>
                            {product.description}
                        </p>

                        <div className="mb-4 d-flex align-items-center gap-2">
                            <span className="fw-bold text-muted small">STATUS:</span>
                            {product.stock > 0 ? (
                                <span className="badge bg-success px-3 py-2 rounded-pill">
                                    In Stock ({product.stock} units available)
                                </span>
                            ) : (
                                <span className="badge bg-danger px-3 py-2 rounded-pill">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        {product.stock > 0 && (
                            <div className="d-flex align-items-center gap-3 mb-4">
                                <span className="fw-bold text-muted small">QUANTITY:</span>
                                <div className="input-group" style={{ width: "140px" }}>
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        className="form-control text-center fw-bold bg-white"
                                        value={quantity}
                                        readOnly
                                    />
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="d-flex flex-wrap gap-3">
                            <button
                                className="btn-modern-primary btn-lg px-4 flex-grow-1"
                                onClick={handleAddToCart}
                                disabled={product.stock <= 0}
                            >
                                <i className="bi bi-cart-plus me-1"></i> Add to Cart
                            </button>
                            <Link to="/cart" className="btn btn-modern-secondary btn-lg px-4">
                                <i className="bi bi-bag-check me-1"></i> View Cart
                            </Link>
                        </div>

                        {/* Assurance */}
                        <div className="row g-2 mt-4 pt-3 border-top text-muted small">
                            <div className="col-6">
                                <i className="bi bi-shield-check text-success me-1"></i> 1 Year Warranty Included
                            </div>
                            <div className="col-6">
                                <i className="bi bi-arrow-repeat text-primary me-1"></i> 30 Days Free Return
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
