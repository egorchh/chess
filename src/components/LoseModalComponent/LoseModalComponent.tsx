import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Player } from '../../models/Player';

import gif from '../../assets/chess-gif.gif'

import './loseModal.css'

interface LoseModalProps {
  restart: () => void;
  blackTime: number;
  whiteTime: number;
  setWhiteTime: Dispatch<SetStateAction<number>>;
  setBlackTime: Dispatch<SetStateAction<number>>;
} 

const LoseModalComponent: React.FC<LoseModalProps> = ({restart, whiteTime, blackTime, setWhiteTime, setBlackTime}) => {
  const [close, setClose] = useState(true);
  const [closeButtonPressed, setCloseButtonPressed] = useState(false);
  const [restartButtonPressed, setRestartButtonPressed] = useState(false);
  const [winner, setWinner] = useState('');

  const closeHandler = () => {
    setTimeout(() => {
      setCloseButtonPressed(prev => !prev)
    }, 300);
    setCloseButtonPressed(prev => !prev)
    setTimeout(() => {
      setClose(prev => !prev)
    }, 600);
  }

  const handleRestart = () => {
    restart();
    setWhiteTime(300);
    setBlackTime(300);
    setTimeout(() => {
      setRestartButtonPressed(prev => !prev)
    }, 300);
    setRestartButtonPressed(prev => !prev)
    setTimeout(() => {
      setClose(prev => !prev)
    }, 600);
  }

  useEffect(() => {
    if (whiteTime === 0) {
      setClose(false)
      setWinner('black')
    } else if (blackTime === 0) {
      setClose(false)
      setWinner('white')
    }
  }, [whiteTime, blackTime])

  const closeClazz = close ? {display: 'none'} : {display: 'flex'}
  const closeButtonClazz = `button lose-button ${closeButtonPressed ? 'pressed' : ''}`;
  const restartButtonClazz = `button lose-button ${restartButtonPressed ? 'pressed' : ''}`;

  return (
    <div style={closeClazz} className='lose'>
      <div className="lose-modal">
        <p className='lose-alert'>Поздравляем, игрок {winner} победил!</p>
        <p className='lose-descr'>Вражеский король был захвачен =(</p>
        <img className="lose-gif" src={gif} alt="Гиф-изображение шахматного поля" />
        <div className='lose-wrapper__buttons'>
          <button
            onClick={closeHandler}
            className={closeButtonClazz}
          >
            Close modal
          </button>
          <button
            onClick={handleRestart}
            className={restartButtonClazz}
          >
            Restart game
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoseModalComponent;