import React, {FC, useEffect, useState} from 'react';
import { Board } from '../models/Board';
import CellCom from '../components/CellCom';
import { Cell } from '../models/Cell';
import { Player } from '../models/Player';


interface BoardProps {
    board: Board;// доска
    setBoard: (board: Board) => void;// функция инициализации новой доски
    currentPlayer: Player | null;// текущий игрок
    swapPlayer: () => void;// изменение текущего игрока игрока
};

const BoardCom: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);// состояние выбранной клетки

    function click(cell: Cell) {
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);            
        }
        else {
            if(cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            };            
        }               
    };// функция перемещения на выбранную клетку

    useEffect(() => {
        illuminationCells();
    }, [selectedCell]);

    function illuminationCells() {
        board.illuminationCells(selectedCell);
        updateBoard();
    };// функция подсветки фигур, которые находятся под атакой

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    };// функция по обнавлению доски

    return ( 
        <div>
            <h3>Сейчас ходят {currentPlayer?.color}</h3>
            <div className='board'>
                {board.cells.map((row, index) => 
                    <React.Fragment key={index}>
                        {row.map(cell =>
                            <CellCom
                                click={click}
                                cell={cell}
                                key={cell.id}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />                        
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}

export default BoardCom;