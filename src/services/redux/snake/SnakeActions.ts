import { IAction } from "..";
import { snakeActionType } from "./SnakeReducer";
import { ISnakeScore } from "./InitialSnakeStore";
import axios from "axios";
import values from "lodash/values";
import urls from "../../utils/urls";

export async function changeScore(score: number): Promise<IAction<snakeActionType, number>> {
    return {
        type: snakeActionType.CHANGE_SCORE,
        payload: score,
    };
}

export async function getScores(): Promise<IAction<snakeActionType, ISnakeScore[]>> {

    let scores: ISnakeScore[];
    try {
        scores = values((await axios.get(urls.snakeScores)).data)
            .sort((current, prev) => current.score - prev.score)
            .reverse()
            .slice(0, 8);
    } catch (err) {
        alert("An error occurred when getting scores: " + err.message);
        scores = [];
    }

    return {
        type: snakeActionType.GET_SCORES,
        payload: scores,
    };
}

export async function submitScore(name: string): Promise<IAction<snakeActionType, string>> {
    return {
        type: snakeActionType.SUBMIT_SCORE,
        payload: name,
    };
}