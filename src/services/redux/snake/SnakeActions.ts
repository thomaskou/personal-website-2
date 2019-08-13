import { IAction } from "..";
import { snakeActionType } from "./SnakeReducer";
import { ICoords } from "./InitialSnakeStore";

export type ISnakeStartPayload = {
    width: number,
    height: number,
    startPos: ICoords,
};

export enum snakeDir {
    UP = "UP",
    DOWN = "DOWN",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
};

export async function startGame(width: number, height: number, startPos: ICoords): Promise<IAction<snakeActionType, ISnakeStartPayload>> {
    return {
        type: snakeActionType.START_GAME,
        payload: {width, height, startPos},
    };
}

export async function moveSnake(dir: snakeDir): Promise<IAction<snakeActionType, snakeDir>> {
    return {
        type: snakeActionType.MOVE,
        payload: dir,
    };
}
