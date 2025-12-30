// here we have tempo api simulated data,later transform to actual api data if i build api

export function getQuestions() {
    const questionList = [
        {
            questionId: 1,
            question: "What is React?",
            answer: "React is a JavaScript library used to build user interfaces, especially for web applications. It lets developers create reusable components and efficiently update the UI when data changes.",
        },
        {
            questionId: 2,
            question: "What is JSX?",
            answer: "JSX is a syntax extension that lets you write HTML-like code inside JavaScript.",
        },
        {
            questionId: 3,
            question: "What is the Virtual DOM?",
            answer: "The virtual DOM is a lightweight copy of the real DOM that React uses to improve performance.",
        },
        {
            questionId: 4,
            question: "What is a functional component?",
            answer: "A functional component is a JavaScript function that returns JSX.",
        },
        {
            questionId: 5,
            question: "What is the difference between props and state?",
            answer: "Props are read-only and passed from parent components, while state is managed within the component.",
        },
    ];

    return questionList;
}
