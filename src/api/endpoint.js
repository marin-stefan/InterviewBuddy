// here we have tempo api simulated data,later transform to actual api data if i build api

export function getQuestions(categoryId) {
    const questionList = {
        react: [
            {
                questionId: 1,
                question: "What is React?",
                answer: "React is a JavaScript library used to build user interfaces, especially for web applications. It lets developers create reusable components and efficiently update the UI when data changes.",
                category: "React",
            },
            {
                questionId: 2,
                question: "What is JSX?",
                answer: "JSX is a syntax extension that lets you write HTML-like code inside JavaScript.",
                category: "React",
            },
            {
                questionId: 3,
                question: "What is the Virtual DOM?",
                answer: "The virtual DOM is a lightweight copy of the real DOM that React uses to improve performance.",
                category: "React",
            },
            {
                questionId: 4,
                question: "What is a functional component?",
                answer: "A functional component is a JavaScript function that returns JSX.",
                category: "React",
            },
            {
                questionId: 5,
                question: "What is the difference between props and state?",
                answer: "Props are read-only and passed from parent components, while state is managed within the component.",
                category: "React",
            },
        ],
        javascript: [
            {
                questionId: 1,
                question: "What is JavaScript?",
                answer: "JavaScript is a high-level, interpreted programming language primarily used to add interactivity and dynamic behavior to web pages. It runs in the browser and on the server (via environments like Node.js).",
                category: "Javascript",
            },
            {
                questionId: 2,
                question: "What is the difference between var, let, and const?",
                answer: "var is function-scoped and can be redeclared, while let and const are block-scoped. let allows reassignment, whereas const does not allow reassignment after initialization.",
                category: "Javascript",
            },
            {
                questionId: 3,
                question: "What is a closure?",
                answer: "A closure is a function that retains access to its lexical scope even after the outer function has finished executing.",
                category: "Javascript",
            },
            {
                questionId: 4,
                question: "What is the difference between == and ===?",
                answer: "== compares values after type coercion, while === compares both value and type without type conversion.",
                category: "Javascript",
            },
            {
                questionId: 5,
                question: "What is event bubbling?",
                answer: "Event bubbling is a mechanism where an event starts from the target element and propagates up through its parent elements in the DOM.",
                category: "Javascript",
            },
        ],
        css: [
            {
                questionId: 1,
                question: "What is CSS?",
                answer: "CSS (Cascading Style Sheets) is a stylesheet language used to control the layout, appearance, and visual presentation of HTML elements on a web page.",
                category: "CSS",
            },
            {
                questionId: 2,
                question: "What is the CSS box model?",
                answer: "The CSS box model consists of content, padding, border, and margin, which together define the space an element occupies on a page.",
                category: "CSS",
            },
            {
                questionId: 3,
                question:
                    "What is the difference between class and id selectors?",
                answer: "Class selectors can be reused on multiple elements, while id selectors must be unique and apply to only one element on a page.",
                category: "CSS",
            },
            {
                questionId: 4,
                question:
                    "What is the difference between display: none and visibility: hidden?",
                answer: "display: none removes the element from the document layout, while visibility: hidden hides the element but still occupies space.",
                category: "CSS",
            },
            {
                questionId: 5,
                question: "What is Flexbox?",
                answer: "Flexbox is a CSS layout model that provides an efficient way to align, distribute space, and arrange items within a container, even when their size is unknown or dynamic.",
                category: "CSS",
            },
        ],
        html: [
            {
                questionId: 1,
                question: "What is HTML?",
                answer: "HTML (HyperText Markup Language) is the standard markup language used to structure content on the web using elements such as headings, paragraphs, links, images, and forms.",
                category: "HTML",
            },
            {
                questionId: 2,
                question: "What is the purpose of semantic HTML?",
                answer: "Semantic HTML uses meaningful tags like header, footer, article, and section to clearly describe the structure and purpose of content, improving accessibility and SEO.",
                category: "HTML",
            },
            {
                questionId: 3,
                question:
                    "What is the difference between block-level and inline elements?",
                answer: "Block-level elements start on a new line and take up the full width available, while inline elements do not start on a new line and only take up as much width as necessary.",
                category: "HTML",
            },
            {
                questionId: 4,
                question: "What is the difference between div and span?",
                answer: "div is a block-level container used for grouping elements, while span is an inline container typically used for styling small portions of text.",
                category: "HTML",
            },
            {
                questionId: 5,
                question: "What is the purpose of the alt attribute on images?",
                answer: "The alt attribute provides alternative text for images, improving accessibility for screen readers and displaying text if the image fails to load.",
                category: "HTML",
            },
        ],
        favorites: [
            {
                questionId: 1,
                question: "What is HTML?",
                answer: "HTML (HyperText Markup Language) is the standard markup language used to structure content on the web using elements such as headings, paragraphs, links, images, and forms.",
                category: "HTML",
            },
            {
                questionId: 2,
                question: "What is Flexbox?",
                answer: "Flexbox is a CSS layout model that provides an efficient way to align, distribute space, and arrange items within a container, even when their size is unknown or dynamic.",
                category: "CSS",
            },
            {
                questionId: 4,
                question:
                    "What is the difference between display: none and visibility: hidden?",
                answer: "display: none removes the element from the document layout, while visibility: hidden hides the element but still occupies space.",
                category: "Javascript",
            },
            {
                questionId: 5,
                question: "What is the purpose of the alt attribute on images?",
                answer: "The alt attribute provides alternative text for images, improving accessibility for screen readers and displaying text if the image fails to load.",
                category: "HTML",
            },
        ],
    };

    return questionList[categoryId];
}
