import "./QuestionCard.css";
import { useState } from "react";

export default function QuestionCard(props) {
    const [showAnswer, setShowAnswer] = useState(false);
    const { question } = props;

    return (
        <div className="shadow rounded p-4 p-lg-5 bg-white">
            <div className="d-flex justify-content-around fw-semibold question-btn-group">
                <button className="btn px-4 question-scroll-btn">
                    &lt;&lt; Prev
                </button>
                <button className="btn px-4 question-scroll-btn">
                    Next &gt;&gt;
                </button>
            </div>
            <div className="mb-4 border-top pt-4 mt-3">
                <h6 className="text-muted mb-2">
                    JavaScript Question #{question.questionId}
                </h6>
                <h3 className="fw-semibold">{question.question}</h3>
            </div>
            <div className="d-flex mb-4 gap-2">
                <button
                    className="btn btn-success px-4"
                    onClick={() => setShowAnswer((prev) => !prev)}
                >
                    {showAnswer ? "Hide Answer" : "Show Answer"}
                </button>
                <button className="btn btn-outline-warning px-4">
                    Save Question
                </button>
            </div>
            {showAnswer && (
                <div className="border-top pt-4 mt-3">
                    <h5 className="fw-semibold mb-2">Answer</h5>
                    <p className="mb-0 text-secondary">{question.answer}</p>
                </div>
            )}
        </div>
    );
}
