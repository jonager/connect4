import { DB } from '..'
import { Game } from './types'

const userQueries = {
  createGame: async ({
    variant,
    timeControl,
    time,
    white,
    whiteRating,
    whiteRatingAfter,
    black,
    blackRating,
    blackRatingAfter,
    result,
    winnerId,
    loserId,
    moves,
    tournamentId,
  }: Game): Promise<number> => {
    try {
      const [game] = await DB<{ id: number }[]>`
        INSERT
            INTO
            game (
            variant,
            timeControl,
            time,
            result,
            moves,
            white,
            whiteRating,
            whiteRatingAfter,
            black,
            blackRating,
            blackRatingAfter,
            winnerId,
            loserId,
            tournamentId)
        VALUES (
            ${variant}, 
            ${timeControl}, 
            ${time}, 
            ${result}, 
            ${moves}, 
            ${white}, 
            ${whiteRating}, 
            ${whiteRatingAfter}, 
            ${black}, 
            ${blackRating}, 
            ${blackRatingAfter}, 
            ${winnerId}, 
            ${loserId}, 
            ${tournamentId})
        RETURNING id
      `
      return game?.id as number
    } catch (error) {
      throw new Error(`Error creating game: ${error}`)
    }
  },

  getGame: async (gameId: number): Promise<number> => {
    const [game] = await DB<{ id: number }[]>`
        SELECT
            *
        FROM
            game
        WHERE
            id = ${gameId}
      `
    return game?.id as number
  },

  getUserGames: async (userId: number): Promise<Game | null> => {
    const [games] = await DB<Game[]>`
      SELECT
          *
      FROM
          game
      WHERE
          (white_player_id = ${userId}
          OR black_player_id = ${userId})
      ORDER BY
          created_at DESC
    `
    return games ?? null
  },

  getUserGamesByVariant: async (userId: number, variant: string): Promise<Game | null> => {
    const [games] = await DB<Game[]>`
	SELECT
		*
	FROM
		game
	WHERE
		(white_player_id = ${userId}
		OR black_player_id = ${userId})
		AND variant = ${variant}
	ORDER BY
		created_at DESC
    `
    return games ?? null
  },

  // get all games for a tournament
  getUserGamesByTournament: async (tournamentId: number): Promise<Game | null> => {
    const [games] = await DB<Game[]>`
	SELECT
		*
	FROM
		game
	WHERE
        tournament_id = ${tournamentId}
	ORDER BY
		created_at DESC
    `
    return games ?? null
  },

  getTournamentGamesByUser: async (userId: number, tournamentId: number): Promise<Game | null> => {
    const [games] = await DB<Game[]>`
	SELECT
		*
	FROM
		game
	WHERE
        (white_player_id = ${userId}
		OR black_player_id = ${userId})
        AND tournament_id = ${tournamentId}
	ORDER BY
		created_at DESC
    `
    return games ?? null
  },
}

export { userQueries }
