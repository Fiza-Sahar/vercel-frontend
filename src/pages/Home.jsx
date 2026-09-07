import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Home() {
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState("All");
    const [loading, setLoading] = useState(true);
    const [addedId, setAddedId] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("https://vercel-backend-blue-phi.vercel.app/api/products");
                const data = await res.json();
                if (res.ok && data.success) {
                    setProducts(data.products);
                }
            } catch (err) {
                console.error("Home products fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product, 1);
        setAddedId(product._id);
        setTimeout(() => setAddedId(null), 1800);
    };

    // Filter products based on active tab
    const filteredProducts = activeTab === "All"
        ? products.slice(0, 8)
        : products.filter(p => p.category === activeTab).slice(0, 8);

    return (
        <div>
          

            {/* ================= HERO SECTION ================= */}
            <section className="hero-editorial">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <div className="hero-capsule-tag">
                                <span className="brand-dot"></span>
                                <span>Curated Essentials • 2026 Collection</span>
                            </div>

                            <h1 className="hero-title-editorial">
                                Everyday Essentials, <br />
                                Crafted for Good.
                            </h1>

                            <p className="hero-subtitle-editorial">
                                We believe in fewer, better things. Discover thoughtfully engineered electronics, minimalist footwear, and enduring apparel crafted from premium materials.
                            </p>

                            <div className="d-flex flex-wrap gap-3 mb-4">
                                <Link to="/products" className="btn-modern-primary btn-lg">
                                    Shop Collection <i className="bi bi-arrow-right"></i>
                                </Link>
                                <Link to="/about" className="btn-modern-secondary btn-lg">
                                    Our Story
                                </Link>
                            </div>

                            {/* Trust Bullet Points */}
                            <div className="d-flex flex-wrap gap-4 pt-3 text-muted small">
                                <div className="d-flex align-items-center gap-2">
                                    <i className="bi bi-check2-circle text-primary fs-6"></i>
                                    <span>Guaranteed Authentic</span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <i className="bi bi-check2-circle text-primary fs-6"></i>
                                    <span>30-Day Free Returns</span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <i className="bi bi-check2-circle text-primary fs-6"></i>
                                    <span>2-Year Warranty</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="hero-showcase-box">
                                <div className="hero-image-wrapper">
                                    <img
                                        src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80"
                                        alt="MacBook Air M2 Spotlight"
                                    />
                                    <span className="badge bg-dark position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill fw-bold">
                                        Staff Favorite
                                    </span>
                                </div>

                                <div className="hero-floating-card d-flex justify-content-between align-items-center">
                                    <div>
                                        <div className="d-flex align-items-center gap-2 mb-1">
                                            <h6 className="fw-bold mb-0 text-dark">MacBook Air M2 (13.6-inch)</h6>
                                            <span className="badge bg-light text-dark border px-2 py-1 rounded-pill small">
                                                <i className="bi bi-star-fill text-warning me-1"></i>4.9
                                            </span>
                                        </div>
                                        <p className="text-muted small mb-0">Liquid Retina display • All-day battery life</p>
                                    </div>
                                    <div className="text-end ps-3 border-start">
                                        <div className="fs-5 fw-bold text-dark">$1,099</div>
                                        <Link to="/products" className="btn btn-sm btn-dark px-3 mt-1 rounded-pill">
                                            Buy Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CATEGORY VISUAL LOOKBOOK ================= */}
            <section className="py-5 bg-white">
                <div className="container py-3">
                    <div className="d-flex justify-content-between align-items-end mb-4">
                        <div>
                            <span className="text-uppercase small fw-bold text-muted tracking-wider">Explore By Category</span>
                            <h2 className="fw-bold mb-0">Shop The Categories</h2>
                        </div>
                        <Link to="/products" className="text-dark fw-bold small text-decoration-none d-none d-md-inline-block">
                            View All Categories <i className="bi bi-arrow-right"></i>
                        </Link>
                    </div>

                    <div className="row g-4">
                        {/* Electronics */}
                        <div className="col-6 col-lg-3">
                            <Link to="/products" className="category-tile">
                                <img
                                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60"
                                    alt="Electronics"
                                    className="category-tile-bg"
                                />
                                <div className="category-tile-overlay"></div>
                                <div className="category-tile-content">
                                    <span className="badge bg-light text-dark mb-2 px-2 py-1 rounded-pill small">Audio & Tech</span>
                                    <h4>Electronics</h4>
                                    <span className="category-tile-link">
                                        Shop Gear <i className="bi bi-arrow-right"></i>
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* Footwear */}
                        <div className="col-6 col-lg-3">
                            <Link to="/products" className="category-tile">
                                <img
                                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60"
                                    alt="Footwear"
                                    className="category-tile-bg"
                                />
                                <div className="category-tile-overlay"></div>
                                <div className="category-tile-content">
                                    <span className="badge bg-light text-dark mb-2 px-2 py-1 rounded-pill small">Active & Daily</span>
                                    <h4>Footwear</h4>
                                    <span className="category-tile-link">
                                        Shop Shoes <i className="bi bi-arrow-right"></i>
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* Clothing */}
                        <div className="col-6 col-lg-3">
                            <Link to="/products" className="category-tile">
                                <img
                                    src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=60"
                                    alt="Clothing"
                                    className="category-tile-bg"
                                />
                                <div className="category-tile-overlay"></div>
                                <div className="category-tile-content">
                                    <span className="badge bg-light text-dark mb-2 px-2 py-1 rounded-pill small">Apparel</span>
                                    <h4>Clothing</h4>
                                    <span className="category-tile-link">
                                        Shop Apparel <i className="bi bi-arrow-right"></i>
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* Accessories */}
                        <div className="col-6 col-lg-3">
                            <Link to="/products" className="category-tile">
                                <img
                                    src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=60"
                                    alt="Accessories"
                                    className="category-tile-bg"
                                />
                                <div className="category-tile-overlay"></div>
                                <div className="category-tile-content">
                                    <span className="badge bg-light text-dark mb-2 px-2 py-1 rounded-pill small">Timepieces & Carry</span>
                                    <h4>Accessories</h4>
                                    <span className="category-tile-link">
                                        Shop Details <i className="bi bi-arrow-right"></i>
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CURATED BESTSELLERS & TABS ================= */}
            <section className="py-5" style={{ backgroundColor: "#f8fafc" }}>
                <div className="container py-4">
                    <div className="text-center mb-4">
                        <span className="text-uppercase small fw-bold text-muted tracking-wider">Handpicked Catalog</span>
                        <h2 className="fw-bold mb-2">Featured Products</h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: "520px" }}>
                            Explore top rated pieces crafted for longevity and style.
                        </p>

                        {/* Filter Tabs */}
                        <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
                            {["All", "Electronics", "Footwear", "Clothing", "Accessories"].map((tab) => (
                                <button
                                    key={tab}
                                    type="button"
                                    className={`category-pill-btn ${activeTab === tab ? "active" : ""}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-dark" role="status"></div>
                            <p className="mt-2 text-muted">Loading collection...</p>
                        </div>
                    ) : (
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-2">
                            {filteredProducts.map((product) => (
                                <div className="col" key={product._id}>
                                    <div className="product-card-modern">
                                        <div className="product-card-img-container">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="product-card-img"
                                            />
                                            <span className="product-badge-category">
                                                {product.category}
                                            </span>
                                            <span
                                                className={`badge product-badge-stock ${
                                                    product.stock > 0
                                                        ? "bg-success"
                                                        : "bg-danger"
                                                }`}
                                            >
                                                {product.stock > 0 ? "In Stock" : "Sold Out"}
                                            </span>
                                        </div>

                                        <div className="product-card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <span className="product-rating">
                                                    <i className="bi bi-star-fill text-warning me-1"></i>
                                                    {product.rating || 4.8}
                                                </span>
                                                <small className="text-muted">{product.stock} units left</small>
                                            </div>

                                            <h5 className="product-card-title" title={product.title}>
                                                {product.title}
                                            </h5>

                                            <p className="product-card-desc">
                                                {product.description}
                                            </p>

                                            <div className="product-price-wrapper">
                                                <span className="product-current-price">
                                                    ${product.price}
                                                </span>
                                                <span className="product-old-price">
                                                    ${(product.price * 1.2).toFixed(0)}
                                                </span>
                                            </div>

                                            <div className="product-card-actions">
                                                <Link
                                                    to={`/product/${product._id}`}
                                                    className="btn btn-modern-outline flex-grow-1"
                                                >
                                                    Details
                                                </Link>
                                                <button
                                                    className={`btn flex-grow-1 ${
                                                        addedId === product._id
                                                            ? "btn-success"
                                                            : "btn-modern-primary"
                                                    }`}
                                                    onClick={() => handleAddToCart(product)}
                                                    disabled={product.stock <= 0}
                                                >
                                                    {addedId === product._id ? (
                                                        <>
                                                            <i className="bi bi-check2"></i> Added
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="bi bi-cart-plus"></i> Add
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ================= SPOTLIGHT / STORY SECTION ================= */}
            <section className="py-5 bg-white">
                <div className="container py-4">
                    <div className="spotlight-banner">
                        <div className="row align-items-center g-4">
                            <div className="col-lg-7">
                                <span className="badge bg-warning text-dark fw-bold px-3 py-1 rounded-pill mb-3">
                                    Weekly Feature
                                </span>
                                <h2 className="display-6 fw-bold mb-3 text-white">
                                    Sony WH-1000XM5: The Benchmark in Wireless Silence
                                </h2>
                                <p className="text-secondary lead mb-4 fs-6" style={{ lineHeight: "1.7" }}>
                                    Engineered with two processors and 8 microphones for extraordinary noise cancellation. Ultra-comfortable lightweight synthetic leather that fits seamlessly all day.
                                </p>
                                <div className="d-flex align-items-center gap-3">
                                    <Link to="/products" className="btn btn-warning btn-lg fw-bold px-4 rounded-3 text-dark">
                                        Shop Special ($349)
                                    </Link>
                                    <span className="text-white-50 small">Limited stock remaining</span>
                                </div>
                            </div>
                            <div className="col-lg-5 text-center">
                                <img
                                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80"
                                    alt="Headphones Spotlight"
                                    className="img-fluid rounded-4 shadow-lg"
                                    style={{ maxHeight: "300px", objectFit: "cover" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= WHY SHOP WITH US ================= */}
            <section className="py-5" style={{ backgroundColor: "#f8fafc" }}>
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="text-uppercase small fw-bold text-muted tracking-wider">Our Standard</span>
                        <h2 className="fw-bold mb-2">Designed With You in Mind</h2>
                        <p className="text-muted">Direct to consumer with transparent pricing and complete warranty coverage.</p>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-3">
                            <div className="value-box">
                                <div className="value-icon-circle">
                                    <i className="bi bi-box-seam"></i>
                                </div>
                                <h5 className="fw-bold mb-2">Carefully Packaged</h5>
                                <p className="text-muted small mb-0">Every item is checked for quality and securely packaged before shipment.</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="value-box">
                                <div className="value-icon-circle">
                                    <i className="bi bi-arrow-counterclockwise"></i>
                                </div>
                                <h5 className="fw-bold mb-2">30-Day Guarantee</h5>
                                <p className="text-muted small mb-0">Love your items or return them within 30 days for a full, hassle-free refund.</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="value-box">
                                <div className="value-icon-circle">
                                    <i className="bi bi-shield-lock"></i>
                                </div>
                                <h5 className="fw-bold mb-2">Secure Checkout</h5>
                                <p className="text-muted small mb-0">Enterprise-grade 256-bit SSL encryption on all orders and data.</p>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="value-box">
                                <div className="value-icon-circle">
                                    <i className="bi bi-headset"></i>
                                </div>
                                <h5 className="fw-bold mb-2">Real Human Help</h5>
                                <p className="text-muted small mb-0">Our dedicated team is ready to help you via email or phone 7 days a week.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= AUTHENTIC CUSTOMER REVIEWS ================= */}
            <section className="py-5 bg-white">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="text-uppercase small fw-bold text-muted tracking-wider">Community Feedback</span>
                        <h2 className="fw-bold mb-2">Words From Verified Buyers</h2>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card border p-4 rounded-4 h-100 shadow-sm bg-white">
                                <div className="text-warning mb-3">
                                    <i className="bi bi-star-fill me-1"></i>
                                    <i className="bi bi-star-fill me-1"></i>
                                    <i className="bi bi-star-fill me-1"></i>
                                    <i className="bi bi-star-fill me-1"></i>
                                    <i className="bi bi-star-fill"></i>
                                </div>
                                <p className="text-secondary small mb-4" style={{ lineHeight: "1.7" }}>
                                    "I ordered the MacBook Air M2 on a Tuesday afternoon and it arrived on Thursday in pristine condition. Exactly as described and the price was unmatched."
                                </p>
                                <div className="d-flex align-items-center gap-3 mt-auto">
                                    <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: "40px", height: "40px" }}>
                                        ZK
                                    </div>
                                    <div>
                                        <h6 className="mb-0 fw-bold small">Zainab Khan</h6>
                                        <small className="text-muted">Verified Buyer • Karachi</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card border p-4 rounded-4 h-100 shadow-sm bg-white">
                                <div className="text-warning mb-3">
                                    <i className="bi bi-star-fill me-1"></i>
                                    <i className="bi bi-star-fill me-1"></i>
                                    <i className="bi bi-star-fill me-1"></i>
                                    <i className="bi bi-star-fill me-1"></i>
                                    <i className="bi bi-star-fill"></i>
                                </div>
                                <p className="text-secondary small mb-4" style={{ lineHeight: "1.7" }}>
                                    "The hoodie quality is heavy, soft combed cotton with solid stitching. You can tell they pay attention to the little details. Will definitely shop here again."
                                </p>
                                <div className="d-flex align-items-center gap-3 mt-auto">
                                    <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: "40px", height: "40px" }}>
                                        BA
                                    </div>
                                    <div>
                                        <h6 className="mb-0 fw-bold small">Bilal Ahmed</h6>
                                        <small className="text-muted">Verified Buyer • Lahore</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card border p-4 rounded-4 h-100 shadow-sm bg-white">
                                <div className="text-warning mb-3">
                                    <i className="bi bi-star-fill me-1"></i>
                                    <i className="bi bi-star-fill me-1"></i>
                                    <i className="bi bi-star-fill me-1"></i>
                                    <i className="bi bi-star-fill me-1"></i>
                                    <i className="bi bi-star-fill"></i>
                                </div>
                                <p className="text-secondary small mb-4" style={{ lineHeight: "1.7" }}>
                                    "Customer support replied in less than 15 minutes when I asked about sizing for the Nike Air Max. Product fits true to size and feels great."
                                </p>
                                <div className="d-flex align-items-center gap-3 mt-auto">
                                    <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: "40px", height: "40px" }}>
                                        OM
                                    </div>
                                    <div>
                                        <h6 className="mb-0 fw-bold small">Omar Malik</h6>
                                        <small className="text-muted">Verified Buyer • Islamabad</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;