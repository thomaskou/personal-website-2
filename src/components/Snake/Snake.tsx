import React from "react";
import "./Snake.scss";
import { Container } from "react-bootstrap";

interface IProps {
}

const Snake: React.FC<IProps> = (props: IProps): JSX.Element => {
    return (
        <React.Fragment>
            
            <Container className="d-flex" style={{flex: 1}}>
                <div className="snake-canvas m-5" style={{flex: 1}}>

                </div>
            </Container>

        </React.Fragment>
    );
};

Snake.defaultProps = {};

export default Snake;