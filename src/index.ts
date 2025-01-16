import { Hono } from 'hono'
import single from './single/single'
type Bindings = {
  DB: D1Database
}
const app = new Hono<{Bindings: Bindings}>().basePath('/api')

app.get('/', (c) => {
  return c.text('Hello Sakamichi Fans!use this api wisely!')
})
app.route('/single', single)

export default app
