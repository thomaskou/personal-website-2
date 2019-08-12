import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import values from "lodash/values";
import "./Navbar.scss";

interface IProps {
}

interface INavbarLink {
    text: string;
    route: string;
}

interface INavbarLinkList {
    [key: string]: INavbarLink;
}

const navLinks: INavbarLinkList = {
    home: {
        text: "Home",
        route: "/",
    },
    experience: {
        text: "Experience",
        route: "/experience",
    },
    projects: {
        text: "Projects",
        route: "/projects",
    },
};

const Navbar: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (
        <nav className="navbar spaced-row">

            <h3 className="font-title text-uppercase bg-color-white">Thomas Kou</h3>

            <Row className="font-decorative text-lowercase">
                {values(navLinks).map((item: INavbarLink, index: number): JSX.Element => (
                    <Col key={"navbar-link-" + index}>
                        <Link to={item.route} className="bg-color-white">{item.text}</Link>
                    </Col>
                ))}
            </Row>

        </nav>
    );
};

Navbar.defaultProps = {};

export default Navbar;