import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../store/user/context";
import { loginUser } from "../../store/user/actions";

export default function Login() {
    const emptyForm = {
        email: "",
        password: "",
    };
    const [formData, setFormData] = useState(emptyForm);
    const navigate = useNavigate();
    const { userDispatch } = useContext(UserContext);
    const [authError, setAuthError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:3000/api/user/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                },
            );

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("auth_token", data.token);
                const actionResult = loginUser(data);
                userDispatch(actionResult);
                setAuthError(null);
                navigate("/");
            } else {
                console.error("Login failed:", data.message || data);
                setAuthError(data.message || data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <Header />
            <div className="d-flex justify-content-center align-items-center login-page">
                <div className="login-box">
                    <h2 className="text-center mb-4">Sign in</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {authError && (
                                <small className="text-danger">
                                    {authError}
                                </small>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="btn w-100 mt-2 login-btn"
                            style={{
                                backgroundColor: "#F2A65A",
                                color: "#1f2328",
                            }}
                        >
                            Log In
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        <Link to="/recoverpassword" className="d-block mb-2">
                            Forgot your password?
                        </Link>

                        <span className="text-muted">
                            Don't have an account?{" "}
                            <Link to="/register">Register</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
