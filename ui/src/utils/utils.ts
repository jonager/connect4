import type { Position, Board } from './types'

const generateBoard = (width: number, height: number): Board => {
  const board: Board = {
    grid: [],
    halfMove: 0,
  }
  for (let i = 0; i < width; i++) {
    const row: Position[] = []
    for (let j = 0; j < height; j++) {
      row.push({ x: i, y: j, player: 0 })
    }
    board.grid.push(row)
  }

  return board
}

const checkIsLegal = (height: number, { x, y, player }: Position, { grid }: Board): boolean => {
  // check position played is empty
  if (player !== 0) return false

  // check position below position played is not empty
  if (y !== height - 1 && grid[x][y + 1].player == 0) {
    return false
  }

  return true
}

/**
 * check horizontal direction for a winner
 * @param Position last move coordinates
 * @param board current state of the board
 * @returns boolean, true if winner is found
 */
const checkHorizontal = ({ x, y, player }: Position, { grid }: Board): boolean => {
  let chain = 1

  // check left
  for (let i = x - 1; i >= 0; i--) {
    if (grid[i][y].player === player) {
      chain++
    } else break
  }

  // check right
  for (let i = x + 1; i < grid.length; i++) {
    if (grid[i][y].player === player) {
      chain++
    } else break
  }

  return chain >= 4
}

/**
 * check vertical direction for a winner
 * @param Position last move coordinates
 * @param board current state of the board
 * @returns boolean, true if winner is found
 */
const checkVertical = ({ x, y, player }: Position, { grid }: Board, height: number): boolean => {
  let chain = 1

  // check down
  for (let i = y + 1; i < height; i++) {
    if (grid[x][i].player === player) {
      chain++
    } else break
  }

  return chain >= 4
}

/**
 * check both diagonals(/) for a winner
 * @param Position last move coordinates
 * @param board current state of the board
 * @returns boolean, true if winner is found
 */
const checkDiagonalForward = ({ x, y, player }: Position, { grid }: Board, height: number): boolean => {
  let chain = 1

  // check / up & right
  for (let i = x + 1, j = y - 1; i < grid.length && j >= 0; i++, j--) {
    if (grid[i][j].player === player) {
      chain++
    } else break
  }

  // check / down & left
  for (let i = x - 1, j = y + 1; i >= 0 && j < height; i--, j++) {
    if (grid[i][j].player === player) {
      chain++
    } else break
  }

  return chain >= 4
}

/**
 * check both diagonals(\) for a winner
 * @param Position last move coordinates
 * @param board current state of the board
 * @returns boolean, true if winner is found
 */
const checkDiagonalBackward = ({ x, y, player }: Position, { grid }: Board, height: number): boolean => {
  let chain = 1

  // check \ up & left
  for (let i = x - 1, j = y - 1; i > 0 && j >= 0; i--, j--) {
    if (grid[i][j].player === player) {
      chain++
    } else break
  }

  // check \ down & right
  for (let i = x + 1, j = y + 1; i < grid.length && j < height; i++, j++) {
    if (grid[i][j].player === player) {
      chain++
    } else break
  }

  return chain >= 4
}

const checkIsWinner = (pos: Position, board: Board, height: number): boolean => {
  return (
    checkHorizontal(pos, board) ||
    checkVertical(pos, board, height) ||
    checkDiagonalForward(pos, board, height) ||
    checkDiagonalBackward(pos, board, height)
  )
}

// Validation utils

const validateLength = (min: number, max: number, value: string): boolean => {
  if (value.length < min || value.length > max) {
    return false
  }
  return true
}

const validateEmail = (email: string): boolean => {
  const regex =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/
  if (regex.test(email)) return true
  return false
}

export { generateBoard, checkIsLegal, checkIsWinner, validateLength, validateEmail }
