import CellComponent from "./CellComponent";

import { Board } from "../models/Board";
import React from "react";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: React.FC<BoardProps> = ({board, setBoard}) => {
  return (
    <div className="board">
      {board.cells.map((row, index) => 
        <React.Fragment key={index}>
          {row.map(cell => 
            <CellComponent 
              key={cell.id}
              cell={cell}
            />
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default BoardComponent;