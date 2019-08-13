import React from "react";
import { Container } from "react-bootstrap";

interface IProps {
}

const NotFound: React.FC<IProps> = (props: IProps): JSX.Element => {

    const textContainerClasses: string =
        "font-decorative " +                                // Font
        "font-size-25 font-size-md-3 font-size-lg-4 " +     // Responsive font size
        "my-3 my-sm-5 py-md-3 py-lg-5";                     // Responsive margin/padding
        
    return (
        <React.Fragment>
            <div className="background-rails"/>

            <Container>
                <div className={textContainerClasses}>
                    <span className="bg-color-white">Uh oh, page not found!</span>
                </div>
            </Container>
        </React.Fragment>
    );
};

NotFound.defaultProps = {};

export default NotFound;