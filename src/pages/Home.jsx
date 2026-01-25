import Layout from "../components/Layout/Layout";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Home1 from "../assets/home11.png";
import Home2 from "../assets/home22.png";
import Home3 from "../assets/home33.png";

export default function Home() {
    const slides = [
        {
            src: Home1,
            title: "Your Learning Hub",
            desc: "Stats, favorites and progress",
        },
        {
            src: Home2,
            title: "Explore Question Libraries",
            desc: "Practice across many technologies",
        },
        {
            src: Home3,
            title: "Begin Your Journey",
            desc: "Sign up or browse freely",
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
