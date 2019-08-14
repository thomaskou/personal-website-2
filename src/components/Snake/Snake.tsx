import React, { useState, CSSProperties } from "react";
import "./Snake.scss";
import { Container } from "react-bootstrap";

interface IProps {
}

const Snake: React.FC<IProps> = (props: IProps): JSX.Element => {

    const [gameVisible, changeGameVisible] = useState(false);
    const [gamePlayable, changeGamePlayable] = useState(false);
    const [gameActive, changeGameActive] = useState(false);

    async function handleClick(): Promise<void> {
        if (!gameVisible) {
            changeGameVisible(true);
            setTimeout(() => {changeGamePlayable(true)}, 500);
        } else if (!gameActive && gamePlayable) {
            changeGameActive(true);
            console.log("Game started!");
        }
    }

    const opacityStyle: CSSProperties = {
        transition: "0.5s",
        filter: gameVisible ? "opacity(1)" : "opacity(0)",
    };

    return (
        <React.Fragment>
                
            <div
                className="snake-button centered p-3"
                style={{visibility: gameVisible ? "hidden" : "visible"}}
            >
                <span onClick={handleClick} className="font-primary text-white font-size-25">*</span>
            </div>

            <div
                className="snake-background"
                style={opacityStyle}
            />

            <div className="snake-container" style={opacityStyle}>
                <Container className="d-flex" style={{flex: 1}}>
                    <div className="snake-canvas my-5" style={{flex: 1}}>

                    </div>
                </Container>
            </div>

        </React.Fragment>
    );
};

Snake.defaultProps = {};

export default Snake;