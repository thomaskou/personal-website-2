import React, { useState, CSSProperties, useEffect, ReactNode, useCallback } from "react";
import "./Snake.scss";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { ISnakeStore } from "../../services/redux/snake/InitialSnakeStore";
import { IStore } from "../../services/redux/defaultStore";
import { getScores, changeScore } from "../../services/redux/snake/SnakeActions";
import SnakeBox from "./SnakeBox";

/**
 * ****************************************************************************************************
 * Interfaces
 * ****************************************************************************************************
 */

interface IProps {
    dispatch?: any;
    snakeStore?: ISnakeStore;
}

const Snake: React.FC<IProps> = (props: IProps): JSX.Element => {

    /**
     * ****************************************************************************************************
     * Props & state
     * ****************************************************************************************************
     */

    const {dispatch, snakeStore} = props;

    const [gameVisible, changeGameVisible] = useState(false);
    const [gamePlayable, changeGamePlayable] = useState(false);
    const [enterScore, changeEnterScore] = useState(false);
    const [gameActive, changeGameActive] = useState(false);

    const [snakeNode, changeSnakeNode] = useState(<React.Fragment/>);

    /**
     * ****************************************************************************************************
     * Handle state changes
     * ****************************************************************************************************
     */

    const endGame = useCallback((): void => {
        if (gameVisible && gameActive && !enterScore) {
            changeEnterScore(true);
        }
    }, [gameVisible, gameActive, enterScore]);

    useEffect(() => {
        changeSnakeNode(gameActive
            ? <SnakeBox endGameCallback={endGame}/>
            : <React.Fragment/>
        );
    }, [gameVisible, gameActive, endGame]);

    async function openGame(): Promise<void> {
        if (!gameVisible) {
            await dispatch(changeScore(0));
            await dispatch(getScores()).then(() => {
                changeGameVisible(true);
                setTimeout(() => {changeGamePlayable(true)}, 500);
            });
        }
    }

    function startGame(): void {
        if (gameVisible && !gameActive && gamePlayable) {
            changeGameActive(true);
        }
    }

    /**
     * ****************************************************************************************************
     * Render and render-related variables
     * ****************************************************************************************************
     */

    const opacityStyle: CSSProperties = {
        transition: "0.5s",
        filter: gameVisible ? "opacity(1)" : "opacity(0)",
    };

    const offsetTransitionStyle: CSSProperties = {
        transition: "0.5s",
        marginTop: gameVisible ? 0 : 35,
        marginBottom: gameVisible ? 0 : -35,
    };

    const snakeScore: ReactNode = (
        <div className="font-primary text-white font-size-15 snake-score m-3 px-2">
            {snakeStore && snakeStore.score}
        </div>
    );

    return (
        <React.Fragment>
                
            <div
                className="snake-button centered p-3"
                style={{visibility: gameVisible ? "hidden" : "visible"}}
            >
                <span onClick={openGame} className="font-primary text-white font-size-25">*</span>
            </div>

            <div
                className="snake-background"
                style={opacityStyle}
            />

            <div className="snake-container" style={opacityStyle} onClick={startGame}>
                <Container className="d-flex" style={{...offsetTransitionStyle, flex: 1}}>
                    <div className="snake-canvas my-5" style={{flex: 1}}>
                        {snakeScore}
                        {snakeNode}
                    </div>
                </Container>
            </div>

        </React.Fragment>
    );
};

Snake.defaultProps = {};

export default connect((store: IStore, props: IProps) => ({
    snakeStore: store.snakeStore,
    ...props,
}))(Snake);
