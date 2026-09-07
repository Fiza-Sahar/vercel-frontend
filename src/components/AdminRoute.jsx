import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// AdminRoute: Checks both authentication and isAdmin status
const AdminRoute = ({ children }) => {
    const { isLoggedIn, isAdmin, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
