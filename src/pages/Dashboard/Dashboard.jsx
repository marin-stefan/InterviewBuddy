import Layout from "../../components/Layout/Layout";
import "./Dashboard.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Accordion from "react-bootstrap/Accordion";
import Avatar from "../../assets/avatar.png";
import Pagination from "react-bootstrap/Pagination";
import ListGroup from "react-bootstrap/ListGroup";
import { getQuestions } from "../../api/endpoint";
import { getCategories } from "../../api/categories";
import { ListGroupItem } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../../store/user/context";
import { logoutUser } from "../../store/user/actions";
import { useNavigate } from "react-router-dom";

export default function User() {
    //tempo pagination
    const favoritesQuestions = getQuestions("favorites");
    const categories = getCategories();

    const navigate = useNavigate();
    const { userState, userDispatch } = useContext(UserContext);

    const emptyForm = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    };
    const mobileEmptyForm = {
        currentMobilePassword: "",
        newMobilePassword: "",
        confirmMobilePassword: "",
    };
    const [formData, setFormData] = useState(emptyForm);
    const [mobileFormData, setMobileFormData] = useState(mobileEmptyForm);

    const [currentPasswordError, setCurrentPasswordError] = useState("");
    const [currentMobilePasswordError, setCurrentMobilePasswordError] =
        useState("");

    const [passwordError, setPasswordError] = useState("");
    const [mobilePasswordError, setMobilePasswordError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "confirmPassword" || name === "newPassword") {
            if (formData.newPassword && value !== formData.newPassword) {
                setPasswordError("Passwords do not match");
            } else {
                setPasswordError("");
            }
        }
    };

    // pentru versiunea mobile
    const handleMobileChange = (event) => {
        const { name, value } = event.target;
        setMobileFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "confirmMobilePassword" || name === "newMobilePassword") {
            if (
                mobileFormData.newMobilePassword &&
                value !== mobileFormData.newMobilePassword
            ) {
                setMobilePasswordError("Passwords do not match");
            } else {
                setMobilePasswordError("");
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setPasswordError("");
        if (formData.newPassword !== formData.confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:3000/api/user/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: userState.loggedUser.email,
                        password: formData.currentPassword,
                    }),
                },
            );
            const data = await response.json();

            if (response.ok) {
                try {
                    const userId =
                        userState.loggedUser.id || userState.loggedUser._id;
                    const response = await fetch(
                        `http://localhost:3000/api/user/${userId}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                password: formData.newPassword,
                            }),
                        },
                    );
                    const data = response.json();

                    if (response.ok) {
                        setFormData(emptyForm);
                        setPasswordError(null);
                        alert("success");
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.error("Update failed:", data.message || data);
                setCurrentMobilePasswordError(
                    "Current password does not match",
                );
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleMobileSubmit = async (event) => {
        event.preventDefault();

        setPasswordError("");
        if (
            mobileFormData.newMobilePassword !==
            mobileFormData.confirmMobilePassword
        ) {
            setPasswordError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:3000/api/user/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: userState.loggedUser.email,
                        password: mobileFormData.currentMobilePassword,
                    }),
                },
            );
            const data = await response.json();

            if (response.ok) {
                try {
                    const userId =
                        userState.loggedUser.id || userState.loggedUser._id;

                    const response = await fetch(
                        `http://localhost:3000/api/user/${userId}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                password: mobileFormData.newMobilePassword,
                            }),
                        },
                    );

                    if (response.ok) {
                        setMobileFormData(emptyMobileForm);
                        setMobilePasswordError(null);
                        alert("success");
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.error("Update failed:", data.message || data);
                setCurrentMobilePasswordError(
                    "Current password does not match",
                );
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // for mock pagination
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    function launchFavorites(event) {
        console.log(event.target);
        // here we launch question mode with favorites list
    }

    function handleLogoutUser() {
        localStorage.removeItem("IBuddy");
        const actionResult = logoutUser();
        userDispatch(actionResult);
    }

    async function handleDeleteUser() {
        try {
            const userId = userState.loggedUser.id || userState.loggedUser._id;

            const response = await fetch(
                `http://localhost:3000/api/user/${userId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            if (response.ok) {
                localStorage.removeItem("IBuddy");
                const actionResult = logoutUser();
                userDispatch(actionResult);
                navigate("/");
                alert("user is deleted");
            }
        } catch (error) {
            console.log(error);
        }
    }

    function joinedAt() {
        const date = new Date(userState.loggedUser.createdAt);
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`;
        }

        return `${month}-${year}`;
    }

    return (
        <Layout>
            <div className="d-block d-md-none p-3 gap-5">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <span className="fw-semibold">Personal Info</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            <section className="mb-4 p-4 shadow-sm rounded bg-white">
                                <h5 className="mb-3">Personal Information</h5>
                                <div className="row g-3">
                                    <div className="col-12 col-sm-6">
                                        <small className="text-muted">
                                            {userState.loggedUser.name}
                                        </small>
                                        <div>{userState.loggedUser.email}</div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <small className="text-muted">
                                            Joined
                                        </small>
                                        <div>{joinedAt()}</div>
                                    </div>
                                </div>
                            </section>
                            <section className="mt-5 change-password-form">
                                <h3 className="mb-5 text-center">
                                    Change password
                                </h3>
                                <form
                                    onSubmit={handleMobileSubmit}
                                    className="d-flex flex-column justify-content-center align-items-center"
                                >
                                    <div className="mb-1">
                                        <label
                                            htmlFor="currentMobilePassword"
                                            className="form-label mb-0"
                                        >
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            id="currentMobilePassword"
                                            name="currentMobilePassword"
                                            className="form-control"
                                            value={
                                                mobileFormData.currentMobilePassword
                                            }
                                            onChange={handleMobileChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label
                                            htmlFor="newMobilePassword"
                                            className="form-label mb-0"
                                        >
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            id="newMobilePassword"
                                            name="newMobilePassword"
                                            className="form-control"
                                            value={
                                                mobileFormData.newMobilePassword
                                            }
                                            onChange={handleMobileChange}
                                            required
                                        />
                                        {currentMobilePasswordError && (
                                            <small className="text-danger">
                                                {currentMobilePasswordError}
                                            </small>
                                        )}
                                    </div>
                                    <div className="mb-1">
                                        <label
                                            htmlFor="confirmMobilePassword"
                                            className="form-label mb-0"
                                        >
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            id="confirmMobilePassword"
                                            name="confirmMobilePassword"
                                            className="form-control"
                                            value={
                                                mobileFormData.confirmMobilePassword
                                            }
                                            onChange={handleMobileChange}
                                            required
                                        />
                                        {mobilePasswordError && (
                                            <small className="text-danger">
                                                {mobilePasswordError}
                                            </small>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn mt-2 login-btn"
                                        style={{
                                            backgroundColor: "#F2A65A",
                                            color: "#1f2328",
                                        }}
                                    >
                                        Change Password
                                    </button>
                                </form>
                            </section>
                            <section className="text-center mt-5">
                                <div className="mb-2">
                                    <img
                                        src={Avatar}
                                        alt="Avatar"
                                        className="rounded-circle"
                                        width="92"
                                        height="92"
                                    />
                                </div>
                                <button
                                    className="btn btn-outline-danger px-5"
                                    onClick={handleLogoutUser}
                                >
                                    Log out
                                </button>
                            </section>
                            <section className="text-center mt-5 mb-1">
                                <button
                                    className="btn btn-danger px-5"
                                    onClick={handleDeleteUser}
                                >
                                    DELETE USER
                                </button>
                            </section>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            <span className="fw-semibold">Statistics</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            <section className="mb-4 p-4 shadow-sm rounded bg-white">
                                <h5 className="mb-3">Statistics</h5>
                                <div className="row text-center">
                                    <div className="col-6 col-md-3">
                                        <strong>124</strong>
                                        <div className="text-muted">Viewed</div>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <strong>78</strong>
                                        <div className="text-muted">
                                            Correct
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            <span className="fw-semibold">Favorites</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                {favoritesQuestions.map((question) => (
                                    <ListGroupItem
                                        key={question.questionId}
                                        action
                                        onClick={launchFavorites}
                                    >
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex flex-wrap">
                                                {question.question}
                                            </div>
                                            <div className="d-flex ps-2 fw-semibold">
                                                #{question.questionId}
                                                {question.category}
                                            </div>
                                        </div>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                        <Accordion.Header>
                            <span className="fw-semibold">Recent Activity</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            <section className="mb-4 p-4 shadow-sm rounded bg-white">
                                <h5 className="mb-3">Recent Activity</h5>
                                <ul className="list-unstyled mb-0">
                                    <li>Viewed “Closures in JS”</li>
                                    <li>Saved “Event Loop”</li>
                                </ul>
                            </section>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

            <div className="d-none d-md-block container my-5 rounded shadow h-100 pt-2">
                <Tabs
                    defaultActiveKey="info"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="info" title="Personal Info">
                        <section className="mb-4 p-4 shadow-sm rounded bg-white">
                            <h5 className="mb-3">Personal Information</h5>
                            <div className="row g-3">
                                <div className="col-12 col-sm-6">
                                    <small className="text-muted">
                                        {userState.loggedUser.name}
                                    </small>
                                    <div>{userState.loggedUser.email}</div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <small className="text-muted">Joined</small>
                                    <div>{joinedAt()}</div>
                                </div>
                            </div>
                        </section>
                        <div className="d-flex justify-content-around">
                            <section className="mt-5">
                                <h3 className="mb-5">Change password</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-1">
                                        <label
                                            htmlFor="currentPassword"
                                            className="form-label mb-0"
                                        >
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            id="currentPassword"
                                            name="currentPassword"
                                            className="form-control"
                                            value={formData.currentPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                        {currentPasswordError && (
                                            <small className="text-danger">
                                                {currentPasswordError}
                                            </small>
                                        )}
                                    </div>
                                    <div className="mb-1">
                                        <label
                                            htmlFor="newPassword"
                                            className="form-label mb-0"
                                        >
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            id="newPassword"
                                            name="newPassword"
                                            className="form-control"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-1">
                                        <label
                                            htmlFor="confirmPassword"
                                            className="form-label mb-0"
                                        >
                                            Confirm New Password
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
                                    <button
                                        type="submit"
                                        className="btn w-100 mt-2 login-btn"
                                        style={{
                                            backgroundColor: "#F2A65A",
                                            color: "#1f2328",
                                        }}
                                    >
                                        Change Password
                                    </button>
                                </form>
                            </section>
                            <div>
                                <section className="mb-2 text-center">
                                    <div className="mb-3">
                                        <img
                                            src={Avatar}
                                            alt="Avatar"
                                            className="rounded-circle"
                                            width="96"
                                            height="96"
                                        />
                                    </div>
                                    <h3 className="mb-1">
                                        {userState.loggedUser.name}
                                    </h3>
                                    <p className="text-muted mb-0">
                                        {userState.loggedUser.email}
                                    </p>
                                </section>
                                <section className="text-center mt-2 mb-1">
                                    <button
                                        className="btn btn-outline-danger px-5"
                                        onClick={handleLogoutUser}
                                    >
                                        Log out
                                    </button>
                                </section>
                                <section className="text-center mt-5 mb-1">
                                    <button
                                        className="btn btn-danger px-5"
                                        onClick={handleDeleteUser}
                                    >
                                        DELETE USER
                                    </button>
                                </section>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="statistics" title="Statistics">
                        <section className="mb-4 p-4 shadow-sm rounded bg-white">
                            <h5 className="mb-3">Statistics</h5>
                            <div className="row text-center">
                                <div className="col-6 col-md-3">
                                    <strong>124</strong>
                                    <div className="text-muted">Viewed</div>
                                </div>
                                <div className="col-6 col-md-3">
                                    <strong>78</strong>
                                    <div className="text-muted">Correct</div>
                                </div>
                            </div>
                        </section>
                    </Tab>
                    <Tab eventKey="favorites" title="Favorites">
                        <Pagination>{items}</Pagination>
                        <ListGroup>
                            {favoritesQuestions.map((question) => (
                                <ListGroupItem
                                    key={question.questionId}
                                    action
                                    onClick={launchFavorites}
                                >
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-wrap">
                                            {question.question}
                                        </div>
                                        <div className="d-flex ps-2 fw-semibold">
                                            #{question.questionId}
                                            {question.category}
                                        </div>
                                    </div>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Tab>
                    <Tab eventKey="recent" title="Recent activity">
                        <section className="mb-4 p-4 shadow-sm rounded bg-white">
                            <h5 className="mb-3">Recent Activity</h5>
                            <ul className="list-unstyled mb-0">
                                <li>Viewed “Closures in JS”</li>
                                <li>Saved “Event Loop”</li>
                            </ul>
                        </section>
                    </Tab>
                </Tabs>
            </div>
        </Layout>
    );
}
