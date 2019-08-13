import InitialSnakeStore, {ISnakeStore} from "./InitialSnakeStore";
import {IAction} from "../index";
import cloneDeep from "lodash/cloneDeep";
import { ISnakeStartPayload, snakeDir } from "./SnakeActions";

export enum snakeActionType {
    START_GAME = "START_GAME",
    MOVE = "MOVE",
}

export default function(store: ISnakeStore = InitialSnakeStore, action: IAction<snakeActionType, ISnakeStartPayload | snakeDir>): ISnakeStore {

    let newStore: ISnakeStore = cloneDeep(store);

    switch (action.type) {

    }

    return newStore;

}
