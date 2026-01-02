import "./Header.css";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import LogoImage from "../../assets/interviewBuddy.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const isLogged = false;
    const navigate = useNavigate();

    return (
        <header>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link to="/" className="logo">
                        <img src={LogoImage} alt="company logo" />
                    </Link>
                    <button
                        className="navbar-toggler hamburger-icon"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mainNav">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">
                                    <span>About</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Dropdown className="nav-item">
                                    <Dropdown.Toggle
                                        as="button"
                                        className=" nav-link"
                                        id="categoriesDropdown"
                                    >
                                        <span>Categories</span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            as={Link}
                                            to="/category/javascript"
                                        >
                                            <span className="drop-option">
                                                Javascript
                                            </span>
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            as={Link}
                                            to="/category/react"
                                        >
                                            <span className="drop-option">
                                                React
                                            </span>
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            as={Link}
                                            to="/category/html"
                                        >
                                            <span className="drop-option">
                                                HTML
                                            </span>
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            as={Link}
                                            to="/category/css"
                                        >
                                            <span className="drop-option">
                                                CSS
                                            </span>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                            {isLogged && (
                                <li className="nav-item">
                                    <Link to="/user" className="nav-link">
                                        <span>stefann06</span>
                                    </Link>
                                </li>
                            )}
                            {!isLogged && (
                                <li className="nav-item ms-lg-3">
                                    <div className="log-btn">
                                        <Link
                                            to="/login"
                                            className="btn btn-s log-btn btn-outline-light"
                                        >
                                            Log In
                                        </Link>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
