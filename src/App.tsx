import { useEffect, useState } from 'react';

import BoardComponent from './components/BoardComponent/BoardComponent';
import LoseModalComponent from './components/LoseModalComponent/LoseModalComponent';

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
  const [whiteTime, setWhiteTime] = useState(5);
  const [blackTime, setBlackTime] = useState(5);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer)
  }, [])

  console.log('render')

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard)
    setCurrentPlayer(whitePlayer);
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className="app">
      <h3 className='app-player'>
        <span className='app-player__color'>{currentPlayer?.color}</span> Player turn
      </h3>
      <div className='app-wrapper'>
        <LostFiguresComponent 
          title="Black figures" 
          figures={board.lostBlackFigures}
        />
        <BoardComponent 
          board={board} 
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
        />  
        <LostFiguresComponent 
          title="White figures" 
          figures={board.lostWhiteFigures} 
        />
      </div>
      <TimerComponent 
        whiteTime={whiteTime} 
        blackTime={blackTime} 
        setWhiteTime={setWhiteTime} 
        setBlackTime={setBlackTime} 
        currentPlayer={currentPlayer} 
        whitePlayer={whitePlayer}
        restart={restart} 
        setCurrentPlayer={setCurrentPlayer}
      />
      <LoseModalComponent 
        setWhiteTime={setWhiteTime} 
        setBlackTime={setBlackTime} 
        whiteTime={whiteTime} 
        blackTime={blackTime} 
        currentPlayer={currentPlayer} 
        restart={restart} 
      />
    </div>
  );
}

export default App;
