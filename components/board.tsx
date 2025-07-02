import { Square } from "./square"

interface BoardProps {
  xIsNext: boolean
  squares: (string | null)[]
  onPlay: (nextSquares: (string | null)[]) => void
}

export function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares).winner || squares[i]) {
      return
    }
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }
    onPlay(nextSquares)
  }

  const { winner, line } = calculateWinner(squares)
  let status
  if (winner) {
    status = "Winner: " + winner
  } else if (squares.every((square) => square !== null)) {
    status = "It's a draw!"
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`text-2xl font-bold p-4 rounded-lg ${
          winner ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
        }`}
      >
        {status}
      </div>
      <div className="grid grid-cols-3 gap-1 bg-gray-400 p-1 rounded-lg">
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} isWinning={line?.includes(i)} />
        ))}
      </div>
    </div>
  )
}

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] }
    }
  }
  return { winner: null, line: null }
}
