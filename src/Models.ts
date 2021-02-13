export class Position {
    constructor(public posX: number, public posY: number) { }

    public positionsEqual = (right: Position): boolean => {
        return this.posX === right.posX && this.posY === right.posY;
    };
}

export enum Keys {
    LEFT = 'left',
    UP = 'up',
    RIGHT = 'right',
    DOWN = 'down'
}

export interface ISize {
    width: number;
    height: number;
}

export interface ICanvasSize extends ISize {
    blockSize: number;
}

export class ColoredDot extends Position {
    constructor(posX: number, posY: number, public color: string) {
        super(posX, posY);
    }
}
