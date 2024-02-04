interface CreateTournament {
  name: string
  type: string
  variant: string
  timeControl: string
  time: string
  createdBy: number
}

interface Tournament {
  id: number
  name: string
  type: string
  variant: string
  timeControl: string
  time: string
  isRated: boolean
  isPrivate: boolean
  createdBy: number
  createdAt: string
}

interface TournamentStanding {
  tournamentId: number
  userId: number
  ranking: number
  score: number
  createdAt: string
}

export { CreateTournament, Tournament, TournamentStanding }
