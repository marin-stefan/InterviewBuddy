import Layout from "../../components/Layout/Layout";
import "./About.css";

export default function About() {
    return (
        <Layout>
            <div className="container my-5 shadow about-main pb-3 overflow-hidden">
                <header className="mb-5 text-center">
                    <h1 className="fw-bold">About InterviewBuddy</h1>
                    <p className="text-muted mt-2">
                        A focused platform for preparing for real-world software
                        interviews.
                    </p>
                </header>
                <section className="mb-5">
                    <h2 className="mb-3">The Project</h2>
                    <p>
                        InterviewBuddy is a web-based application designed to
                        help developers prepare for technical interviews through
                        structured questions, categorized topics, and practical
                        learning paths.
                    </p>
                    <p>
                        The goal of the project is to remove noise and focus on
                        what actually matters during interviews:
                        problem-solving, clarity of thought, and familiarity
                        with commonly asked concepts.
                    </p>
                </section>
                <section className="mb-5">
                    <h2 className="mb-3">The Developer</h2>
                    <p>
                        This project is built and maintained by a software
                        developer with a strong interest in clean architecture,
                        modern frontend development, and practical interview
                        preparation.
                    </p>
                </section>
                <section>
                    <h2 className="mb-3">Why This Exists</h2>
                    <p>
                        InterviewBuddy exists to make preparation more
                        intentional and less overwhelming. Instead of endless
                        resources, the focus is on clarity, consistency, and
                        progress.
                    </p>
                    <p>
                        Whether you are preparing for your first role or
                        brushing up for your next opportunity, the aim is to
                        help you walk into interviews with confidence.
                    </p>
                </section>
            </div>
        </Layout>
    );
}
