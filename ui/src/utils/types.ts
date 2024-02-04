export type Position = {
  x: number
  y: number
  player: 0 | 1 | 2 // 0: empty position, 1: white player, 2: black player
}

export type Board = { grid: Position[][]; halfMove: number }

enum LobbyTabs {
  QuickGame = 'Quick game',
  Lobby = 'Lobby',
  Correspondence = 'Correspondence',
}

enum Player {
  White = 1,
  Black = 2,
}

enum Result {
  Draw = 0.5,
  WhiteWin = 1,
  BlackWin = 2,
}

export interface MsgPayload {
  action: 'move' | 'game_over' | 'watching' | 'game_chat'
  userID: number
  board: Board
  result: Result
}

export { LobbyTabs, Player, Result }
