import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminProducts = () => {
    const { authorizationToken } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Modal Form State
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "Electronics",
        image: "",
        stock: "10",
    });

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:3000/api/products");
            const data = await res.json();
            if (res.ok && data.success) {
                setProducts(data.products);
            } else {
                setError(data.message || "Failed to fetch products");
            }
        } catch (err) {
            console.error(err);
            setError("Server connection failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleOpenAdd = () => {
        setEditingProduct(null);
        setFormData({
            title: "",
            description: "",
            price: "",
            category: "Electronics",
            image: "",
            stock: "10",
        });
        setIsFormOpen(true);
        setMessage("");
        setError("");
    };

    const handleOpenEdit = (prod) => {
        setEditingProduct(prod);
        setFormData({
            title: prod.title,
            description: prod.description,
            price: prod.price.toString(),
            category: prod.category,
            image: prod.image,
            stock: prod.stock ? prod.stock.toString() : "10",
        });
        setIsFormOpen(true);
        setMessage("");
        setError("");
    };

    // Handle Image file selection from device
    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                setError("Please select a valid image file (PNG, JPG, JPEG, WEBP)");
                return;
            }
            if (file.size > 15 * 1024 * 1024) {
                setError("Image file size should be less than 15MB");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!formData.image) {
            setError("Please upload an image for this product from your device.");
            return;
        }

        const url = editingProduct
            ? `http://localhost:3000/api/products/${editingProduct._id}`
            : "http://localhost:3000/api/products";

        const method = editingProduct ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setMessage(
                    editingProduct
                        ? "Product updated successfully!"
                        : "New product created successfully!"
                );
                setIsFormOpen(false);
                fetchProducts();
            } else {
                setError(data.message || "Operation failed");
            }
        } catch (err) {
            console.error(err);
            setError("Server error during save");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setMessage("Product deleted successfully!");
                fetchProducts();
            } else {
                setError(data.message || "Failed to delete product");
            }
        } catch (err) {
            console.error(err);
            setError("Server error during deletion");
        }
    };

    return (
        <div className="container py-5">
            {/* Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="fw-bold mb-1">Product Management</h1>
                    <p className="text-muted mb-0">Add, edit, or remove products in store catalog</p>
                </div>
                <div className="d-flex gap-2 mt-3 mt-sm-0">
                    <Link to="/admin" className="btn btn-outline-dark">
                        <i className="bi bi-arrow-left me-1"></i> Dashboard
                    </Link>
                    <button className="btn btn-warning fw-bold" onClick={handleOpenAdd}>
                        <i className="bi bi-plus-lg me-1"></i> Add New Product
                    </button>
                </div>
            </div>

            {message && (
                <div className="alert alert-success rounded-3 shadow-sm mb-4">
                    <i className="bi bi-check-circle-fill me-2"></i> {message}
                </div>
            )}
            {error && (
                <div className="alert alert-danger rounded-3 shadow-sm mb-4">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
                </div>
            )}

            {/* Add / Edit Form Modal Card */}
            {isFormOpen && (
                <div className="card shadow-sm border rounded-4 mb-4 p-4 bg-white">
                    <h4 className="fw-bold mb-4 pb-2 border-bottom">
                        <i className={`bi ${editingProduct ? "bi-pencil-square" : "bi-plus-circle"} me-2 text-primary`}></i>
                        {editingProduct ? "Edit Product Details" : "Create New Product"}
                    </h4>
                    <form onSubmit={handleFormSubmit}>
                        <div className="row g-3 mb-3">
                            <div className="col-md-6">
                                <label className="form-label fw-bold small text-muted">Product Title *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label fw-bold small text-muted">Price ($) *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    placeholder="299.99"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label fw-bold small text-muted">Category *</label>
                                <select
                                    className="form-select"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="Electronics">Electronics</option>
                                    <option value="Footwear">Footwear</option>
                                    <option value="Clothing">Clothing</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Home">Home & Living</option>
                                </select>
                            </div>
                        </div>

                        {/* Image Upload From Device Section */}
                        <div className="row g-3 mb-3 align-items-center">
                            <div className="col-md-8">
                                <label className="form-label fw-bold small text-muted">
                                    <i className="bi bi-cloud-arrow-up me-1 text-primary"></i> Upload Product Image from Device *
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="form-control py-2"
                                    onChange={handleImageFileChange}
                                />
                                <small className="text-muted d-block mt-1">
                                    Supported formats: PNG, JPG, JPEG, WEBP (Max: 15MB)
                                </small>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label fw-bold small text-muted">Stock Quantity *</label>
                                <input
                                    type="number"
                                    className="form-control py-2"
                                    placeholder="10"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {/* Image Preview Box */}
                        {formData.image && (
                            <div className="mb-3 p-3 bg-light rounded-3 border d-flex align-items-center gap-3">
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="rounded-3 shadow-sm"
                                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                />
                                <div>
                                    <span className="badge bg-success mb-1">
                                        <i className="bi bi-check2 me-1"></i> Image Loaded Ready
                                    </span>
                                    <p className="text-muted small mb-0">Preview of the uploaded image file</p>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger ms-auto"
                                    onClick={() => setFormData({ ...formData, image: "" })}
                                >
                                    <i className="bi bi-trash me-1"></i> Remove
                                </button>
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="form-label fw-bold small text-muted">Product Description *</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Detailed description of features, materials, and specifications..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            ></textarea>
                        </div>

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-modern-primary fw-bold">
                                <i className="bi bi-check-lg me-1"></i>
                                {editingProduct ? "Update Product" : "Save Product"}
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setIsFormOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Products Table */}
            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading products...</span>
                    </div>
                </div>
            ) : (
                <div className="card shadow-sm border rounded-4 overflow-hidden bg-white">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th className="ps-4">Image</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th className="text-end pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-muted">
                                            No products available in store catalog
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((prod) => (
                                        <tr key={prod._id}>
                                            <td className="ps-4">
                                                <img
                                                    src={prod.image}
                                                    alt={prod.title}
                                                    className="rounded-3 shadow-sm"
                                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                />
                                            </td>
                                            <td className="fw-bold text-dark">{prod.title}</td>
                                            <td>
                                                <span className="badge bg-secondary-subtle text-secondary border">{prod.category}</span>
                                            </td>
                                            <td className="fw-bold text-dark">${prod.price}</td>
                                            <td>
                                                <span className={`badge ${prod.stock > 0 ? "bg-success-subtle text-success border border-success-subtle" : "bg-danger-subtle text-danger border border-danger-subtle"}`}>
                                                    {prod.stock > 0 ? `${prod.stock} in stock` : "Out of stock"}
                                                </span>
                                            </td>
                                            <td className="text-end pe-4">
                                                <div className="d-flex justify-content-end gap-2">
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() => handleOpenEdit(prod)}
                                                    >
                                                        <i className="bi bi-pencil me-1"></i> Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDelete(prod._id)}
                                                    >
                                                        <i className="bi bi-trash me-1"></i> Delete
                                                    </button>
                                                </div>
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

export default AdminProducts;
