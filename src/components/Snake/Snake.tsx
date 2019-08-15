import React, {useState, CSSProperties, useEffect, ReactNode, useCallback, RefObject} from "react";
import "./Snake.scss";
import {Container, Modal} from "react-bootstrap";
import { connect } from "react-redux";
import { ISnakeStore } from "../../services/redux/snake/InitialSnakeStore";
import { IStore } from "../../services/redux/defaultStore";
import {getScores, changeScore, submitScore} from "../../services/redux/snake/SnakeActions";
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
     * Props, state, instance variables
     * ****************************************************************************************************
     */

    const {dispatch, snakeStore} = props;

    const [gameVisible, changeGameVisible] = useState(false);
    const [gamePlayable, changeGamePlayable] = useState(false);
    const [enterScore, changeEnterScore] = useState(false);
    const [gameActive, changeGameActive] = useState(false);

    const [snakeNode, changeSnakeNode] = useState(<React.Fragment/>);

    const scoreInputRef: RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
    const [scoreSubmitTouched, changeScoreSubmitTouched] = useState(false);
    const [scoreSubmitError, changeScoreSubmitError] = useState("Enter between 1 and 3 characters.");

    /**
     * ****************************************************************************************************
     * Handle state changes
     * ****************************************************************************************************
     */

    const endGame = useCallback((): void => {
        if (gameVisible && gameActive && !enterScore) {
            console.log("Use callback");
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

    async function startGame(): Promise<void> {
        if (gameVisible && !gameActive && gamePlayable) {
            await dispatch(changeScore(0));
            changeGameActive(true);
        }
    }

    function endScoreSubmit(): void {
        if (gameVisible && gameActive && enterScore) {
            changeGameActive(false);
            changeEnterScore(false);
        }
    }

    /**
     * ****************************************************************************************************
     * Score input functions
     * ****************************************************************************************************
     */

    function scoreInputChange(): void {
        if (scoreInputRef && scoreInputRef.current) {
            const val: string = scoreInputRef.current.value;
            switch (val.toUpperCase()) {

                case "":
                    changeScoreSubmitError("Enter between 1 and 3 characters.");
                    break;

                case "FUK":
                case "FCK":
                case "FUC":
                case "NIG":
                case "NGR":
                case "NGA":
                    changeScoreSubmitError("Invalid name.");
                    break;

                default:
                    changeScoreSubmitError("");
                    break;

            }
        }
    }

    async function scoreSubmitClick(): Promise<void> {
        changeScoreSubmitTouched(true);
        if (scoreSubmitError === "" && scoreInputRef && scoreInputRef.current) {
            await dispatch(submitScore(scoreInputRef.current.value));
            endScoreSubmit();
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

    const scoreDisplayClasses: string =
        "snake-score-display " +
        "font-primary text-white " +
        "mt-2 mt-md-4 ml-lg-4 my-lg-5 ";
    
    const scoreDisplayInnerClasses: string =
        "snake-score-display-inner " +
        "py-2 px-2 px-sm-0 " +
        "font-size-075 font-size-sm-09 font-size-md-1 ";

    const scoreInputClasses: string =
        "snake-enter-score-input " +
        "font-primary text-white text-uppercase " +
        "width-10em p-2 px-3 ";

    const scoreButtonClasses: string =
        "btn button-link " +
        "font-primary text-white " +
        "p-1 px-2 mr-2 ";

    const snakeScore: ReactNode = (
        <div className="font-primary text-white font-size-15 snake-score m-3 px-2">
            {snakeStore && snakeStore.score}
        </div>
    );

    const scoreDisplay: ReactNode = (
        <div className={scoreDisplayClasses}>
            <div className={scoreDisplayInnerClasses}>
                {snakeStore && snakeStore.allScores.slice(0, 10).map((s, index) => (
                    <p key={"snake-score-" + index} className="mx-2 mx-sm-3">
                        <span style={{color: "#a0a0a0"}}>{s.name}:</span> <span>{s.score}</span>
                    </p>
                ))}
            </div>
        </div>
    );

    const enterScoreNode: ReactNode = (
        <Modal show={enterScore} onHide={endScoreSubmit} className="snake-enter-score p-3" id="enter-score-modal" centered>
            <Modal.Body>
                <div className="spaced-row">
                    <input className={scoreInputClasses} maxLength={3} placeholder="AAA" ref={scoreInputRef} onChange={scoreInputChange}/>
                    <button className={scoreButtonClasses} onClick={scoreSubmitClick}>OK</button>
                </div>
                {scoreSubmitTouched && scoreSubmitError !== "" &&
                    <p className="font-primary text-danger font-size-09 px-3 py-2">{scoreSubmitError}</p>
                }
            </Modal.Body>
        </Modal>
    );

    return (
        <React.Fragment>

            {enterScoreNode}
                
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
