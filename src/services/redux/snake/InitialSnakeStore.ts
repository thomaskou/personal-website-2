export interface ISnakeScore {
    name: string;
    score: number;
}

export interface ISnakeStore {
    score: number;
    allScores: ISnakeScore[];
}

export default {
    score: 0,
    allScores: [],
} as ISnakeStore;
