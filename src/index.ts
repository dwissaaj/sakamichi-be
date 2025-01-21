import { Hono } from "hono";
import single from "./single/single";
const app = new Hono().basePath("/api");

app.get("/", async (c) => {
  return c.json("Hi Sakamichi Fans, use this api wisely");
});
app.route("/single", single);

export default app;
