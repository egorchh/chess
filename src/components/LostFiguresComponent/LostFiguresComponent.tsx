import React from 'react';
import { Figure} from '../../models/figures/Figure';

import './lostFigures.css'

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

export interface IFiguresNumber {
  pawns: number;
  bishops: number;
  knights: number;
  rooks: number;
  queen: number;
}

function countRepeatingFigures(figuresList: Figure[]): IFiguresNumber {;
  let pawnCounter = 0;
  let bishopCounter = 0;
  let knightCounter = 0;
  let rookCounter = 0;
  let queenCounter = 0;

  for (let i = 0; i < figuresList.length; i++) {;
    switch(figuresList[i].name) {
      case "Пешка":
        pawnCounter++;
        break;
      case "Слон":
        bishopCounter++;
        break;
      case "Конь":
        knightCounter++;
        break;
      case "Ладья":
        rookCounter++;
        break;
      case "Ферзь":
        queenCounter++;
        break;
      default:
    }
  };

  return {
    pawns: pawnCounter,
    bishops: bishopCounter,
    knights: knightCounter,
    rooks: rookCounter,
    queen: queenCounter
  }
}

const LostFiguresComponent: React.FC<LostFiguresProps> = ({title, figures}) => {

  function uniq(figures: Figure[]): Figure[] { 
    let result: any = {} 
    
    figures.map(el => { 
      result[el.name] = el;
    }) 
    
    return Object.values(result) 
  }

  const uniqueFigures: Figure[] = uniq(figures);

  // let uniqueFiguresNames = new Set(figures.map((figure) => figure.name));

  return (
    <div className='lost'>
      <h3 className='lost-title'>{title}</h3>
      <ul className='lost-list'>
        {
          uniqueFigures.map(figure => {
            let figureCounter = 0

            switch(figure.name) {
              case "Пешка":
                figureCounter = countRepeatingFigures(figures).pawns;
                break;
              case "Слон":
                figureCounter = countRepeatingFigures(figures).bishops;
                break;
              case "Конь":
                figureCounter = countRepeatingFigures(figures).knights;
                break;
              case "Ладья":
                figureCounter = countRepeatingFigures(figures).rooks;
                break;
              case "Ферзь":
                figureCounter = countRepeatingFigures(figures).queen;
                break;
              default:
            }

            return (
              <li className='lost-item' key={figure.id}>
                {figure.logo && <img className='lost-item__logo' src={figure?.logo} alt="Картинка фигуры"/>}
                <p className='lost-item__number'>⨉ {figureCounter}</p> 
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default LostFiguresComponent;