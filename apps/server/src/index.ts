import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors())
app.get('/ping', (c) => c.json({ message: 'pong' }))

const port = Number(process.env.PORT ?? 3000)

console.log(`Server listening on http://localhost:${port}`)

export default {
  port,
  fetch: app.fetch,
}
