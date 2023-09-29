import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import Red from '../../assets/Rhorse.png';
import Yell from '../../assets/Yhorse.png';

export class Horse extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.img = color === Colors.BLACK ? Red : Yell;
        this.name = FigureNames.HORSE;
    };

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) return false;

        const deltaX = Math.abs(this.cell.x - target.x);
        const deltaY = Math.abs(this.cell.y - target.y);

        return (deltaX === 1 && deltaY === 2) || (deltaX === 2 && deltaY === 1);
    };
};