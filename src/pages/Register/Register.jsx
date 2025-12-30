import { Link } from "react-router-dom";
import { useState } from "react";
import "./Register.css";
import Header from "../../components/Header/Header";

export default function Register() {
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        // TODO: add validation and API integration
        console.log("Register attempt:", formData);
    };

    return (
        <div>
            <Header />

            <div className="d-flex justify-content-center align-items-center register-page">
                <div className="register-box">
                    <h2 className="text-center mb-4">Create account</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">
                                Full name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                className="form-control"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Username */}
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

                        {/* Email */}
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

                        {/* Password */}
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

                        {/* Confirm Password */}
                        <div className="mb-3">
                            <label
                                htmlFor="confirmPassword"
                                className="form-label"
                            >
                                Confirm password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="form-control"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="btn w-100 mt-2"
                            style={{
                                backgroundColor: "#F2A65A",
                                color: "#1f2328",
                            }}
                        >
                            Register
                        </button>
                    </form>

                    {/* Footer links */}
                    <div className="text-center mt-3">
                        <span className="text-muted">
                            Already have an account?{" "}
                            <Link to="/login">Sign in</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
