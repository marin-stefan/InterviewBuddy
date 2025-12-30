import Layout from "../../components/Layout/Layout";
import "./JavascriptPage.css";
import { getQuestions } from "../../api/endpoint";
import QuestionCard from "../../components/QuestionCard/QuestionCard";

export default function JavascriptPage() {
    const questions = getQuestions();

    return (
        <Layout>
            <div className="d-block d-md-none p-3 gap-5">
                <QuestionCard question={questions[0]} />
            </div>

            <div className="d-none d-md-block container my-5">
                <QuestionCard question={questions[0]} />
            </div>
        </Layout>
    );
}
