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

  const timer = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    startTimer()
    // eslint-disable-next-line
  }, [currentPlayer])

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current)
    }

    const callback = currentPlayer?.color === Colors.WHITE ? decrenetWhiteTimer : decrenetBlackTimer

    timer.current = setInterval(callback, 1000)
  }

  function decrenetWhiteTimer() {
    setBlackTime(prev => prev - 1)
  }

  function decrenetBlackTimer() {
    setWhiteTime(prev => prev - 1)
  }

  const handleRestart = () => {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  }

  return (
    <div className='timer'>
      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div>
      <h4>Белые - {whiteTime}</h4>
      <h4>Черные - {blackTime}</h4>
    </div>
  );
};

export default TimerComponent;