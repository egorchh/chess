import React from 'react'

import { Cell } from "../../models/Cell";

import './cell.css'

interface CellProps {
  cell: Cell
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: React.FC<CellProps> = ({cell, selected, click}) => {
  return (
    <div
      className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
      onClick={() => click(cell)}
      style={{background: cell.figure && cell.available ? 'green' : ''}}
    >
      {!cell.figure && cell.available ? <div className="available"/> : null}
      {cell.figure?.logo && <img src={cell.figure.logo} alt="figure"/>}
    </div>
  );
};

export default CellComponent;