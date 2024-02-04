import { DB } from '..'
import { CreateUser, User, Rating, Following } from './types'

const userQueries = {
  createUser: async (userName: string, password: string, email: string): Promise<CreateUser> => {
    try {
      // todo: hash password
      const hashedPassword = password
      const [user] = await DB<CreateUser[]>`
        INSERT
            INTO
            users(username,
            hashed_password,
            email)
        VALUES(${userName},
        ${hashedPassword},
        ${email}) RETURNING id
      `
      return user as CreateUser
    } catch (error) {
      throw new Error(`Error creating user: ${error}`)
    }
  },

  getUser: async (userId: number): Promise<User | null> => {
    try {
      const [user] = await DB<User[]>`
        SELECT
            *
        FROM
            users
        WHERE
            id = ${userId}
      `
      return user ?? null
    } catch (error) {
      throw new Error(`Error retrieving user: ${error}`)
    }
  },

  selectRating: async (userId: number): Promise<Rating | null> => {
    const [rating] = await DB<Rating[]>`
      SELECT
          rating,
          user_id,
          variant,
          time_control,
          games_played
      FROM
          rating
      WHERE
	  	  user_id = ${userId}
    `
    return rating ?? null
  },

  updateRating: async (rating: number, userId: number, variant: string, timeControl: string) => {
    await DB`
        UPDATE
            rating
        SET
            rating = ${rating}, games_played = games_played + 1
        WHERE
            user_id = ${userId}
            AND variant = ${variant}
            AND time_control = ${timeControl}
      `
  },

  // Returns users you're following
  getFollowings: async (userId: number): Promise<Following | null> => {
    const [followings] = await DB<Following[]>`
      SELECT
          user_id,
          follower_id,
          created_at
      FROM
          FOLLOWING
      WHERE
          follower_id = ${userId}
    `

    return followings ?? null
  },

  // Returns all your followers
  getFollowers: async (userId: number): Promise<Following | null> => {
    const [followers] = await DB<Following[]>`
      SELECT
          user_id,
          follower_id,
          created_at
      FROM
          FOLLOWING
      WHERE
          user_id = ${userId}
    `
    return followers ?? null
  },
}

export { userQueries }
