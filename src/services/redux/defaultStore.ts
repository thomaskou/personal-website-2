import InitialSnakeStore, { ISnakeStore } from "./snake/InitialSnakeStore";

export interface IStore {
    snakeStore: ISnakeStore;
}

export default {
    snakeStore: InitialSnakeStore,
} as IStore;