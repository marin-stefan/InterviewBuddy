import Layout from "../../components/Layout/Layout";
import "./User.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Accordion from "react-bootstrap/Accordion";
import Avatar from "../../assets/avatar.png";
import Pagination from "react-bootstrap/Pagination";
import ListGroup from "react-bootstrap/ListGroup";
import { getQuestions } from "../../api/endpoint";
import { getCategories } from "../../api/categories";
import { ListGroupItem } from "react-bootstrap";

export default function User() {
    const favoritesQuestions = getQuestions("favorites");
    const categories = getCategories();
    console.log(favoritesQuestions);

    // for pagination
    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>
        );
    }

    function launchFavorites(event) {
        console.log(event.target);
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
                                            Username
                                        </small>
                                        <div>johndoe</div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <small className="text-muted">
                                            Joined
                                        </small>
                                        <div>Jan 2024</div>
                                    </div>
                                </div>
                            </section>
                            <section className="text-center mt-5">
                                Change pass here!! must design
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
                                <button className="btn btn-outline-danger px-5">
                                    Log out
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
                                        Username
                                    </small>
                                    <div>johndoe</div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <small className="text-muted">Joined</small>
                                    <div>Jan 2024</div>
                                </div>
                            </div>
                        </section>
                        <div className="d-flex justify-content-around">
                            <section className="text-center mt-5">
                                Change pass here!! must design
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
                            <h3 className="mb-1">John Doe</h3>
                            <p className="text-muted mb-0">john@email.com</p>
                        </section>
                        <section className="text-center mt-2 mb-1">
                            <button className="btn btn-outline-danger px-5">
                                Log out
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
