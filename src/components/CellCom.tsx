import React, {FC} from 'react';
import { Cell } from '../models/Cell';

interface CellProps {
    cell: Cell,
    selected: boolean,
    click: (cell: Cell) => void;
}

const CellCom: FC<CellProps> = ({cell, selected, click}) => {
    return ( 
        <div 
            className={['cell', cell.color, selected ? 'selected' : '',
            cell.available && cell.figure ? 'attack' : ''].join(' ')}
            onClick={() => click(cell)}            
            >
            {cell.available && !cell.figure && <div className={'available'}/>}
            
            {cell.figure?.img && <img src={cell.figure.img} alt=""/>}
        </div>
    );
}

export default CellCom;