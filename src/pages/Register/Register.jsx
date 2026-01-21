import { Link } from "react-router-dom";
import { useState } from "react";
import "./Register.css";
import Header from "../../components/Header/Header";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

export default function Register() {
    const emptyForm = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const [formData, setFormData] = useState(emptyForm);
    const [passwordError, setPasswordError] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "confirmPassword" || name === "password") {
            if (formData.password && value !== formData.password) {
                setPasswordError("Passwords do not match");
            } else {
                setPasswordError("");
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setPasswordError("");
        if (formData.password !== formData.confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/user/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("User registered:", data);
                setFormData(emptyForm);
                setShowModal(true);
                // You can redirect or clear form here
            } else {
                console.error("Registration failed:", data.message || data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
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
                                id="name"
                                name="name"
                                className="form-control"
                                value={formData.name}
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
                            {passwordError && (
                                <small className="text-danger">
                                    {passwordError}
                                </small>
                            )}
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
            <ConfirmationModal
                show={showModal}
                onHide={() => setShowModal(false)}
                heading="Registration Succesfull"
                title="Welcome !"
                body="Thank you for registering, please log in to continue."
                redirectto="/login"
            />
        </div>
    );
}
