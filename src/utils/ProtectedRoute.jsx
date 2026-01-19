import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../store/user/context";

export function ProtectedRoute() {
    const { userState, userDispatch } = useContext(UserContext);

    // Not logged in → redirect to login
    if (!userState.loggedUser) {
        return <Navigate to="/login" replace />;
    }

    // Logged in → show protected content
    return <Outlet />;
}

export function PublicOnlyRoute() {
    const { userState, userDispatch } = useContext(UserContext);

    // Already logged in → redirect to user dashboard
    if (userState.loggedUser) {
        return <Navigate to="/user" replace />;
    }

    // Not logged in → allow access to login/register
    return <Outlet />;
}
