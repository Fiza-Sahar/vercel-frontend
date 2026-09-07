import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(["All"]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [addedId, setAddedId] = useState(null);

    const { addToCart } = useCart();

    // 1. Fetch Categories list
    const fetchCategories = async () => {
        try {
            const res = await fetch("https://vercel-backend-blue-phi.vercel.app/api/products/categories/list");
            const data = await res.json();
            if (data.success && data.categories) {
                setCategories(data.categories);
            }
        } catch (err) {
            console.error("Categories fetch error:", err);
        }
    };

    // 2. Fetch Products with Search, Category & Sort
    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const params = new URLSearchParams();
            if (searchTerm.trim()) params.append("search", searchTerm.trim());
            if (selectedCategory && selectedCategory !== "All") params.append("category", selectedCategory);
            if (sortBy) params.append("sort", sortBy);

            const res = await fetch(`https://vercel-backend-blue-phi.vercel.app/api/products?${params.toString()}`);
            const data = await res.json();

            if (res.ok && data.success) {
                setProducts(data.products);
            } else {
                setError(data.message || "Failed to load products");
            }
        } catch (err) {
            console.error("Products fetch error:", err);
            setError("Could not connect to backend server. Make sure MongoDB & backend are running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, sortBy]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts();
    };

    const handleAddToCart = (product) => {
        addToCart(product, 1);
        setAddedId(product._id);
        setTimeout(() => setAddedId(null), 1800);
    };

    return (
        <div className="container py-5">
            {/* Header */}
            <div className="text-center mb-5">
                <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-1 rounded-pill mb-2">
                    Online Catalog
                </span>
                <h1 className="display-5 fw-bold mb-2">Explore All Products</h1>
                <p className="text-muted mx-auto" style={{ maxWidth: "550px" }}>
                    Discover our collection of premium electronics, footwear, clothing, and accessories designed for excellence.
                </p>
            </div>

            {/* Filter & Search Bar Controls */}
            <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
                <div className="row g-3 align-items-center">
                    {/* Search Input */}
                    <div className="col-lg-5">
                        <form onSubmit={handleSearch} className="d-flex">
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0">
                                    <i className="bi bi-search text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-start-0 bg-light"
                                    placeholder="Search by title, brand or description..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button type="submit" className="btn btn-modern-primary">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Category Select */}
                    <div className="col-md-6 col-lg-4">
                        <div className="d-flex align-items-center gap-2">
                            <span className="text-muted small fw-bold text-nowrap">Category:</span>
                            <select
                                className="form-select bg-light"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map((cat, idx) => (
                                    <option key={idx} value={cat}>
                                        {cat === "All" ? "All Categories" : cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Sort Filter */}
                    <div className="col-md-6 col-lg-3">
                        <div className="d-flex align-items-center gap-2">
                            <span className="text-muted small fw-bold text-nowrap">Sort:</span>
                            <select
                                className="form-select bg-light"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="newest">Newest Arrivals</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Category Pills Bar */}
                <div className="d-flex flex-wrap gap-2 mt-3 pt-3 border-top">
                    <span className="text-muted small align-self-center me-2 fw-semibold">Quick Filter:</span>
                    {categories.map((cat, idx) => (
                        <button
                            key={idx}
                            type="button"
                            className={`category-pill-btn ${selectedCategory === cat ? "active" : ""}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="alert alert-danger text-center my-4 rounded-3 shadow-sm">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                </div>
            )}

            {/* Loading State */}
            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                        <span className="visually-hidden">Loading products...</span>
                    </div>
                    <p className="mt-3 text-muted fw-semibold">Fetching products catalog...</p>
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-5 card border-0 shadow-sm rounded-4 bg-white p-5">
                    <div className="text-muted mb-3 fs-1">
                        <i className="bi bi-search"></i>
                    </div>
                    <h3 className="fw-bold mb-2">No Products Found</h3>
                    <p className="text-muted mb-4">
                        We couldn't find any products matching your current search or category filter.
                    </p>
                    <div>
                        <button
                            className="btn btn-modern-primary"
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("All");
                                setSortBy("newest");
                            }}
                        >
                            <i className="bi bi-arrow-clockwise me-1"></i> Reset Filters
                        </button>
                    </div>
                </div>
            ) : (
                /* Products Grid */
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted small">
                            Showing <strong>{products.length}</strong> items
                        </span>
                    </div>

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                        {products.map((product) => (
                            <div className="col" key={product._id}>
                                <div className="product-card-modern">
                                    <div className="product-card-img-container">
                                        <img
                                            src={product.image}
                                            className="product-card-img"
                                            alt={product.title}
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
                                            {product.stock > 0 ? "In Stock" : "Out of Stock"}
                                        </span>
                                    </div>

                                    <div className="product-card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <span className="product-rating">
                                                <i className="bi bi-star-fill text-warning me-1"></i>
                                                {product.rating || 4.5}
                                            </span>
                                            <small className="text-muted">
                                                {product.stock > 0 ? `${product.stock} available` : "Unavailable"}
                                            </small>
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
                                                ${(product.price * 1.25).toFixed(0)}
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
                                                {product.stock <= 0 ? (
                                                    "Sold Out"
                                                ) : addedId === product._id ? (
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
                </div>
            )}
        </div>
    );
};

export default Products;