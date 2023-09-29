import React, { useEffect, useState } from 'react';
import './App.css';
import BoardCom from './components/BoardCom';
import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import  LostFigures  from './components/LostFigures';
import Timer from './components/Timer';

function App() {

  const [board, setBoard] = useState(new Board());  
  const [playerW, setPlayerW] = useState(new Player(Colors.WHITE));
  const [playerB, setPlayerB] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  useEffect(() => {
      restart();
      setCurrentPlayer(playerW);
  }, []);
  
  return (
    <div className="app">
        <Timer
          restart={restart}
          currentPlayer={currentPlayer}
        />
        <BoardCom
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
        />
        <div>
          <LostFigures 
            title="Чёрные фигуры" 
            figures={board.lostBlackFigures} 
          />
          <LostFigures 
            title="Белые фигуры фигуры" 
            figures={board.lostWhiteFigures} 
          />
        </div>
    </div>
  );

  function restart() {
    const newBoard = new Board();
    newBoard.ininitCells();
    newBoard.addFigures()
    setBoard(newBoard);
  };

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? playerB : playerW);
  };

}

export default App;
