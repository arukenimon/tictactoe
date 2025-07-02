"use client"

import { useState } from "react"
import { Board } from "./components/board"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TicTacToe() {
  const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove)
  }

  function resetGame() {
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
  }

  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      description = `Go to move #${move}`
    } else {
      description = "Go to game start"
    }
    return (
      <li key={move} className="mb-2">
        <Button
          variant={move === currentMove ? "default" : "outline"}
          size="sm"
          onClick={() => jumpTo(move)}
          className="w-full text-left justify-start"
        >
          {description}
        </Button>
      </li>
    )
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">Tic Tac Toe</h1>
          <p className="text-gray-600">Challenge a friend to a classic game!</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Game Board */}
          <div className="lg:col-span-2 flex justify-center">
            <Card className="p-6 shadow-xl">
              <CardContent className="p-0">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
              </CardContent>
            </Card>
          </div>

          {/* Game Info */}
          <div className="space-y-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Game History
                  <Button onClick={resetGame} variant="destructive" size="sm">
                    New Game
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-64 overflow-y-auto">
                  <ol className="list-none p-0">{moves}</ol>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>How to Play</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• Players take turns placing X's and O's</p>
                <p>• Get 3 in a row to win (horizontal, vertical, or diagonal)</p>
                <p>• Use the history to go back to previous moves</p>
                <p>• Click "New Game" to start over</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Game Stats</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">Current Move:</span> {currentMove}
                  </p>
                  <p>
                    <span className="font-semibold">Total Moves:</span> {history.length - 1}
                  </p>
                  <p>
                    <span className="font-semibold">Current Player:</span>
                    <span className={`ml-1 font-bold ${xIsNext ? "text-blue-600" : "text-red-600"}`}>
                      {xIsNext ? "X" : "O"}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
