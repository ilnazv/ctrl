import { Keys, Position, ColoredDot, ICanvasSize } from "./Models";
import { Worm } from "./Worm";
import { Snack } from "./Snack";
import { Canvas } from "./Canvas";

export class Game {
    private intervalId?: NodeJS.Timeout;
    private tick = 0;
    private snacks: Snack[] = [];
    private worm: Worm;
    private canvas: Canvas;

    private extraDots: Position[] = [];

    constructor(
        ctx: CanvasRenderingContext2D,
        canvasSizeinPx: ICanvasSize,
        private fps = 50
    ) {
        this.canvas = new Canvas(canvasSizeinPx.width, canvasSizeinPx.height, canvasSizeinPx.blockSize, ctx);

        this.worm = new Worm(this.canvas.getRandomPosition());

        this.initSnacks(1);
    }

    private initSnacks(snacksNumber: number): void {
        for (let index = 0; index < snacksNumber; index++) {
            this.snacks.push(Snack.newRandomly(this.worm.body, this.canvas));
        }
    }

    public start(random: boolean = false): void {
        this.intervalId = setInterval(() => {
            this.run(random);
        }, 1000 / this.fps);
    }

    public stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    private run(random: boolean): void {
        this.tick++;
        if (this.move(this.worm, this.worm.direction)) {
            this.draw();
        }
        if (this.worm.dead) {
            this.stop();
        }
    }

    private move(worm: Worm, direction: Keys): boolean {
        const newPosition = worm.nextPosition(direction);
        const possibleMove = this.checkNextMove(newPosition, worm);
        if (possibleMove) {
            for (let index = 0; index < this.snacks.length; index++) {
                this.checkSnack(worm, index, newPosition);
            }
            worm.headPosition = newPosition;
            return possibleMove;
        }
        return possibleMove;
    }

    private checkNextMove(headPosition: Position, worm: Worm): boolean {
        if (this.canvas.outOfCanvas(headPosition)) {
            return false;
        }
        const wormApproachedHimself = worm.checkHimself(headPosition, this.canvas.canvasSizeInBlocks);
        if (wormApproachedHimself) {
            return false;
        }
        return true;
    }

    private draw(): void {
        const dots: ColoredDot[] = [];
        for (let index = 0; index < this.worm.body.length; index++) {
            const element = this.worm.body[index];
            const color = this.worm.dead ? "burlywood" : "black";
            dots.push(new ColoredDot(element.posX, element.posY, color));
        }
        dots.push(new ColoredDot(this.worm.headPosition.posX, this.worm.headPosition.posY, "#965050"));
        for (let sI = 0; sI < this.snacks.length; sI++) {
            const snack = this.snacks[sI];
            const color = "#447144";
            dots.push(new ColoredDot(snack.posX, snack.posY, color));
        }
        dots.push(...(this.extraDots.map(x => new ColoredDot(
            x.posX,
            x.posY,
            "blue"
        ))));
        this.canvas.draw(dots);
    }

    private checkSnack(worm: Worm, index: number, headPosition: Position): void {
        const wormApproachedSnack = this.snacks[index].positionsEqual(headPosition);
        if (wormApproachedSnack) {
            worm.increaseSize();
            this.snacks[index] = Snack.newRandomly(this.worm.body, this.canvas);
        }
    }

    public handleKey(key: Keys): void {
        if (!Object.values(Keys).includes(key)) {
            return;
        }
        this.worm.direction = key;
    }
}
