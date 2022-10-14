import React from 'react';
import { Figure } from '../../models/figures/Figure';

import './lostFigures.css'

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

const LostFiguresComponent: React.FC<LostFiguresProps> = ({title, figures}) => {
  return (
    <div className='lost'>
      <h3 className='lost-title'>{title}</h3>
      <ul className='lost-list'>
        {figures.map(figure => (
          <li className='lost-item' key={figure.id}>
            <p className='lost-item__name'>{figure.name}</p> 
            {figure.logo && <img className='lost-item__logo' src={figure.logo} alt="Картинка фигуры"/>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LostFiguresComponent;