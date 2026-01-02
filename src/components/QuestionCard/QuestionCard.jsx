import "./QuestionCard.css";
import { useState } from "react";

export default function QuestionCard(props) {
    const [showAnswer, setShowAnswer] = useState(false);
    const { question, category } = props;

    return (
        <div className="rounded pt-3 pb-3 pt-lg-5 pb-lg-5 bg-white">
            <div className="mb-4 mt-3">
                <h6 className="text-muted mb-2">
                    {category} Question #{question.questionId}
                </h6>
                <h3 className="fw-semibold">{question.question}</h3>
            </div>
            <div className="d-flex mb-4 gap-2 flex-wrap">
                <button
                    className="btn btn-success px-4 question-btns"
                    onClick={() => setShowAnswer((prev) => !prev)}
                >
                    {showAnswer ? "Hide Answer" : "Show Answer"}
                </button>
                <button className="btn btn-outline-warning px-4 question-btns">
                    Save Question
                </button>
            </div>

            <div
                className={`border-top pt-4 mt-3 answer-wrapper ${
                    showAnswer ? "revealed" : ""
                }`}
            >
                <div className="answer-content">
                    <h5 className="fw-semibold mb-2">Answer</h5>
                    <p className="mb-0 text-secondary">{question.answer}</p>

                    <div className="mt-3 pt-3 border-top text-center">
                        <h6 className="fw-semibold pb-1">
                            Did you know the answer?
                        </h6>
                        <div className="d-flex gap-3 justify-content-center">
                            <button className="btn btn-success">Yes</button>
                            <button className="btn btn-warning">No</button>
                        </div>
                    </div>
                </div>

                {!showAnswer && (
                    <div className="answer-overlay">
                        Click “Show Answer” to reveal
                    </div>
                )}
            </div>
        </div>
    );
}
