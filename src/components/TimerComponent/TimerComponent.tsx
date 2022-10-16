import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Colors } from '../../models/Colors';
import { Player } from '../../models/Player';

import './timer.css';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
  setWhiteTime: Dispatch<SetStateAction<number>>;
  setBlackTime: Dispatch<SetStateAction<number>>;
  blackTime: number;
  whiteTime: number;
  setCurrentPlayer: Dispatch<SetStateAction<Player | null>>;
  whitePlayer: Player;
}

const TimerComponent: React.FC<TimerProps> = ({currentPlayer, restart, setWhiteTime, setBlackTime, blackTime, whiteTime, setCurrentPlayer, whitePlayer}) => {
  const [start, setStart] = useState(false);
  const [startButtonPressed, setStartButtonPressed] = useState(false);
  const [restartButtonPressed, setRestartButtonPressed] = useState(false);

  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (start) {
      startTimer(true);
    } else {
      startTimer(false);
    }
    // eslint-disable-next-line
  }, [currentPlayer, start])

  

  useEffect(() => {
    if (whiteTime === 0 || blackTime === 0) {
      timeIsUp();
    }
  }, [whiteTime, blackTime])

  function startTimer(bool: boolean) {
    if (timer.current) {
      clearInterval(timer.current)
    }

    const callback = currentPlayer?.color === Colors.WHITE ? decrenetWhiteTimer : decrenetBlackTimer

    if (bool) {
      timer.current = setInterval(callback, 1000)
    }
  }

  function decrenetWhiteTimer() {
    setWhiteTime(prev => prev - 1)
  }

  function decrenetBlackTimer() {
    setBlackTime(prev => prev - 1)
  }

  const handleRestart = () => {
    if (whiteTime !== 300 || blackTime !== 300) {
      setWhiteTime(300);
      setBlackTime(300);
      restart();
      setRestartButtonPressed(prev => !prev)
      setTimeout(() => {
        setRestartButtonPressed(prev => !prev)
      }, 300);
      setStart(false);
    } else {
      alert('Игра ещё не была начата ;(')
    }
  }

  function handleStartStop() {
    setStart(prev => !prev);
    setStartButtonPressed(prev => !prev);
    setTimeout(() => {
      setStartButtonPressed(prev => !prev)
    }, 300);
  }

  function timeIsUp() {
    setWhiteTime(300);
    setBlackTime(300);
    setStart(false);;
    restart();
    startTimer(false);
  }

  function secondsToMinutes(time: number): string {
    const seconds = time % 60;
    const minutes = Math.floor(time / 60);

    return `${getZeros(minutes)} min : ${getZeros(seconds)} sec`;
  }

  function getZeros(number: number): string {
    if (number >= 0 && number <= 9 ) {
      return `0${number}`;
    }

    return `${number}`;
  }

  let startClazz = `button ${startButtonPressed ? 'pressed' : ''}`;
  let restartClazz = `button ${restartButtonPressed ? 'pressed' : ''}`;

  return (
    <div className='timer'>
      <div className="timer-wrapper__buttons">
        <div className='timer-wrapper__button'>
          <button 
            className={startClazz}
            onClick={handleStartStop}
          >
            {start ? 'Stop game' : 'Start game'}
          </button>
        </div>
        <div className='timer-wrapper__button'>
          <button className={restartClazz} onClick={handleRestart}>Restart game</button>
        </div>
      </div>
      <div className="timer-wrapper__counters">
        <div>
          <p className='timer-side'>White:</p>
          <p className='timer-value'>{secondsToMinutes(whiteTime)}</p>
        </div>
        <div>
          <p className='timer-side'>Black:</p>
          <p className='timer-value'>{secondsToMinutes(blackTime)}</p>
        </div>
      </div>
    </div>
  );
};

export default TimerComponent;