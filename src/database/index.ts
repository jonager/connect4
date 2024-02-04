import postgres from 'postgres'

const DB = postgres({
  host: Bun.env?.['DATABASE_HOST'],
  port: Bun.env?.['DATABASE_PORT'],
  password: Bun.env?.['DATABASE_PASS'],
  db: Bun.env?.['DATABASE_NAME'],
  username: Bun.env?.['DATABASE_USER'],
})

export { DB }
