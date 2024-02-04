import { DB } from '..'
import { CreateTournament, Tournament, TournamentStanding } from './types'

const userQueries = {
  createTournament: async ({
    name,
    type,
    variant,
    timeControl,
    time,
    createdBy,
  }: CreateTournament): Promise<number> => {
    try {
      const [tournament] = await DB<{ id: number }[]>`
        INSERT
            INTO
            tournament(
            name,
            TYPE,
            variant,
            time_control,
            time,
            created_by)
        VALUES(
            ${name}, 
            ${type}, 
            ${variant}, 
            ${timeControl}, 
            ${time},
            ${createdBy}) 
        RETURNING id
    `
      return tournament?.id as number
    } catch (error) {
      throw new Error(`Error creating tournament: ${error}`)
    }
  },

  // Get all tournaments a user has participated in, order by most recent
  getUser: async (tournamentId: number): Promise<Tournament | null> => {
    try {
      const [tournament] = await DB<Tournament[]>`
        SELECT
            *
        FROM
            tournament
        WHERE
            id = ${tournamentId}
      `
      return tournament ?? null
    } catch (error) {
      throw new Error(`Error retrieving tournament: ${error}`)
    }
  },

  // Get all tournaments a user has participated in, order by most recent
  getUserTournaments: async (userId: number, limit = 20, offset = 0): Promise<Tournament | null> => {
    try {
      const [tournaments] = await DB<Tournament[]>`
        SELECT
            t.id,
            t.name,
            t.type,
            t.variant,
            t.time_control,
            t.time,
            t.is_rated ,
            t.is_private,
            t.created_by,
            t.created_at
        FROM
            tournament t
        INNER JOIN game g ON
            t.id = g.tournament_id
        WHERE 
            (g.white_player_id = ${userId}
            OR g.black_player_id = ${userId})
        LIMIT ${limit} OFFSET ${offset}
      `
      return tournaments ?? null
    } catch (error) {
      throw new Error(`Error retrieving tournaments: ${error}`)
    }
  },

  // Gets final standings for a tournament, ordered by top results
  getTournamentStandings: async (tournamentId: number): Promise<TournamentStanding | null> => {
    try {
      const [standings] = await DB<TournamentStanding[]>`
        SELECT 
            * 
        FROM
            tournament_standing
        WHERE
            tournament_id = ${tournamentId}
        ORDER BY
            ranking
      `
      return standings ?? null
    } catch (error) {
      throw new Error(`Error retrieving tournaments: ${error}`)
    }
  },

  // Get all tournament standings for user, ordered by most recent
  getUserStandings: async (userId: number): Promise<TournamentStanding | null> => {
    try {
      const [standings] = await DB<TournamentStanding[]>`
        SELECT
            * 
        FROM 
            tournament_standing
        WHERE
            user_id = ${userId}
        ORDER BY
            created_at DESC
      `
      return standings ?? null
    } catch (error) {
      throw new Error(`Error retrieving tournaments: ${error}`)
    }
  },
}

export { userQueries }
