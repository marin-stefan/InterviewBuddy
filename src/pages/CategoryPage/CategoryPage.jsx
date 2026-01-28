import Layout from "../../components/Layout/Layout";
import "./CategoryPage.css";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { UserContext } from "../../store/user/context";

export default function CategoryPage() {
    const { userState, userDispatch } = useContext(UserContext);
    let isLogged = userState.loggedUser;

    const { categoryId } = useParams();
    const [categoryTitle, setCategoryTitle] = useState(categoryId);
    const [questions, setQuestions] = useState([]);
    const [favoritesQuestions, setFavoriteQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3000/api/questions?category=${categoryId}`)
            .then((res) => res.json())
            .then((data) => {
                const shuffledQuestions = shuffleArray(data);
                // const shuffledQuestions = data;
                setQuestions(shuffledQuestions);
                setCurrentIndex(0);
            });
    }, [categoryId]);

    useEffect(() => {
        const localStorageUserInfo = JSON.parse(localStorage.getItem("IBuddy"));
        if (localStorageUserInfo) {
            const userId = localStorageUserInfo.userId;
            fetch(`http://localhost:3000/api/user/${userId}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        setFavoriteQuestions(data.favoriteQuestions);
                    }
                });
        }
    }, []);

    function shuffleArray(questionsArray) {
        const newQuestionsArray = [...questionsArray]; // copy so we don't mutate original

        for (let i = newQuestionsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newQuestionsArray[i], newQuestionsArray[j]] = [
                newQuestionsArray[j],
                newQuestionsArray[i],
            ];
        }

        return newQuestionsArray;
    }

    function serveNextQuestion() {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    }

    async function handleAnswer(answer) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        const userId = userState.loggedUser._id;
        const response = await fetch(
            `http://localhost:3000/api/user/${userId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const data = await response.json();

        if (response.ok) {
            const updateInfo = {
                totalQuestions: data.totalQuestions,
                answers: data.answers,
                correctAnswerCount: data.correctAnswerCount,
            };

            if (answer === "yes") {
                (updateInfo.correctAnswerCount++,
                    updateInfo.answers.push(1),
                    updateInfo.totalQuestions++);
            } else if (answer === "no") {
                (updateInfo.answers.push(0), updateInfo.totalQuestions++);
            }

            const updatedResponse = await fetch(
                `http://localhost:3000/api/user/${userId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateInfo),
                },
            );

            const updatedData = await updatedResponse.json();

            if (updatedResponse.ok) {
                userDispatch(updatedData.user);
            }
        }
    }

    async function handleSaveToFavorites(question) {
        const localStorageUserInfo = JSON.parse(localStorage.getItem("IBuddy"));
        const userId = localStorageUserInfo.userId;
        const response = await fetch(
            `http://localhost:3000/api/user/${userId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const data = await response.json();

        if (response.ok) {
            const favoriteQuestions = data.favoriteQuestions;
            const exists = favoriteQuestions.some(
                (element) => element._id === question._id,
            );

            console.log(exists);
            if (!exists) {
                favoriteQuestions.push(question);
                const updatedResponse = await fetch(
                    `http://localhost:3000/api/user/${userId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ favoriteQuestions }),
                    },
                );

                const updatedData = await updatedResponse.json();

                if (updatedResponse.ok) {
                    userDispatch(updatedData.user);
                }
            }
        }
    }

    function handleRemoveFromFavorites(question) {
        console.log("need to remove from favorites here");
        console.log(question);
    }

    function setActiveTab(value) {
        if (value === "all") {
            setCategoryTitle(categoryId);
        } else {
            setCategoryTitle(value);
        }
    }

    return (
        <Layout>
            <div className="d-block d-md-none container p-3 gap-5">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <h4 className="text-end fw-semibold p-2">
                            {categoryTitle}
                        </h4>
                        <Accordion.Header onClick={() => setActiveTab("all")}>
                            <span className="fw-semibold">All</span>
                        </Accordion.Header>
                        <Accordion.Body>
                            {questions[currentIndex] && (
                                <QuestionCard
                                    isLogged={isLogged}
                                    question={questions[currentIndex]}
                                    onAnswer={handleAnswer}
                                    onSaveToFavorites={handleSaveToFavorites}
                                />
                            )}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header
                            className={
                                !isLogged ? "accordion-header-disabled" : ""
                            }
                            onClick={(e) => {
                                !isLogged && e.preventDefault();
                                setActiveTab("favorites");
                            }}
                        >
                            <span className="fw-semibold">Favorites</span>
                        </Accordion.Header>
                        {isLogged && (
                            <Accordion.Body>
                                {questions[currentIndex] && (
                                    <QuestionCard
                                        inFavorites={true}
                                        isLogged={isLogged}
                                        question={questions[currentIndex]}
                                        onAnswer={handleAnswer}
                                        onRemoveFromFavorites={
                                            handleRemoveFromFavorites
                                        }
                                    />
                                )}
                            </Accordion.Body>
                        )}
                    </Accordion.Item>
                </Accordion>
            </div>

            <div className="d-none d-md-block container my-5 border shadow rounded">
                <h4 className="text-end fw-semibold p-2">{categoryTitle}</h4>
                <Tabs
                    defaultActiveKey="all"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                    onSelect={(tab) => setActiveTab(tab)}
                >
                    <Tab eventKey="all" title="All">
                        {questions[currentIndex] && (
                            <QuestionCard
                                isLogged={isLogged}
                                question={questions[currentIndex]}
                                category={categoryTitle}
                                onAnswer={handleAnswer}
                                onSaveToFavorites={handleSaveToFavorites}
                                onNextQuestion={serveNextQuestion}
                            />
                        )}
                    </Tab>
                    <Tab
                        eventKey="Favorites"
                        title="Favorites"
                        disabled={!isLogged}
                    >
                        {questions[currentIndex] && (
                            <QuestionCard
                                inFavorites={true}
                                isLogged={isLogged}
                                question={questions[currentIndex]}
                                category={categoryTitle}
                                onAnswer={handleAnswer}
                                onRemoveFromFavorites={
                                    handleRemoveFromFavorites
                                }
                            />
                        )}
                    </Tab>
                </Tabs>
            </div>
        </Layout>
    );
}
