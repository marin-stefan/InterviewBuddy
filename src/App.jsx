import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Page404 from "./pages/Page404/Page404";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import About from "./pages/About/About";
import User from "./pages/User/User";
import JavascriptPage from "./pages/JavascriptPage/JavascriptPage";
import RecoverPassword from "./pages/RecoverPassword/RecoverPassword";

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
        element: <RecoverPassword />
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
        path: "/category/javascript",
        element: <JavascriptPage />,
    },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={routes} />
        </div>
    );
}

export default App;
