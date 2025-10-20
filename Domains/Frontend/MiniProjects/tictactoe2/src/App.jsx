import React, { useState, useEffect } from 'react';
import './App.css';
import Confetti from 'react-confetti';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const winnerInfo = calculateWinner(board);
  const isDraw = !winnerInfo && board.every((square) => square !== null);

  const handleClick = (index) => {
    if (board[index] || winnerInfo || isDraw) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setShowConfetti(false); // Reset confetti state
  };

  // Use useEffect to show confetti when there's a winner
  useEffect(() => {
    if (winnerInfo) {
      setShowConfetti(true);
    } else {
      setShowConfetti(false); // Ensure confetti is hidden if there's no winner
    }
  }, [winnerInfo]); // Run this effect when winnerInfo changes

  return (
    <div className="App">
      {showConfetti && <Confetti />}
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
            isWinningSquare={winnerInfo && winnerInfo.line && winnerInfo.line.includes(index)}
          />
        ))}
      </div>
      <div className="info">
        {winnerInfo ? (
          <h2>{`Winner: ${winnerInfo.winner}`}</h2>
        ) : isDraw ? (
          <h2>It's a Draw!</h2>
        ) : (
          <h2>{`Next Player: ${isXNext ? 'X' : 'O'}`}</h2>
        )}
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
};

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line }; // Return both winner and winning line
    }
  }

  return null;
};

export default App;
