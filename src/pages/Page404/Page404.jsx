import Layout from "../../components/Layout/Layout";
import "./Page404.css";
import { Link } from "react-router-dom";

export default function Page404() {
    return (
        <Layout>
            <div className="d-flex flex-column justify-content-center align-items-center text-center main-404-container">
                <h1 className="display-3 fw-bold text-muted">404</h1>
                <h2 className="mt-3">This question doesn’t exist</h2>
                <p className="mt-2 text-muted">
                    Looks like you followed a link that wasn’t in the question
                    set. No worries — let’s get you back to practicing.
                </p>
                <Link to="/" className="btn mt-4 px-4 return-link">
                    <span>Return to Home</span>
                </Link>
            </div>
        </Layout>
    );
}
