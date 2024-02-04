import { Elysia } from 'elysia'
import { DB } from './database'

const [user] = await DB`
  select * from users;
`

const app = new Elysia().get('/', () => (user ? user.id : 'user not found')).listen(4000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
