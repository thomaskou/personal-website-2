import React, { RefObject } from "react";
import { ReactNode } from "react";
import { Swipeable } from "react-swipeable";
import cloneDeep from "lodash/cloneDeep";
import { connect } from "react-redux";
import { IStore } from "../../services/redux/defaultStore";
import { ISnakeStore } from "../../services/redux/snake/InitialSnakeStore";
import { changeScore } from "../../services/redux/snake/SnakeActions";

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
    dispatch?: any;
    snakeStore?: ISnakeStore;
    endGameCallback: () => void;
}

interface IState {
    grid: ReactNode[][];
    loss: boolean;
}

interface IGame {
    w: number;
    h: number;

    snakeLength?: number;
    snake?: ICoords[];
    snakeDir?: SnakeDirections;
    changingDir?: boolean;

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

function createNewGrid(occupied: boolean[], w: number, h: number, color: string = "white"): ReactNode[][] {
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
                style={{backgroundColor: occupied[i] ? color : "transparent"}}
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

    public static defaultProps: IProps = {
        endGameCallback: () => {},
    };

    private readonly containerRef: RefObject<HTMLDivElement>;

    private playing: boolean;
    private game: IGame;

    constructor(props: IProps) {
        super(props);
        this.state = {
            grid: createNewGrid([false], 1, 1),
            loss: false,
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
        this.setState({grid, loss: false}, this.startGame);
    };

    private startGame = (): void => {
        this.playing = true;
        setTimeout(this.tickGame, 30);
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

    private changeDir = (dir: SnakeDirections): void => {
        const currentDir = this.game.snakeDir;
        const changingDir = this.game.changingDir;

        if (!changingDir && currentDir) {
            this.game.changingDir = true;
            switch (dir) {
                case SnakeDirections.UP:
                    if (currentDir !== SnakeDirections.DOWN) {
                        this.game.snakeDir = dir;
                    }
                    break;
                case SnakeDirections.DOWN:
                    if (currentDir !== SnakeDirections.UP) {
                        this.game.snakeDir = dir;
                    }
                    break;
                case SnakeDirections.LEFT:
                    if (currentDir !== SnakeDirections.RIGHT) {
                        this.game.snakeDir = dir;
                    }
                    break;
                case SnakeDirections.RIGHT:
                    if (currentDir !== SnakeDirections.LEFT) {
                        this.game.snakeDir = dir;
                    }
                    break;
            }
        }
    }

    private pressKey = (event: any): void => {
        switch (event.key) {
            case "ArrowUp":     this.changeDir(SnakeDirections.UP);     break;
            case "ArrowDown":   this.changeDir(SnakeDirections.DOWN);   break;
            case "ArrowLeft":   this.changeDir(SnakeDirections.LEFT);   break;
            case "ArrowRight":  this.changeDir(SnakeDirections.RIGHT);  break;
        }
    };

    private onSwiped = (event: any): void => {
        switch (event.dir) {
            case "Up":      this.changeDir(SnakeDirections.UP);     break;
            case "Down":    this.changeDir(SnakeDirections.DOWN);   break;
            case "Left":    this.changeDir(SnakeDirections.LEFT);   break;
            case "Right":   this.changeDir(SnakeDirections.RIGHT);  break;
        }
    }

    private moveSnake = (): void => {
        const {dispatch, snakeStore} = this.props;
        const {w, h, snake, snakeDir, occupied, unoccupiedIndices} = this.game;
        let {snakeLength, dot} = this.game;

        if (snakeStore && snakeLength && snake && snakeDir && unoccupiedIndices && dot) {

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
                dispatch(changeScore(snakeStore.score + 100));
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
        this.game = {...this.game, snakeLength, dot, changingDir: false};
    };

    private tickGame = (): void => {
        if (this.playing) {
            this.moveSnake();
            setTimeout(this.tickGame, 30);
        } else {
            this.endGame();
        }
    };

    private endGame = (): void => {
        this.playing = false;
        this.setState({loss: true});
        setTimeout(this.props.endGameCallback, 200);
    };

    /**
     * ****************************************************************************************************
     * Render methods
     * ****************************************************************************************************
     */

    private createSnakeBox = (): ReactNode => {
        const {grid, loss} = this.state;
        const lossFilter = loss ? {filter: "brightness(0.5) sepia(1) hue-rotate(-50deg) saturate(10)"} : {};

        return (
            <div className="snake-box" style={lossFilter}>
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
            <React.Fragment>
                <div className="w-100 h-100" ref={this.containerRef}>{ele}</div>
                <Swipeable onSwiped={this.onSwiped} preventDefaultTouchmoveEvent={true} className="snake-swipeable"/>
            </React.Fragment>
        );
    }

}

export default connect((store: IStore, props: IProps) => ({
    snakeStore: store.snakeStore,
    ...props,
}))(SnakeBox);
