import { useState } from "react";
import { Link } from "react-router-dom";
import "./RecoverPassword.css";
import Header from "../../components/Header/Header";

export default function RecoverPassword() {
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
            <div className="d-flex justify-content-center align-items-center recovery-page">
                <div className="recovery-box">
                    <h2 className="text-center mb-4">Password Recovery</h2>

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
                        <button
                            type="submit"
                            className="btn w-100 mt-2 recovery-btn"
                        >
                            Reset Password
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        

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
