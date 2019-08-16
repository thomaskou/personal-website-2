import React from "react";
import { connect } from "react-redux";
import { IStore } from "../../services/redux/defaultStore";
import { ISnakeStore } from "../../services/redux/snake/InitialSnakeStore";
import { getScores, changeScore, submitScore } from "../../services/redux/snake/SnakeActions";

interface IProps {
    dispatch?: any;
    snakeStore?: ISnakeStore;
}

const Test: React.FC<IProps> = (props: IProps): JSX.Element => {

    const {dispatch, snakeStore} = props;

    async function resetScore(): Promise<void> {
        await dispatch(changeScore(0));
    }
    async function incrementScore(): Promise<void> {
        await dispatch(changeScore((snakeStore as ISnakeStore).score + 100));
    }
    async function getScoresTest(): Promise<void> {
        await dispatch(getScores());
    }
    async function submitTestScore(): Promise<void> {
        await dispatch(submitScore("tst"));
    }

    return (
        <React.Fragment>
            <button onClick={resetScore}>Reset score</button>
            <button onClick={incrementScore}>Increment score</button>
            <button onClick={getScoresTest}>Get scores</button>
            <button onClick={submitTestScore}>Submit score</button>
        </React.Fragment>
    );
};

Test.defaultProps = {};

export default connect((store: IStore, props: IProps) => ({
    snakeStore: store.snakeStore,
    ...props,
}))(Test);
