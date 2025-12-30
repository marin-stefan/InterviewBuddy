import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Layout.css";

export default function Layout(props) {
    return (
        <div className="layout">
            <Header />
            <main className="d-flex flex-column justify-content-center flex-fill">{props.children}</main>
            <Footer />
        </div>
    );
}
