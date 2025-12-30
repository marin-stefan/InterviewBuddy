import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./Login.css";

export default function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: replace with real authentication logic
        console.log("Login attempt:", formData);
    };

    return (
        <div>
            <Header />
            <div className="d-flex justify-content-center align-items-center login-page">
                <div className="login-box">
                    <h2 className="text-center mb-4">Sign in</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-control"
                                value={formData.username}
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
                        </div>
                        <button
                            type="submit"
                            className="btn w-100 mt-2 login-btn"
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
