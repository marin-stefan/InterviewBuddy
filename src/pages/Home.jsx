import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import JsImage from "../assets/js48.svg";
import Carousel from "react-bootstrap/Carousel";
import Home1 from "../assets/home1.png";
import Home2 from "../assets/home2.png";
import Home3 from "../assets/home3.png";

export default function Home() {
    const slides = [
        {
            src: Home1,
            title: "titlu 1 orientativ",
            desc: "blablaslide unau fdsv dfvdfv",
        },
        {
            src: Home2,
            title: "title 2 orientativ",
            desc: "ndsclsd sdvsdks sdvsd dfvdfgf",
        },
        {
            src: Home3,
            title: "title 3 orientativ",
            desc: "eeeovov sdvsdks sdvsd dfvdfgf",
        },
    ];

    return (
        <Layout>
            <div className="d-block d-md-none p-3 gap-5">
                {slides.map((slide, i) => (
                    <Card key={i} className="mb-3">
                        <Card.Img src={slide.src} />
                        <Card.Body>
                            <Card.Title>{slide.title}</Card.Title>
                            <Card.Subtitle>{slide.desc}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <div className="d-none d-md-block container main-content shadow">
                <Carousel className="carousel-main">
                    {slides.map((slide, i) => (
                        <Carousel.Item key={i} className="carousel-item">
                            <img
                                className="d-block slide-img"
                                src={slide.src}
                                alt="First slide"
                            />
                            <Carousel.Caption className="carousel-item-text">
                                <h3>{slide.title}</h3>
                                <p>{slide.desc}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </Layout>
    );
}
