// authContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { UserContext } from "../user/context";
import { loginUser } from "../user/actions";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { userState, userDispatch } = useContext(UserContext);

    // Runs once when app mounts / page refresh
    useEffect(() => {
        const initAuth = async () => {
            try {
                const localStoragedata = JSON.parse(
                    localStorage.getItem("IBuddy"),
                );

                if (localStoragedata) {
                    const token = localStoragedata.auth_token;

                    if (!token) {
                        setIsLoading(false);
                        return;
                    }

                    const response = await fetch(
                        "http://localhost:3000/api/user/me",
                        {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    );

                    if (!response.ok) {
                        throw new Error("Token invalid or expired");
                    }

                    const data = await response.json();
                    const actionResult = loginUser({
                        message: "Token is valid",
                        user: data,
                    });
                    
                    userDispatch(actionResult);
                    setUser(data.user);
                }
            } catch (err) {
                console.warn("Auth check failed:", err);
                localStorage.removeItem("IBuddy");
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    //nush daca am nevoie...vedem
    const login = (token, userData) => {
        // const localStorageData = {auth_token: data.token}
        // localStorage.setItem("IBuddy", JSON.stringify(localStorageData));
        // setUser(userData);
    };

    //nush daca am nevoie aici
    const logout = () => {
        // localStorage.removeItem("auth_token");
        // setUser(null);
    };

    const value = {
        user,
        isLoading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

// Custom hook
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
