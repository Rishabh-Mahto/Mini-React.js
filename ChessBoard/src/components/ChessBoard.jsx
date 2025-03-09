import { useEffect, useState } from "react";
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

const pieces = ["Pawn", "Knight", "Bishop", "Rook", "Queen", "King"];

export default function ChessBoard() {
  const [selectedPiece, setSelectedPiece] = useState("");
  const [position, setPosition] = useState(null);
  const [validMoves, setValidMoves] = useState([]);

  function handleSquareClick(pos) {
    setPosition(pos);
  }

  // Recalculate valid moves when either the selected piece or the position changes.
  useEffect(() => {
    console.log("Position:", position);
    console.log("Selected Piece:", selectedPiece);
    if (selectedPiece && position) {
      calculateValidMoves();
    } else {
      setValidMoves([]);
    }
  }, [position, selectedPiece]);

  // Calculate valid moves for a given piece.
  function calculateValidMoves() {
    if (!position) return;
    const [row, col] = position.split("-").map(Number);
    let moves = [];

    switch (selectedPiece) {
      case "Pawn": {
        if (row > 0) {
          moves.push(`${row - 1}-${col}`);
          if (row === 6) {
            moves.push(`${row - 2}-${col}`);
          }
          if (col > 0) moves.push(`${row - 1}-${col - 1}`);
          if (col < 7) moves.push(`${row - 1}-${col + 1}`);
        }
        break;
      }
      case "Knight": {
        const knightOffsets = [
          [row - 2, col - 1],
          [row - 2, col + 1],
          [row - 1, col - 2],
          [row - 1, col + 2],
          [row + 1, col - 2],
          [row + 1, col + 2],
          [row + 2, col - 1],
          [row + 2, col + 1],
        ];
        knightOffsets.forEach(([r, c]) => {
          if (r >= 0 && r < 8 && c >= 0 && c < 8) {
            moves.push(`${r}-${c}`);
          }
        });
        break;
      }
      case "Bishop": {
        // Diagonals: top-left, top-right, bottom-left, bottom-right
        const directions = [
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1],
        ];
        directions.forEach(([dr, dc]) => {
          let r = row + dr;
          let c = col + dc;
          while (r >= 0 && r < 8 && c >= 0 && c < 8) {
            moves.push(`${r}-${c}`);
            r += dr;
            c += dc;
          }
        });
        break;
      }
      case "Rook": {
        // Vertical and horizontal moves
        const directions = [
          [-1, 0], // up
          [1, 0], // down
          [0, -1], // left
          [0, 1], // right
        ];
        directions.forEach(([dr, dc]) => {
          let r = row + dr;
          let c = col + dc;
          while (r >= 0 && r < 8 && c >= 0 && c < 8) {
            moves.push(`${r}-${c}`);
            r += dr;
            c += dc;
          }
        });
        break;
      }
      case "Queen": {
        // Combine Bishop and Rook moves
        // Diagonals (Bishop)
        const bishopDirections = [
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1],
        ];
        bishopDirections.forEach(([dr, dc]) => {
          let r = row + dr;
          let c = col + dc;
          while (r >= 0 && r < 8 && c >= 0 && c < 8) {
            moves.push(`${r}-${c}`);
            r += dr;
            c += dc;
          }
        });
        // Straights (Rook)
        const rookDirections = [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ];
        rookDirections.forEach(([dr, dc]) => {
          let r = row + dr;
          let c = col + dc;
          while (r >= 0 && r < 8 && c >= 0 && c < 8) {
            moves.push(`${r}-${c}`);
            r += dr;
            c += dc;
          }
        });
        break;
      }
      case "King": {
        // One square in any direction
        const kingMoves = [
          [row - 1, col - 1],
          [row - 1, col],
          [row - 1, col + 1],
          [row, col - 1],
          [row, col + 1],
          [row + 1, col - 1],
          [row + 1, col],
          [row + 1, col + 1],
        ];
        kingMoves.forEach(([r, c]) => {
          if (r >= 0 && r < 8 && c >= 0 && c < 8) {
            moves.push(`${r}-${c}`);
          }
        });
        break;
      }
      default:
        break;
    }

    setValidMoves(moves);
  }

  // Render the chess board and highlight squares that are valid moves.
  const renderBoard = () => {
    const squares = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isWhite = (row + col) % 2 === 0;
        const pos = `${row}-${col}`;
        const isValid = validMoves.includes(pos);
        squares.push(
          <div
            key={pos}
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: isValid
                ? "#90ee90"
                : isWhite
                ? "#E7ECEF"
                : "#274C77",
              border: "1px solid #274C77",
              boxSizing: "border-box",
              display: "inline-block",
              cursor: "pointer",
            }}
            onClick={() => handleSquareClick(pos)}
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
        <select
          onChange={(e) => {
            setSelectedPiece(e.target.value);
          }}
          defaultValue=""
        >
          <option value="">Select a piece</option>
          {pieces.map((piece) => (
            <option key={piece} value={piece}>
              {piece}
            </option>
          ))}
        </select>
      </DropdownStyle>
    </div>
  );
}
