export interface ICoords {
    x: number;
    y: number;
}

export interface ISnakeGame {
    width: number;
    height: number;
    snake: ICoords[];
    dot: ICoords;
    score: number;
}

export interface ISnakeScore {
    name: string;
    score: number;
}

export interface ISnakeStore {
    game?: ISnakeGame;
    allScores: ISnakeScore[];
}

export default {
    allScores: [],
} as ISnakeStore;
