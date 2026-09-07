import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminUsers = () => {
    const { authorizationToken, user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch("https://vercel-backend-blue-phi.vercel.app/api/admin/users", {
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setUsers(data.users);
            } else {
                setError(data.message || "Failed to fetch users");
            }
        } catch (err) {
            console.error(err);
            setError("Server connection failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [authorizationToken]);

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Kya aap is user ko delete karna chahte hain?")) return;

        try {
            const res = await fetch(`https://vercel-backend-blue-phi.vercel.app/api/admin/users/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setMessage("User delete ho gaya!");
                fetchUsers();
            } else {
                setError(data.message || "Failed to delete user");
            }
        } catch (err) {
            console.error(err);
            setError("Server error during deletion");
        }
    };

    return (
        <div className="container py-5">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="fw-bold mb-1">Registered Users</h1>
                    <p className="text-muted mb-0">List of all registered customers and administrators</p>
                </div>
                <Link to="/admin" className="btn btn-outline-dark mt-2 mt-sm-0">
                    ← Back to Dashboard
                </Link>
            </div>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading users...</span>
                    </div>
                </div>
            ) : (
                <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Registered Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-muted">
                                            No registered users found
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((u) => (
                                        <tr key={u._id}>
                                            <td className="fw-bold">{u.username}</td>
                                            <td>{u.email}</td>
                                            <td>{u.phone || "N/A"}</td>
                                            <td>
                                                <span
                                                    className={`badge ${
                                                        u.isAdmin ? "bg-dark text-warning border" : "bg-primary-subtle text-primary border"
                                                    } px-3 py-1 rounded-pill`}
                                                >
                                                    <i className={`bi ${u.isAdmin ? "bi-shield-lock-fill" : "bi-person-fill"} me-1`}></i>
                                                    {u.isAdmin ? "Admin" : "Customer"}
                                                </span>
                                            </td>
                                            <td className="small text-muted">
                                                {new Date(u.createdAt).toLocaleDateString()}
                                            </td>
                                            <td>
                                                {currentUser?._id !== u._id && (
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDeleteUser(u._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
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

export default AdminUsers;
