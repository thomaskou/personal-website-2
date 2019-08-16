import InitialSnakeStore, {ISnakeStore, ISnakeScore} from "./InitialSnakeStore";
import {IAction} from "../index";
import axios from "axios";
import cloneDeep from "lodash/cloneDeep";
import urls from "../../utils/urls";

export enum snakeActionType {
    CHANGE_SCORE = "CHANGE_SCORE",
    GET_SCORES = "GET_SCORES",
    SUBMIT_SCORE = "SUBMIT_SCORE",
}

type snakePayloadType = number | ISnakeScore[] | string | void;

export default function(store: ISnakeStore = InitialSnakeStore, action: IAction<snakeActionType, snakePayloadType>): ISnakeStore {

    let newStore: ISnakeStore = cloneDeep(store);

    switch (action.type) {

        case snakeActionType.CHANGE_SCORE:
            newStore.score = action.payload as number;
            break;

        case snakeActionType.GET_SCORES:
            newStore.allScores = action.payload as ISnakeScore[];
            break;

        case snakeActionType.SUBMIT_SCORE:
            (async (): Promise<void> => {
                try {
                    await axios.post(urls.snakeScores, {
                        name: action.payload as string,
                        score: newStore.score,
                    });
                } catch (err) {
                    alert("An error occurred when submitting your score: " + err.message);
                }
            })();
            break;
            
    }

    return newStore;

}
