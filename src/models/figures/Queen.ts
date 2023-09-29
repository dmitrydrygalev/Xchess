import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import Red from '../../assets/Rqueen.png';
import Yell from '../../assets/Yqueen.png';

export class Queen extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.img = color === Colors.BLACK ? Red : Yell;
        this.name = FigureNames.QUEEN;
    };

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) return false;

        if(this.cell.isEmptyVer(target)) return true;
        if(this.cell.isEmptyHor(target)) return true; 
        if(this.cell.isEmptyDio(target)) return true;
        
        return false;       
    };
};