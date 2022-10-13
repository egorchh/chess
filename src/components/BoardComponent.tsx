import React, { useEffect, useState } from "react";

import CellComponent from "./CellComponent";

import { Cell } from "../models/Cell";
import { Board } from "../models/Board";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: React.FC<BoardProps> = ({board, setBoard}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if ( selectedCell &&
        selectedCell !== cell &&
        selectedCell.figure?.canMove(cell) ) {
      selectedCell.moveFigure(cell);
      setSelectedCell(null)
    } else {
      setSelectedCell(cell)
    }  
  }

  useEffect(() => {
    highlightCells();
    // eslint-disable-next-line
  }, [selectedCell])

  function highlightCells() {
    board.highlightCells(selectedCell)
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard)
  } 

  return (
    <div className="board">
      {board.cells.map((row, index) => 
        <React.Fragment key={index}>
          {row.map(cell => 
            <CellComponent 
              key={cell.id}
              click={click}
              cell={cell}
              selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
            />
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default BoardComponent;