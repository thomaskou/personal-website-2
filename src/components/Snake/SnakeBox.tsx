import React, { CSSProperties, RefObject } from "react";
import { ReactNode } from "react";

/**
 * ****************************************************************************************************
 * Interfaces
 * ****************************************************************************************************
 */

interface ICoords {
    x: number;
    y: number;
}

interface IProps {
    endGameCallback: () => void;
}

interface IState {
    playing: boolean;

    w: number;
    h: number;

    snakeLength?: number;
    snake?: ICoords[];
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
    }

    private readonly containerRef: RefObject<HTMLDivElement>;

    constructor(props: IProps) {
        super(props);
        this.state = {
            playing: false,
            w: 1,
            h: 1,
            occupied: [false],
        };
        this.containerRef = React.createRef();
    }

    public componentDidMount(): void {
        this.newGame();
    }

    public componentWillUnmount(): void {
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
            x: Math.round(w/2),
            y: Math.round(h/2),
        }];

        const occupied = (new Array(w * h)).map(() => (false));
        occupied[coordsToIndex(snake[0], w, h)] = true;
        const unoccupiedIndices = recreateUnoccupiedIndices(occupied);
        const dot = randomUnoccupied(unoccupiedIndices, w, h);
        occupied[coordsToIndex(dot, w, h)] = true;

        this.setState({
            w, h, snakeLength, snake, occupied, unoccupiedIndices, dot,
        }, this.startGame);
    };

    private startGame = (): void => {
        this.setState({
            playing: true,
        }, () => {
            setTimeout(this.tickGame, 100);
        });
    };

    private tickGame = (): void => {
        if (this.state.playing) {
            setTimeout(this.tickGame, 100);
        } else {
            this.endGame();
        }
    };

    private endGame = (): void => {
        this.state = {
            ...this.state,
            playing: false,
        };
        // TODO: end game
    };

    /**
     * ****************************************************************************************************
     * Render methods
     * ****************************************************************************************************
     */

    private createSnakeBox = (): ReactNode => {
        const {w, h, occupied} = this.state;
        const color = "white";

        const offStyle: CSSProperties = {
            flex: 1,
        };
        const onStyle: CSSProperties = {
            flex: 1,
            backgroundColor: color,
        };

        const grid: ReactNode[][] = new Array(h);
        let g: number;
        for (g = 0; g < w; g++) {
            grid[g] = new Array(w);
        }

        let i: number;
        for (i = 0; i < occupied.length; i++) {
            const coords: ICoords = indexToCoords(i, w, h);
            if (occupied[i] === true) {
                grid[coords.x][coords.y] = <div key={"snake-tile-" + i} style={onStyle}/>;
            } else {
                grid[coords.x][coords.y] = <div key={"snake-tile-" + i} style={offStyle}/>;
            }
        }

        return (
            <div className="snake-box" style={{color}}>
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
