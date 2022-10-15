import React, { useEffect, useRef, useState } from 'react';
import { Colors } from '../../models/Colors';
import { Player } from '../../models/Player';

import './timer.css';

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const TimerComponent: React.FC<TimerProps> = ({currentPlayer, restart}) => {
  const [whiteTime, setWhiteTime] = useState(300);
  const [blackTime, setBlackTime] = useState(300);
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
    setWhiteTime(300);
    setBlackTime(300);
    restart();
    setRestartButtonPressed(prev => !prev)
    setTimeout(() => {
      setRestartButtonPressed(prev => !prev)
    }, 300);
  }

  function handleStartStop() {
    setStart(prev => !prev);
    setStartButtonPressed(prev => !prev);
    setTimeout(() => {
      setStartButtonPressed(prev => !prev)
    }, 300);
  }

  let startClazz = `timer-button ${startButtonPressed ? 'pressed' : ''}`;
  let restartClazz = `timer-button ${restartButtonPressed ? 'pressed' : ''}`;

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
        <h4>White: {whiteTime}</h4>
        <h4>Black: {blackTime}</h4>
      </div>
    </div>
  );
};

export default TimerComponent;