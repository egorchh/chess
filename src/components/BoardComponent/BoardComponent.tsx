import React, { useEffect, useState } from "react";

import CellComponent from "../CellComponent/CellComponent";

import { Cell } from "../../models/Cell";
import { Board } from "../../models/Board";
import { Player } from "../../models/Player";

import './board.css'

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: React.FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if ( selectedCell &&
        selectedCell !== cell &&
        selectedCell.figure?.canMove(cell) ) {
      selectedCell.moveFigure(cell);
      swapPlayer()
      setSelectedCell(null)
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell)
      }
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
    <div className="board-wrapper">
      <h3>Ход игрока {currentPlayer?.color}</h3>
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
    </div>
    
  );
};

export default BoardComponent;