import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import values from "lodash/values";

interface IProps {
}

interface ILink {
    text: string;
    link: string;
}

const links: {[key: string]: ILink} = {
    email: {
        text: "Email",
        link: "mailto:thomas.kou@uwaterloo.ca",
    },
    resume: {
        text: "Resume",
        link: "/files/resume.pdf",
    },
    linkedin: {
        text: "LinkedIn",
        link: "https://linkedin.com/in/thomaskou",
    },
    github: {
        text: "Github",
        link: "https://github.com/thomaskou",
    },
};

const About: React.FC<IProps> = (props: IProps): JSX.Element => {

    const textContainerClasses: string = "font-primary mt-3 mt-sm-5 pt-md-3 pt-lg-5 ";
    const whiteOnBlack: string = "text-white bg-color-black ";
    
    const fontSizeLarge: string = "font-size-175 font-size-sm-25 font-size-lg-3 ";
    const fontSizeMed: string = "font-size-1 font-size-sm-15 font-size-lg-2 ";

    const headerProps = {
        className: fontSizeLarge + whiteOnBlack + "p-2 ",
    }
    const bodyProps = {
        className: fontSizeMed + whiteOnBlack + "my-3 my-sm-4 my-md-5 p-2 ",
    }

    return (
        <main>
            <div className="background-river"/>

            <Container>
                <div className={textContainerClasses}>
                    <p {...headerProps}>Hi, I'm Thomas.</p>
                    <p {...bodyProps}>
                        I'm a Software Engineering student at the University of Waterloo.
                        I enjoy design, music composition, video production, writing, and making computers do things.
                    </p>
                </div>

                <Row className="font-decorative font-size-1 font-size-sm-125 font-size-md-15">
                    {values(links).map((link: ILink, index: number) => (
                        <Col key={"about-link-" + index} xs={6} sm={4} md={3} className="my-2 my-sm-3">
                            <a
                                href={link.link}
                                target="_blank"
                                className="bg-color-white text-black py-1 px-2"
                            >
                                {link.text}
                            </a>
                        </Col>
                    ))}
                </Row>
            </Container>
        </main>
    );
};

About.defaultProps = {};

export default About;
