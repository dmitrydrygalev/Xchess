import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean;// Регулирует то, может ли фигура двигаться
    id: number; // Для реакт ключей

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = Math.random();
    };

    isEmpty(): boolean {
        return this.figure === null;
    };

    isEnemy(target: Cell): boolean {
        if(target.figure) return this.figure?.color !== target.figure.color;
        return false;
    };

    isEmptyVer(target: Cell): boolean {
        if(this.x !== target.x) return false;

        const minCor = Math.min(this.y, target.y);
        const maxCor = Math.max(this.y, target.y);

        for(let y = minCor + 1;  y < maxCor; y++) {
            if(!this.board.getCell(this.x, y).isEmpty()) return false;
        };
        return true;
    };   

    isEmptyHor(target: Cell): boolean {
        if(this.y !== target.y) return false;

        const minCor = Math.min(this.x, target.x);
        const maxCor = Math.max(this.x, target.x);

        for(let x = minCor + 1;  x < maxCor; x++) {
            if(!this.board.getCell(x, this.y).isEmpty()) return false;
        };
        return true;
    };

    isEmptyDio(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);

        if(absY !== absX) return false;

        const directionY = this.y < target.y ? 1 : -1;
        const directionX = this.x < target.x ? 1 : -1;

        for(let i = 1; i < absY; i++) {
            if(!this.board.getCell(this.x + directionX*i, this.y + directionY*i).isEmpty()) return false;
        };
        return true;
    };

    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    };

    addLostFigure(figure: Figure) {
        figure.color === Colors.BLACK 
        ? this.board.lostBlackFigures.push(figure) 
        : this.board.lostWhiteFigures.push(figure);
    };

    moveFigure(target: Cell) {
        if(this.figure && this.figure?.canMove(target)) {
            this.figure.moveFigure(target);
            if(target.figure) this.addLostFigure(target.figure);            
            target.setFigure(this.figure);
            this.figure = null;
        };
    };
};