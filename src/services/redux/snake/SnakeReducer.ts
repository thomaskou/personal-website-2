import InitialSnakeStore, {ISnakeStore} from "./InitialSnakeStore";
import {IAction} from "../index";
import cloneDeep from "lodash/cloneDeep";

export enum snakeActionType {
    MOVE_UP = "MOVE_UP",
    MOVE_DOWN = "MOVE_DOWN",
    MOVE_LEFT = "MOVE_LEFT",
    MOVE_RIGHT = "MOVE_RIGHT",
}

export default function(store: ISnakeStore = InitialSnakeStore, action: IAction<snakeActionType, any>): ISnakeStore {

    let newStore: ISnakeStore = cloneDeep(store);

    switch (action.type) {
        case snakeActionType.MOVE_UP:
            break;
        case snakeActionType.MOVE_DOWN:
            break;
        case snakeActionType.MOVE_LEFT:
            break;
        case snakeActionType.MOVE_RIGHT:
            break;
    }

    return newStore;

}
