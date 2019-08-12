import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

interface IProps {
}

const Homepage: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (
        <React.Fragment>
            <div className="background-rails"/>

            <Container>
                <div className="font-decorative font-size-4 my-5">
                    <span className="bg-color-white">See where I've <Link to="/experience">worked</Link></span><br/><br/>
                    <span className="bg-color-white">See what I've <Link to="/projects">made</Link></span><br/><br/>
                    <span className="bg-color-white">See who I <Link to="/about">am</Link></span>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default Homepage;