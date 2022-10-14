import { useEffect, useState } from 'react';

import BoardComponent from './components/BoardComponent/BoardComponent';

import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';

import './App.css';
import LostFiguresComponent from './components/LostFiguresComponent/LostFiguresComponent';
import TimerComponent from './components/TimerComponent/TimerComponent';



function App() {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)


  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer)
  }, [])

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard)
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }


  return (
    <div className="app">
      <div className='app-wrapper'>
        <LostFiguresComponent title="Черные фигуры" figures={board.lostBlackFigures}/>
        <BoardComponent 
          board={board} 
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
        />  
        <LostFiguresComponent title="Белые фигуры" figures={board.lostWhiteFigures}/>
      </div>
      <TimerComponent currentPlayer={currentPlayer} restart={restart} />
    </div>
  );
}

export default App;
