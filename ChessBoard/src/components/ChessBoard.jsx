import { useState } from "react";
import styled from "styled-components";

const BoardStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  border: 2px solid #274c77;
`;

const DropdownStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

export default function ChessBoard() {
  const [selectedPiece, setSelectedPiece] = useState(null);

  function handleSquareClick(position) {
    setSelectedPiece(position);
    console.log(selectedPiece);
  }

  function calculateValidMoves() {}

  const renderBoard = () => {
    const squares = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isWhite = (row + col) % 2 === 0;

        const position = `${row}-${col}`;

        squares.push(
          <div
            key={position}
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: isWhite ? "#E7ECEF" : "#274C77",
              border: "1px solid #274C77",
              boxSizing: "border-box",
              display: "inline-block",
              cursor: "pointer",
            }}
            onClick={() => handleSquareClick(position)}
          ></div>
        );
      }
    }
    return squares;
  };

  return (
    <div>
      <BoardStyle>{renderBoard()}</BoardStyle>
      <DropdownStyle>
        <select name="" id="">
          <option value="" onChange={(e) => console.log(e.target.value)}>
            Select a piece
          </option>
          <option value="pawn">Pawn</option>
          <option value="knight">Knight</option>
          <option value="bishop">Bishop</option>
          <option value="rook">Rook</option>
          <option value="queen">Queen</option>
          <option value="king">King</option>
        </select>
      </DropdownStyle>
    </div>
  );
}
