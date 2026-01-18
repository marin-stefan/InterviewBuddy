import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Page404 from "./pages/Page404/Page404";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import About from "./pages/About/About";
import User from "./pages/User/User";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import RecoverPassword from "./pages/RecoverPassword/RecoverPassword";
import { userInitialState, userReducer } from "./store/user/reducer";
import { UserContext } from "./store/user/context";
import { useReducer } from "react";
import { AuthProvider } from "./store/auth/authContext";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Page404 />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/recoverpassword",
        element: <RecoverPassword />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/user",
        element: <User />,
    },
    {
        path: "/category/:categoryId",
        element: <CategoryPage />,
    },
]);

function App() {
    const [userState, userDispatch] = useReducer(userReducer, userInitialState);
    const userContextValue = {
        userState,
        userDispatch,
    };

    return (
        <UserContext.Provider value={userContextValue}>
            <AuthProvider>
                <div className="App">
                    <RouterProvider router={routes} />
                </div>
            </AuthProvider>
        </UserContext.Provider>
    );
}

export default App;
