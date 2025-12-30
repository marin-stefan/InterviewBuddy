import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="mt-auto">
            <div className="container d-flex flex-wrap justify-content-between align-items-center">
                <div>
                    <ul>
                        <li><p>Marin Stefan Daniel</p></li>
                        <li><p>Interview Buddy - React 19.2</p></li>
                        <li>ItSchool course @2026 - all rights reserved</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li><a href="https://marin-stefan.webflow.io"><p>Check out my projects</p></a></li>
                        <li><a href="https://linkedin.com/in/marinstefan"><p>Follow me on LinkedIn</p></a></li>
                        <li><a href="https://github.com/marin-stefan"><p>I am on Github</p></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
