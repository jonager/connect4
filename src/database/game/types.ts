interface Game {
  id?: number
  variant: string
  timeControl: string
  time: string
  isRated: boolean
  white: number
  whiteRating: number
  whiteRatingAfter: number
  black: number
  blackRating: number
  blackRatingAfter: number
  result: string
  winnerId: number
  loserId: number
  moves: string
  tournamentId: number | null
  createdAt?: string
}

export { Game }
