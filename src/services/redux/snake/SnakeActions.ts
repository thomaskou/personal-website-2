import { IAction } from "..";
import { snakeActionType } from "./SnakeReducer";
import { ISnakeScore } from "./InitialSnakeStore";

export async function changeScore(score: number): Promise<IAction<snakeActionType, number>> {
    return {
        type: snakeActionType.CHANGE_SCORE,
        payload: score,
    };
}

export async function getScores(): Promise<IAction<snakeActionType, ISnakeScore[]>> {

    const scores: ISnakeScore[] = [
        {name: "AAA", score: 100},
        {name: "BBB", score: 200},
        {name: "CCC", score: 300},
        {name: "DDD", score: 400},
        {name: "EEE", score: 500},
        {name: "FFF", score: 600},
    ];

    return {
        type: snakeActionType.GET_SCORES,
        payload: scores,
    };
}

export async function submitScore(): Promise<IAction<snakeActionType, void>> {
    return {
        type: snakeActionType.SUBMIT_SCORE,
    };
}