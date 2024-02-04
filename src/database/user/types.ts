interface CreateUser {
  id: number
  username: number
}

interface User {
  id: number
  username: string
  email: string
  role: string
  countryCode: string
  isActive: boolean
  isAdmin: boolean
  isModerator: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string | null
}

interface Rating {
  id: number
  rating: number
  userId: number
  variant: string
  timeControl: string
  gamesPlayed: number
  updatedAt: string
}

interface Following {
  userId: number
  followerId: number
  createdAt: string
}

export { CreateUser, User, Rating, Following }
