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
        {name: "AAA", score: 12000},
        {name: "BBB", score: 5100},
        {name: "CCC", score: 9000},
        {name: "DDD", score: 80000},
        {name: "EEE", score: 69000},
        {name: "FFF", score: 4200},
        {name: "GGG", score: 42000},
        {name: "HHH", score: 1000},
    ];

    return {
        type: snakeActionType.GET_SCORES,
        payload: scores,
    };
}

export async function submitScore(name: string): Promise<IAction<snakeActionType, void>> {

    return {
        type: snakeActionType.SUBMIT_SCORE,
    };
}