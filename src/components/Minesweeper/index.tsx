import React, { useState, useCallback, useEffect } from 'react'
import MenuBar from '../RadixUI/MenuBar'

type CellState = {
    isMine: boolean
    isRevealed: boolean
    isFlagged: boolean
    adjacentMines: number
}

type GameState = 'playing' | 'won' | 'lost'
type Difficulty = 'beginner' | 'intermediate' | 'expert'

interface DifficultyConfig {
    rows: number
    cols: number
    mines: number
}

const DIFFICULTIES: Record<Difficulty, DifficultyConfig> = {
    beginner: { rows: 9, cols: 9, mines: 10 },
    intermediate: { rows: 16, cols: 16, mines: 40 },
    expert: { rows: 16, cols: 30, mines: 99 },
}

const DIFFICULTY_MULTIPLIERS: Record<Difficulty, number> = {
    beginner: 1,
    intermediate: 2,
    expert: 3,
}

const NUMBER_COLORS: Record<number, string> = {
    1: '#0000FF', // Blue
    2: '#008000', // Green
    3: '#FF0000', // Red
    4: '#000080', // Dark Blue
    5: '#800000', // Maroon
    6: '#008080', // Teal
    7: '#000000', // Black
    8: '#808080', // Gray
}

interface MinesweeperProps {
    initialDifficulty?: Difficulty
}

export default function Minesweeper({ initialDifficulty = 'beginner' }: MinesweeperProps) {
    const [difficulty] = useState<Difficulty>('beginner') // Locked to beginner
    const [board, setBoard] = useState<CellState[][]>([])
    const [gameState, setGameState] = useState<GameState>('playing')
    const [flagCount, setFlagCount] = useState(0)
    const [time, setTime] = useState(0)
    const [isFirstClick, setIsFirstClick] = useState(true)
    const [isMouseDown, setIsMouseDown] = useState(false)

    const config = DIFFICULTIES[difficulty]

    // Initialize board
    const initializeBoard = useCallback(
        (excludeRow?: number, excludeCol?: number) => {
            const { rows, cols, mines } = config

            // Create empty board
            const newBoard: CellState[][] = Array(rows)
                .fill(null)
                .map(() =>
                    Array(cols)
                        .fill(null)
                        .map(() => ({
                            isMine: false,
                            isRevealed: false,
                            isFlagged: false,
                            adjacentMines: 0,
                        }))
                )

            // Place mines randomly, avoiding the first clicked cell and its neighbors
            let minesPlaced = 0
            while (minesPlaced < mines) {
                const row = Math.floor(Math.random() * rows)
                const col = Math.floor(Math.random() * cols)

                // Skip if already a mine
                if (newBoard[row][col].isMine) continue

                // Skip if this is the excluded cell or its neighbors (for first click safety)
                if (excludeRow !== undefined && excludeCol !== undefined) {
                    const isExcluded = Math.abs(row - excludeRow) <= 1 && Math.abs(col - excludeCol) <= 1
                    if (isExcluded) continue
                }

                newBoard[row][col].isMine = true
                minesPlaced++
            }

            // Calculate adjacent mines for each cell
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    if (newBoard[row][col].isMine) continue

                    let count = 0
                    for (let dr = -1; dr <= 1; dr++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            const newRow = row + dr
                            const newCol = col + dc
                            if (
                                newRow >= 0 &&
                                newRow < rows &&
                                newCol >= 0 &&
                                newCol < cols &&
                                newBoard[newRow][newCol].isMine
                            ) {
                                count++
                            }
                        }
                    }
                    newBoard[row][col].adjacentMines = count
                }
            }

            return newBoard
        },
        [config]
    )

    // Start new game
    const newGame = useCallback(() => {
        setBoard(initializeBoard())
        setGameState('playing')
        setFlagCount(0)
        setTime(0)
        setIsFirstClick(true)
    }, [initializeBoard])

    // Initialize on mount and difficulty change
    useEffect(() => {
        newGame()
    }, [difficulty])

    // Timer
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (gameState === 'playing' && !isFirstClick) {
            interval = setInterval(() => {
                setTime((t) => Math.min(t + 1, 999))
            }, 1000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [gameState, isFirstClick])

    // Check for win
    const checkWin = useCallback(
        (currentBoard: CellState[][]) => {
            const { rows, cols, mines } = config
            let revealedCount = 0

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    if (currentBoard[row][col].isRevealed) {
                        revealedCount++
                    }
                }
            }

            return revealedCount === rows * cols - mines
        },
        [config]
    )

    // Reveal cell
    const revealCell = useCallback(
        (row: number, col: number) => {
            if (gameState !== 'playing') return

            let currentBoard = board

            // Handle first click - regenerate board if needed
            if (isFirstClick) {
                currentBoard = initializeBoard(row, col)
                setIsFirstClick(false)
            }

            const cell = currentBoard[row][col]
            if (cell.isRevealed || cell.isFlagged) return

            // If clicked on mine, game over
            if (cell.isMine) {
                // Reveal all mines
                const newBoard = currentBoard.map((r) =>
                    r.map((c) => ({
                        ...c,
                        isRevealed: c.isMine ? true : c.isRevealed,
                    }))
                )
                setBoard(newBoard)
                setGameState('lost')
                return
            }

            // Flood fill for empty cells
            const newBoard = currentBoard.map((r) => r.map((c) => ({ ...c })))
            const stack: [number, number][] = [[row, col]]
            const visited = new Set<string>()

            while (stack.length > 0) {
                const [r, c] = stack.pop()!
                const key = `${r},${c}`

                if (visited.has(key)) continue
                visited.add(key)

                if (r < 0 || r >= config.rows || c < 0 || c >= config.cols) continue

                const currentCell = newBoard[r][c]
                if (currentCell.isRevealed || currentCell.isFlagged || currentCell.isMine) continue

                currentCell.isRevealed = true

                // If empty cell (no adjacent mines), reveal neighbors
                if (currentCell.adjacentMines === 0) {
                    for (let dr = -1; dr <= 1; dr++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            if (dr === 0 && dc === 0) continue
                            stack.push([r + dr, c + dc])
                        }
                    }
                }
            }

            setBoard(newBoard)

            // Check for win
            if (checkWin(newBoard)) {
                setGameState('won')
            }
        },
        [board, gameState, isFirstClick, initializeBoard, config, checkWin]
    )

    // Toggle flag
    const toggleFlag = useCallback(
        (row: number, col: number, e: React.MouseEvent) => {
            e.preventDefault()
            if (gameState !== 'playing') return

            const cell = board[row][col]
            if (cell.isRevealed) return

            const newBoard = board.map((r) => r.map((c) => ({ ...c })))
            newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged

            setBoard(newBoard)
            setFlagCount((prev) => (newBoard[row][col].isFlagged ? prev + 1 : prev - 1))
        },
        [board, gameState]
    )

    // Chord (reveal neighbors when clicking on revealed number with correct flags)
    const chord = useCallback(
        (row: number, col: number) => {
            if (gameState !== 'playing') return

            const cell = board[row][col]
            if (!cell.isRevealed || cell.adjacentMines === 0) return

            // Count adjacent flags
            let flaggedCount = 0
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    const newRow = row + dr
                    const newCol = col + dc
                    if (
                        newRow >= 0 &&
                        newRow < config.rows &&
                        newCol >= 0 &&
                        newCol < config.cols &&
                        board[newRow][newCol].isFlagged
                    ) {
                        flaggedCount++
                    }
                }
            }

            if (flaggedCount !== cell.adjacentMines) return

            // Reveal all unflagged neighbors
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue
                    const newRow = row + dr
                    const newCol = col + dc
                    if (
                        newRow >= 0 &&
                        newRow < config.rows &&
                        newCol >= 0 &&
                        newCol < config.cols &&
                        !board[newRow][newCol].isFlagged
                    ) {
                        revealCell(newRow, newCol)
                    }
                }
            }
        },
        [board, gameState, config, revealCell]
    )

    // Handle cell click
    const handleCellClick = useCallback(
        (row: number, col: number, e: React.MouseEvent) => {
            if (e.button === 0) {
                // Left click
                if (board[row][col].isRevealed) {
                    chord(row, col)
                } else {
                    revealCell(row, col)
                }
            }
        },
        [revealCell, chord, board]
    )

    // Format number for display (3 digits)
    const formatNumber = (num: number) => {
        return num.toString().padStart(3, '0')
    }

    // Get face emoji based on game state
    const getFace = () => {
        if (gameState === 'won') return '😎'
        if (gameState === 'lost') return '😵'
        if (isMouseDown) return '😮'
        return '🙂'
    }

    // Menu items
    const menus = [
        {
            trigger: 'Game',
            items: [{ type: 'item' as const, label: 'New', shortcut: 'F2', onClick: newGame }],
        },
    ]

    // Keyboard shortcut for new game
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'F2') {
                e.preventDefault()
                newGame()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [newGame])

    return (
        <div className="flex flex-col h-full bg-[#c0c0c0]" style={{ fontFamily: 'Tahoma, sans-serif' }}>
            {/* Menu Bar */}
            <div className="bg-white border-b-2 border-[#dfdfdf] border-t-2 border-[#ffffff]">
                <MenuBar menus={menus} className="h-6" />
            </div>

            {/* Game container */}
            <div className="flex-1 flex items-center justify-center p-2">
                <div className="border-4 border-t-[#808080] border-l-[#808080] border-b-[#ffffff] border-r-[#ffffff] bg-[#c0c0c0]">
                    {/* Header with counters and face */}
                    <div className="flex justify-between items-center p-1.5 m-1.5 border-2 border-t-[#808080] border-l-[#808080] border-b-[#ffffff] border-r-[#ffffff]">
                        {/* Mine counter */}
                        <div
                            className="bg-black font-mono text-xl px-1 border border-[#808080]"
                            style={{ color: '#FF0000' }}
                        >
                            {formatNumber(config.mines - flagCount)}
                        </div>

                        {/* Face button */}
                        <button
                            onClick={newGame}
                            className="w-7 h-7 flex items-center justify-center text-lg border-2 border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] bg-[#c0c0c0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#ffffff] active:border-r-[#ffffff]"
                        >
                            {getFace()}
                        </button>

                        {/* Timer */}
                        <div
                            className="bg-black font-mono text-xl px-1 border border-[#808080]"
                            style={{ color: '#FF0000' }}
                        >
                            {formatNumber(time)}
                        </div>
                    </div>

                    {/* Game board */}
                    <div
                        className="m-1.5 border-4 border-t-[#808080] border-l-[#808080] border-b-[#ffffff] border-r-[#ffffff]"
                        onMouseDown={() => setIsMouseDown(true)}
                        onMouseUp={() => setIsMouseDown(false)}
                        onMouseLeave={() => setIsMouseDown(false)}
                    >
                        {board.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex">
                                {row.map((cell, colIndex) => (
                                    <button
                                        key={colIndex}
                                        className={`w-5 h-5 flex items-center justify-center text-xs font-bold border box-border ${
                                            cell.isRevealed
                                                ? 'bg-[#c0c0c0] border-[#808080] border-l-0 border-t-0'
                                                : 'border-2 border-t-[#ffffff] border-l-[#ffffff] border-b-[#808080] border-r-[#808080] bg-[#c0c0c0] hover:bg-[#d4d4d4]'
                                        }`}
                                        onClick={(e) => handleCellClick(rowIndex, colIndex, e)}
                                        onContextMenu={(e) => toggleFlag(rowIndex, colIndex, e)}
                                        disabled={gameState !== 'playing' && !cell.isMine}
                                    >
                                        {cell.isRevealed ? (
                                            cell.isMine ? (
                                                <span className="text-black">🦔</span>
                                            ) : cell.adjacentMines > 0 ? (
                                                <span style={{ color: NUMBER_COLORS[cell.adjacentMines] }}>
                                                    {cell.adjacentMines}
                                                </span>
                                            ) : null
                                        ) : cell.isFlagged ? (
                                            <span>🚩</span>
                                        ) : null}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Status bar */}
            <div className="h-6 bg-[#c0c0c0] border-t-2 border-[#ffffff] px-2 flex items-center text-xs">
                <span>
                    {gameState === 'won'
                        ? 'Congratulations! You win!'
                        : gameState === 'lost'
                        ? 'Game over! Try again.'
                        : `Mines: ${config.mines}`}
                </span>
            </div>
        </div>
    )
}
