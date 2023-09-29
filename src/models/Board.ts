import { Cell } from "./Cell"
import { Colors } from "./Colors";
import { Queen } from '../models/figures/Queen';
import { Pawn } from "./figures/Pawn";
import { King } from "./figures/King";
import { Officer } from "./figures/Officer";
import { Horse } from "./figures/Horse";
import { Tower } from "./figures/Tower";
import { Figure } from "./figures/Figure";

export class Board {
    cells: Cell[][] = [];
    lostBlackFigures: Figure[] = [];
    lostWhiteFigures: Figure[] = [];

    private addPawns() {
        for(let i=0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCell(i, 1));
            new Pawn(Colors.WHITE, this.getCell(i, 6));
        };
    };

    private addQueens() {
        new Queen(Colors.BLACK, this.getCell(3, 0));
        new Queen(Colors.WHITE, this.getCell(3, 7));
        
    };

    private addKings() {
        new King(Colors.BLACK, this.getCell(4, 0));
        new King(Colors.WHITE, this.getCell(4, 7));
    };

    private addOfficers() {
        new Officer(Colors.BLACK, this.getCell(2, 0));
        new Officer(Colors.WHITE, this.getCell(2, 7));
        new Officer(Colors.BLACK, this.getCell(5, 0));
        new Officer(Colors.WHITE, this.getCell(5, 7));                
    };

    private addHorses() {
        new Horse(Colors.BLACK, this.getCell(1, 0));
        new Horse(Colors.WHITE, this.getCell(1, 7));
        new Horse(Colors.BLACK, this.getCell(6, 0));
        new Horse(Colors.WHITE, this.getCell(6, 7));                   
    };

    private addTowers() {
        new Tower(Colors.BLACK, this.getCell(0, 0));
        new Tower(Colors.WHITE, this.getCell(0, 7));
        new Tower(Colors.BLACK, this.getCell(7, 0));
        new Tower(Colors.WHITE, this.getCell(7, 7));                   
    };

    public ininitCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 8; j++) {                
                if((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null));//Черные ячейки
                }
                else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null));//Белые ячейки
                };
            };
            this.cells.push(row);
        };
    };    

    public getCell(x: number, y: number) {
        return this.cells[y][x];
    };

    public addFigures() {
        this.addPawns();
        this.addKings();
        this.addQueens();
        this.addOfficers();
        this.addHorses();
        this.addTowers();
    };

    public illuminationCells(selectedCell: Cell | null, ) {
        for (let i =0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for(let j=0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target);
            };
        };
    };

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        return newBoard;
    };
};

