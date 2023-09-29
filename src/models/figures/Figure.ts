import { Colors } from "../Colors";
import img from "../../assets/Ypawn.png"
import { Cell } from "../Cell";

export enum FigureNames {
    FIGURE = 'Фигура',
    KING = 'Король',
    PAWN = 'Пешка',
    QUEEN = 'Королева',
    OFFICER = 'Офицер',
    TOWER = 'Ладья',
    HORSE = 'Конь',
};

export class Figure {
    color: Colors;
    img: typeof img | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell
        this.cell.figure = this;
        this.img = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    };

    canMove(target: Cell) : boolean {
        if(target.figure?.color === this.color)  return false;
        if(target.figure?.name === FigureNames.KING) return false;
        return true;
    };

    moveFigure(target: Cell) {};

};