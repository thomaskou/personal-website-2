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
    const [enterScoreNode, changeEnterScoreNode] = useState(<React.Fragment/>);

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
    }, [gameActive, endGame]);

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

    const scoreSubmitted = useCallback((): void => {
        if (gameVisible && gameActive && enterScore) {
            changeEnterScore(false);
            changeGameActive(false);
        }
    }, [gameVisible, gameActive, enterScore]);

    useEffect(() => {
        changeEnterScoreNode(enterScore
            ? <React.Fragment/>
            : <React.Fragment/>
        );
    }, [enterScore, scoreSubmitted])

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

    const scoreDisplayClasses: string =
        "snake-score-display " +
        "font-primary text-white " +
        "mt-2 mt-md-4 ml-lg-4 my-lg-5 ";
    
    const scoreDisplayInnerClasses: string =
        "snake-score-display-inner " +
        "py-2 px-2 px-sm-0 " +
        "font-size-075 font-size-sm-09 font-size-md-1 ";

    const snakeScore: ReactNode = (
        <div className="font-primary text-white font-size-15 snake-score m-3 px-2">
            {snakeStore && snakeStore.score}
        </div>
    );

    const scoreDisplay: ReactNode = (
        <div className={scoreDisplayClasses}>
            <div className={scoreDisplayInnerClasses}>
                {snakeStore && snakeStore.allScores.slice(0, 10).map(s => (
                    <p className="mx-2 mx-sm-3">
                        <span style={{color: "#a0a0a0"}}>{s.name}:</span> <span>{s.score}</span>
                    </p>
                ))}
            </div>
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
                <Container className="snake-container-inner" style={{...offsetTransitionStyle, flex: 1}}>

                    <div className="snake-canvas mt-2 mb-4 mt-md-3 mb-md-5 mt-lg-5" style={{flex: 1}}>
                        {snakeScore}
                        {snakeNode}
                    </div>

                    {scoreDisplay}
                    {enterScoreNode}

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
