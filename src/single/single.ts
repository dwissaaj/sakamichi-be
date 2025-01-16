import { Hono } from "hono"
const app = new Hono()

app.get('/', (c) => {
    return c.text('Hello Sakamichi Fans!')
  })

export default app