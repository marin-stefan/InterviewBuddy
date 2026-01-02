import Layout from "../../components/Layout/Layout";
import "./CategoryPage.css";
import { getQuestions } from "../../api/endpoint";
import { getCategories } from "../../api/categories";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";

export default function CategoryPage() {
    const { categoryId } = useParams();
    const questions = getQuestions(categoryId);
    const categories = getCategories();
    const isLogged = false; // aici punem in functie de e loggat
    // const [currentIndex, setCurrentIndex] = useState();

    return (
        <Layout>
            {/* mobile here punem un dropdown??*/}
            <div className="d-block d-md-none container p-3 gap-5">
                {/* <QuestionCard question={questions[0]} /> */}

                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <span className="fw-semibold">All</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            <QuestionCard question={questions[0]} />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header
                            className= {!isLogged ? "accordion-header-disabled" : ""}
                            onClick={(e) => !isLogged && e.preventDefault()}
                        >
                            <span className="fw-semibold">Review</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            <QuestionCard question={questions[0]} />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header
                            className= {!isLogged ? "accordion-header-disabled" : ""}
                            onClick={(e) => !isLogged && e.preventDefault()}
                        >
                            <span className="fw-semibold">Favorites</span>
                        </Accordion.Header>
                        {isLogged && (
                            <Accordion.Body>
                                <QuestionCard question={questions[0]} />
                            </Accordion.Body>
                        )}
                    </Accordion.Item>
                </Accordion>
            </div>

            <div className="d-none d-md-block container my-5 border shadow rounded">
                <h4 className="text-end fw-semibold p-2">
                    {categories[categoryId]}
                </h4>
                <Tabs
                    defaultActiveKey="all"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="all" title="All">
                        <QuestionCard
                            question={questions[0]}
                            category={categories[categoryId]}
                        />
                    </Tab>
                    <Tab eventKey="review" title="Review" disabled={!isLogged}>
                        <QuestionCard
                            question={questions[0]}
                            category={categories[categoryId]}
                        />
                    </Tab>
                    <Tab eventKey="favorites" title="Favorites" disabled={!isLogged}>
                        <QuestionCard
                            question={questions[0]}
                            category={categories[categoryId]}
                        />
                    </Tab>
                </Tabs>
            </div>
        </Layout>
    );
}
