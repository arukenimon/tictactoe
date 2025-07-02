"use client"

interface SquareProps {
  value: string | null
  onSquareClick: () => void
  isWinning?: boolean
}

export function Square({ value, onSquareClick, isWinning }: SquareProps) {
  return (
    <button
      className={`
        w-20 h-20 border-2 border-gray-400 text-4xl font-bold
        hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500
        transition-colors duration-200
        ${isWinning ? "bg-green-200 border-green-500" : "bg-white"}
      `}
      onClick={onSquareClick}
    >
      <span className={value === "X" ? "text-blue-600" : "text-red-600"}>{value}</span>
    </button>
  )
}
