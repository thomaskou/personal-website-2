import React, { RefObject } from "react";
import { ReactNode } from "react";
import cloneDeep from "lodash/cloneDeep";

/**
 * ****************************************************************************************************
 * Interfaces and enums
 * ****************************************************************************************************
 */

interface ICoords {
    x: number;
    y: number;
}

enum SnakeDirections {
    UP      = "UP",
    DOWN    = "DOWN",
    LEFT    = "LEFT",
    RIGHT   = "RIGHT",
}

interface IProps {
    endGameCallback: () => void;
}

interface IState {
    grid: ReactNode[][];
}

interface IGame {
    w: number;
    h: number;

    snakeLength?: number;
    snake?: ICoords[];
    snakeDir?: SnakeDirections;

    occupied: boolean[];
    unoccupiedIndices?: number[];
    dot?: ICoords;
}

/**
 * ****************************************************************************************************
 * Utilities
 * ****************************************************************************************************
 */

function indexToCoords(index: number, width: number, height: number): ICoords {
    return {
        x: index % width,
        y: Math.floor(index / width),
    };
}

function coordsToIndex(coords: ICoords, width: number, height: number): number {
    return (coords.y * width) + (coords.x);
}

function recreateUnoccupiedIndices(occupied: boolean[]): number[] {
    const unoccupiedIndices: number[] = [];
    let i: number;
    for (i = 0; i < occupied.length; i++) {
        if (!occupied[i]) {
            unoccupiedIndices.push(i);
        }
    }
    return unoccupiedIndices;
}

function createNewGrid(occupied: boolean[], w: number, h: number): ReactNode[][] {
    const grid: ReactNode[][] = new Array(h);
    let g: number;
    for (g = 0; g < w; g++) {
        grid[g] = new Array(w);
    }

    let i: number;
    for (i = 0; i < occupied.length; i++) {
        const coords: ICoords = indexToCoords(i, w, h);
        grid[coords.x][coords.y] = (
            <div
                key={"snake-tile-" + i}
                className="snake-box-tile"
                style={{backgroundColor: occupied[i] ? "white" : "transparent"}}
            />
        );
    }
    return grid;
}

function randomUnoccupied(unoccupiedIndices: number[], width: number, height: number): ICoords {
    const arrayIndex: number = Math.floor(Math.random() * unoccupiedIndices.length);
    const unoccupiedIndex: number = unoccupiedIndices[arrayIndex];

    return indexToCoords(unoccupiedIndex, width, height);
}

class SnakeBox extends React.Component<IProps, IState> {

    /**
     * ****************************************************************************************************
     * Props, state, life-cycle methods
     * ****************************************************************************************************
     */

    private static defaultProps: IProps = {
        endGameCallback: () => {},
    };

    private readonly containerRef: RefObject<HTMLDivElement>;

    private playing: boolean;
    private game: IGame;

    constructor(props: IProps) {
        super(props);
        this.state = {
            grid: createNewGrid([false], 1, 1),
        };
        this.game = {
            w: 1,
            h: 1,
            occupied: [false],
        };
        this.containerRef = React.createRef();
        this.playing = false;
    }

    public componentDidMount(): void {
        document.addEventListener("keydown", this.pressKey);
        this.newGame();
    }

    public componentWillUnmount(): void {
        document.removeEventListener("keydown", this.pressKey);
        this.endGame();
    }

    /**
     * ****************************************************************************************************
     * Game methods
     * ****************************************************************************************************
     */

    private newGame = (): void => {
        while (!this.containerRef.current) {}

        const pixelWidth = this.containerRef.current.clientWidth;
        const pixelHeight = this.containerRef.current.clientHeight;

        const w = Math.round(pixelWidth / 16);
        const h = Math.round(pixelHeight / 16);

        const snakeLength = 5;
        const snake = [{
            x: Math.floor(w/2),
            y: Math.floor(h/2),
        }];
        const snakeDir = SnakeDirections.UP;

        const occupied = (new Array(w * h)).map(() => (false));
        occupied[coordsToIndex(snake[0], w, h)] = true;
        const unoccupiedIndices = recreateUnoccupiedIndices(occupied);
        const dot = randomUnoccupied(unoccupiedIndices, w, h);
        occupied[coordsToIndex(dot, w, h)] = true;

        const grid = createNewGrid(occupied, w, h);

        this.game = {
            w, h,
            snakeLength, snake, snakeDir,
            occupied, unoccupiedIndices, dot,
        };
        this.setState({grid}, this.startGame);
    };

    private startGame = (): void => {
        this.playing = true;
        setTimeout(this.tickGame, 50);
    };

    private setGrid = (index: number, coords: ICoords, on: boolean): void => {
        const {grid} = this.state;
        const {occupied, unoccupiedIndices} = this.game;

        if (unoccupiedIndices && grid) {
            if (on) {
                occupied[index] = true;
                unoccupiedIndices.splice(unoccupiedIndices.indexOf(index), 1);
                grid[coords.x][coords.y] = <div key={"snake-tile-" + index} className="snake-box-tile" style={{backgroundColor: "white"}}/>;
            } else {
                occupied[index] = false;
                unoccupiedIndices.push(index);
                grid[coords.x][coords.y] = <div key={"snake-tile-" + index} className="snake-box-tile" style={{backgroundColor: "transparent"}}/>;
            }
        }
        this.setState({grid});
    };

    private setGridIndex = (index: number, on: boolean): void => {
        const {w, h} = this.game;
        const coords = indexToCoords(index, w, h);
        this.setGrid(index, coords, on);
    };

    private setGridCoords = (coords: ICoords, on: boolean): void => {
        const {w, h} = this.game;
        const index = coordsToIndex(coords, w, h);
        this.setGrid(index, coords, on);
    };

    private pressKey = (event: any): void => {
        const currentDir = this.game.snakeDir;

        if (currentDir) {
            switch (event.key) {
                case "ArrowUp":
                    if (currentDir !== SnakeDirections.DOWN) {
                        this.game = ({...this.game, snakeDir: SnakeDirections.UP});
                    }
                    break;
                case "ArrowDown":
                    if (currentDir !== SnakeDirections.UP) {
                        this.game = ({...this.game, snakeDir: SnakeDirections.DOWN});
                    }
                    break;
                case "ArrowLeft":
                    if (currentDir !== SnakeDirections.RIGHT) {
                        this.game = ({...this.game, snakeDir: SnakeDirections.LEFT});
                    }
                    break;
                case "ArrowRight":
                    if (currentDir !== SnakeDirections.LEFT) {
                        this.game = ({...this.game, snakeDir: SnakeDirections.RIGHT});
                    }
                    break;
            }
        }
    };

    private moveSnake = (): void => {
        const {w, h, snake, snakeDir, occupied, unoccupiedIndices} = this.game;
        let {snakeLength, dot} = this.game;

        if (snakeLength && snake && snakeDir && unoccupiedIndices && dot) {

            let collectedDot: boolean = false;

            // Add new head coords to front of snake array
            let newHead = cloneDeep(snake[0]);
            switch (snakeDir) {
                case SnakeDirections.UP:    newHead.y--; break;
                case SnakeDirections.DOWN:  newHead.y++; break;
                case SnakeDirections.LEFT:  newHead.x--; break;
                case SnakeDirections.RIGHT: newHead.x++; break;
            }
            snake.unshift(newHead);

            // Check dot collision
            if (dot.x === newHead.x && dot.y === newHead.y) {
                snakeLength++;
                dot = randomUnoccupied(unoccupiedIndices, w, h);
                collectedDot = true;
                this.setGridCoords(dot, true);
            }

            // Check wall collision
            if (newHead.x < 0 || newHead.x >= w || newHead.y < 0 || newHead.y >= h) {
                this.endGame();
                return;
            }

            // Check self collision
            if (!collectedDot && occupied[coordsToIndex(newHead, w, h)]) {
                this.endGame();
                return;
            }

            // Continue after collision checks
            this.setGridCoords(newHead, true);

            // Check snake length
            if (snake.length > snakeLength) {
                let oldTail = snake[snake.length - 1];
                this.setGridCoords(oldTail, false);
                snake.pop();
            }

        }
        this.game = {...this.game, snakeLength, dot};
    };

    private tickGame = (): void => {
        if (this.playing) {
            this.moveSnake();
            setTimeout(this.tickGame, 50);
        } else {
            this.endGame();
        }
    };

    private endGame = (): void => {
        this.playing = false;
        // TODO: end game
    };

    /**
     * ****************************************************************************************************
     * Render methods
     * ****************************************************************************************************
     */

    private createSnakeBox = (): ReactNode => {
        const {grid} = this.state;

        return (
            <div className="snake-box" style={{color: "white"}}>
                {grid.map((col, j) => (
                    <div key={"snake-col-" + j} className="snake-box-col">
                        {col}
                    </div>
                ))}
            </div>
        );
    };

    public render(): ReactNode {
        const ele = this.createSnakeBox();

        return (
            <div
                className="w-100 h-100"
                ref={this.containerRef}
            >
                {ele}
            </div>
        );
    }

}

export default SnakeBox;
