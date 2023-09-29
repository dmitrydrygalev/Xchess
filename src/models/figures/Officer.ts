import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import Red from '../../assets/Rofficer.png';
import Yell from '../../assets/Yofficer.png';

export class Officer extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.img = color === Colors.BLACK ? Red : Yell;
        this.name = FigureNames.OFFICER;
    };

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) return false;
        if(this.cell.isEmptyDio(target)) return true;
        return false;        
    };
};