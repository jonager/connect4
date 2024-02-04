import { writable } from 'svelte/store'
import { generateBoard } from '../utils/utils'
import type { Board, Position } from '../utils/types'

const playedBy = writable<0 | 1 | 2>(1)
const result = writable<0 | 0.5 | 1 | 2>(0)
const gameState = writable('') // a string representation of the moves played

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const createBoard = (width: number, height: number) => {
  const { subscribe, update } = writable(generateBoard(width, height))

  return {
    subscribe,
    updatePosition: (board: Board, position?: Position, playedBy?: 0 | 1 | 2) => {
      if (position && playedBy) {
        const { x, y } = position
        update(() => {
          board.grid[x][y].player = playedBy
          board.halfMove = board.halfMove + 1
          return board
        })
      }
      update(() => board)
    },
  }
}

export { createBoard, playedBy, result, gameState }
