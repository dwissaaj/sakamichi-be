import { Hono } from "hono";
import single from "./single/single";
import { HTTPException } from "hono/http-exception";
type Bindings = {
  DB: D1Database;
  KV_MY: KVNamespace
};
const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app.get('/', async (c) => {
  return c.json("Hi Sakamichi Fans, use this api wisely")
})
app.route("/single", single);

export default app;
