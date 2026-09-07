import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState(
        localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    );
    const [isLoading, setIsLoading] = useState(true);

    // JWT Token authorization header helper
    const authorizationToken = token ? `Bearer ${token}` : "";

    // Login Function: Token aur User ko LocalStorage aur state mein save karna
    const login = (serverToken, userData) => {
        localStorage.setItem("token", serverToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(serverToken);
        setUser(userData);
    };

    // Logout Function: LocalStorage aur state ko clear karna
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken("");
        setUser(null);
    };

    // Update user state helper
    const updateUser = (updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    // Backend se logged-in user ki latest details fetch karna (JWT Token ke zariye)
    const userAuthentication = async () => {
        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch("https://vercel-backend-blue-phi.vercel.app/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
            } else {
                // Token invalid or expired
                logout();
            }
        } catch (error) {
            console.error("User Authentication Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        userAuthentication();
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                authorizationToken,
                isLoggedIn: !!token,
                isAdmin: Boolean(user && user.isAdmin),
                login,
                logout,
                updateUser,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};