//import React, { useState, useEffect } from "react";
import { useState, useEffect } from "react";

const BOARD_SIZE = 8;
const EMPTY = 0;
const BLACK = 1;
const WHITE = 2;

const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],          [0, 1],
  [1, -1], [1, 0], [1, 1],
];

function createInitialBoard() {
  const board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(EMPTY));
  board[3][3] = WHITE;
  board[3][4] = BLACK;
  board[4][3] = BLACK;
  board[4][4] = WHITE;
  return board;
}

function isValidMove(
  board: number[][],
  row: number,
  col: number,
  player: number
): boolean {
  if (board[row][col] !== EMPTY) return false;
  const opponent = player === BLACK ? WHITE : BLACK;

  for (const [dx, dy] of directions) {
    let x = row + dx;
    let y = col + dy;
    let foundOpponent = false;

    while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
      if (board[x][y] === opponent) {
        foundOpponent = true;
      } else if (board[x][y] === player && foundOpponent) {
        return true;
      } else {
        break;
      }
      x += dx;
      y += dy;
    }
  }
  return false;
}

function getValidMoves(board: number[][], player: number): [number, number][] {
  const moves: [number, number][] = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (isValidMove(board, i, j, player)) {
        moves.push([i, j]);
      }
    }
  }
  return moves;
}

function makeMove(
  board: number[][],
  row: number,
  col: number,
  player: number
): number[][] {
  const newBoard = board.map((row) => [...row]);
  newBoard[row][col] = player;
  const opponent = player === BLACK ? WHITE : BLACK;

  for (const [dx, dy] of directions) {
    let x = row + dx;
    let y = col + dy;
    const toFlip = [];

    while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
      if (newBoard[x][y] === opponent) {
        toFlip.push([x, y]);
      } else if (newBoard[x][y] === player) {
        for (const [fx, fy] of toFlip) newBoard[fx][fy] = player;
        break;
      } else {
        break;
      }
      x += dx;
      y += dy;
    }
  }
  return newBoard;
}

function countStones(board: number[][]): { black: number; white: number } {
  let black = 0, white = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell === BLACK) black++;
      if (cell === WHITE) white++;
    }
  }
  return { black, white };
}

function getBestMove(board: number[][], player: number): [number, number] {
  const validMoves = getValidMoves(board, player);
  let maxFlips = -1;
  let bestMove = validMoves[0];
  for (const [row, col] of validMoves) {
    const tempBoard = makeMove(board, row, col, player);
    const { white } = countStones(tempBoard);
    if (white > maxFlips) {
      maxFlips = white;
      bestMove = [row, col];
    }
  }
  return bestMove;
}

function OthelloBoard() {
  const [board, setBoard] = useState(createInitialBoard);
  const [currentPlayer, setCurrentPlayer] = useState(BLACK);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver || currentPlayer !== WHITE) return;
    const moves = getValidMoves(board, WHITE);
    if (moves.length === 0) {
      if (getValidMoves(board, BLACK).length === 0) {
        setGameOver(true);
      } else {
        setCurrentPlayer(BLACK);
      }
      return;
    }
    const [x, y] = getBestMove(board, WHITE);
    setTimeout(() => {
      const newBoard = makeMove(board, x, y, WHITE);
      setBoard(newBoard);
      if (getValidMoves(newBoard, BLACK).length === 0 && getValidMoves(newBoard, WHITE).length === 0) {
        setGameOver(true);
      } else {
        setCurrentPlayer(BLACK);
      }
    }, 500);
  }, [currentPlayer, board, gameOver]);

  const handleClick = (row: number, col: number) => {
    if (currentPlayer !== BLACK || gameOver) return;
    if (!isValidMove(board, row, col, BLACK)) return;
    const newBoard = makeMove(board, row, col, BLACK);
    setBoard(newBoard);
    if (getValidMoves(newBoard, WHITE).length === 0 && getValidMoves(newBoard, BLACK).length === 0) {
      setGameOver(true);
    } else {
      setCurrentPlayer(WHITE);
    }
  };

  const handleReset = () => {
    setBoard(createInitialBoard());
    setCurrentPlayer(BLACK);
    setGameOver(false);
  };

  const { black, white } = countStones(board);

  const renderCell = (value: number, row: number, col: number) => {
    let color = "bg-green-200";
    if (value === BLACK) color = "bg-black";
    if (value === WHITE) color = "bg-white";
    return (
      <div
        key={`${row}-${col}`}
        onClick={() => handleClick(row, col)}
        className={`w-10 h-10 border border-gray-400 flex items-center justify-center ${color} rounded-full cursor-pointer`}
      ></div>
    );
  };

  return (
    <div className="p-8">
      {/* <div className="text-red-500 text-xl mb-2">Tailwind 動いてる？</div> */}
      <h1 className="text-2xl font-bold mb-4">Othello Game</h1>
      <div className="mb-4 text-lg">
        <p>Black: {black} | White: {white}</p>
        {gameOver && (
          <p className="font-semibold text-red-600">
            Game Over! {black === white ? "Draw" : black > white ? "Black Wins!" : "White Wins!"}
          </p>
        )}
      </div>
      <div className="grid grid-cols-8 gap-1 mb-4">
        {board.flatMap((row, i) => row.map((cell, j) => renderCell(cell, i, j)))}
      </div>
      <button
        onClick={handleReset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reset Game
      </button>
    </div>
  );
}

export default OthelloBoard;
