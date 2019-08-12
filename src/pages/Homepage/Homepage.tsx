import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

interface IProps {
}

const Homepage: React.FC<IProps> = (props: IProps): JSX.Element => {

    const textContainerClasses: string =
        "font-decorative " +                                // Font
        "font-size-25 font-size-md-3 font-size-lg-4 " +     // Responsive font size
        "my-3 my-sm-5 py-md-3 py-lg-5";                     // Responsive margin/padding

    return (
        <React.Fragment>
            <div className="background-rails"/>

            <Container>
                <div className={textContainerClasses}>
                    <span className="bg-color-white">See where I've <Link to="/experience">worked</Link></span><br/><br/>
                    <span className="bg-color-white">See what I've <Link to="/projects">made</Link></span><br/><br/>
                    <span className="bg-color-white">See who I <Link to="/about">am</Link></span>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default Homepage;
