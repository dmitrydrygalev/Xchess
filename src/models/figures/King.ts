import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import Red from '../../assets/Rking.png';
import Yell from '../../assets/Yking.png';

export class King extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.img = color === Colors.BLACK ? Red : Yell;
        this.name = FigureNames.KING;
    };

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) return false;        

        if((target.y === this.cell.y + 1 || target.y === this.cell.y - 1) && 
            target.x === this.cell.x && 
            (this.cell.board.getCell(target.x, target.y).isEmpty() || this.cell.isEnemy(target))) 
            return true;        

        if((target.x === this.cell.x + 1 || target.x === this.cell.x - 1) && 
            target.y === this.cell.y && 
            (this.cell.board.getCell(target.x, target.y).isEmpty() || this.cell.isEnemy(target))) 
            return true;        
        
        if((((target.x === this.cell.x - 1 && target.y === this.cell.y - 1) || 
             (target.x === this.cell.x + 1 && target.y === this.cell.y + 1) ||
             (target.x === this.cell.x + 1 && target.y === this.cell.y - 1) || 
             (target.x === this.cell.x - 1 && target.y === this.cell.y + 1)) &&           
             (this.cell.board.getCell(target.x, target.y).isEmpty() || this.cell.isEnemy(target)))) 
                return true;     

        return false;
    };
};